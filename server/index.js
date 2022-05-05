const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const configDb = require("./database/config.json"); 
const porta = 5001
const db = mysql.createPool(configDb);
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet Name');

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const username = req.body.userName;
  const password = req.body.senha;
  const email = req.body.email;
  const name = req.body.primeiroNome;
  const last_name = req.body.ultimoNome;
  console.log(req.body)
 
  db.query("SELECT * FROM `tb_register_user` WHERE username = ?", [username], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
         
        db.query(
          "INSERT INTO `tb_register_user` (username, password, email, name,last_name) VALUE (?,?,?,?,?)",
          [username, hash,email,name,last_name],
          (error, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.send({ msg: "Usuario já cadastrado" });
    }
  });
});

app.post("/login", (req, res) => {
  const username = req.body.userName;
  const password = req.body.senha;

  db.query("SELECT * FROM `tb_register_user` WHERE username = ?", [username], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response) {
          // TO DO; Retornar Cookie
          res.send({ msg: "Usuário logado" , logged: true  });
        } else {
          res.send({ msg: "Senha incorreta",logged: false });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});

app.post("/form", (req, res) => {

  const b = req.body
  db.query(
    "INSERT INTO `tb_form_user`(razaoSocial, CNPJ, naturezaPJ, cep, Telefone, emailInstitucional,dataAssociacao,dataEncerramento,presidente,CPF,email,celular,missao,destaquePrioritarias,profissionaisCLT,voluntarios,possuiConselho, ajudaPaciente, possuiAssentoConselhoOuInstancia,temClarezaProposito,conhecimentoTecnicoEntidade,relacionamentoDiferente,discursoPautado,defendeIdeiasEProjetos,projetosEstruturados,sistematizacaoEstruturada,discursoPlanejamentoPrazos,TelefoneFixo) VALUE ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?  )" ,
    [b.razaoSocial,b.CNPJ, b.naturezaPJ, b.cep, b.Telefone, b.emailInstitucional,b.dataAssociacao, b.dataEncerramento, b.presidente, b.CPF, b.email, b.celular, b.missao, b.destaquePrioritarias, b.profissionaisCLT, b.voluntarios, b.possuiConselho, b.ajudaPaciente, b.possuiAssentoConselhoOuInstancia, b.temClarezaProposito, b.conhecimentoTecnicoEntidade, b.relacionamentoDiferente, b.discursoPautado, b.defendeIdeiasEProjetos, b.projetosEstruturados, b.sistematizacaoEstruturada, b.discursoPlanejamentoPrazos, b.TelefoneFixo], (err, response) => {
      if (err) {
        console.log(err)
        res.send(err);
      }
  
      res.send({ msg: "Form enviado" });
    }
  );
  });

  app.get("/form", (req,res)=>{

    const username = req.query.username; 
    console.log(username)
  
    db.query("SELECT * FROM `db_yaba`.`tb_form_user` WHERE username = ?",[username], (err,res)=>{
      
      const data = res
      console.log(res)
        
       const headingColumnNames = [
         
        "razaoSocial", "CNPJ", "naturezaPJ", "cep", "Telefone", "emailInstitucional","dataAssociacao","dataEncerramento","presidente","CPF","email","celular","missao","destaquePrioritarias","profissionaisCLT","voluntarios","possuiConselho", "ajudaPaciente", "possuiAssentoConselhoOuInstancia","temClarezaProposito","conhecimentoTecnicoEntidade","relacionamentoDiferente","discursoPautado","defendeIdeiasEProjetos","projetosEstruturados","sistematizacaoEstruturada","discursoPlanejamentoPrazos", "TelefoneFixo"
 
      ]


let headingColumnIndex = 1; //diz que começará na primeira linha
headingColumnNames.forEach(heading => { //passa por todos itens do array
    // cria uma célula do tipo string para cada título
    ws.cell(1, headingColumnIndex++).string(heading);
});
let rowIndex = 2; //começa na linha 2
data.forEach(record => { //passa por cada item do data
    let columnIndex = 1; //diz para começar na primeira coluna
    //transforma cada objeto em um array onde cada posição contém as chaves do objeto (name, email, cellphone)
    Object.keys(record).forEach(columnName =>{
        //cria uma coluna do tipo string para cada item
        ws.cell(rowIndex,columnIndex++)
            .string(record [columnName])
    });
    rowIndex++; //incrementa o contador para ir para a próxima linha
}); 
wb.write('ArquivoExcel.xlsx');
    })
  })

app.listen(porta, () => {
  console.log(`On ${porta}`);
});

