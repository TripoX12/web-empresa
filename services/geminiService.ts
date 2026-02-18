import { GoogleGenAI, Chat } from "@google/genai";
import { SCAM_DATABASE, METHODS_DATABASE, BLOG_DATABASE } from "../data";

// --- CONTEXTO EXISTENTE (ChatBot) ---
const SITE_CONTEXT = `
DATOS DE LA WEB (Gana Dinero Hispano):

1. BASE DE DATOS DE AUDITORÍA (Estafas y Sitios):
${SCAM_DATABASE.map(s => `- Nombre: ${s.name} | Estado: ${s.status} | ID: ${s.id} | Link: [#scam-${s.id}]`).join('\n')}

2. MÉTODOS Y CURSOS DISPONIBLES EN EL DIRECTORIO:
${METHODS_DATABASE.map(m => `- Nombre: ${m.name} | Categoría: ${m.category} | Es Premium: ${m.isPremium ? 'SÍ (Pago)' : 'NO (Gratis)'} | ID: ${m.id} | Link: [#method-${m.id}]`).join('\n')}

3. GUÍAS DEL BLOG:
${BLOG_DATABASE.map(b => `- Título: ${b.title} | Es Premium: ${b.isPremium ? 'SÍ' : 'NO'} | Link: [#blog-${b.id}]`).join('\n')}
`;

export const analyzeSiteRisk = async (siteNameOrUrl: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analiza el sitio "${siteNameOrUrl}" brevemente.
      Contexto: Auditoría de seguridad para ganar dinero online.
      
      Reglas:
      1. Si es Venta de Reseñas, Cuentas o Airdrops -> ES LEGÍTIMO (Grey Hat).
      2. Si es Ponzi/Inversión con retorno fijo -> ES SCAM.
      
      Responde en 3 líneas máximo. Formato Markdown.`,
      config: {
        temperature: 0.3,
      }
    });

    return response.text || "Sin datos suficientes.";
  } catch (error) {
    console.error("Error analyzing site:", error);
    return "Error de conexión con la IA.";
  }
};

export const createChatSession = (): Chat => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      temperature: 0.4, 
      systemInstruction: `Eres "Neo", el Auditor Jefe de GDH.
      
      OBJETIVO: Ser un filtro eficiente. Guía al usuario a LA MEJOR opción específica.

      CONTEXTO DE DATOS:
      ${SITE_CONTEXT}

      REGLAS DE FORMATO (CRÍTICO):
      1. **Brevedad:** 1 o 2 frases máximo.
      2. **Chips de Decisión:** Si necesitas filtrar, usa: ||OPTIONS: ["Opción A", "Opción B"]||
      3. **ENLACES ESPECÍFICOS:**
         - Cuando recomiendes algo, NO uses enlaces genéricos como #directory.
         - USA EL LINK EXACTO DEL CONTEXTO (ej: [Ver Curso](#method-1) o [Ver Ficha](#scam-s1)).
         - Esto es vital para que la web resalte el elemento al usuario.

      EJEMPLOS:

      Usuario: "Recomiéndame un curso gratis"
      Neo: La mejor opción verificada para empezar sin inversión es el testeo de webs.
      [Ver UserTesting](#method-1)

      Usuario: "¿OmegaPro es real?"
      Neo: No. Es una estafa Ponzi confirmada. Aquí tienes el reporte oficial.
      [Ver Reporte OmegaPro](#scam-s1)

      Usuario: "Quiero invertir"
      Neo: ¿Qué perfil de inversión buscas?
      ||OPTIONS: ["Cripto Activo (Trading)", "Cripto Pasivo (Earn)", "Negocio Digital"]||
      `,
    },
  });
};

// --- NUEVA LÓGICA DE IMAGEN INTELIGENTE (GDH Studio) ---

export const generateMarketingImage = async (
  userPrompt: string, 
  styleKeywords: string, 
  aspectRatio: string
): Promise<{ imageUrl: string; enhancedPrompt: string }> => {
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // PASO 1: Mejorar el prompt con IA de texto (El "Cerebro")
    // Usamos gemini-3-flash para rapidez en la reescritura
    const enhancerResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `ACT AS: World-class AI Art Prompt Engineer (Midjourney v6/DALL-E 3 expert).
        
        TASK: Rewrite the user's request into a single, highly detailed English prompt optimized for the Gemini Image Generation model.
        
        INPUT CONCEPT: "${userPrompt}"
        MANDATORY VISUAL STYLE: "${styleKeywords}"
        
        GUIDELINES:
        1. Start with the main subject clearly.
        2. Integrate the MANDATORY VISUAL STYLE naturally but forcefully (e.g., if it says "3D", mention "Octane Render, Unreal Engine 5, Raytracing").
        3. Define lighting (e.g., "Volumetric lighting, cinematic studio lights").
        4. Define quality (e.g., "8k resolution, highly detailed, sharp focus, masterpiece").
        5. DO NOT include "Here is the prompt" or quotes. Just output the raw prompt string.
        
        OUTPUT PROMPT ONLY:`,
    });

    const enhancedPrompt = enhancerResponse.text?.trim() || `${userPrompt}, ${styleKeywords}, 8k, high quality`;

    // PASO 2: Generar la imagen usando el prompt mejorado (El "Motor")
    // Usamos gemini-3-pro-image-preview para MÁXIMA calidad (soporta 1K)
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          { text: enhancedPrompt }
        ]
      },
      config: {
        imageConfig: {
            aspectRatio: aspectRatio as "1:1" | "3:4" | "4:3" | "9:16" | "16:9",
            imageSize: "1K" // Force high quality
        }
      }
    });

    // Iteramos para encontrar la parte de imagen
    // La respuesta puede contener texto o imagen, buscamos inlineData
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
                const base64String = part.inlineData.data;
                // Detectar mimeType si viene, sino asumir png
                const mimeType = part.inlineData.mimeType || 'image/png';
                return {
                    imageUrl: `data:${mimeType};base64,${base64String}`,
                    enhancedPrompt: enhancedPrompt
                };
            }
        }
    }

    throw new Error("La IA no devolvió datos de imagen válidos.");

  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};