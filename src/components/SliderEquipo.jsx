import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_ITEMS = [
  {
    image: "https://picsum.photos/seed/equipo-1/1400/1800",
    linkedin: "https://www.linkedin.com/",
    email: "mailto:equipo1@example.com",
  },
  {
    image: "https://picsum.photos/seed/equipo-2/1400/1800",
    linkedin: "https://www.linkedin.com/",
    email: "mailto:equipo2@example.com",
  },
  {
    image: "https://picsum.photos/seed/equipo-3/1400/1800",
    linkedin: "https://www.linkedin.com/",
    email: "mailto:equipo3@example.com",
  },
  {
    image: "https://picsum.photos/seed/equipo-4/1400/1800",
    linkedin: "https://www.linkedin.com/",
    email: "mailto:equipo4@example.com",
  },
];

function SliderEquipo({
  items = DEFAULT_ITEMS,
  autoPlayInterval = 4000,
  curvature = 14,
  depth = 140,
  cardWidth = 280,
  visibleSlides = 5,
}) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const isInteractingRef = useRef(false);
  const hasMultipleItems = items.length > 1;

  const validItems = useMemo(() => (items && items.length ? items : DEFAULT_ITEMS), [items]);

  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!hasMultipleItems || autoPlayInterval <= 0) {
      intervalRef.current = null;
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % validItems.length);
    }, autoPlayInterval);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayInterval, validItems.length, hasMultipleItems]);

  const handleMouseEnter = () => {
    isInteractingRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    isInteractingRef.current = false;
    startAutoPlay();
  };

  const handlePrev = () => {
    isInteractingRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrent((prev) => (prev - 1 + validItems.length) % validItems.length);
  };

  const handleNext = () => {
    isInteractingRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrent((prev) => (prev + 1) % validItems.length);
  };

  const perspective = 1400;
  const baseHeight = Math.round((cardWidth * 18) / 14);

  return (
    <div
      className="w-full flex justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative w-full max-w-[960px] h-[420px] md:h-[520px]"
        style={{ perspective: `${perspective}px` }}
      >
        {validItems.map((item, index) => {
          const total = validItems.length;
          let offset = index - current;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;
          const absOffset = Math.abs(offset);
          const windowSize = Math.min(visibleSlides, total);
          const halfWindow = Math.floor(windowSize / 2);

          if (total > windowSize && absOffset > halfWindow) {
            return null;
          }

          const translateX = offset * (cardWidth * 0.7);
          const translateZ = -absOffset * depth;
          const rotateY = offset * curvature;
          const opacity = Math.max(0, 1 - absOffset * 0.22);
          const scale = 1 - absOffset * 0.05;

          return (
            <article
              key={`${item.image}-${index}`}
              className="absolute left-1/2 top-1/2 origin-center transition-transform duration-500 ease-out will-change-transform"
              style={{
                width: `${cardWidth}px`,
                height: `${baseHeight}px`,
                transform: `translate3d(-50%, -50%, 0) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex: Math.round(100 - absOffset * 10),
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[24px] shadow-xl shadow-black/20">
                <img
                  src={item.image}
                  alt="Miembro del equipo"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {(item.linkedin || item.email) && (
                  <div className="absolute right-3 top-3 flex flex-col gap-2">
                    {item.linkedin && (
                      <a
                        href={item.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-10 w-10 place-items-center rounded-full bg-[#0A66C2] text-white text-base font-semibold"
                        aria-label="Abrir perfil de LinkedIn"
                      >
                        in
                      </a>
                    )}
                    {item.email && (
                      <a
                        href={item.email.startsWith("mailto:") ? item.email : `mailto:${item.email}`}
                        className="grid h-10 w-10 place-items-center rounded-full bg-[#AFC338] text-white"
                        aria-label="Enviar correo electrónico"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}

        {hasMultipleItems && (
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
            {validItems.map((_, index) => (
              <button
                key={`indicator-${index}`}
                type="button"
                className={`h-2.5 rounded-full transition-all ${
                  index === current ? "w-8 bg-[#AFC338]" : "w-3 bg-slate-300"
                }`}
                onClick={() => setCurrent(index)}
                aria-label={`Mostrar miembro ${index + 1}`}
              />
            ))}
          </div>
        )}

        {hasMultipleItems && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-md transition hover:bg-white"
              aria-label="Mostrar anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-slate-700"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-md transition hover:bg-white"
              aria-label="Mostrar siguiente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-slate-700"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SliderEquipo;
