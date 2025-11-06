import { useEffect, useRef, useState } from "react";
import mangoContenedor from "../assets/images/productos/Mango.png";
import paltaContenedor from "../assets/images/productos/Palta.png";
import bgContenedores from "../assets/images/contenedores.png";

function useCountUp(target = 0, { duration = 1500, startOnView = true } = {}) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!startOnView) {
      startAnimation(target, duration, setValue);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          startAnimation(target, duration, setValue);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, startOnView]);

  return { ref, value };
}

function startAnimation(target, duration, setValue) {
  const startTime = performance.now();
  const startVal = 0;
  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.round(startVal + (target - startVal) * eased);
    setValue(val);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function ProductosContadores({ mangoCount = 480, paltaCount = 100 }) {
  const mango = useCountUp(mangoCount);
  const palta = useCountUp(paltaCount);

  return (
    <section
      id="seccion-contador"
      className="bg-cover bg-center mb-8"
      style={{ backgroundImage: `url(${bgContenedores})` }}
    >
      <div className="w-[90%] mx-auto">
        <h3 className="text-white text-center font-semibold text-2xl pt-8 md:text-[2.5rem] sm:pt-6 md:mt-6">CONTENEDORES EXPORTADOS</h3>

        <div className="flex justify-between items-center gap-4 md:flex-col md:items-start  md:pl-10 lg:pl-16">
          {/* Mango */}
          <div
            ref={mango.ref}
            className=" md:w-full flex justify-start items-center h-[220px] md:h-[220px] text-left"
          >
            <img
              src={mangoContenedor}
              alt="Mango contenedor"
              className="w-[60px] md:w-[90px] mr-4 md:mr-5"
            />
            <h2
              className="text-white font-bold leading-none text-[52px] md:text-[96px]"
              data-count={mangoCount}
            >
              {mango.value}
            </h2>
          </div>

          {/* Palta */}
          <div
            ref={palta.ref}
            className=" md:w-full flex justify-end md:justify-start items-center h-[220px] md:h-[220px] text-right md:text-left"
          >
            <img
              src={paltaContenedor}
              alt="Palta contenedor"
              className="w-[60px] md:w-[90px] mr-4 md:mr-5"
            />
            <h2
              className="text-white font-bold leading-none text-[52px] md:text-[96px]"
              data-count={paltaCount}
            >
              {palta.value}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}