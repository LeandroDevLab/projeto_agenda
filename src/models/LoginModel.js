const mongoose = require('mongoose');
const validator = require('validator'); //Instalar pacote de validação (npm i validator) e importar
const bcryptjs = require('bcryptjs'); // pacote para criptografar informação

//O MongoDB não trata os dados, cabe vc tratar
//por isso usar o mongoose, para garantir que os dados estejam como queremos
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema); //vai retornar uma promisse

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.valida();
    if (this.errors.length > 0) return; //checar após valida()
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push('Usuário não existe.'); //mais interessante usuário ou senha inválida (falar que não exista já pode ser considerado uma falha de segurança)
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida.');
      this.user = null;
      return;
    }
  }

  //precisa ser um método async
  async register() {
    this.valida();
    if (this.errors.length > 0) return; //checar após valida()

    //não estou usando o Try/catch aqui, pq estou capturando o erro no loginController
    await this.userExists();

    if (this.errors.length > 0) return; //chega após userExists()

    //Criando passo para Criptografar
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    //não estou usando o Try/catch aqui, pq estou capturando o erro no loginController
    this.user = await LoginModel.create(this.body); //await pq é async e só cria depois de todas as validações (validar e cleanUp)
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    //correção aqui, faltava o this
    if (this.user) this.errors.push('Usuário já cadastrado!');
  }

  valida() {
    this.cleanUp();
    //validação
    //O e-mail precisa ser válido
    if (!validator.isEmail(this.body.email)) {
      this.errors.push('E-mail inválido!');
    }
    //Senha entre 3 e 50 caracteres
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
    }
  }

  cleanUp() {
    for (let key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    //garantindo que o objeto vai ter só os campos que quero
    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Login;
