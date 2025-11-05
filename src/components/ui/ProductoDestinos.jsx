import React from "react";

export default function ProductoDestinos({
  nombre,
  imagen,
  paisesConTratamiento = [],
  paisesSinTratamiento = [],
  overlay = false,
  imageClass = "",
  panelsClass = "",
}) {
  // Panel reusable
  const Panel = ({ titulo, lista }) => (
    <div className="bg-black text-white rounded-xl shadow-lg p-5 min-w-[220px]">
      <h4 className="font-bold text-lg mb-4">{titulo}</h4>
      {lista.length === 0 ? (
        <p className="text-sm text-gray-300">Sin países configurados</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {lista.map((p) => (
            <span
              key={p}
              className="inline-flex items-center justify-center rounded-md border border-sky-500 text-sky-400 px-2 py-1 text-xs bg-black/50"
            >
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (overlay) {
    return (
      <>
        {/* Imagen overlay */}
        <div className={`absolute ${imageClass} z-20`}>
          <img src={imagen} alt={nombre} className="h-40 sm:h-48 object-contain" />
        </div>
        {/* Paneles overlay */}
        <div className={`absolute ${panelsClass} z-20 flex flex-col gap-4 sm:gap-6 w-[260px] sm:w-[300px]`}>
          <Panel titulo="Con tratamiento hidrotermico" lista={paisesConTratamiento} />
          <Panel titulo="Sin tratamiento hidrotermico" lista={paisesSinTratamiento} />
        </div>
      </>
    );
  }

  // Modo seccional normal
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden flex items-center justify-center p-6">
            <img src={imagen} alt={nombre} className="max-h-64 object-contain" />
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Panel titulo="Con tratamiento hidrotermico" lista={paisesConTratamiento} />
            <Panel titulo="Sin tratamiento hidrotermico" lista={paisesSinTratamiento} />
          </div>
        </div>
        <div className="mt-4">
          <span className="inline-flex items-center rounded-full bg-tallanes text-white px-3 py-1 text-sm font-semibold shadow">
            {nombre}
          </span>
        </div>
      </div>
    </section>
  );
}