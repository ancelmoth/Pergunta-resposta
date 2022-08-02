const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas",{
   corpo: { // relacionamento entre duas tabelas, dois modules.
    type: sequelize.TEXT,
    allowNull: false
   },

   perguntaId:{
     type: sequelize.INTEGER,
     allowNull: false
   }
});

Resposta.sync({force: false})// caso haja um banco, ele nao permite que crie outro. e tb faz um sincronismo com o BD

module.exports = Resposta;