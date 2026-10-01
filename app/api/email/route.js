import { SYSTEM_PROMPT } from "@/lib/prompt";
import { modeloCriar, modeloResponder, temLacunas } from "@/lib/modelo";

export const maxDuration = 60;

// Modelo principal + reservas (troque pelas variáveis de ambiente na Vercel, sem mexer no código)
const MODELOS = [
  process.env.GEMINI_MODEL || "gemini-3.8-flash",
  ...(process.env.GEMINI_FALLBACK_MODELS || "gemini-3.5-flash,gemini-3.5-flash-lite")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
];
const MAX = 8000;
const TRANSIENTES = [429, 500, 502, 503, 504];
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

async function chamar(modelo, prompt) {
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4 },
      }),
      signal: AbortSignal.timeout(12000),
    }
  );
  const data = await r.json().catch(() => ({}));
  return { status: r.status, ok: r.ok, data };
}

// Devolve o texto gerado pela IA ou null se todos os modelos falharem
async function consultar(prompt) {
  const inicio = Date.now();
  for (const modelo of MODELOS) {
    for (let tentativa = 0; tentativa < 2; tentativa++) {
      if (Date.now() - inicio > 40000) return null; // margem para o limite da função
      try {
        const { status, ok, data } = await chamar(modelo, prompt);
        if (ok) {
          const texto = (data.candidates?.[0]?.content?.parts || [])
            .map((p) => p.text || "")
            .join("")
            .trim();
          if (texto) return texto;
          break; // resposta vazia: próximo modelo
        }
        console.error(`Gemini ${modelo} falhou (${status}):`, data?.error?.message);
        if (!TRANSIENTES.includes(status)) break; // erro permanente: próximo modelo
      } catch (e) {
        console.error(`Gemini ${modelo} erro de rede/tempo:`, e?.message || e);
      }
      if (tentativa === 0) await espera(1500);
    }
  }
  return null;
}

async function tratar(req) {
  const code = process.env.ACCESS_CODE;
  if (code && req.headers.get("x-access-code") !== code) {
    return Response.json({ error: "Código de acesso inválido." }, { status: 401 });
  }

  const b = await req.json().catch(() => ({}));
  const clip = (s) => String(s || "").trim().slice(0, MAX);
  const responder = b.acao === "responder";
  let prompt;

  if (responder) {
    if (!clip(b.original) || !clip(b.diretrizes))
      return Response.json({ error: "Informe o e-mail original e as diretrizes." }, { status: 400 });
    prompt = `Ação: Responder E-mail\nDiretrizes da resposta: ${clip(b.diretrizes)}\nE-mail Original: "${clip(b.original)}"`;
  } else {
    if (!clip(b.topicos))
      return Response.json({ error: "Informe o assunto ou os tópicos." }, { status: 400 });
    prompt = `Ação: Criar E-mail\nDestinatário: ${clip(b.destinatario) || "Não informado"}\nAssunto / Tópicos a abordar: ${clip(b.topicos)}`;
  }

  // 1) IA (com nova tentativa e modelos de reserva)
  const texto = process.env.GEMINI_API_KEY ? await consultar(prompt) : null;
  if (texto) return Response.json({ texto });

  // 2) Plano B: monta o e-mail a partir do banco de modelos, sem IA
  const alt = responder
    ? modeloResponder({ original: clip(b.original), diretrizes: clip(b.diretrizes) })
    : modeloCriar({ destinatario: clip(b.destinatario), topicos: clip(b.topicos) });

  return Response.json({
    texto: alt.texto,
    aviso:
      `A IA está indisponível no momento. Este e-mail foi montado automaticamente a partir de um ${alt.origem}, sem IA.` +
      (temLacunas(alt.texto) ? " Preencha os campos entre colchetes e revise antes de enviar." : " Revise antes de enviar."),
  });
}

export async function POST(req) {
  try {
    return await tratar(req);
  } catch (e) {
    return Response.json({ error: "Erro interno: " + (e?.message || e) }, { status: 500 });
  }
}