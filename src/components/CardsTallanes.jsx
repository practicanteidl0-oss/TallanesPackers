import React, { useState } from 'react';

// Importar las imágenes
import misionImg from '../assets/images/acercaDe/mision.jpg';
import visionImg from '../assets/images/acercaDe/vision.jpg';
import valoresImg from '../assets/images/acercaDe/valores.png';

function CardsTallanes() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

  // Datos de las tarjetas
  const cardsData = [
    {
      id: 'mision',
      title: 'Misión',
      image: misionImg,
      content: 'Ser la plataforma ideal de exportación de alimentos peruanos, asociando a todos los participantes de la cadena exportadora, con un concepto humano y trato familiar, asegurando el adecuado cuidado técnico, cosecha, y empaque con el más alto sentido de profesionalismo, estándares internacionales y procesos eficientes, asegurando una atención oportuna para todos los participantes'
    },
    {
      id: 'vision',
      title: 'Visión',
      image: visionImg,
      content: 'Posicionarnos como expertos y principal referente nacional y extranjero, en asociar profesionalmente a todos los participantes de la cadena exportadora de productos alimenticios peruanos, exponiendo sus ventajas comparativas hacia el mundo, bajo una gestión humana y profesional, que asegure nuestra sostenibilidad en el tiempo.'
    },
    {
      id: 'valores',
      title: 'Valores',
      image: valoresImg,
      content: 'Honestidad • Responsabilidad • Ética • Integridad • Solidaridad • Eficiencia',
      isList: true
    }
  ];

  const openModal = (card, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCardPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setSelectedCard(card);
    setIsAnimating(true); // Eliminar el setTimeout para quitar la demora
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setSelectedCard(null);
    }, 600); // Ajustar para coincidir con la duración de la transición
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Título principal */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Dale clic a cada imagen
          </h2>
          <p className="text-lg text-gray-600">
            Descubre nuestra misión, visión y valores
          </p>
        </div>

        {/* Grid de tarjetas - 2 arriba, 1 abajo */}
        <div className="max-w-5xl mx-auto">
          {/* Fila superior - 2 tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {cardsData.slice(0, 2).map((card) => (
              <div
                key={card.id}
                onClick={(e) => openModal(card, e)}
                className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fila inferior - 1 tarjeta que ocupa el mismo ancho que las dos de arriba */}
          <div className="flex justify-center">
            <div
              onClick={(e) => openModal(cardsData[2], e)}
              className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={cardsData[2].image}
                  alt={cardsData[2].title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
                    {cardsData[2].title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay de fondo negro opaco suave */}
        {selectedCard && (
          <div 
            className={`fixed inset-0 z-40 bg-black transition-opacity duration-500 ease-in-out ${
              isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
            onClick={closeModal}
          />
        )}

        {/* Imagen que se traslada al centro */}
        {selectedCard && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div 
              className={`absolute bg-white rounded-2xl shadow-2xl transition-all duration-600 ease-in-out pointer-events-auto ${
                isAnimating 
                  ? 'w-[600px] h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' 
                  : 'w-64 h-64'
              }`}
              style={{
                left: isAnimating ? '50%' : `${cardPosition.x}px`,
                top: isAnimating ? '50%' : `${cardPosition.y}px`,
                transform: isAnimating 
                  ? 'translate(-50%, -50%)' 
                  : 'translate(-50%, -50%)',
              }}
            >
              {/* Botón de cerrar */}
              <button
                onClick={closeModal}
                className="absolute -top-2 -right-2 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-200 shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Layout horizontal: texto a la izquierda, imagen a la derecha */}
              <div className="flex">
                {/* Contenido del texto - lado izquierdo */}
                <div className="flex-1 p-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {selectedCard.title}
                  </h2>
                  
                  {selectedCard.isList ? (
                    <div className="space-y-3">
                      {selectedCard.content.split(' • ').map((valor, index) => (
                        <button 
                          key={index} 
                          className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                        >
                          {valor}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {selectedCard.content}
                    </p>
                  )}
                </div>

                {/* Imagen - lado derecho */}
                <div className="w-64 relative">
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    className="w-full h-full object-cover rounded-r-2xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-r-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CardsTallanes;