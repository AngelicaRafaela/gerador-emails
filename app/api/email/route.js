import { SYSTEM_PROMPT } from "@/lib/prompt";

export const maxDuration = 60;
const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";
const MAX = 8000;

async function tratar(req) {
  const code = process.env.ACCESS_CODE;
  if (code && req.headers.get("x-access-code") !== code) {
    return Response.json({ error: "Código de acesso inválido." }, { status: 401 });
  }
  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ error: "GEMINI_API_KEY não configurada no servidor." }, { status: 500 });
  }

  const b = await req.json().catch(() => ({}));
  const clip = (s) => String(s || "").trim().slice(0, MAX);
  let prompt;

  if (b.acao === "responder") {
    if (!clip(b.original) || !clip(b.diretrizes))
      return Response.json({ error: "Informe o e-mail original e as diretrizes." }, { status: 400 });
    prompt = `Ação: Responder E-mail\nDiretrizes da resposta: ${clip(b.diretrizes)}\nE-mail Original: "${clip(b.original)}"`;
  } else {
    if (!clip(b.topicos))
      return Response.json({ error: "Informe o assunto ou os tópicos." }, { status: 400 });
    prompt = `Ação: Criar E-mail\nDestinatário: ${clip(b.destinatario) || "Não informado"}\nAssunto / Tópicos a abordar: ${clip(b.topicos)}`;
  }

  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4 },
      }),
    }
  );
  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    return Response.json({ error: data?.error?.message || "Falha ao consultar o Gemini." }, { status: 502 });
  }
  const texto = (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("").trim();
  if (!texto) return Response.json({ error: "O modelo não retornou texto. Tente reformular." }, { status: 502 });
  return Response.json({ texto });
}
export async function POST(req) {
  try {
    return await tratar(req);
  } catch (e) {
    return Response.json({ error: "Erro interno: " + (e?.message || e) }, { status: 500 });
  }
}