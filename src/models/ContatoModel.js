//geralmente o Model vai ser uma classe, por isso o PascalCase
//Para trabalhar os dados e exportar para os controllers
const mongoose = require('mongoose');
const validator = require('validator');
//O MongoDB não trata os dados, cabe vc tratar
//por isso usar o mongoose, para garantir que os dados estejam como queremos
const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

//Construction Function
function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function () {
  this.valida();
  if (this.errors.length > 0) return;

  //Criando um contato
  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function () {
  this.cleanUp();
  //validação
  //O e-mail precisa ser válido
  if (this.body.email && !validator.isEmail(this.body.email)) {
    this.errors.push('E-mail inválido!');
  }
  //O nome foi enviado?
  if (!this.body.nome)
    this.errors.push('Você precisa adicionar um nome ao formulário');
  //Tem Email ou Telefone?
  if (!this.body.email && !this.body.telefone)
    this.errors.push('Você precisa adicionar email ou telefone ao contato.');
};

Contato.prototype.cleanUp = function () {
  for (let key in this.body) {
    if (typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  //garantindo que o objeto vai ter só os campos que quero
  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
  };
};

Contato.prototype.edit = async function (id) {
  if (typeof id !== 'string') return;
  this.valida();
  if (this.errors.length > 0) return;

  //Editando um contato existente
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
    new: true,
  });
};

/* 
Funcionou, mas precisa mudar o exports.delete com new Contato...
Contato.prototype.delete = async function (id) {
  if (typeof id !== 'string') return;
  this.contato = await ContatoModel.findByIdAndDelete(id);
}; 
*/

//Métodos estáticos
Contato.buscaPorId = async function (id) {
  if (typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id);
  return contato;
};

Contato.delete = async function (id) {
  if (typeof id !== 'string') return;
  const contato = await ContatoModel.findOneAndDelete({ _id: id });
  return contato;
};

Contato.buscaContatos = async function () {
  const contatos = await ContatoModel.find().sort({ criadoEm: 1 }); //1 para crescente e -1 para decrescente
  return contatos;
};

module.exports = Contato;
