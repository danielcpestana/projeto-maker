const usuarios = [
    {
        login: 'bruno',
        pass: 'bruninho06'

    },
    {
        login: 'daniel',
        pass: 'danics2'
    },
    {
        login: 'admin',
        pass: 'admin'
    }
]


let botao = document.getElementById('btn-login')
botao.addEventListener('click', function logar(){
    let pegaUsuario = document.getElementsByName('usuario').value
    let pegaSenha = document.getElementsByName('senha').value

    for(let i in usuarios) {
        if(pegaUsuario == usuarios(i))
        alert('ok')
    }
} )



