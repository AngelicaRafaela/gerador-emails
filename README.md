# Redator de e-mails corporativos

Next.js + Gemini. Deploy na Vercel.

## Rodar local
    npm install
    cp .env.example .env.local   # preencha GEMINI_API_KEY
    npm run dev

## Deploy na Vercel
1. Envie esta pasta para um repositório no GitHub.
2. Na Vercel: Add New > Project > importe o repositório.
3. Em Environment Variables, defina GEMINI_API_KEY (e, se quiser proteger o acesso, ACCESS_CODE).
4. Deploy.

Variável opcional: GEMINI_MODEL (padrão gemini-2.5-flash).

## Banco de e-mails
Os modelos ficam em `lib/banco_de_e_mails_corporativos.js` e são injetados automaticamente no prompt (`lib/prompt.js`). Para adicionar ou editar modelos, altere apenas esse arquivo.

## Botão do Outlook
"Enviar pelo Outlook" usa um link `mailto:` e abre o cliente de e-mail padrão do computador (o Outlook, se for o padrão). "Abrir no Outlook na web" abre a tela de nova mensagem em outlook.office.com.
