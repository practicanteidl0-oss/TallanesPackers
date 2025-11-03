import React, { useState } from "react";

// Importar imágenes de beneficios
import beneficio1 from '../assets/images/beneficios/1.jpg';
import beneficio2 from '../assets/images/beneficios/2.jpg';
import beneficio3 from '../assets/images/beneficios/3.jpg';

// Importar imágenes de productos
import mangoImg from '../assets/images/productos/Mango.png';
import paltaImg from '../assets/images/productos/Palta.png';
import bananoImg from '../assets/images/productos/Banano.png';
import limonImg from '../assets/images/productos/Limon.png';

// Importar archivos PDF
import mangoPdf from '../assets/pdf/FichaTecnica_Mango.pdf';
import aguacatePdf from '../assets/pdf/FichaTecnica_Aguacate.pdf';
import bananoPdf from '../assets/pdf/FichaTecnica_Banano.pdf';
import limonPdf from '../assets/pdf/FichaTecnica_Limon.pdf';

function ProductosYBeneficios() {
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);

  const beneficios = [
    {
      id: 1,
      title: "Asesoría y/o Asistencia Agrícola",
      image: beneficio1,
      description: "Brindamos asesoría especializada para optimizar la producción agrícola con técnicas modernas y sostenibles.",
      detailedDescription: "La certificación de plantas y campos del sector agrícola ha sido la respuesta a una necesidad de disponer, por un lado, de un producto de calidad e inocuidad comprobada, y por el otro, con sistemas productivos que respondan a las necesidades de seguridad fitosanitaria frente a problemas presentes como plagas y potenciales enfermedades que afecten la integridad o bienestar del consumidor final.",
      features: [
        "Fecha de Fotografia: 10 de febrero del 2021",
        "Lugar de la fotografia: Fundo Valle San Miguel - Malingas"
      ]
    },
    {
      id: 2,
      title: "Empaque de Frescos",
      image: beneficio2,
      description: "Servicios profesionales de empaque que garantizan la frescura y calidad de los productos durante el transporte.",
      detailedDescription: "En Tallanes Packers contamos con amplios ambientes de proceso, lineas automatizadas, personal capacitado y comprometido en trabajar bajo un mismo esquema, asegurando la calidad, inocuidad y sobretodo continuidad de proceso, cubriendo así las expectativas de nuestros clientes como las exigencias de los mercados internacionales.",
      features: [
        "Fecha de Fotografia: 10 de febrero del 2021",
        "Lugar de la fotografia: Area de Empaque Europa - Tallanes Packers",
      ]
    },
    {
      id: 3,
      title: "Autorizaciones Sanitarias",
      image: beneficio3,
      description: "Gestión completa de permisos y certificaciones sanitarias para exportación internacional.",
      detailedDescription: "Contamos con una división agrícola, conformada por agrónomos con experiencia, dedicados a asesorar y asistir la gestión cultural de los agricultores del valle, y así poder fomentar la integración de ellos a los estándares del comercio exterior, apoyándolos implementando buenas prácticas de cosecha, asistencia y seguimiento en campo, así como un financiamiento flexible pagadero durante sus cosechas, permitiéndoles obtener los mejores rendimientos en campo, y así también, poder conseguir los mejores retornos en el mercado extranjero que beneficie a todas las partes.",
      features: [
        "Fecha de Fotografia: 10 de febrero del 2021",
        "Lugar de la fotografia: Fundo Valle San Miguel - Malingas Tambogrande",
      ]
    }
  ];

  const productos = [
    {
      id: 1,
      name: "Mango",
      image: mangoImg,
      description: "Nuestra pasión por los mangos se refleja en cada fruta que exportamos, llevando el exquisito sabor tropical a clientes internacionales",
      pdfUrl: mangoPdf,
      
    },
    {
      id: 2,
      name: "Aguacate",
      image: paltaImg,
      description: "Llevamos nuestros aguacates a mercados globales, ofreciendo frescura y calidad insuperables en cada envío",
      pdfUrl: aguacatePdf,
    },
    {
      id: 3,
      name: "Banano",
      image: bananoImg,
      description: "Nuestros bananos frescos y deliciosos son enviados a todo el mundo, brindando sabor tropical a cada destino.",
      pdfUrl: bananoPdf,
    },
    {
      id: 4,
      name: "Limón",
      image: limonImg,
      description: "Llevamos el sabor cítrico y refrescante de nuestros limones a mercados internacionales, añadiendo frescura a cada rincón del mundo.",
      pdfUrl: limonPdf,
    }
  ];

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleDownload = (pdfUrl, productName) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `FichaTecnica_${productName}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    setSelectedBenefit(null);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100" id="productos-beneficios">
      <div className="container mx-auto px-4">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Productos y Beneficios
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-tallanes to-tallanes/70 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Descubre nuestros servicios especializados y productos de exportación de la más alta calidad
          </p>
        </div>

        {/* Sección de Beneficios */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nuestros Servicios
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((beneficio) => (
              <div
                key={beneficio.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer"
                onMouseEnter={() => setHoveredBenefit(beneficio.id)}
                onMouseLeave={() => setHoveredBenefit(null)}
                onClick={() => setSelectedBenefit(beneficio)}
              >
                <div className="relative h-80">
                  <img
                    src={beneficio.image}
                    alt={beneficio.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay con gradiente */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-all duration-500 ${
                    hoveredBenefit === beneficio.id ? 'opacity-95' : 'opacity-70'
                  }`}></div>
                  
                  {/* Contenido */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                    <div className={`transform transition-all duration-500 ${
                      hoveredBenefit === beneficio.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                      <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-tallanes to-tallanes/80 rounded-full mb-4 mx-auto shadow-lg">
                        <i className="fas fa-arrow-right text-white text-xl"></i>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight min-h-[3rem] flex items-center">
                      {beneficio.title}
                    </h3>
                    
                    <p className={`text-gray-200 text-sm transition-all duration-500 min-h-[4rem] flex items-center ${
                      hoveredBenefit === beneficio.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      {beneficio.description}
                    </p>
                    
                    <div className={`mt-4 transition-all duration-500 ${
                      hoveredBenefit === beneficio.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <span className="text-tallanes font-semibold text-sm">
                        Clic para ver más detalles
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Productos */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nuestros Productos
            </h3>
            <p className="text-lg text-gray-600">
              Productos frescos de exportación con fichas técnicas detalladas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Imagen del producto */}
                <div className="relative h-48 bg-gradient-to-br from-tallanes/10 to-tallanes/5 flex items-center justify-center p-4">
                  <img
                    src={producto.image}
                    alt={producto.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold text-gray-800">
                      {producto.name}
                    </h4>
                    <button
                      onClick={() => toggleCard(producto.id)}
                      className="flex items-center justify-center w-8 h-8 bg-tallanes rounded-full text-white hover:bg-tallanes/80 transition-colors duration-200"
                    >
                      <i className={`fas ${expandedCard === producto.id ? 'fa-chevron-up' : 'fa-chevron-down'} text-sm transition-transform duration-200`}></i>
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mb-3 font-mono">
                    Ficha Técnica Disponible
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {producto.description}
                  </p>

                  {/* Contenido expandido con transición suave */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedCard === producto.id ? 'max-h-32 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                  }`}>
                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleDownload(producto.pdfUrl, producto.name)}
                        className="w-full bg-tallanes hover:bg-tallanes/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-download"></i>
                        Descargar Ficha Técnica
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal para Beneficios */}
      {selectedBenefit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={closeModal}>
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              {/* Imagen de cabecera */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <img
                  src={selectedBenefit.image}
                  alt={selectedBenefit.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <i className="fas fa-times"></i>
                </button>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedBenefit.title}</h3>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="p-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-2">
                  {selectedBenefit.detailedDescription}
                </p>

                <br/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedBenefit.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-tallanes rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductosYBeneficios;