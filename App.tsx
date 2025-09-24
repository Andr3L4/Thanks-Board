import React, { useState, useEffect, useCallback } from 'react';
import type { ThankYouMessage } from './types';
import { INITIAL_MESSAGES, NOTE_COLORS } from './constants';
import ThankYouCard from './components/ThankYouCard';
import AddMessageModal from './components/AddMessageModal';
import AllMessagesModal from './components/AllMessagesModal';
import Header from './components/Header';

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

      const messagesWithColor = recentMessages.map(msg => ({
        ...msg,
        color: msg.color || getRandomColor(),
      }));

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
  return INITIAL_MESSAGES.filter(msg => msg.createdAt > Date.now() - MESSAGE_LIFESPAN_MS);
};


const App: React.FC = () => {
  const [messages, setMessages] = useState<ThankYouMessage[]>(loadMessages);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAllMessagesModalOpen, setIsAllMessagesModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('gratitudeMessages', JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to localStorage", error);
    }
  }, [messages]);
  
  useEffect(() => {
    const pruneInterval = setInterval(() => {
      const sevenDaysAgo = Date.now() - MESSAGE_LIFESPAN_MS;
      setMessages(currentMessages => {
        const recentMessages = currentMessages.filter(msg => msg.createdAt > sevenDaysAgo);
        if (recentMessages.length < currentMessages.length) {
          return recentMessages;
        }
        return currentMessages;
      });
    }, 60 * 60 * 1000);

    return () => clearInterval(pruneInterval);
  }, []);

  const handleAddMessage = useCallback((text: string) => {
    if (text.trim() === '') return;

    const newMessage: ThankYouMessage = {
      id: Date.now(),
      text,
      rotation: Math.floor(Math.random() * 7) - 3,
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
    <div className="min-h-screen bg-[#FEF200] text-black font-sans flex flex-col">
      <Header 
        onAddClick={() => setIsAddModalOpen(true)}
        onViewClick={() => setIsAllMessagesModalOpen(true)}
      />
      
      <main className="flex-grow flex flex-col p-6 md:p-8 lg:p-10 gap-8">
        <div className="text-center">
           <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-display leading-none">
            WALL OF <br/>GRATITUDE
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            An anonymous space to share and read messages of gratitude. Brighten someone's day by leaving a kind note on the wall.
          </p>
        </div>

        <div className="flex-grow min-h-[50vh]">
           {messages.length > 0 ? (
            <div className="flex flex-wrap justify-center items-start gap-4 md:gap-6">
              {messages.map((message) => (
                <ThankYouCard key={message.id} message={message} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-black p-6 sm:p-8 bg-black/10 rounded-lg">
                <p className="text-xl sm:text-2xl font-bold">The wall is empty.</p>
                <p className="mt-2 text-base">Be the first to share your gratitude.</p>
              </div>
            </div>
          )}
        </div>
      </main>

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