import React, { useState, useEffect, useCallback } from 'react';
import type { ThankYouMessage } from './types';
import { INITIAL_MESSAGES, NOTE_COLORS } from './constants';
import ThankYouCard from './components/ThankYouCard';
import FloatingActionButton from './components/FloatingActionButton';
import AddMessageModal from './components/AddMessageModal';
import ViewMessagesButton from './components/ViewMessagesButton';
import AllMessagesModal from './components/AllMessagesModal';

const MESSAGE_LIFESPAN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const getRandomColor = () => NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];

const loadMessages = (): ThankYouMessage[] => {
  try {
    const storedMessages = localStorage.getItem('gratitudeMessages');
    if (storedMessages) {
      const parsedMessages: ThankYouMessage[] = JSON.parse(storedMessages);
      const sevenDaysAgo = Date.now() - MESSAGE_LIFESPAN_MS;
      
      const recentMessages = parsedMessages.filter(
        (msg) => msg.createdAt > sevenDaysAgo
      );

      // Add color to messages that don't have one (for backward compatibility)
      const messagesWithColor = recentMessages.map(msg => ({
        ...msg,
        color: msg.color || getRandomColor(),
      }));

      // Save back the pruned and updated list to keep localStorage clean
      if (messagesWithColor.length < parsedMessages.length || !messagesWithColor.every(m => m.color)) {
         localStorage.setItem('gratitudeMessages', JSON.stringify(messagesWithColor));
      }

      if (messagesWithColor.length > 0) {
        return messagesWithColor;
      }
    }
  } catch (error)
    {
    console.error("Failed to load or parse messages from localStorage", error);
  }
  // Fallback to initial messages if localStorage is empty, invalid, or all messages are expired
  return INITIAL_MESSAGES.filter(msg => msg.createdAt > Date.now() - MESSAGE_LIFESPAN_MS);
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<ThankYouMessage[]>(loadMessages);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAllMessagesModalOpen, setIsAllMessagesModalOpen] = useState(false);

  // Effect 1: Save messages to localStorage whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem('gratitudeMessages', JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to localStorage", error);
    }
  }, [messages]);
  
  // Effect 2: Periodically prune expired messages from the state.
  useEffect(() => {
    const pruneInterval = setInterval(() => {
      const sevenDaysAgo = Date.now() - MESSAGE_LIFESPAN_MS;
      setMessages(currentMessages => {
        const recentMessages = currentMessages.filter(msg => msg.createdAt > sevenDaysAgo);
        // Only update state if messages were actually removed to prevent unnecessary re-renders
        if (recentMessages.length < currentMessages.length) {
          return recentMessages;
        }
        return currentMessages;
      });
    }, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(pruneInterval);
  }, []); // Run only once on component mount

  const handleAddMessage = useCallback((text: string) => {
    if (text.trim() === '') return;

    const newMessage: ThankYouMessage = {
      id: Date.now(),
      text,
      rotation: Math.floor(Math.random() * 7) - 3, // -3 to 3 degrees
      createdAt: Date.now(),
      color: getRandomColor(),
    };

    setMessages(prevMessages => [newMessage, ...prevMessages]);
    setIsAddModalOpen(false);
  }, []);
  
  const handleDeleteMessage = useCallback((id: number) => {
    setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
  }, []);

  return (
    <div className="min-h-screen text-white font-sans flex flex-col items-center">
      <header className="text-center pt-12 pb-6 px-4 flex-shrink-0">
        <h1 className="text-6xl font-extrabold text-white tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
           Ecrã dos Agradecimentos
        </h1>
        <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.2)' }}>
         Agradece à pessoa que te deu apoio no teu projeto, sem ela saber 😉
        </p>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {messages.length > 0 ? (
           <div className="flex flex-wrap justify-center items-start gap-8">
            {messages.map((message) => (
              <ThankYouCard key={message.id} message={message} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full pt-16">
            <div className="text-center text-slate-300 p-8 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-2xl font-bold">The wall is empty.</p>
              <p className="mt-2">Be the first to share your gratitude by clicking the '+' button!</p>
            </div>
          </div>
        )}
      </main>
      
      <ViewMessagesButton onClick={() => setIsAllMessagesModalOpen(true)} />
      <FloatingActionButton onClick={() => setIsAddModalOpen(true)} />
      
      <AddMessageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMessage={handleAddMessage}
      />
      
      <AllMessagesModal
        isOpen={isAllMessagesModalOpen}
        onClose={() => setIsAllMessagesModalOpen(false)}
        messages={messages}
        onDeleteMessage={handleDeleteMessage}
      />
    </div>
  );
};

export default App;