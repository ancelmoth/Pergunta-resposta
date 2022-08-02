const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define("pergunta",{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }

});
// CRIANDO UMA TABELA COM SEQUELIZE

Pergunta.sync({force: false}).then(()=>{

}) //nao vai forcar a criacao de uma tabela ja existente

//FAZER A IMPORTAÇÃO DO MODULO

module.exports = Pergunta