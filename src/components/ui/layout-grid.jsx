"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);

  const handleClick = (card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-10 max-w-7xl mx-auto relative">
      {/* Contenedor principal con el diseño 2-1 */}
      <div className="max-w-5xl mx-auto">
        {/* Fila superior - 2 tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {cards.slice(0, 2).map((card, i) => (
            <div key={i} className="h-44">
              <motion.div
                onClick={() => handleClick(card)}
                className={cn(
                  "relative overflow-hidden cursor-pointer h-full rounded-2xl shadow-lg",
                  selected?.id === card.id
                    ? "fixed inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center"
                    : lastSelected?.id === card.id
                    ? "z-40 bg-white"
                    : "bg-white"
                )}
                layoutId={`card-${card.id}`}
              >
                {selected?.id === card.id && (
                  <SelectedCard selected={selected} />
                )}
                <ImageComponent
                  card={card}
                  isSelected={selected?.id === card.id}
                />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Fila inferior - 1 tarjeta centrada */}
        {cards.length > 2 && (
          <div className="flex justify-center">
            <div className="w-full h-64">
              <motion.div
                onClick={() => handleClick(cards[2])}
                className={cn(
                  "relative overflow-hidden cursor-pointer h-full rounded-2xl shadow-lg",
                  selected?.id === cards[2].id
                    ? "fixed inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center"
                    : lastSelected?.id === cards[2].id
                    ? "z-40 bg-white"
                    : "bg-white"
                )}
                layoutId={`card-${cards[2].id}`}
              >
                {selected?.id === cards[2].id && (
                  <SelectedCard selected={selected} />
                )}
                <ImageComponent
                  card={cards[2]}
                  isSelected={selected?.id === cards[2].id}
                />
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay para cerrar modal */}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "fixed inset-0 z-10 pointer-events-none",
          selected?.id && "pointer-events-auto"
        )}
        initial={{
          backdropFilter: "blur(0px)",
          backgroundColor: "rgba(0,0,0,0)",
        }}
        animate={{
          backdropFilter: selected?.id ? "blur(4px)" : "blur(0px)",
          backgroundColor: selected?.id ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)",
        }}
      />
    </div>
  );
};

const ImageComponent = ({ card, isSelected }) => {
  return (
    <>
      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.thumbnail}
        height="500"
        width="500"
        className={cn(
          "object-cover object-center absolute inset-0 h-full w-full transition duration-200"
        )}
        alt="thumbnail"
      />
      {/* Overlay oscuro - solo visible cuando NO está seleccionada */}
      {!isSelected && (
        <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-60 transition-all duration-300"></div>
      )}
      {/* Título sobre el overlay - solo visible cuando NO está seleccionada */}
      {!isSelected && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 drop-shadow-lg">
            {card.title}
          </h3>
        </div>
      )}
    </>
  );
};

const SelectedCard = ({ selected }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
