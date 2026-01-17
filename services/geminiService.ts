
import { GoogleGenAI, Type } from '@google/genai';
import { AppSection, AICoachResponse } from '../types';

export const getProfessionalAdvice = async (section: AppSection, query: string): Promise<AICoachResponse> => {
  // Use import.meta.env for Vite environment variables
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("API Key não configurada");
    return {
      advice: "Configuração necessária: adicione VITE_GEMINI_API_KEY nas variáveis de ambiente.",
      tips: ["Configure a API key do Gemini", "Reinicie o servidor de desenvolvimento"],
      suggestedDrills: []
    };
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstructions = {
    [AppSection.ESCOLAR]: "Você é um especialista em Educação Física Escolar focado na BNCC. Forneça conselhos pedagógicos, dicas de manejo de turma e sugestões de atividades.",
    [AppSection.MUSCULACAO]: "Você é um mestre em Musculação e Biomecânica. Forneça conselhos técnicos, dicas de segurança e sugestões de exercícios.",
    [AppSection.NATACAO]: "Você é um treinador de Natação de alto nível. Forneça conselhos técnicos sobre nados, segurança aquática e treinos específicos.",
    [AppSection.CORRIDA]: "Você é um treinador de corrida e endurance. Forneça conselhos sobre pace, técnica de corrida e planilhas.",
    [AppSection.TRIATHLON]: "Você é um treinador de Triathlon de elite. Forneça conselhos sobre treinos combinados (bricks), transições T1 e T2, e gestão de esforço em natação, ciclismo e corrida.",
    [AppSection.DOCUMENTOS]: "Você é um gestor de projetos esportivos e especialista em documentação técnica. Forneça conselhos sobre organização, leis de incentivo, marketing esportivo e redação de documentos científicos.",
    [AppSection.NUTRICAO]: "Você é um nutricionista desportivo. Forneça conselhos gerais sobre alimentação para performance, respeitando os limites éticos da profissão.",
    [AppSection.HYROX]: "Você é um coach especializado em Hyrox. Forneça conselhos sobre transições, potência e resistência específica para a prova.",
    [AppSection.HOME]: "Você é o consultor principal da ASANTOS DESPORTO. Ajude o profissional de educação física em qualquer área de atuação."
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: query,
      config: {
        systemInstruction: systemInstructions[section] || systemInstructions[AppSection.HOME],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: { 
              type: Type.STRING, 
              description: "Conselho principal ou resposta direta à pergunta." 
            },
            tips: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Lista de 3 a 5 dicas rápidas e práticas."
            },
            suggestedDrills: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Lista de exercícios ou atividades práticas sugeridas."
            }
          },
          required: ["advice", "tips"]
        }
      }
    });

    const text = response.text || '{}';
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return {
      advice: "O sistema de IA está temporariamente indisponível. Por favor, tente novamente em instantes.",
      tips: ["Verifique sua conexão", "Tente uma pergunta mais simplificada"],
      suggestedDrills: []
    };
  }
};
