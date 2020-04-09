//classe mãe dos arquivos no HRP
export const BASE_URL = "/rvm";

//Modos de transações do Dexie
export const READWRITE = "rw";
export const READONLY = "r";

//Açóes da navegação dos botões do formulário
export const FORM_NAVEG = { BACK: "voltar", NEXT: "avancar" };

//Status dos formulários
//FILL: Status de preechimento
//SYNC: Status de sincronismo
export const STATUS_FORM = {
  FILL: {
    INICIADO: { nome: "Iniciado" },
    PENDENTE: { nome: "Pendente" },
    FINALIZADO: { nome: "Finalizado" },
  },
  SYNC: {
    PENDENTE: { nome: "Pendente" },
    FINALIZADO: { nome: "Finalizado" },
  },
};
