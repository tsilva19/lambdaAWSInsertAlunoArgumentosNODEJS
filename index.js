const mysql = require('mysql');

exports.handler = (event, context, callback) => {
  // Configurações de conexão com o banco de dados MySQL
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database_name'
  });

  // Dados do aluno a ser inserido na tabela de alunos
  const aluno = {
    nome: 'João Silva',
    idade: 25,
    email: 'joao.silva@gmail.com'
  };

  // Conexão com o banco de dados MySQL
  connection.connect();

  // Consulta SQL para inserir um aluno na tabela de alunos
  connection.query('INSERT INTO alunos SET ?', aluno, function (error, results, fields) {
   if (error) {
    console.log(error);
      // Fechar a conexão com o banco de dados MySQL
      connection.end();
      // Retornar um status code 400 e informações adicionais sobre o erro
      const response = {
        statusCode: 400,
        body: JSON.stringify({ error: 'Ocorreu um erro ao inseerir o aluno.' })
      };
      callback(null, response);
    }
    else{
     console.log(results);
     // Fechar a conexão com o banco de dados MySQL
     connection.end();
     // Retornar a resposta com o status code 201
     const response = {
       statusCode: 201,
       body: 'Aluno inserido com sucesso!'
     };
     callback(null, response);
    }
    
  });
};
