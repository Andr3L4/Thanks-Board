import React from 'react';
import type { ThankYouMessage } from '../types';

interface AllMessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ThankYouMessage[];
  onDeleteMessage: (id: number) => void;
}

const AllMessagesModal: React.FC<AllMessagesModalProps> = ({ isOpen, onClose, messages, onDeleteMessage }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#FEF200] rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl transform transition-all border border-black/50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '85vh' }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 flex-shrink-0">Arquivo de Gratidão</h2>
        <p className="text-sm sm:text-base text-black/80 mb-4 sm:mb-6 flex-shrink-0">
          {messages.length > 0
            ? `Aqui estão todas as mensagens dos últimos 7 dias. Passa o rato por cima para apagar.`
            : `O arquivo está vazio. Adiciona uma mensagem para começar!`}
        </p>
        
        <div className="overflow-y-auto pr-2 sm:pr-4 -mr-2 sm:-mr-4">
          {messages.map((msg) => (
            <div key={msg.id} className="group bg-white/80 p-3 sm:p-4 rounded-lg mb-4 border border-black/20 flex justify-between items-center min-h-[4rem] flex-wrap gap-2">
              <p className="text-black mr-4">{msg.text}</p>
              <button
                onClick={() => onDeleteMessage(msg.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-red-500 ml-auto flex-shrink-0"
                aria-label="Delete message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#FEF200] hover:bg-yellow-400 text-black font-bold transition-colors border border-black"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllMessagesModal;