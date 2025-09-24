import React, { useState, useEffect } from 'react';

interface AddMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMessage: (text: string) => void;
}

const AddMessageModal: React.FC<AddMessageModalProps> = ({ isOpen, onClose, onAddMessage }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setText('');
    }
  }, [isOpen]);
  
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMessage(text);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#FEF200] rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg transform transition-all border border-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">Partilha a tua gratidão</h2>
        <p className="text-sm sm:text-base text-black/80 mb-4 sm:mb-6">A tua mensagem será publicada anonimamente. Pelo que estás grato hoje?</p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-40 p-4 bg-white text-black rounded-lg border border-black/30 focus:outline-none focus:ring-2 focus:ring-black resize-none placeholder-gray-500"
            placeholder="Escreve aqui a tua nota de agradecimento..."
            maxLength={280}
            required
          />
          <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 mt-6">
             <span className="text-sm text-black/70 mr-auto">{text.length} / 280</span>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-black/10 hover:bg-black/20 text-black font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[#FEF200] hover:bg-yellow-400 text-black font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-black"
              disabled={!text.trim()}
            >
              Publicar Anonimamente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMessageModal;