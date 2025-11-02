import React, { useState } from 'react';

// Importar las imágenes
import img1 from '../assets/images/about/1.jpg';
import img2 from '../assets/images/about/2.jpg';
import img3 from '../assets/images/about/3.jpg';
import img4 from '../assets/images/about/4.jpg';
import img5 from '../assets/images/about/5.jpg';
import img6 from '../assets/images/about/6.jpg';
import img7 from '../assets/images/about/7.jpg';

function SomosTallanes() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Datos del timeline
  const timelineData = [
    {
      year: "2016",
      title: "Nuestro Inicio",
      text: "Nos constituimos el año 2016 como planta procesadora, con el fin de dar servicio de adecuación y empaque de mango, palta y limón, pero con una historia como agricultores de más de 50 años en el Valle de San Lorenzo, siendo partícipes activos Don Miguel Avilés y Ciro Avilés en la denominada \"Colonización del Valle de San Lorenzo\".",
      image: img1
    },
    {
      year: "2017",
      title: "Nuestra Compañía",
      text: "Esta compañía está diseñada para ofrecer una plataforma integral de comercio exterior en el Valle, siendo el puente ideal para los productores, exportadores e importadores de frutas de nuestro norte peruano.",
      image: img2
    },
    {
      year: "2018",
      title: "Nuestros Servicios",
      text: "Brindamos un servicio de empaque diferenciado, y sobretodo, con un trato humano y familiar, y así ser claros líderes en el mercado. Nuestro respaldo son nuestros stake-holders.",
      image: img3
    },
    {
      year: "2019",
      title: "Nuestra Experiencia",
      text: "Somos una empresa con raíces profundas en el Valle de San Lorenzo. Nuestra historia se remonta a más de 50 años atrás, cuando Don Miguel Avilés y Ciro Avilés fueron parte activa de la \"Colonización del Valle de San Lorenzo\". Esta experiencia y legado nos distinguen y aportan una profunda comprensión de la agricultura en la región.",
      image: img4
    },
    {
      year: "2020",
      title: "Nuestra Procesadora",
      text: "Nuestra planta de procesamiento está equipada con tecnología de vanguardia para asegurar la calidad de cada producto que exportamos. Aquí, combinamos la tradición con la innovación para garantizar que nuestros productos cumplan con los más altos estándares de calidad.",
      image: img5
    },
    {
      year: "2021-2022",
      title: "Compromiso con la calidad",
      text: "Nuestro compromiso con la calidad es inquebrantable. Buscamos la excelencia en cada producto que exportamos y nos esforzamos por superar las expectativas de nuestros clientes en todo momento.",
      image: img6
    },
    {
      year: "2023",
      title: "Crecimiento Sostenido",
      text: "Nuestra firme dedicación a la calidad y la sostenibilidad no solo nos ha consolidado en el mercado, sino que también ha cimentado relaciones comerciales sólidas y mutuamente beneficiosas con clientes y socios en todo el mundo.",
      image: img7
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % timelineData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + timelineData.length) % timelineData.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Somos Tallanes
        </h2>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Container */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            {/* Slides */}
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {timelineData.map((slide, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 relative h-96 md:h-[500px] overflow-hidden"
                >
                  {/* Background Image with Blur */}
                  <div 
                    className="absolute inset-0 filter blur-[2px] scale-110"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                  
                  {/* Black Filter Layer */}
                  <div className="absolute inset-0 bg-black/30"></div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center text-white max-w-2xl">
                      <span className="inline-block text-6xl font-bold mb-4 text-yellow-400">
                        {slide.year}
                      </span>
                      <h4 className="text-3xl font-bold mb-6">
                        {slide.title}
                      </h4>
                      <p className="text-lg leading-relaxed">
                        {slide.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {timelineData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-orange-500 scale-125' 
                    : 'bg-gray-400 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Year Timeline */}
          {/* <div className="mt-8 flex justify-center">
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {timelineData.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    index === currentSlide
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {slide.year}
                </button>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default SomosTallanes;