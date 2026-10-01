"use client";
import { useState, useEffect } from "react";

function separar(bruto) {
  const t = bruto.replace(/\*\*/g, "").trim();
  const m = t.match(/^Assunto:\s*(.+?)\r?\n+([\s\S]*)$/i);
  return m ? { assunto: m[1].trim(), corpo: m[2].trim() } : { assunto: "", corpo: t };
}

export default function Home() {
  const [acao, setAcao] = useState("criar");
  const [f, setF] = useState({ destinatario: "", topicos: "", diretrizes: "", original: "", codigo: "" });
  const [gerado, setGerado] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [para, setPara] = useState("");
  const [assunto, setAssunto] = useState("");
  const [corpo, setCorpo] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  useEffect(() => {
    if (!aberto) return;
    const tecla = (e) => e.key === "Escape" && setAberto(false);
    document.addEventListener("keydown", tecla);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", tecla); document.body.style.overflow = ""; };
  }, [aberto]);

  async function gerar(e) {
    e.preventDefault();
    setCarregando(true); setErro(""); setAviso(""); setCopiado(false);
    try {
      const r = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-access-code": f.codigo },
        body: JSON.stringify({ acao, ...f }),
      });
      const bruto = await r.text();
      let d;
      try { d = JSON.parse(bruto); }
      catch { throw new Error(`Resposta inesperada do servidor (${r.status}): ${bruto.slice(0, 200)}`); }
      if (!r.ok) throw new Error(d.error || "Não foi possível gerar o e-mail.");
      const s = separar(d.texto);
      setAssunto(s.assunto); setCorpo(s.corpo); setGerado(true); setAberto(true);
      if (d.aviso) setAviso(d.aviso);
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  const enc = encodeURIComponent;
  const corpoCRLF = corpo.replace(/\r?\n/g, "\r\n");

  function abrirOutlook() {
    window.location.href = `mailto:${para.trim()}?subject=${enc(assunto)}&body=${enc(corpoCRLF)}`;
  }

  function abrirOutlookWeb() {
    const url = `https://outlook.office.com/mail/deeplink/compose?to=${enc(para.trim())}&subject=${enc(assunto)}&body=${enc(corpoCRLF)}`;
    window.open(url, "_blank", "noopener");
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText((assunto ? `Assunto: ${assunto}\n\n` : "") + corpo);
      setCopiado(true);
    } catch {}
  }

  return (
    <main>
      <header className="topo"><div className="miolo">
        <h1>Redator de e-mails corporativos</h1>
        <p className="sub">Crie um e-mail formal a partir de tópicos ou responda a uma mensagem recebida, em português e com tom corporativo.</p>
      </div></header>

      <div className="miolo mesa">
        <form onSubmit={gerar}>
          <div className="abas" role="tablist">
            <button type="button" role="tab" className="aba" aria-selected={acao === "criar"} onClick={() => setAcao("criar")}>Criar e-mail</button>
            <button type="button" role="tab" className="aba" aria-selected={acao === "responder"} onClick={() => setAcao("responder")}>Responder e-mail</button>
          </div>

          {acao === "criar" ? (
            <>
              <label htmlFor="dest">Destinatário</label>
              <input id="dest" value={f.destinatario} onChange={set("destinatario")} placeholder="Ex.: Diretoria de Vendas" />
              <label htmlFor="top">Assunto e tópicos a abordar</label>
              <textarea id="top" required value={f.topicos} onChange={set("topicos")} placeholder="Ex.: Solicitar aprovação de orçamento adicional de 15% para a campanha do 3º trimestre, devido ao aumento do custo de mídia." />
            </>
          ) : (
            <>
              <label htmlFor="dir">Diretrizes da resposta</label>
              <textarea id="dir" required value={f.diretrizes} onChange={set("diretrizes")} style={{ minHeight: 100 }} placeholder="Ex.: Aceitar a proposta, mas pedir prazo de pagamento de 60 dias." />
              <label htmlFor="ori">E-mail recebido</label>
              <textarea id="ori" required value={f.original} onChange={set("original")} style={{ minHeight: 200 }} placeholder="Cole aqui o texto do e-mail original." />
            </>
          )}

          <label htmlFor="cod">Código de acesso</label>
          <input id="cod" type="password" value={f.codigo} onChange={set("codigo")} autoComplete="off" />
          <div className="dica">Necessário apenas se o administrador configurou um código.</div>

          <div className="linha">
            <button className="btn" disabled={carregando}>{carregando ? "Datilografando…" : "Gerar e-mail"}</button>
            {gerado && !aberto && <button type="button" className="btn sec" onClick={() => setAberto(true)}>Ver último e-mail</button>}
          </div>
          {erro && <p className="erro" role="alert">{erro}</p>}
        </form>
      </div>

      {aberto && (
        <div className="veu" onMouseDown={(e) => { if (e.target === e.currentTarget) setAberto(false); }}>
          <section className="saida" role="dialog" aria-modal="true" aria-labelledby="tit-carta">
            <div className="barra">
              <h2 id="tit-carta">E-mail gerado</h2>
              <button type="button" className="fechar" onClick={() => setAberto(false)} aria-label="Fechar">×</button>
            </div>
            {aviso && <p className="aviso" role="status">{aviso}</p>}
            <label htmlFor="para">Para</label>
            <input id="para" type="email" multiple value={para} onChange={(e) => setPara(e.target.value)} placeholder="nome@empresa.com.br" />
            <label htmlFor="ass">Assunto</label>
            <input id="ass" value={assunto} onChange={(e) => setAssunto(e.target.value)} />
            <label htmlFor="cor">Mensagem</label>
            <textarea id="cor" className="corpo" value={corpo} onChange={(e) => setCorpo(e.target.value)} />
            <div className="acoes">
              <button type="button" className="btn" onClick={abrirOutlook}>Enviar pelo Outlook</button>
              <button type="button" className="btn sec" onClick={abrirOutlookWeb}>Outlook na web</button>
              <button type="button" className="btn sec" onClick={copiar}>{copiado ? "Copiado" : "Copiar texto"}</button>
            </div>
            <div className="dica">O Outlook abre com o e-mail preenchido; o envio é feito por lá. Revise o texto antes de enviar.</div>
          </section>
        </div>
      )}
    </main>
  );
}
