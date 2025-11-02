import React, { useState } from 'react';

function WhatsApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Botón de WhatsApp flotante */}
      <button 
        onClick={openModal}
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out z-50 flex items-center justify-center"
      >
        <i className="fab fa-whatsapp text-white text-4xl"></i>
        <span className="sr-only">Contactar por WhatsApp</span>
      </button>

      {/* Modal WhatsApp */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="flex justify-between items-center p-4 border-b bg-green-500">
              <h2 className="text-xl font-semibold text-white">Chatea con nosotros!</h2>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-200 text-xl font-normal w-8 h-8 flex items-center justify-center rounded-full hover:bg-green-600 transition-colors"
                style={{ lineHeight: '1' }}
              >
                ✕
              </button>
            </div>
            
            {/* Contenido del modal */}
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <i className="fab fa-whatsapp text-white text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Tallanes Packers</h3>
                  <p className="text-sm text-gray-600">En línea</p>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-3 mb-4">
                <p className="text-gray-700">
                  ¡Hola! 👋 Déjanos un mensaje y te responderemos lo antes posible.
                </p>
              </div>
              
              <div className="space-y-3">
                <textarea
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                
                <a
                  href={`https://wa.me/51988656424${message ? `?text=${encodeURIComponent(message)}` : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  onClick={closeModal}
                >
                  <i className="fab fa-whatsapp mr-2 text-xl"></i>
                  Enviar mensaje
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WhatsApp;