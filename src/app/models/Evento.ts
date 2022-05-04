

export interface Evento {
  id : number;
  local : string;
  tema : string;
  dataEvento? : Date;
  qtdPessoas : number;
  imagemURL : string;
  telefone : string;
  email : string;
}
