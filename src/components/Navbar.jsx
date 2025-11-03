import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { LiquidGlass } from '@liquidglass/react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  // Función para manejar la apertura del dropdown
  const handleDropdownEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsDropdownOpen(true);
  };

  // Función para manejar el cierre del dropdown con delay
  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150); // 150ms de delay
    setDropdownTimeout(timeout);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'inicio';
      setActiveSection(hash);
    };

    // Detectar cambio inicial
    handleHashChange();

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <nav className="fixed top-1 left-0 right-0 z-50 pt-2">
      {/* contenedor principal: relative para poder centrar absolute el menu */}
      <div className="container mx-auto relative flex items-center justify-between px-4 ">
        {/* Logo a la izquierda */}
        <a className="flex-shrink-0" href="#inicio">
          <img className="h-12 px-4 w-auto" src={logo} alt="Tallanes Logo" />
        </a>

        {/* Menú central (centrado absolutamente en lg+) */}
        <div className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
          <LiquidGlass
            borderRadius={40}
              blur={3}
              shadowIntensity={0.1}
              contrast={0.5}
              brightness={1.5}
              saturation={2}
              zIndex={10}
              elasticity={1}
              displacementScale={1}
              className="backdrop-blur-sm border border-white/20 rounded-full"
              style={{ minWidth: '400px' }}
            
          >
            <nav className="py-1 px-2" id="menu-navegacion">
              <ul className="flex space-x-2 items-center">
                <li className="relative group">
                  <a
                    className={` hover:text-tallanes font-medium px-3 py-2 transition-colors duration-200 rounded-3xl ${
                activeSection === 'inicio' 
                  ? 'bg-tallanes text-white hover:text-white'
                  : 'text-stone-800 hover:text-tallanes'
              }`}
                    href="#inicio"
                  >
                    <i className="fa fa-home mr-2"></i>Inicio
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="#about"
                    className={` hover:text-tallanes font-medium px-3 py-2 transition-colors duration-200 flex items-center rounded-3xl ${
                      activeSection === 'about' 
                        ? 'bg-tallanes text-white hover:text-white' 
                        : 'text-stone-800 hover:text-tallanes'
                    }`}
                  >
                    <i className="fa fa-users mr-2"></i>Somos Tallanes
                  </a>
                </li>
                <li className="relative group">
                  <a
                    href="#productos"
                    className={` hover:text-tallanes font-medium px-3 py-2 transition-colors duration-200 flex items-center rounded-3xl ${
                activeSection === 'productos' 
                  ? 'bg-tallanes text-white hover:text-white'
                  : 'text-stone-800 hover:text-tallanes'
              }`}
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <i className="fa fa-cube mr-2"></i>Productos y Beneficios
                    <i className="fas fa-angle-down ml-1"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </LiquidGlass>
          
          {/* Dropdown fuera del LiquidGlass */}
          <div 
            className="absolute top-full left-0 mt-2"
            style={{ left: 'calc(50% + 20px)' }}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <LiquidGlass
              borderRadius={30}
              blur={3}
              shadowIntensity={0.1}
              elasticity={1}
              displacementScale={2}
              zIndex={9999}
              contrast={0.2}
              brightness={1.8}
              saturation={1}
              className={`backdrop-blur-sm border border-white/20 rounded-sm transition-all duration-300 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <ul className="w-56 py-2">
                <li className="hover:bg-white/10 rounded-3xl mx-2">
                  <a
                    href="#noticias"
                    className="block px-4 py-2 text-stone-800 text-sm hover:text-tallanes transition-colors duration-200"
                  >
                    <i className="fa-sharp fa-solid fa-check-double mr-2"></i>
                    Noticias Destacadas
                  </a>
                </li>
                <li className="hover:bg-white/10 rounded-3xl mx-2">
                  <a
                    href="#certificaciones"
                    className="block px-4 py-2 text-stone-800 text-sm hover:text-tallanes transition-colors duration-200"
                  >
                    <i className="fa-solid fa-book mr-2"></i>Certificaciones
                    Globales
                  </a>
                </li>
                <li className="hover:bg-white/10 rounded-3xl mx-2">
                  <a
                    href="#galeria"
                    className="block px-4 py-2 text-stone-800 text-sm hover:text-tallanes transition-colors duration-200"
                  >
                    <i className="fa fa-image mr-2"></i>Nuestra Galeria
                  </a>
                </li>
              </ul>
            </LiquidGlass>
          </div>
        </div>

        {/* Botones a la derecha */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="inline-block" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
            <LiquidGlass
              borderRadius={20}
              blur={3}
              shadowIntensity={0.1}
              contrast={0.2}
              brightness={1.8}
              saturation={1}

              className="inline-block"
            >
              <a
            href="#aliados"
            className={`border font-medium px-4 py-2 rounded-full transition-colors duration-200 inline-block ${
              activeSection === 'aliados' 
                ? 'border-tallanes bg-tallanes text-white hover:bg-tallanes-600' 
                : 'border-tallanes text-stone-800 hover:text-tallanes'
            }`}
            style={{ height: '40px', display: 'flex', alignItems: 'center' }}
          >
            <i className="fa fa-handshake mr-2"></i>Aliados
          </a>
            </LiquidGlass>
          </div>

          <a
            href="#contacto"
            className={`font-medium px-4 py-2 rounded-full transition-colors duration-200 inline-block ${
              activeSection === 'contacto' 
                ? 'bg-tallanes-600 text-white hover:bg-tallanes-700' 
                : 'bg-tallanes text-white hover:bg-tallanes-600'
            }`}
            style={{ height: '40px', display: 'flex', alignItems: 'center' }}
          >
            <i className="fa-sharp fa-solid fa-phone mr-2"></i>Contacto
          </a>
        </div>

        {/* Versión Tablet - Botones compactos */}
        <div className="hidden md:flex lg:hidden items-center space-x-2">
          <a
            href="#aliados"
            className={`border font-medium px-3 py-2 rounded-full transition-colors duration-200 text-sm ${
              activeSection === 'aliados' 
                ? 'border-tallanes bg-tallanes text-white hover:bg-tallanes-600' 
                : 'border-tallanes text-stone-800 hover:text-tallanes'
            }`}
          >
            <i className="fa fa-handshake mr-1"></i>Aliados
          </a>
          <a
            href="#contacto"
            className={`font-medium px-3 py-2 rounded-full transition-colors duration-200 text-sm ${
              activeSection === 'contacto' 
                ? 'bg-tallanes-600 text-white hover:bg-tallanes-700' 
                : 'bg-tallanes text-white hover:bg-tallanes-600'
            }`}
          >
            <i className="fa-sharp fa-solid fa-phone mr-1"></i>Contacto
          </a>
        </div>

        {/* Menú móvil (hamburguesa) */}
        <button
          className="md:hidden flex flex-col justify-center items-center space-y-1.5 ml-4"
          id="btn-hamburguesa"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            if (isMenuOpen) {
              setIsMobileDropdownOpen(false);
            }
          }}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
            isMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}></span>
        </button>
      </div>

      {/* Menú móvil desplegable */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <LiquidGlass
            borderRadius={30}
            blur={3}
            shadowIntensity={0.1}
            contrast={0.4}
            brightness={1.3}
            saturation={1.2}
            className="border-t border-white/20 backdrop-blur3xl"
          >
            <div className="px-4 py-4 pb-6 space-y-3">
              <a
                href="#inicio"
                className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                  activeSection === 'inicio' 
                    ? 'bg-tallanes text-white' 
                    : 'text-stone-700 md:text-white hover:bg-white/10 hover:text-tallanes'
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsMobileDropdownOpen(false);
                }}
              >
                <i className="fa fa-home mr-3"></i>Inicio
              </a>
              <a
                href="#about"
                className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                  activeSection === 'about' 
                    ? 'bg-tallanes text-white' 
                    : 'text-stone-700 md:text-white hover:bg-white/10 hover:text-tallanes'
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsMobileDropdownOpen(false);
                }}
              >
                <i className="fa fa-users mr-3"></i>Somos Tallanes
              </a>
              
              {/* Dropdown de Productos en móvil */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                  className={`flex items-center justify-between w-full py-3 px-4 rounded-lg transition-colors duration-200 ${
                    activeSection === 'productos' 
                      ? 'bg-tallanes text-white' 
                      : 'text-stone-700 md:text-white hover:bg-white/10 hover:text-tallanes'
                  }`}
                >
                  <div className="flex items-center">
                    <i className="fa fa-cube mr-4"></i>Productos y Beneficios
                  </div>
                  <i className={`fa fa-chevron-down ml-2 transition-transform duration-200 ${
                    isMobileDropdownOpen ? 'rotate-180' : ''
                  }`}></i>
                </button>
                
                {/* Subopciones del dropdown */}
                <div className={`ml-6 space-y-2 overflow-hidden transition-all duration-300 ${
                  isMobileDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <a
                    href="#productos-locales"
                    className="flex items-center py-2 px-4 text-stone-700 md:text-white hover:text-tallanes hover:bg-white/5 rounded-lg transition-colors duration-200 text-sm"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileDropdownOpen(false);
                    }}
                  >
                    <i className="fa fa-leaf mr-3"></i>Productos Locales
                  </a>
                  <a
                    href="#productos-globales"
                    className="flex items-center py-2 px-4 text-stone-700 md:text-white hover:text-tallanes hover:bg-white/5 rounded-lg transition-colors duration-200 text-sm"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileDropdownOpen(false);
                    }}
                  >
                    <i className="fa fa-globe mr-3"></i>Productos Globales
                  </a>
                  <a
                    href="#galeria"
                    className="flex items-center py-2 px-4 text-stone-700 md:text-white hover:text-tallanes hover:bg-white/5 rounded-lg transition-colors duration-200 text-sm"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileDropdownOpen(false);
                    }}
                  >
                    <i className="fa fa-image mr-3"></i>Nuestra Galería
                  </a>
                </div>
              </div>
              
              <a
                href="#aliados"
                className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                  activeSection === 'aliados' 
                    ? 'bg-tallanes text-white' 
                    : 'text-stone-700 md:text-white hover:bg-white/10 hover:text-tallanes'
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsMobileDropdownOpen(false);
                }}
              >
                <i className="fa fa-handshake mr-3"></i>Aliados
              </a>
              <a
                href="#contacto"
                className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                  activeSection === 'contacto' 
                    ? 'bg-tallanes text-white' 
                    : 'text-stone-700 md:text-white hover:bg-white/10 hover:text-tallanes'
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsMobileDropdownOpen(false);
                }}
              >
                <i className="fa-sharp fa-solid fa-phone mr-3"></i>Contacto
              </a>
            </div>
          </LiquidGlass>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
