import React, { useState } from 'react';
import youtubeImg from '../assets/images/youtube.png';
import { LiquidGlass } from '@liquidglass/react';

function Youtube() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Botón de YouTube flotante */}
      <button 
        onClick={openModal}
        className="fixed bottom-10 left-10 w-20 h-12 hover:-translate-y-1 transition-all duration-300 ease-in-out z-50 flex items-center justify-center"
      >
        <img 
          src={youtubeImg} 
          alt="YouTube" 
          className="w-16 h-12 object-contain"
        />
        <span className="sr-only">Ver video</span>
      </button>

      {/* Modal Video YouTube */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white/40 backdrop-blur-sm rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-white">Nuestro Video</h2>
              <button
                onClick={closeModal}
                className="text-white  text-xl font-semibold w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-500 transition-colors"
                style={{ lineHeight: '1' }}
              >
                ✕
              </button>
            </div>
            
            
            {/* Contenedor del video */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/lI7gdEuBzcc"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Youtube;