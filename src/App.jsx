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
const WorldMap = lazy(() => import("./components/ui/world-map"));
import ProductoDestinos from "./components/ui/ProductoDestinos";
import mangoImg from "./assets/images/productos/Mango.png";
import aguacateImg from "./assets/images/productos/Palta.png";

function App() {
  const [count, setCount] = useState(0);
  // Estado de selección y paneles
  const [productoSeleccionado, setProductoSeleccionado] = useState("Mango");
  const [panelesAbiertos, setPanelesAbiertos] = useState({ con: true, sin: false });
  // Estado confirmado para render del mapa y opción
  const [productoConfirmado, setProductoConfirmado] = useState("Mango");
  const [tratamientoSeleccionado, setTratamientoSeleccionado] = useState("con");

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
        <Suspense
          fallback={
            <div className="w-full aspect-[2/1] bg-gray-100 rounded-lg animate-pulse" />
          }
        >
          <WorldMap dots={dotsMemo} lineColor={tratamientoSeleccionado === "con" ? "#0ea5e9" : "#22c55e"} />
        </Suspense>

        {/* Tarjetas clicables (izquierda) */}
        <div className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          {Object.keys(productos).map((nombre) => {
            const seleccionado = productoSeleccionado === nombre;
            return (
              <button
                key={nombre}
                onClick={() => setProductoSeleccionado(nombre)}
                aria-pressed={seleccionado}
                className={
                  `group w-[170px] sm:w-[200px] px-3 py-2 rounded-xl border transition-all duration-150 ease-out ` +
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

        {/* Panel derecho (reutilizable y desplegable) */}
        <div className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 w-[280px] md:w-[320px]">
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
                  className="flex items-center justify-between w-full px-4 py-3"
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
                <div className={`grid grid-cols-2 gap-2 px-4 pb-4 transition-[max-height,opacity] duration-200 ease-out ${abierto ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
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
    </>
  );
}

export default App;
