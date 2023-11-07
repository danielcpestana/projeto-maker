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

let msgError = document.querySelector('#msgError')
let msgSucess = document.querySelector('#msgSucess')


nome.addEventListener('keyup',()=> {
    if(nome.value.length <=2){
        labelNome.setAttribute('style','color:red')
        labelNome.innerHTML = '<strong>Insira no mínimo 3 caracteres</strong>'
        let validNome = false

    }
    else{
        labelNome.setAttribute('style','color:white')
        labelNome.innerHTML = 'Nome'
        let validNome = true

    }
})

usuario.addEventListener('keyup',()=> {
    if(usuario.value.length <=4){
        labelUsuario.setAttribute('style','color:red')
        labelUsuario.innerHTML = '<strong>Insira no mínimo 5 caracteres</strong>'
        let validUsuario = false

    }
    else{
        labelUsuario.setAttribute('style','color:white')
        labelUsuario.innerHTML = 'Usuario'
        let validUsuario = true
    }
})

senha.addEventListener('keyup',()=> {
    if(senha.value.length <=5){
        labelSenha.setAttribute('style','color:red')
        labelSenha.innerHTML = '<strong>Insira no mínimo 6 caracteres</strong>'
        let validSenha = false

    }
    else{
        labelSenha.setAttribute('style','color:white')
        labelSenha.innerHTML = 'Senha'
        let validSenha = true
    }
})

confirmSenha.addEventListener('keyup',()=> {
    if(senha.value != confirmSenha.value){
        labelConfirmSenha.setAttribute('style','color:red')
        labelConfirmSenha.innerHTML = '<strong>As senhas não são iguais</strong>'
        let confirmSenha = false
    }
    else{
        labelConfirmSenha.setAttribute('style','color:white')
        labelConfirmSenha.innerHTML = 'Confirmar Senha'
        let confirmSenha = true
    }
})

function cadastrar(){
    if(validNome && validUsuario && validSenha && validConfirmSenha){
        msgSucess.setAttribute('style','display:block')
        msgSucess.innerHTML('<strong>Cadastrando Usuário...</strong>')

    }
    else {
        msgError.setAttribute('style','display:block')
        msgSucess.innerHTML('<strong>Preencha todos os campos corretamente antes de cadastrar...</strong>')
    }
    
    
}