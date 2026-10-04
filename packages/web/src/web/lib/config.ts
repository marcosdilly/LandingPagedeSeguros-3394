// Edite aqui os dados do seu negócio.
export const SITE = {
  brand: "Rota Segura",
  // Número do WhatsApp com DDI + DDD, somente dígitos. Ex.: 5511999999999
  whatsapp: "5531982830303",
  whatsappMessage: "Olá! Quero uma cotação de seguro para meu veículo.",
  email: "contato@rotasegura.com.br",
  cnpj: "00.000.000/0001-00",
};

export function waLink(message = SITE.whatsappMessage) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const INSURERS = [
  { name: "APVS Brasil", src: "/logos/apvs.png", dark: true },
  { name: "Loovi", src: "/logos/loovi.png" },
  { name: "Porto Seguro", src: "/logos/porto.png" },
  { name: "Allianz", src: "/logos/allianz.png" },
  { name: "Bradesco Seguros", src: "/logos/bradesco.png" },
  { name: "Tokio Marine", src: "/logos/tokio.png" },
  { name: "Azul Seguros", src: "/logos/azul.png" },
  { name: "HDI Seguros", src: "/logos/hdi.png" },
  { name: "Mapfre", src: "/logos/mapfre.png" },
  { name: "SulAmérica", src: "/logos/sulamerica.png" },
];
