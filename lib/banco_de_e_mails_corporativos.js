/**
 * Banco de Dados de E-mails Corporativos
 * Utilize este array para alimentar o prompt do Gemini (Few-Shot Prompting)
 * ou para oferecer modelos de preenchimento rápido na sua interface de usuário.
 */

const bancoDeEmails = [
  // ==========================================
  // CATEGORIA: REUNIÕES E ALINHAMENTOS
  // ==========================================
  {
    id: 1,
    categoria: "Reuniões",
    assunto: "Solicitação de Reunião de Alinhamento - Projeto [Nome do Projeto]",
    corpo: `Prezado(a) [Nome],

Espero que este e-mail o(a) encontre bem.

Gostaria de propor uma reunião para discutirmos os próximos passos e o cronograma de entregas referente ao Projeto [Nome do Projeto]. Acredito que um alinhamento direto nos permitirá mitigar eventuais riscos e otimizar os recursos alocados.

Teria disponibilidade para uma videoconferência na próxima [Dia da Semana], [Data], às [Horário]? Caso o horário não seja conveniente, por favor, sinta-se à vontade para sugerir uma alternativa.

Agradeço desde já pela atenção e aguardo o seu retorno.

Atenciosamente,
[Seu Nome/Cargo]`
  },
  {
    id: 2,
    categoria: "Reuniões",
    assunto: "Ata de Reunião - [Assunto/Projeto] - [Data]",
    corpo: `Prezados,

Agradeço a participação de todos na nossa reunião de hoje.

Em anexo, envio a ata documentando os principais pontos discutidos, as decisões tomadas e os planos de ação com seus respectivos responsáveis e prazos.

Peço a gentileza de revisarem o documento e, caso notem a ausência de alguma informação relevante, me informem para que eu proceda com a retificação.

Cordialmente,
[Seu Nome/Cargo]`
  },
  {
    id: 3,
    categoria: "Reuniões",
    assunto: "Reagendamento de Reunião - [Assunto original]",
    corpo: `Prezado(a) [Nome],

Devido a um imprevisto inadiável em minha agenda, não poderei comparecer à nossa reunião previamente agendada para [Data e Horário].

Peço sinceras desculpas pelo inconveniente. Gostaria de sugerir o reagendamento para [Nova Data 1] às [Horário] ou [Nova Data 2] às [Horário]. 

Por favor, informe-me qual dessas opções melhor se adequa à sua disponibilidade.

Atenciosamente,
[Seu Nome/Cargo]`
  },
  {
    id: 4,
    categoria: "Reuniões",
    assunto: "Convite: Reunião de Apresentação de Resultados - [Trimestre/Ano]",
    corpo: `Prezados membros do conselho e diretoria,

Temos a satisfação de convidá-los para a reunião de apresentação dos resultados referentes ao [Trimestre/Período]. 

Neste encontro, abordaremos as principais métricas de desempenho, análise de metas e as perspectivas estratégicas para o próximo ciclo. A reunião ocorrerá no dia [Data], às [Horário], no [Local/Plataforma online].

Contamos com a presença de todos.

Cordialmente,
[Seu Nome/Cargo]`
  },

  // ==========================================
  // CATEGORIA: COMERCIAL E VENDAS
  // ==========================================
  {
    id: 5,
    categoria: "Comercial",
    assunto: "Apresentação Institucional e Proposta de Parceria - [Sua Empresa]",
    corpo: `Prezado(a) [Nome do Prospect/Cliente],

Espero que esteja bem.

Meu nome é [Seu Nome] e represento a [Sua Empresa]. Acompanhamos o crescimento da [Empresa do Cliente] no mercado e identificamos forte sinergia entre nossas operações.

Somos especialistas em [Seu Serviço/Produto principal], e acredito firmemente que nossas soluções podem auxiliar a sua equipe a otimizar processos e reduzir custos operacionais em até [X]%.

Gostaria de agendar uma breve chamada de 15 minutos na próxima semana para apresentar nosso portfólio de forma mais detalhada. Há algum dia que seja de sua preferência?

Atenciosamente,
[Seu Nome/Cargo]`
  },
  {
    id: 6,
    categoria: "Comercial",
    assunto: "Envio de Proposta Comercial - [Nome do Cliente/Projeto]",
    corpo: `Prezado(a) [Nome],

Conforme alinhado em nossa última conversa, segue em anexo a proposta comercial detalhada para a execução do escopo discutido.

O documento contém o descritivo técnico dos serviços, cronograma estimado de implementação e as condições comerciais aplicáveis. A proposta tem validade de [X] dias.

Permaneço à inteira disposição para esclarecer quaisquer dúvidas e ajustar o que for necessário para avançarmos com esta parceria.

Cordialmente,
[Seu Nome/Cargo]`
  },
  {
    id: 7,
    categoria: "Comercial",
    assunto: "Acompanhamento da Proposta Comercial - [Nome do Projeto]",
    corpo: `Prezado(a) [Nome],

Espero que este e-mail o(a) encontre bem.

Retomo o contato para verificar se você teve a oportunidade de avaliar a proposta comercial enviada no dia [Data de envio]. 

Entendo que a tomada de decisão envolve diversas áreas, portanto, me coloco à disposição caso precisem de informações adicionais ou de uma nova reunião para detalhamento técnico dos escopos apresentados.

Aguardo seus comentários.

Atenciosamente,
[Seu Nome/Cargo]`
  },
  {
    id: 8,
    categoria: "Comercial",
    assunto: "Aprovação de Orçamento e Próximos Passos",
    corpo: `Prezado(a) [Nome do Fornecedor/Parceiro],

Gostaria de confirmar a aprovação do orçamento referente à Proposta [Número da Proposta], enviada em [Data].

Para que possamos dar andamento às rotinas internas de contratação, solicito a gentileza de nos enviar a minuta do contrato, bem como as informações bancárias para o cadastro de fornecedor.

Agradecemos o empenho na negociação e estamos entusiasmados com o início das atividades.

Cordialmente,
[Seu Nome/Cargo]`
  },
  {
    id: 9,
    categoria: "Comercial",
    assunto: "Agradecimento e Recusa de Proposta Comercial",
    corpo: `Prezado(a) [Nome],

Agradecemos o tempo dedicado à elaboração e apresentação da proposta para a nossa empresa.

Após criteriosa análise por parte do nosso comitê, informo que, neste momento, optamos por seguir por um caminho estratégico diferente, o qual melhor se adequa ao nosso atual cenário orçamentário e operacional.

Manteremos o contato de vocês em nosso banco de fornecedores para futuras oportunidades, dada a reconhecida qualidade de seus serviços.

Desejamos sucesso em seus negócios.

Atenciosamente,
[Seu Nome/Cargo]`
  },

  // ==========================================
  // CATEGORIA: FINANCEIRO
  // ==========================================
  {
    id: 10,
    categoria: "Financeiro",
    assunto: "Envio de Nota Fiscal e Boleto - Competência [Mês/Ano]",
    corpo: `Prezado(a) [Nome ou Departamento Financeiro],

Espero que estejam bem.

Segue em anexo a Nota Fiscal nº [Número da NF] e o respectivo boleto bancário referente aos serviços prestados durante a competência de [Mês/Ano]. O vencimento está programado para o dia [Data de Vencimento].

Por favor, confirmem o recebimento deste e-mail. Caso necessitem de alguma adequação documental, nossa equipe financeira está à disposição.

Cordialmente,
[Seu Nome/Departamento Financeiro]`
  },
  {
    id: 11,
    categoria: "Financeiro",
    assunto: "Aviso de Fatura em Aberto - Nota Fiscal nº [Número da NF]",
    corpo: `Prezado(a) [Nome do Contato Financeiro],

Espero que esteja bem.

Entramos em contato para informar que, até o presente momento, não identificamos em nosso sistema o repasse referente à Nota Fiscal nº [Número da NF], cujo vencimento ocorreu na data de [Data do Vencimento].

Compreendemos que imprevistos operacionais podem ocorrer. Dessa forma, solicitamos a gentileza de verificar o status deste pagamento e, caso já tenha sido efetuado, pedimos que nos envie o comprovante para procedermos com a baixa em nosso sistema.

Caso haja necessidade de emissão de uma 2ª via do boleto com data atualizada, por favor, nos comunique.

Atenciosamente,
[Seu Nome/Departamento Financeiro]`
  },
  {
    id: 12,
    categoria: "Financeiro",
    assunto: "Justificativa e Previsão de Pagamento - NF [Número]",
    corpo: `Prezados da [Nome da Empresa Parceira],

Gostaria de informar que, devido a uma inconsistência sistêmica em nosso portal de pagamentos durante esta semana, o processamento da Nota Fiscal [Número] sofreu um atraso involuntário.

Nossa equipe técnica já sanou a falha, e o pagamento foi reprogramado em caráter de urgência para a próxima [Dia da Semana, Data]. 

Pedimos sinceras desculpas pelo contratempo e agradecemos a compreensão.

Cordialmente,
[Seu Nome/Cargo]`
  },
  {
    id: 13,
    categoria: "Financeiro",
    assunto: "Solicitação de Reembolso de Despesas Corporativas",
    corpo: `Prezado(a) [Nome do Gestor ou RH],

Solicito a análise e aprovação do reembolso referente às despesas corporativas contraídas durante [Motivo, ex: a viagem à filial de São Paulo / o evento XPTO], realizado entre os dias [Data Inicial] e [Data Final].

O valor total das despesas totaliza R$ [Valor], correspondente a [Breve descrição: ex: transporte, hospedagem e alimentação]. 

Todos os recibos e notas fiscais comprobatórios, bem como a planilha padrão de prestação de contas, encontram-se em anexo.

Fico no aguardo das devidas instruções ou da confirmação de processamento.

Atenciosamente,
[Seu Nome/Cargo]`
  },

  // ==========================================
  // CATEGORIA: RECURSOS HUMANOS / COMUNICADOS
  // ==========================================
  {
    id: 14,
    categoria: "RH",
    assunto: "Comunicado Oficial: Boas-Vindas a [Nome do Novo Colaborador]",
    corpo: `Prezados membros da equipe,

É com grande satisfação que anunciamos a chegada de [Nome do Novo Colaborador], que passará a integrar nossa equipe assumindo o cargo de [Cargo] no departamento de [Departamento].

[Nome] possui vasta experiência na área, tendo atuado em [mencionar brevemente o background, se aplicável], e certamente agregará imenso valor aos nossos projetos atuais.

Desejamos as boas-vindas e pedimos que todos o(a) auxiliem neste processo de integração à cultura da [Nome da Empresa].

Cordialmente,
[Seu Nome/Cargo]`
  },
  {
    id: 15,
    categoria: "RH",
    assunto: "Formalização de Feedback de Desempenho",
    corpo: `Prezado(a) [Nome do Colaborador],

Agradeço pela produtiva reunião de avaliação de desempenho que tivemos hoje cedo.

Conforme discutido, registro aqui o reconhecimento pelos seus excelentes resultados na entrega do [Projeto/Meta específica]. Notamos também um grande avanço em sua capacidade de liderança.

Como pontos de desenvolvimento para o próximo semestre, acordamos focar no aprimoramento de [Habilidade/Competência técnica ou comportamental]. O RH disponibilizará treinamentos específicos para apoiá-lo(a) nesta jornada.

Conto com o seu contínuo engajamento e me coloco à disposição para apoiá-lo(a) no que for necessário.

Atenciosamente,
[Seu Nome/Cargo]`
  },
  {
    id: 16,
    categoria: "RH",
    assunto: "Aprovação de Período de Férias",
    corpo: `Prezado(a) [Nome do Colaborador],

Informamos que a sua solicitação de férias para o período de [Data de Início] a [Data de Retorno] foi formalmente aprovada pela diretoria.

Pedimos que, nas semanas que antecedem sua saída, você garanta que todas as pendências urgentes sejam resolvidas e que seja elaborado um documento de repasse (handover) para [Nome do Colaborador Substituto], que cobrirá suas demandas no período.

Desejamos um excelente e merecido período de descanso.

Cordialmente,
[Seu Nome/Departamento de RH]`
  },
  {
    id: 17,
    categoria: "Comunicado",
    assunto: "Atualização nas Políticas de Compliance e Conduta",
    corpo: `Prezados colaboradores,

Em conformidade com as melhores práticas de governança corporativa, informamos que o nosso Código de Conduta e as Políticas de Compliance foram atualizados.

As principais alterações dizem respeito a [Citar 1 ou 2 mudanças principais, ex: segurança de dados e uso de equipamentos corporativos]. O documento completo está disponível em anexo e também no portal da intranet.

A leitura do material é obrigatória. Solicitamos que todos acessem o portal e assinem o termo de ciência até o dia [Data Limite].

Agradecemos a colaboração de todos para mantermos um ambiente de trabalho íntegro e seguro.

Atenciosamente,
[Seu Nome/Cargo da Diretoria]`
  },

  // ==========================================
  // CATEGORIA: PROJETOS E OPERAÇÕES
  // ==========================================
  {
    id: 18,
    categoria: "Projetos",
    assunto: "Kick-off de Projeto: [Nome do Projeto]",
    corpo: `Prezados,

Temos o prazer de anunciar o início oficial do Projeto [Nome do Projeto]. 

O objetivo principal desta iniciativa é [Breve descrição do objetivo, ex: implementar o novo sistema ERP até o fim do ano], e cada um de vocês foi selecionado para compor a equipe estratégica responsável por essa entrega.

Em anexo, envio o Termo de Abertura do Projeto (Project Charter) contemplando o escopo inicial, os milestones e a matriz de responsabilidades. Nossa reunião de Kick-off ocorrerá no dia [Data], às [Horário].

Por favor, revisem o material previamente.

Cordialmente,
[Seu Nome/Gerente de Projetos]`
  },
  {
    id: 19,
    categoria: "Projetos",
    assunto: "Status Report Semanal - Projeto [Nome do Projeto]",
    corpo: `Prezados stakeholders,

Segue a atualização semanal sobre o andamento do Projeto [Nome do Projeto].

Até o presente momento, concluímos integralmente as fases de [Fases concluídas]. Para a próxima semana, concentraremos esforços na etapa de [Próximas etapas].

Identificamos um leve risco em relação a [Citar o risco, ex: entrega de licenças por parte do fornecedor X], mas nosso plano de mitigação já foi ativado e não prevemos impacto direto no cronograma geral, cuja entrega final segue mantida para [Data].

O relatório detalhado está em anexo. Fico à disposição para esclarecimentos.

Atenciosamente,
[Seu Nome/Gerente de Projetos]`
  },
  {
    id: 20,
    categoria: "Operações",
    assunto: "Aviso de Manutenção Programada do Sistema [Nome do Sistema]",
    corpo: `Prezados usuários,

Comunicamos que o sistema [Nome do Sistema] passará por uma manutenção preventiva e atualização de segurança no próximo [Dia da Semana], [Data], no período compreendido entre as [Horário Inicial] e [Horário Final].

Durante esta janela de tempo, a plataforma ficará completamente indisponível. Orientamos que todos salvem seus trabalhos e façam logoff preventivo com antecedência.

Agradecemos a compreensão e ressaltamos que essas manutenções são essenciais para garantir a estabilidade e a integridade de nossa infraestrutura tecnológica.

Cordialmente,
[Equipe de TI / Suporte]`
  },
  {
    id: 21,
    categoria: "Projetos",
    assunto: "Alerta de Atraso no Cronograma e Revisão de Prazos",
    corpo: `Prezado(a) [Nome do Gestor/Cliente],

Escrevo para informar uma atualização crítica em nosso cronograma do Projeto [Nome]. 

Devido a [citar motivo formal, ex: fatores externos imprevisíveis na importação de componentes / readequações complexas solicitadas no escopo técnico], não será possível cumprir o prazo de entrega inicialmente estipulado para [Data antiga].

Nossa equipe está trabalhando intensamente para minimizar este impacto e revisamos a data de conclusão para [Nova Data]. 

Gostaria de agendar uma breve reunião amanhã pela manhã para detalhar os motivos técnicos e alinhar as expectativas para as próximas entregas.

Atenciosamente,
[Seu Nome/Cargo]`
  },

  // ==========================================
  // CATEGORIA: ATENDIMENTO AO CLIENTE E COMUNICAÇÃO EXTERNA
  // ==========================================
  {
    id: 22,
    categoria: "Atendimento",
    assunto: "Retorno sobre a Solicitação Técnica nº [Número do Ticket]",
    corpo: `Prezado(a) [Nome do Cliente],

Agradecemos o seu contato com o suporte da [Sua Empresa].

Informamos que a ocorrência relatada sob o protocolo nº [Número do Ticket] foi devidamente analisada por nossa equipe de engenharia. O diagnóstico revelou uma instabilidade na integração da API, a qual já foi corrigida em nosso ambiente de produção.

Pedimos a gentileza de testar o sistema novamente e nos confirmar se a operação foi normalizada.

Continuamos à sua disposição para o que for necessário.

Cordialmente,
[Seu Nome / Equipe de Suporte]`
  },
  {
    id: 23,
    categoria: "Atendimento",
    assunto: "Pedido de Desculpas Oficial - Falha na Prestação de Serviço",
    corpo: `Prezado(a) [Nome do Cliente],

Em nome da [Sua Empresa], dirijo-me a você para expressar nossas mais sinceras desculpas pelo transtorno vivenciado no dia [Data], referente ao [descrever o problema brevemente, ex: atraso significativo na entrega de seu pedido].

Temos plena ciência de que falhamos em manter o padrão de excelência que norteia nossas operações. Informo que medidas corretivas internas já foram implementadas junto ao departamento logístico para assegurar que falhas dessa natureza não voltem a ocorrer.

Como forma de amenizar o desconforto gerado, aplicamos uma isenção da taxa de serviço na sua próxima fatura.

Agradecemos a compreensão e a oportunidade de continuarmos sendo seus parceiros.

Atenciosamente,
[Seu Nome/Cargo da Diretoria ou Gerência]`
  },
  {
    id: 24,
    categoria: "Atendimento",
    assunto: "Solicitação de Feedback e Avaliação de Serviço",
    corpo: `Prezado(a) [Nome do Cliente],

Recentemente finalizamos o projeto/entrega dos serviços referentes ao contrato [Número ou Assunto]. 

Para a [Sua Empresa], a opinião de nossos clientes é o principal pilar para a melhoria contínua de nossos processos. Por isso, gostaríamos de convidá-lo(a) a responder uma breve pesquisa de satisfação, que não tomará mais do que 3 minutos do seu tempo.

O formulário pode ser acessado através deste link: [Link da Pesquisa].

Agradecemos antecipadamente por compartilhar suas percepções conosco.

Cordialmente,
[Seu Nome/Equipe de Sucesso do Cliente]`
  },
  {
    id: 25,
    categoria: "Comunicação Externa",
    assunto: "Mensagem de Boas Festas e Agradecimento - [Sua Empresa]",
    corpo: `Prezados parceiros e clientes,

Com a aproximação do final do ano, gostaríamos de expressar nossa profunda gratidão pela confiança depositada em nosso trabalho ao longo de [Ano]. 

Os desafios superados e as conquistas alcançadas não teriam sido possíveis sem a solidez de nossas parcerias. Que o próximo ano traga novas oportunidades de crescimento e prosperidade para todos os nossos negócios.

Informamos também que entraremos em recesso coletivo no período de [Data Início] a [Data Fim], retornando às atividades normais no dia [Data de Retorno].

Desejamos a você e a toda a sua equipe excelentes festas e um próspero Ano Novo.

Atenciosamente,
[Nome da Sua Empresa / Diretoria]`
  }
];

export default bancoDeEmails;
