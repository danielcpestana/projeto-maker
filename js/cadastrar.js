let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msg-Error')
let msgSucess = document.querySelector('#msg-Sucess')

let loginUsuario = document.querySelector('#loginUsuario');
let loginSenha = document.querySelector('#loginSenha');
let msgLoginError = document.querySelector('#msg-LoginError');


nome.addEventListener('keyup', () => {
    if(nome.value.length <= 2){
      labelNome.setAttribute('style', 'color: red')
      labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
      nome.setAttribute('style', 'border-color: red')
      validNome = false
    } else {
      labelNome.setAttribute('style', 'color: green')
      labelNome.innerHTML = 'Nome'
      nome.setAttribute('style', 'border-color: green')
      validNome = true
    }
  })

  usuario.addEventListener('keyup', () => {
    if(usuario.value.length <= 4){
      labelUsuario.setAttribute('style', 'color: red')
      labelUsuario.innerHTML = 'Usuário *Insira no minimo 5 caracteres'
      usuario.setAttribute('style', 'border-color: red')
      validUsuario = false
    } else {
      labelUsuario.setAttribute('style', 'color: green')
      labelUsuario.innerHTML = 'Usuário'
      usuario.setAttribute('style', 'border-color: green')
      validUsuario = true
    }
  })

  senha.addEventListener('keyup', () => {
    if(senha.value.length <= 5){
      labelSenha.setAttribute('style', 'color: red')
      labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres'
      senha.setAttribute('style', 'border-color: red')
      validSenha = false
    } else {
      labelSenha.setAttribute('style', 'color: green')
      labelSenha.innerHTML = 'Senha'
      senha.setAttribute('style', 'border-color: green')
      validSenha = true
    }
  })


confirmSenha.addEventListener('keyup', () => {
  if(senha.value != confirmSenha.value){
    labelConfirmSenha.setAttribute('style', 'color: red')
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
    confirmSenha.setAttribute('style', 'border-color: red')
    validConfirmSenha = false
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green')
    labelConfirmSenha.innerHTML = 'Confirmar Senha'
    confirmSenha.setAttribute('style', 'border-color: green')
    validConfirmSenha = true
  }
})



function clicando(){
    if(validNome && validUsuario && validSenha && validConfirmSenha){
        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')
    
        listaUser.push(
        {
          nomeCad: nome.value,
          userCad: usuario.value,
          senhaCad: senha.value
        }
        )
        
        localStorage.setItem('listaUser', JSON.stringify(listaUser))

        localStorage.setItem("nomeUsuario", nome.value);

        msgSucess.setAttribute('style', 'display: block')
        msgSucess.innerHTML = '<strong>Cadastrando usuário...</strong>'
        msgError.setAttribute('style', 'display: none')
        msgError.innerHTML = ''

        setTimeout(()=>{

        },3000)

        window.location.href = 'https://danielcpestana.github.io/projeto-maker/'
    }  
    else {
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
        msgSucess.innerHTML = ''
        msgSucess.setAttribute('style', 'display: none')
      }
    }
    
    function fazerLogin() {
      let usuarioDigitado = loginUsuario.value;
      let senhaDigitada = loginSenha.value;
  
      // Recuperar a lista de usuários cadastrados
      let listaUsuarios = JSON.parse(localStorage.getItem('listaUser') || '[]');
  
      // Verificar se existe um usuário com as credenciais fornecidas
      let usuarioEncontrado = listaUsuarios.find(usuario => usuario.userCad === usuarioDigitado && usuario.senhaCad === senhaDigitada);
  
      if (usuarioEncontrado) {
          // Usuário autenticado com sucesso, redirecione para a página principal
          localStorage.setItem('nomeUsuario', usuarioEncontrado.nomeCad);
          window.location.href = 'https://danielcpestana.github.io/projeto-maker/maker.html';
      } else {
          // Exibir mensagem de erro se as credenciais estiverem incorretas
          msgLoginError.setAttribute('style', 'display: block', 'color: red');
          msgLoginError.innerHTML = '<strong>Usuário ou senha incorretos</strong>';
          msgLoginError.setAttribute('style', 'color: red');
          
      }
  }
  


document.querySelector('#btn-login').addEventListener('click', fazerLogin);