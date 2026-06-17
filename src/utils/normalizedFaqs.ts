import { Faqs } from "./faqs";

export const normalizedFaqs = Faqs.map((faq) => ({
  pergunta: faq.pergunta ?? (faq as any).question ?? (faq as any).title3,

  resposta: faq.resposta ?? (faq as any).answer ?? (faq as any).content,
}));
