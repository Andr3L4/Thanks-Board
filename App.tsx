import React, { useState, useEffect, useCallback } from 'react';
import type { ThankYouMessage } from './types';
import { INITIAL_MESSAGES } from './constants';
import ThankYouCard from './components/ThankYouCard';
import FloatingActionButton from './components/FloatingActionButton';
import AddMessageModal from './components/AddMessageModal';
import ViewMessagesButton from './components/ViewMessagesButton';
import AllMessagesModal from './components/AllMessagesModal';

const SLIDE_INTERVAL_MS = 8000; // Time each message is displayed
const FADE_DURATION_MS = 500; // Duration of the fade transition
const MESSAGE_LIFESPAN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const loadMessages = (): ThankYouMessage[] => {
  try {
    const storedMessages = localStorage.getItem('gratitudeMessages');
    if (storedMessages) {
      const parsedMessages: ThankYouMessage[] = JSON.parse(storedMessages);
      const sevenDaysAgo = Date.now() - MESSAGE_LIFESPAN_MS;
      
      const recentMessages = parsedMessages.filter(
        (msg) => msg.createdAt > sevenDaysAgo
      );

      // Save back the pruned list to keep localStorage clean
      if (recentMessages.length < parsedMessages.length) {
         localStorage.setItem('gratitudeMessages', JSON.stringify(recentMessages));
      }

      if (recentMessages.length > 0) {
        return recentMessages;
      }
    }
  } catch (error) {
    console.error("Failed to load or parse messages from localStorage", error);
  }
  // Fallback to initial messages if localStorage is empty, invalid, or all messages are expired
  return INITIAL_MESSAGES.filter(msg => msg.createdAt > Date.now() - MESSAGE_LIFESPAN_MS);
};


const App: React.FC = () => {
  const [messages, setMessages] = useState<ThankYouMessage[]>(loadMessages);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Effect 1: Save messages to localStorage whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem('gratitudeMessages', JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to localStorage", error);
    }
  }, [messages]);
  
  // Effect 2: Run the main slideshow timer.
  useEffect(() => {
    if (messages.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setIsFading(false);
      }, FADE_DURATION_MS);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [messages.length]);

  // Effect 3: Periodically prune expired messages from the state.
  // This is crucial for long-running displays to ensure messages disappear after 7 days.
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

  // Effect 4: Ensure the currentIndex is always valid, especially after messages are pruned.
  useEffect(() => {
    if (currentIndex >= messages.length && messages.length > 0) {
      setCurrentIndex(0);
    }
  }, [messages.length, currentIndex]);

  const handleAddMessage = useCallback((text: string) => {
    if (text.trim() === '') return;

    const newMessage: ThankYouMessage = {
      id: Date.now(),
      text,
      rotation: Math.floor(Math.random() * 5) - 2,
      createdAt: Date.now(),
    };

    setMessages(prevMessages => [newMessage, ...prevMessages]);
    setCurrentIndex(0); // Show the new message immediately
    setIsAddModalOpen(false);
  }, []);

  const handleDeleteMessage = useCallback((id: number) => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
  }, []);
  
  const currentMessage = messages[currentIndex];

  return (
    <div className="min-h-screen text-white font-sans flex flex-col">
      <header className="text-center py-12 px-4 flex-shrink-0">
        <h1 className="text-6xl font-extrabold text-white tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
          Ecrã dos Agradecimentos
        </h1>
        <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.2)' }}>
          Agradece á pessoa que te deu Apoio no teu Projeto sem ela saber😉
        </p>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 pb-24">
        <div className="container mx-auto flex items-center justify-center">
          {currentMessage ? (
             <div
              className={`transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
            >
              <ThankYouCard key={currentMessage.id} message={currentMessage} />
            </div>
          ) : (
            <div className="text-center text-slate-300 p-8 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-2xl font-bold">No messages yet.</p>
              <p className="mt-2">Be the first to share your gratitude by clicking the '+' button!</p>
            </div>
          )}
        </div>
      </main>
      
      <ViewMessagesButton onClick={() => setIsArchiveModalOpen(true)} />
      <FloatingActionButton onClick={() => setIsAddModalOpen(true)} />
      
      <AddMessageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMessage={handleAddMessage}
      />

      <AllMessagesModal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        messages={messages}
        onDeleteMessage={handleDeleteMessage}
      />
    </div>
  );
};

export default App;