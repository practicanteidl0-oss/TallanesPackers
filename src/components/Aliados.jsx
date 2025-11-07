import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import productorImg from "../assets/images/aliados/productor.jpg";
import exportadorImg from "../assets/images/aliados/exportador.jpg";
import importadorImg from "../assets/images/aliados/importador.jpg";

export default function Aliados() {
  const aliados = [
    {
      name: "Importador",
      src: importadorImg,
      description:
        "Si eres un socio comercial del extranjero, y deseas un socio serio y formal en Perú, nosotros como Tallanes podemos proveerte, directamente o a través de asociaciones que nosotros mismos fomentamos, constituimos y asesoramos, y un equipo dedicado a fomentar la calidad exportadora peruana, fruta con garantías de calidad y rastreabilidad real en campo, dándote la seguridad del mejor retorno posible en tu operación.",
    },
    {
      name: "Exportador",
      src: exportadorImg,
      description:
        "Si ya eres parte de la cadena exportadora, y necesitas un aliado estratégico (que permanezca perennemente en nuestro Valle de San Lorenzo) que te provea de fruta de calidad, nuestra división agrícola y comercial dispondrá para ti, fruta con garantías de calidad y rastreabilidad real en campo, dándote la seguridad del mejor retorno posible en tu operación.",
    },
    {
      name: "Productor",
      src: productorImg,
      description:
        "Si deseas ser parte de la cadena exportadora, fomentamos tu asociatividad, asesorándote en la constitución de tu empresa, ya sea individual o en conjunto con otros agricultores (contamos con oficina comercial y legal en Lima), y ofreciéndote un mercado asegurado en el extranjero, y sobretodo, facilidades crediticias en los insumos necesarios para la exportación; asimismo, nuestra división agrícola estará presta a asesorarte y asistirte en la implementación de buenas prácticas agrícolas, asegurando así la mejor calidad posible, que asegurará mejores retornos en precios del exterior.",
    },
  ];

  return (
    <section className="py-10 md:py-10">
      <div className="max-w-5xl mx-auto px-4 md:px-0">
        <h3 className="text-center text-gray-800 font-semibold text-2xl md:text-3xl mb-8">
          Aliados
        </h3>
        <Tabs defaultValue="Productor" className="w-full">
          <div className="flex justify-start">
            <TabsList className="flex gap-2">
              {aliados.map(({ name }) => (
                <TabsTrigger
                  key={name}
                  value={name}
                  className=" md:px-6 py-[2px] text-base md:text-lg border border-transparent data-[state=active]:border-tallanes-500 data-[state=active]:bg-tallanes-500 data-[state=active]:text-white rounded-2xl"
                >
                  {name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {aliados.map(({ name, src, description }) => (
            <TabsContent key={name} value={name}>
              <div className="relative w-full h-[30rem] rounded-lg overflow-hidden">
                <img
                  src={src}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-end">
                  <div className="text-white max-w-[88%] md:max-w-[42%] p-4 md:p-6">
                    <h4 className="text-xl md:text-2xl font-semibold mb-2">{name}</h4>
                    <p className="text-xs md:text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}