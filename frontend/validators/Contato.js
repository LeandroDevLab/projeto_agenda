import validator from 'validator';

export default class Contato {
  constructor(formClass) {
    this.formContato = document.querySelector('.form-contato');
    this.inputTelefone = document.getElementById('telefone');
  }

  init() {
    this.events();
  }

  events() {
    this.preencheTelefoneFormatado();
    //se não existir o formulário já retorna e para a execução
    if (!this.formContato) return;
    this.formContato.addEventListener('submit', e => {
      e.preventDefault();

      //Limpar campos que perdem os erros
      this.limpaErros();

      this.validate(e);
    });
  }

  preencheTelefoneFormatado() {
    if (!this.inputTelefone) return;
    this.inputTelefone.addEventListener('input', function (event) {
      let valor = event.target.value;

      // 1. Remove tudo que não for dígito
      valor = valor.replace(/\D/g, '');

      // 2. Limita o valor a 11 dígitos para garantir o formato correto
      valor = valor.substring(0, 11);

      // 3. Aplica a máscara de acordo com o número de dígitos
      if (valor.length > 2 && valor.length <= 7) {
        // Ex: (XX)XXXXX
        valor = `(${valor.substring(0, 2)})${valor.substring(2)}`;
      } else if (valor.length > 7) {
        // Ex: (XX)XXXXX-XXXX
        valor = `(${valor.substring(0, 2)})${valor.substring(
          2,
          7
        )}-${valor.substring(7, 11)}`;
      }

      // 4. Atualiza o valor do input
      event.target.value = valor;
    });

    // Opcional: Adicionar um listener para o evento de 'blur' (quando o campo perde o foco)
    // para garantir que a formatação está correta caso o usuário copie e cole um valor.
    this.inputTelefone.addEventListener('blur', function (event) {
      let valor = event.target.value;

      // Remove tudo que não for dígito
      valor = valor.replace(/\D/g, '');

      // Se o número de dígitos for 11, aplica a máscara completa
      if (valor.length === 11) {
        valor = `(${valor.substring(0, 2)})${valor.substring(
          2,
          7
        )}-${valor.substring(7, 11)}`;
      }

      event.target.value = valor;
    });
  }

  //Método que cria MSG de erros abaixo dos CAMPOs para o usuário
  criaErros(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('campo-com-erro');
    div.classList.add('text-danger'); //deixando vermelho com bootstrap css
    campo.insertAdjacentElement('afterend', div);
  }

  //Limpa com campos que perderem os erros na próxima verificação
  limpaErros() {
    for (let campoComErro of this.formContato.querySelectorAll(
      '.campo-com-erro'
    )) {
      campoComErro.remove();
    }
  }

  validate(e) {
    const el = e.target;
    const nomeContato = el.querySelector('input[name="nome"]');
    const sobrenomeContato = el.querySelector('input[name="sobrenome"]');
    const emailContato = el.querySelector('input[name="email"]');
    const telefoneContato = el.querySelector('input[name="telefone"]');
    const strings = /[a-zA-Z]/;
    let validateError = false;

    //Chegar se nome é String
    if (nomeContato.value.length < 1) {
      validateError = true;
      this.criaErros(nomeContato, '*Campo obrigatório, precisa conter letras');
    } else if (!strings.test(nomeContato.value)) {
      validateError = true;
      this.criaErros(nomeContato, '*Campo obrigatório, precisa conter letras');
    }

    //Chegar se sobrenome é String
    if (sobrenomeContato.value.length < 1) {
    } else {
      if (!strings.test(sobrenomeContato.value)) {
        validateError = true;
        this.criaErros(sobrenomeContato, '*Precisa conter letras.');
      }
    }

    //Email ou telefone precisam ser preenchidos
    if (emailContato.value.length < 1 && telefoneContato.value.length < 1) {
      validateError = true;
      this.criaErros(emailContato, '*Precisa preencher ou email ou telefone');
      this.criaErros(
        telefoneContato,
        '*Precisa preencher ou email ou telefone'
      );
      //Você precisa preencher um dos campos
    } else {
      //Chegar se o email é valido, mas pode ser vazio
      if (emailContato.value.length < 1) {
        console.log('pode ser vazio');
      } else {
        if (!validator.isEmail(emailContato.value)) {
          validateError = true;
          this.criaErros(emailContato, '*E-mail inválido!');
        }
      }

      //Chegar se telefone tem formato válido
      const telefoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
      const contatoIsValid = telefoneRegex.test(telefoneContato.value);
      if (telefoneContato.value.length < 1) {
        console.log('pode ser vazio');
      } else {
        if (!contatoIsValid) {
          validateError = true;
          this.criaErros(
            telefoneContato,
            '*Formato de telefone inválido (XX)XXXXX-XXXX) '
          );
        }
      }
    }

    //Após passar por todas as validações e continuar false
    if (!validateError) el.submit(); //vira true e submete
  }
}
