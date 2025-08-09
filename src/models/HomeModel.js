//geralmente o Model vai ser uma classe, por isso o PascalCase
//Para trabalhar os dados e exportar para os controllers
const mongoose = require('mongoose');

//O MongoDB não trata os dados, cabe vc tratar
//por isso usar o mongoose, para garantir que os dados estejam como queremos
const HomeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
});

const HomeModel = mongoose.model('Home', HomeSchema);

class Home {}

module.exports = Home;
