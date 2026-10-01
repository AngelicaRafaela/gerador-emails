import banco from "./banco_de_e_mails_corporativos";

// ---------- utilidades ----------
const norm = (s) =>
  String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function linhas(txt) {
  return String(txt || "")
    .split(/\r?\n|;/)
    .map((s) => s.replace(/^[-•*\d.)\s]+/, "").trim())
    .filter(Boolean);
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Palavras-chave (sem acento) por id do banco de e-mails
const PALAVRAS = {
  1: ["reuniao", "alinhamento", "videoconferencia", "agendar reuniao", "marcar reuniao"],
  2: ["ata", "resumo da reuniao", "registro da reuniao"],
  3: ["reagend", "remarc", "adiar reuniao", "nao poderei comparecer"],
  4: ["apresentacao de resultados", "resultados do trimestre", "conselho", "diretoria"],
  5: ["apresentacao institucional", "parceria", "prospect", "nos apresentar"],
  6: ["proposta comercial", "enviar proposta", "envio de proposta", "orcamento"],
  7: ["acompanhamento", "follow", "retorno da proposta", "sem resposta", "proposta enviada"],
  8: ["aprovacao de orcamento", "aprovar", "aprovado", "proximos passos"],
  9: ["recusa", "recusar", "declinar", "nao seguir", "nao aceitar proposta"],
  10: ["nota fiscal", "boleto", "enviar nf", "faturamento"],
  11: ["fatura em aberto", "em aberto", "cobranca", "vencida", "atraso no pagamento", "inadimpl"],
  12: ["previsao de pagamento", "justificativa", "regularizar", "atrasar o pagamento"],
  13: ["reembolso", "despesas", "viagem"],
  14: ["boas-vindas", "boas vindas", "novo colaborador", "admissao", "novo funcionario"],
  15: ["feedback de desempenho", "avaliacao de desempenho", "desempenho"],
  16: ["ferias"],
  17: ["compliance", "politica", "conduta", "codigo de etica"],
  18: ["kick", "inicio do projeto", "lancamento do projeto"],
  19: ["status report", "relatorio semanal", "andamento do projeto", "status do projeto"],
  20: ["manutencao", "indisponibilidade", "sistema fora", "janela de manutencao"],
  21: ["atraso no cronograma", "atraso", "novo prazo", "prorrogar", "cronograma"],
  22: ["ticket", "chamado", "solicitacao tecnica", "suporte tecnico"],
  23: ["desculpas", "falha", "reclamacao", "erro no servico"],
  24: ["pesquisa de satisfacao", "avaliacao do servico", "feedback do cliente", "avalie"],
  25: ["boas festas", "natal", "ano novo", "recesso", "fim de ano"],
};

const CAMPOS_NOME = [
  "[Nome]", "[Nome do Cliente]", "[Nome do Contato Financeiro]",
  "[Nome do Gestor/Cliente]", "[Nome do Prospect/Cliente]",
];

// Palavras genéricas valem pouco; expressões e termos específicos valem mais
const GENERICAS = new Set([
  "reuniao", "atraso", "orcamento", "desempenho", "cronograma", "diretoria", "conselho",
  "aprovar", "aprovado", "viagem", "despesas", "agendar", "marcar", "politica", "falha",
  "justificativa", "acompanhamento", "follow", "proximos passos",
]);
const peso = (w) => (w.includes(" ") ? 3 : GENERICAS.has(w) ? 1 : 2);

function escolher(texto) {
  const t = norm(texto);
  let melhor = null;
  let pontos = 0;
  for (const e of banco) {
    const p = (PALAVRAS[e.id] || []).reduce((acc, w) => acc + (t.includes(w) ? peso(w) : 0), 0);
    if (p > pontos) { pontos = p; melhor = e; }
  }
  return melhor; // null se nada combinou
}

function preencher(txt, destinatario) {
  let r = txt;
  if (destinatario) for (const c of CAMPOS_NOME) r = r.split(c).join(destinatario);
  return r;
}

// Insere os pontos digitados pelo usuário antes do fechamento ("Atenciosamente,...")
function inserirPontos(corpo, itens) {
  if (!itens.length) return corpo;
  const bloco =
    itens.length > 1
      ? `Pontos a destacar:\n${itens.map((i) => `- ${i}`).join("\n")}`
      : `Ponto a destacar: ${itens[0]}`;
  const i = corpo.lastIndexOf("\n\n");
  return i === -1 ? `${corpo}\n\n${bloco}` : `${corpo.slice(0, i)}\n\n${bloco}${corpo.slice(i)}`;
}

// ---------- modelos ----------
export function modeloCriar({ destinatario, topicos }) {
  const nome = String(destinatario || "").trim();
  const itens = linhas(topicos).map(cap);
  const base = escolher(topicos);

  if (base) {
    return {
      texto: `Assunto: ${preencher(base.assunto, nome)}\n\n${inserirPontos(preencher(base.corpo, nome), itens)}`,
      origem: `modelo "${base.categoria}"`,
    };
  }

  // Nenhum modelo do banco combinou: e-mail genérico
  const primeiro = itens[0] || "Contato";
  const assunto = primeiro.length > 70 ? primeiro.slice(0, 67) + "..." : primeiro;
  const saudacao = nome ? `Prezado(a) ${nome},` : "Prezados,";
  const miolo =
    itens.length > 1
      ? `Gostaria de tratar dos seguintes pontos:\n\n${itens.map((i) => `- ${i}`).join("\n")}`
      : `Gostaria de tratar do seguinte assunto: ${primeiro}`;
  return {
    texto: `Assunto: ${assunto}\n\n${saudacao}\n\nEspero que esteja tudo bem.\n\n${miolo}\n\nFico à disposição para qualquer esclarecimento.\n\nAtenciosamente,`,
    origem: "modelo genérico",
  };
}

export function modeloResponder({ original, diretrizes }) {
  const m = String(original || "").match(/^Assunto:\s*(.+)$/im);
  const assunto = m ? `Re: ${m[1].trim().replace(/^re:\s*/i, "")}` : "";
  const itens = linhas(diretrizes).map(cap);
  const miolo = itens.length > 1 ? itens.map((i) => `- ${i}`).join("\n") : itens[0] || "";
  const corpo = `Prezados,\n\nAgradeço o contato.\n\nSobre a sua mensagem:\n\n${miolo}\n\nFico à disposição para qualquer esclarecimento.\n\nAtenciosamente,`;
  return { texto: assunto ? `Assunto: ${assunto}\n\n${corpo}` : corpo, origem: "modelo genérico" };
}

export const temLacunas = (txt) => /\[[^\]]+\]/.test(txt);