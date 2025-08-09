//import validator from 'validator';

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener('submit', e => {
      e.preventDefault();

      //Limpar os campos com erros
      this.limpaErros();

      //alert('FORM NAO ENVIADO'); //para testar
      this.validate(e);
    });
  }

  // Criar MSG de texto embaixo do CAMPO onde o erro aconteceu
  criaErros(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    div.classList.add('text-danger');
    campo.insertAdjacentElement('afterend', div);
  }

  //Limpar erros que foram criados
  limpaErros() {
    for (let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }
  }
  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    //criando uma flag de validação de erro que começa com falso
    let validateError = false;
    // Expressão regular para validar e-mail
    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emailIsValid = emailRegex.test(emailInput.value);
    console.log('emailIsValid: ' + emailIsValid);
    console.log(emailInput.value, passwordInput.value);
    if (!emailIsValid) {
      //alert('E-mail inválido'); //trocar por manipulação de DOM
      this.criaErros(emailInput, '*E-mail inválido');
      validateError = true;
      console.log('validateError: ', validateError);
    }
    if (passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      //alert('Senha precisa ter entre 3 e 50 caracteres');
      this.criaErros(
        passwordInput,
        '*Senha precisa ter entre 3 e 50 caracteres'
      );
      validateError = true;
    }

    if (!validateError) el.submit();

    /* 
    //Validando com validator (posso fazer assim, mas para o projeto usarei Regex (Expressões Regulares))
    if (!validator.isEmail(emailInput.value)) validateError = true;
    if (!validator.isStrongPassword(passwordInput.value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        validateError = true;
    } 
    */
  }
}
