const Login = require('../models/LoginModel');

exports.index = (req, res, next) => {
  //console.log(req.session.user); //verificando se está logado
  if (req.session.user) return res.render('login-logado');
  return res.render('login');
};

exports.register = async function (req, res) {
  //redirect('/login/index')
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        return res.redirect('/login/index');
      });
      return;
    }

    req.flash('success', 'Seu usuário foi criado com sucesso.');
    req.session.save(function () {
      return res.redirect('/login/index');
    });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.login = async function (req, res) {
  //redirect('/login/index')
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        return res.redirect('/login/index');
      });
      return;
    }

    req.flash('success', 'Você entrou no sistema.');
    req.session.user = login.user; // identificar que o usuário está logado e atrubuir ações a ele
    req.session.save(function () {
      return res.redirect('/login/index');
    });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/');
};
