import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CardsFlipStack({ items }) {
  const [cards, setCards] = useState(items);

  const handleSwipe = (offsetX) => {
    if (Math.abs(offsetX) > 120) {
      if (offsetX > 0) {
        // Deslizar a la derecha: mover la primera al final
        const first = cards[0];
        const newCards = cards.slice(1).concat(first);
        setCards(newCards);
      } else {
        // Deslizar a la izquierda: mover la última al principio
        const last = cards[cards.length - 1];
        const newCards = [last].concat(cards.slice(0, -1));
        setCards(newCards);
      }
    }
  };

  return (
    <div className="relative w-[380px] aspect-[3036/1917] mx-auto overflow-visible">
      <AnimatePresence>
          {cards.slice(0, 3).map((card, i) => {
            const isFront = i === 0;
            const isLeft = i === 1;
            const isRight = i === 2;

            return (
              <motion.div
                key={card.id}
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  zIndex: cards.length - i,
                  perspective: "1000px"
                }}

                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}

                onDragEnd={(e, info) => {
                  const offsetX = info.offset.x;
                  if (Math.abs(offsetX) > 120) {
                    card.exitX = offsetX > 0 ? 500 : -500;
                    handleSwipe(offsetX);
                  }
                }}

                initial={false}

                animate={
                  isFront 
                    ? { 
                        x: 0, 
                        rotateY: 0, 
                        scale: 1, 
                        opacity: 1,
                        transition: { 
                          duration: 0.6,
                          ease: "easeInOut"
                        }
                      }
                    : isLeft
                    ? { 
                        x: -140, 
                        rotateY: 180, 
                        scale: 0.85, 
                        opacity: 0.7,
                        transition: { 
                          duration: 0.6,
                          ease: "easeInOut"
                        }
                      }
                    : { 
                        x: 140, 
                        rotateY: 180, 
                        scale: 0.85, 
                        opacity: 0.7,
                        transition: { 
                          duration: 0.6,
                          ease: "easeInOut"
                        }
                      }
                }

                exit={
                  isFront
                    ? {
                        x: card.exitX,
                        opacity: 0,
                        rotate: card.exitX > 0 ? 15 : -15,
                        transition: { duration: 0.35 },
                      }
                    : {}
                }
              >
                <div 
                  className="w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFront ? "rotateY(0deg)" : "rotateY(180deg)"
                  }}
                >
                  {/* Cara frontal (vista principal) */}
                  <div 
                    className="absolute inset-0 bg-white rounded-xl p-3 shadow-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden"
                    }}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={card.img}
                        alt=""
                        className="w-full h-full object-cover rounded-lg pointer-events-none"
                      />
                      {/* Overlay negro solo para cards laterales */}
                      {!isFront && (
                        <div className="absolute inset-0 bg-black/60 rounded-lg"></div>
                      )}
                    </div>
                  </div>

                  {/* Cara posterior (vista lateral) */}
                  <div 
                    className="absolute inset-0 bg-white rounded-xl p-3 shadow-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={card.img}
                        alt=""
                        className="w-full h-full object-cover rounded-lg pointer-events-none"
                      />
                      {/* Overlay negro solo para cards laterales */}
                      {!isFront && (
                        <div className="absolute inset-0 bg-black/60 rounded-lg"></div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    );
  }