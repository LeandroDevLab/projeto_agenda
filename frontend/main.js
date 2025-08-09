import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './validators/Login';
import Contato from './validators/Contato';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');

const contato = new Contato('.form-contato');

login.init();
cadastro.init();

contato.init();
//import './assets/css/style.css';

//para atualizar aqui precisei rodar o npm run dev para atualizar as mudanças no bundle.js
//alert(1);
