exports.middlewareGlobal = (req, res, next) => {
  //injetando dados para todas as rotas com middlewareGlobal
  res.locals.errors = req.flash('errors'); // capturando os errors
  res.locals.success = req.flash('success'); // capturando os errors
  res.locals.user = req.session.user;
  next();
};

exports.outroMiddlewareGlobal = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render('404');
  }
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', 'Você precisa fazer login!');

    //sempre que for redirecionar a sessão eu salvo e redireciono
    req.session.save(() => res.redirect('/'));
    return;
  }
  next();
};
/* module.exports = (req, res, next) => {
  if (req.body.cliente) {
    req.body.cliente = req.body.cliente.replace(
      'Leandro',
      'Só o ADMIN pode usar Leandro'
    );
    console.log();
    console.log(`Vi que vc postou ${req.body.cliente}`);
    console.log();
  }

  next();
}; */
