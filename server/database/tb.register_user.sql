CREATE TABLE 'db.yaba'.'tb.register_user' (
  'id' INT NOT NULL AUTO_INCREMENT,
  'name' VARCHAR(30) NOT NULL,
  'last_name' VARCHAR(50) NOT NULL,
  'email' VARCHAR(60) NOT NULL,
  'username' VARCHAR(20) NOT NULL,
  'password' VARCHAR(250) NOT NULL,
  PRIMARY KEY ('id'));


CREATE TABLE `db.yaba`.`tb.form_user` (
  `username` VARCHAR(255) NULL,
  `razaoSocial` VARCHAR(255) NULL,
  `CEP` INT NULL,
  `CNPJ` INT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  PRIMARY KEY (`id`));

CREATE TABLE db_yaba.tb_form_user(
razaoSocial varchar(255) 
CNPJ varchar(255) 
naturezaPJ varchar(255) 
cep varchar(255) 
Telefone varchar(255) 
emailInstitucional varchar(255) 
dataAssociacao varchar(255) 
dataEncerramento varchar(255) 
presidente varchar(255) 
CPF varchar(255) 
email varchar(255) 
celular varchar(255) 
missao varchar(255) 
destaquePrioritarias varchar(255) 
profissionaisCLT int(11) 
voluntarios int(11) 
possuiConselho varchar(3) 
ajudaPaciente varchar(3) 
possuiAssentoConselhoOuInstancia varchar(3) 
relacionamentoDiferente varchar(3) 
discursoPautado varchar(3) 
defendeIdeiasEProjetos varchar(3) 
sistematizacaoEstruturada varchar(3) 
discursoPlanejamentoPrazos varchar(3) 
temClarezaProposito varchar(255) 
TelefoneFixo varchar(45) 
conhecimentoTecnicoEntidade varchar(45) 
projetosEstruturados varchar(45)
)
