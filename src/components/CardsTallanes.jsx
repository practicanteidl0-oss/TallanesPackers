import React from 'react';
import { LayoutGrid } from './ui/layout-grid';

// Importar las imágenes
import misionImg from '../assets/images/acercaDe/mision.jpg';
import visionImg from '../assets/images/acercaDe/vision.jpg';
import valoresImg from '../assets/images/acercaDe/valores.png';
import fondoTallanes from '../assets/images/acercaDe/fondo-tallanes.png';

function CardsTallanes() {
  return (
    <section 
      className="py-16 bg-gray-100 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${fondoTallanes})`,
      }}
    >
      {/* Overlay para mejorar la legibilidad del texto */}
      <div className="absolute inset-0"></div>
      
      {/* Gradiente difuminado superior */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent z-20"></div>
      
      {/* Gradiente difuminado inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Título principal */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Dale clic a cada imagen
          </h2>
          <p className="text-lg text-stone-500">
            Descubre nuestra misión, visión y valores
          </p>
        </div>

        {/* LayoutGrid Component */}
        <div className="h-screen py-2w-full">
          <LayoutGrid cards={cards} />
        </div>
      </div>
    </section>
  );
}

const MisionContent = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Misión
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Ser la plataforma ideal de exportación de alimentos peruanos, asociando a todos los participantes de la cadena exportadora, con un concepto humano y trato familiar, asegurando el adecuado cuidado técnico, cosecha, y empaque con el más alto sentido de profesionalismo, estándares internacionales y procesos eficientes, asegurando una atención oportuna para todos los participantes.
      </p>
    </div>
  );
};

const VisionContent = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Visión
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Posicionarnos como expertos y principal referente nacional y extranjero, en asociar profesionalmente a todos los participantes de la cadena exportadora de productos alimenticios peruanos, exponiendo sus ventajas comparativas hacia el mundo, bajo una gestión humana y profesional, que asegure nuestra sostenibilidad en el tiempo.
      </p>
    </div>
  );
};

const ValoresContent = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Valores
      </p>
      <p className="font-normal text-base text-white"></p>
      <div className="font-normal text-base my-4 max-w-lg text-neutral-200">
        <p className="mb-2">Nuestros valores fundamentales son:</p>
        <div className="space-y-1">
          {['Honestidad', 'Responsabilidad', 'Ética', 'Integridad', 'Solidaridad', 'Eficiencia'].map((valor, index) => (
            <div key={index} className="text-neutral-200">
              • {valor}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <MisionContent />,
    className: "md:col-span-2",
    thumbnail: misionImg,
    title: "MISIÓN",
  },
  {
    id: 2,
    content: <VisionContent />,
    className: "col-span-1",
    thumbnail: visionImg,
    title: "VISIÓN",
  },
  {
    id: 3,
    content: <ValoresContent />,
    className: "col-span-1",
    thumbnail: valoresImg,
    title: "VALORES",
  },
];

export default CardsTallanes;