import { useState, lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Youtube from "./components/Youtube";
import WhatsApp from "./components/WhatsApp";
import SomosTallanes from "./components/SomosTallanes";
import CardsTallanes from "./components/CardsTallanes";
import videoTallanes from "./assets/videos/videotallanes.mp4";
import { LiquidGlass } from "@liquidglass/react";
import ProductosYBeneficios from "./components/ProductosYBeneficios";
import ProductosContadores from "./components/ProductosContadores";
import Certificaciones from "./components/Certificaciones";
import Aliados from "./components/Aliados";
const WorldMap = lazy(() => import("./components/ui/world-map"));
import ProductoDestinos from "./components/ui/ProductoDestinos";
import mangoImg from "./assets/images/productos/Mango.png";
import aguacateImg from "./assets/images/productos/Palta.png";
import SliderEquipo from "./components/SliderEquipo";

// Imagenes Equipo
import CarlosTV from "./assets/images/equipo/CarlosTV.png";
import CarlosV from "./assets/images/equipo/CarlosV.png";
import DiegoV from "./assets/images/equipo/DiegoV.png";
import EdgarV from "./assets/images/equipo/EdgarV.png";
import EdwinV from "./assets/images/equipo/EdwinV.png";
import GiancarloV from "./assets/images/equipo/GiancarloV.png";
import JhonV from "./assets/images/equipo/JhonV.png";
import KaremV from "./assets/images/equipo/KaremV.png";
import MaxV from "./assets/images/equipo/MaxV.png";
import MiguelV from "./assets/images/equipo/MiguelV.png";
import MiguelV1 from "./assets/images/equipo/MiguelV-1.png";
import PedroV from "./assets/images/equipo/PedroV.png";
import RicardoV from "./assets/images/equipo/RicardoV.png";
import RobertoV from "./assets/images/equipo/RobertoV.png";
import RuthV from "./assets/images/equipo/RuthV.png";
import SegundoV from "./assets/images/equipo/SegundoV.png";
import WilliamV from "./assets/images/equipo/WilliamV.png";
import WilmerV from "./assets/images/equipo/WilmerV.png";


function App() {
  const [count, setCount] = useState(0);
  // Estado de selección y paneles
  const [productoSeleccionado, setProductoSeleccionado] = useState("Mango");
  const [panelesAbiertos, setPanelesAbiertos] = useState({ con: true, sin: false });
  // Estado confirmado para render del mapa y opción
  const [productoConfirmado, setProductoConfirmado] = useState("Mango");
  const [tratamientoSeleccionado, setTratamientoSeleccionado] = useState("con");

  const dataEquipo = [
    { image: CarlosTV, email: "carlos.tello@tallanes.com", linkedin: "https://linkedin.com/in/carlos-tello/" },
    { image: CarlosV, email: "carlos.villanueva@tallanes.com", linkedin: "https://linkedin.com/in/carlos-villanueva/" },
    { image: DiegoV, email: "diego@tallanes.com", linkedin: "https://linkedin.com/in/diego-tallanes/" },
    { image: EdgarV, email: "edgar@tallanes.com", linkedin: "https://linkedin.com/in/edgar-tallanes/" },
    { image: EdwinV, email: "edwin@tallanes.com", linkedin: "https://linkedin.com/in/edwin-tallanes/" },
    { image: GiancarloV, email: "giancarlo@tallanes.com", linkedin: "https://linkedin.com/in/giancarlo-tallanes/" },
    { image: JhonV, email: "jhon@tallanes.com", linkedin: "https://linkedin.com/in/jhon-tallanes/" },
    { image: KaremV, email: "karem@tallanes.com", linkedin: "https://linkedin.com/in/karem-tallanes/" },
    { image: MaxV, email: "max@tallanes.com", linkedin: "https://linkedin.com/in/max-villarreal/" },
    { image: MiguelV, email: "miguel@tallanes.com", linkedin: "https://linkedin.com/in/miguel-aviles/" },
    { image: MiguelV1, email: "miguel.navarro@tallanes.com", linkedin: "https://linkedin.com/in/miguel-navarro/" },
    { image: PedroV, email: "pedro@tallanes.com", linkedin: "https://linkedin.com/in/pedro-tallanes/" },
    { image: RicardoV, email: "ricardo@tallanes.com", linkedin: "https://linkedin.com/in/ricardo-tallanes/" },
    { image: RobertoV, email: "roberto@tallanes.com", linkedin: "https://linkedin.com/in/roberto-tallanes/" },
    { image: RuthV, email: "ruth@tallanes.com", linkedin: "https://linkedin.com/in/ruth-arevalo/" },
    { image: SegundoV, email: "segundo@tallanes.com", linkedin: "https://linkedin.com/in/segundo-tallanes/" },
    { image: WilliamV, email: "william@tallanes.com", linkedin: "https://linkedin.com/in/william-tallanes/" },
    { image: WilmerV, email: "wilmer@tallanes.com", linkedin: "https://linkedin.com/in/wilmer-tallanes/" },
  ];

  const productos = {
    Mango: {
      imagen: mangoImg,
      con: ["EEUU", "China", "Chile"],
      sin: ["Holanda", "Italia", "Rusia", "Canada", "Panama"],
    },
    Aguacate: {
      imagen: aguacateImg,
      con: ["EEUU", "Holanda", "Panama", "Rusia"],
      sin: ["Italia", "China", "Canada"],
    },
  };

  // Coordenadas por país (capitales o ciudades de referencia)
  const coords = {
    Lima: { lat: -12.0464, lng: -77.0428 },
    EEUU: { lat: 25.7617, lng: -80.1918 }, // Miami
    Estados_Unidos: { lat: 25.7617, lng: -80.1918 },
    China: { lat: 31.2304, lng: 121.4737 }, // Shanghai
    Chile: { lat: -33.4489, lng: -70.6693 }, // Santiago
    Holanda: { lat: 52.3676, lng: 4.9041 }, // Amsterdam
    "Países Bajos": { lat: 52.3676, lng: 4.9041 },
    Italia: { lat: 41.9028, lng: 12.4964 }, // Roma
    Rusia: { lat: 55.7558, lng: 37.6173 }, // Moscú
    Canada: { lat: 45.4215, lng: -75.6972 }, // Ottawa
    Canadá: { lat: 45.4215, lng: -75.6972 },
    Panama: { lat: 8.9824, lng: -79.5199 }, // Panamá
    Panamá: { lat: 8.9824, lng: -79.5199 },
  };

  const dotsMemo = (() => {
    const origen = coords.Lima;
    const lista = productos[productoConfirmado][tratamientoSeleccionado] || [];
    return lista
      .map((pais) => {
        const key = coords[pais] ? pais : (pais === "Estados Unidos" ? "Estados_Unidos" : pais);
        const destino = coords[key];
        if (!destino) return null;
        return { start: origen, end: destino };
      })
      .filter(Boolean);
  })();

  return (
    <>
      <Navbar />
      <Youtube />
      <WhatsApp />
      <div className="relative h-[35vh] md:min-h-screen overflow-hidden">
        {/* Video de fondo */}
        <video
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          src={videoTallanes}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>



      </div>

      {/* Sección Somos Tallanes */}
      <SomosTallanes />

      {/* Sección Cards Tallanes */}
      <CardsTallanes />

      {/* Sección Productos y Beneficios */}
      <ProductosYBeneficios />



      {/* WorldMap con UI superpuesta interactiva */}
      <div className="relative">
        {/* Tarjetas clicables (móvil: arriba estáticas; desktop: izquierda medio absolutas) */}
        <div className="mt-6 left-0 right-0 z-20 flex justify-center md:absolute md:left-8 md:right-auto md:justify-start md:top-1/2 md:-translate-y-1/2 md:mb-0">
          <div className="grid grid-cols-2 gap-2 w-[92vw] max-w-[380px] md:w-auto md:grid-cols-1 md:flex md:flex-col md:gap-3">
            {Object.keys(productos).map((nombre) => {
              const seleccionado = productoSeleccionado === nombre;
              return (
                <button
                  key={nombre}
                  onClick={() => setProductoSeleccionado(nombre)}
                  aria-pressed={seleccionado}
                  className={
                    `group w-full md:w-[200px] px-3 py-2 rounded-xl border transition-all duration-150 ease-out ` +
                    (seleccionado
                      ? "bg-white/95 border-sky-400 ring-2 ring-sky-300 shadow-xl"
                      : "bg-white/85 border-gray-200 hover:border-sky-300 hover:shadow-lg")
                  }
                >
                  <div className="flex items-center gap-3">
                    <img src={productos[nombre].imagen} alt={nombre} className="h-12 w-12 object-contain" />
                    <span className="font-semibold text-gray-800">{nombre}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <Suspense
          fallback={
            <div className="w-full aspect-[2/1] bg-gray-100 rounded-lg animate-pulse" />
          }
        >
          <WorldMap
            dots={dotsMemo}
            lineColor={tratamientoSeleccionado === "con" ? "#0ea5e9" : "#22c55e"}
            mapDotColor="#79716b" // Slate con transparencia
            mapBgColor="#f9fafb" // Gris muy claro
            mobileAspect="aspect-[3/2]"
            desktopAspect="md:aspect-[2/1]"
          />
        </Suspense>



        {/* Panel opciones (móvil: debajo del mapa; desktop: derecha medio) */}
        <div className="mt-2 mb-4 left-0 right-0 z-20 flex justify-center md:absolute md:right-8 md:left-auto md:justify-start md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:mt-0 md:mb-0">
          <div className="flex flex-col gap-3 w-[92vw] max-w-[360px] md:w-[320px]">
            {[
              { clave: "con", titulo: "Con tratamiento", lista: productos[productoSeleccionado].con },
              { clave: "sin", titulo: "Sin tratamiento", lista: productos[productoSeleccionado].sin },
            ].map(({ clave, titulo, lista }) => {
              const abierto = panelesAbiertos[clave];
              const seleccionado = tratamientoSeleccionado === clave;
              return (
                <div
                  key={clave}
                  className={
                    `rounded-xl border shadow-lg transition-colors duration-150 ` +
                    (seleccionado ? "bg-sky-50 border-sky-500 ring-2 ring-sky-400" : abierto ? "bg-white/95 border-sky-300" : "bg-white/85 border-gray-200")
                  }
                >
                  <button
                    onClick={() => {
                      // Selección exclusiva: abre el panel clicado y cierra el otro
                      setPanelesAbiertos({ con: clave === "con", sin: clave === "sin" });
                      setTratamientoSeleccionado(clave);
                      // Renderiza el mapa solo cuando se confirma la opción de tratamiento
                      setProductoConfirmado(productoSeleccionado);
                    }}
                    aria-selected={seleccionado}
                    aria-expanded={abierto}
                    className="flex items-center justify-between w-full px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`${seleccionado ? "bg-sky-500" : "bg-gray-300"} h-2 w-2 rounded-full`} />
                      <span className={seleccionado ? "font-semibold text-sky-700" : "font-semibold text-gray-800"}>{titulo}</span>
                    </div>
                    <svg
                      className={`h-4 w-4 ${seleccionado ? "text-sky-600" : "text-gray-600"} transition-transform ${abierto ? "rotate-180" : "rotate-0"}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className={`grid grid-cols-2 gap-2 px-3 pb-2 transition-[max-height,opacity] duration-200 ease-out ${abierto ? "max-h-[40vh] opacity-100 overflow-auto" : "max-h-0 opacity-0 overflow-hidden"}`}>
                    {lista.map((p) => (
                      <span key={p} className="inline-flex items-center justify-center rounded-md border border-sky-200 bg-sky-50 text-sky-700 px-2.5 py-1 text-xs font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Sección Contenedores Exportados */}
      <ProductosContadores />

      {/* Sección Certificaciones */}
      <Certificaciones />

      {/* Sección Aliados */}
      <Aliados />

      {/* Slider Equipo */}
      <section className="py-16">
        <h2 className="text-center text-3xl font-semibold text-slate-800">
          Nuestro equipo
        </h2>
        <SliderEquipo items={dataEquipo} />
      </section>


    </>
  );
}

export default App;
