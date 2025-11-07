import Marquee from "react-fast-marquee";

import aphis from "../assets/images/certificaciones/aphis.png";
import brc from "../assets/images/certificaciones/brc.png";
import fsma from "../assets/images/certificaciones/fsma.png";
import globalgap from "../assets/images/certificaciones/globalgap.png";
import grasp from "../assets/images/certificaciones/grasp.png";
import haccp from "../assets/images/certificaciones/haccp.png";
import organico from "../assets/images/certificaciones/organico.png";
import organicoeuropa from "../assets/images/certificaciones/organicoeuropa.png";
import primus from "../assets/images/certificaciones/primus.png";
import smeta from "../assets/images/certificaciones/smeta.png";
import walmart from "../assets/images/certificaciones/walmart.png";

const logos = [
  { src: aphis, alt: "APHIS" },
  { src: brc, alt: "BRC" },
  { src: fsma, alt: "FSMA" },
  { src: globalgap, alt: "GlobalG.A.P." },
  { src: grasp, alt: "GRASP" },
  { src: haccp, alt: "HACCP" },
  { src: organico, alt: "Orgánico" },
  { src: organicoeuropa, alt: "Orgánico Europa" },
  { src: primus, alt: "Primus" },
  { src: smeta, alt: "SMETA" },
  { src: walmart, alt: "Walmart" },
];

export default function Certificaciones() {
  return (
    <section className="py-6 md:pb-10 md:pt-6">
      <div className="w-full mx-auto px-4">
        <h3 className="text-center text-gray-800 font-semibold text-xl md:text-3xl mb-4 md:mb-8">
         Nuestras Certificaciones
        </h3>
        <div className="rounded-xl bg-white  py-4">
          <Marquee
            pauseOnHover
            gradient={false}
            speed={40}
            className="[--duration:40s]"
          >
            {logos.map((logo, i) => (
              <div key={i} className="mx-6 md:mx-10 flex items-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 md:h-20 object-contain opacity-85 hover:opacity-100 transition"
                  draggable={false}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}