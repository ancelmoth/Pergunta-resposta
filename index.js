const { raw } = require("body-parser");
const bodyParser = require("body-parser")
const express = require("express")//importando o framework express
const connection = require('./database/database');
const Pergunta = require("./database/Pergunta"); //tabela pergunta
const Resposta = require("./database/Resposta")
//database

connection.authenticate().then(()=>{
   console.log("Conexao feita com o banco de dados")
}).catch((msgErro)=>{
   console.log(msgErro)
})


const app = express() //instanciando o express.
app.set('view engine', 'ejs') //EJS É UM MOTOR ENGINE PARA DESENHAR O HTML. DECLARA QUE O VJ EH UMA EJS
app.use(express.static('public')) //AQUI FICAM ARMAZENADOS AS IMGS, CSSs, etc..
//----------------------------------------------------------------------------------------------
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//bodyparser


app.get("/",(req, res) => { 
   Pergunta.findAll({raw: true, order: [
      ['id', 'DESC']
   ]}).then(perguntas =>{
     res.render("index",{
      perguntas: perguntas
     })

   })
   //configurando as rotas da pagina principal
})  

app.get("/perguntar", (req, res) =>{
   res.render("perguntar") //renderiza a pagina perguntar.ejs
})

// criando nova rota
app.get('/pergunta/:id', (req, res)=>{
   var id = req.params.id;
   Pergunta.findOne({where: {id: id}}).then(pergunta =>{
      if(pergunta != undefined){//pergunta encontrada
         res.render('pergunta',{
            pergunta: pergunta

         })
      
      }else{
         res.redirect("/")
      }
   })
})

app.post("/salvarpergunta", (req, res)=>{
   var titulo = req.body.titulo
   var descricao = req.body.descricao

   Pergunta.create({
      titulo: titulo,
      descricao: descricao
   }).then(()=>{
      res.redirect("/")
   });
   
})

// criando outra rota

app.post("/responder", ((req, res)=>{
   var corpo = req.body.corpo;
   var perguntaID = req.body.pergunta;
   Resposta.create({
      corpo: corpo,
      perguntaId: perguntaId
   })

}))
   
// PORTA CRIADA
app.listen(8080, function(){ console.log("App rodando!!!")})

