function toggleMenu(){
    const menuMobile = document.getElementById('menu-mobile')

    if(menuMobile.className==="menu-mobile-active"){
        menuMobile.className = "menu-mobile"
    }else{
        menuMobile.className = "menu-mobile-active"
    }
}

function addPost() {
    const postText = document.querySelector("#post-textarea").value;
    if (postText.trim() === "") {
        alert("Digite algo no post.");
        return;
    }

    const postContainer = document.querySelector("#post-container");

    // Crie uma nova div para a postagem
    const postDiv = document.createElement("div");
    postDiv.className = "new-post"; // Aplicando a classe de estilo

    // Crie uma div para a foto e nome do usuário
    const userDiv = document.createElement("div");
    userDiv.className = "user-profile";

    // Adicione a foto do usuário
    const userImg = document.createElement("img");
    userImg.src = "imagens/Gojo-Satoru.jpg";
    userImg.id = 'imagem-perfil'
    // Substitua pelo caminho correto da imagem do usuário

    // Adicione o nome do usuário
    const userName = document.createElement("p");
    userName.textContent = "Usuário"; // Substitua pelo nome do usuário

    // Adicione o nome e a imagem do usuário à div do usuário
    userDiv.appendChild(userImg);
    userDiv.appendChild(userName);

    // Adicione a div do usuário à div da postagem
    postDiv.appendChild(userDiv);

    // Crie um parágrafo para exibir o conteúdo do post
    const postParagraph = document.createElement("p");
    postParagraph.textContent = postText;

    postParagraph.classList.add("txt-post");

    // Adicione o parágrafo à div da postagem
    postDiv.appendChild(postParagraph);

    // Adicione a seção de comentários à nova postagem
    const commentsSection = document.createElement("div");
    commentsSection.className = "comments";
    commentsSection.innerHTML = `
        <h2>Comentários</h2>
        <div class="comment-list" id="comment-list"></div>
        <div class="comment-input">
            <input type="text" id="comment-input" placeholder="Adicione um comentário">
            <button onclick="addComment(this)">Comentar</button>
        </div>
    `;

    postDiv.appendChild(commentsSection);

    // Adicione a nova postagem à lista (no início para exibir os posts mais recentes primeiro)
    postContainer.insertBefore(postDiv, postContainer.firstChild);

    // Adicione a classe 'show' para iniciar a transição
    postDiv.classList.add("show");
    
    // Crie um novo botão de curtir
    const likeButton = document.createElement("button");
    likeButton.className = "like-button";
    likeButton.textContent = "Curtir";
    likeButton.onclick = function() {
        likePost(likeButton);
    };
    
    likeButton.setAttribute("data-likes", 0); // Inicialmente, o número de curtidas é zero


    // Adicione o botão de curtir à nova postagem
    postDiv.appendChild(likeButton); // Correção: use 'postDiv' em vez de 'newPost'


    // Limpe o campo de texto após a postagem
    document.querySelector("#post-textarea").value = "";
}

function addComment(button) {
    const commentInput = button.previousElementSibling; // Encontra o campo de entrada de comentário
    const commentText = commentInput.value;

    if (commentText.trim() === "") {
        alert("Digite algo no comentário.");
        return;
    }

    const commentList = button.parentElement.previousElementSibling; // Encontra a lista de comentários

    // Crie um novo elemento para o comentário
    const comment = document.createElement("div");
    comment.className = "comment";
    comment.textContent = commentText;

    // Adicione o comentário à lista de comentários
    commentList.appendChild(comment);

    // Limpe o campo de entrada do comentário
    commentInput.value = "";
}

function likePost(button) {
    // Verifique se o botão foi clicado
    if (button.classList.contains("liked")) {
        // Se já foi curtido, descurta (remova a classe 'liked')
        button.classList.remove("liked");
        // Reduza o número de curtidas
        const likes = parseInt(button.getAttribute("data-likes"));
        button.setAttribute("data-likes", likes - 1);
    } else {
        // Se não foi curtido, curta (adicione a classe 'liked')
        button.classList.add("liked");
        // Aumente o número de curtidas
        const likes = parseInt(button.getAttribute("data-likes"));
        button.setAttribute("data-likes", likes + 1);
    }

    // Atualize o texto do botão com o número de curtidas
    const likes = parseInt(button.getAttribute("data-likes"));
    button.textContent = `Curtir (${likes} ${likes === 1 ? 'curtida' : 'curtidas'})`;
}

function searchPosts() {
    const searchInput = document.querySelector("#search-input");
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Seleciona todas as postagens no seu contêiner de postagens
    const postContainer = document.querySelector("#post-container");
    const posts = postContainer.querySelectorAll(".new-post");

    // Itera por todas as postagens
    posts.forEach((post) => {
        const postTextElement = post.querySelector(".txt-post");
        const postText = postTextElement.textContent.toLowerCase();

        // Sublinhe a palavra-chave no texto da postagem
        const highlightedText = postText.replace(
            new RegExp(searchTerm, "gi"),
            (match) => `<span class="highlight">${match}</span>`
        );

        postTextElement.innerHTML = highlightedText;

        if (postText.includes(searchTerm)) {
            // Mostra a postagem se a palavra-chave estiver presente
            post.style.display = "block";
        } else {
            // Oculta a postagem que não corresponde à pesquisa
            post.style.display = "none";
        }
    });
}




// Função para exibir os posts
function displayPosts(posts) {
    const postContainer = document.querySelector("#post-container");
  
    // Limpe o conteúdo atual do contêiner de postagens
    postContainer.innerHTML = "";
  
    // Itere pelos posts e exiba cada um
    posts.forEach((post, index) => {
      const postDiv = document.createElement("div");
      postDiv.className = "new-post";
  
      // Crie um elemento para exibir o nome do usuário
      const userDiv = document.createElement("div");
      userDiv.className = "user-profile";
  
      // Adicione a imagem do usuário (substitua pelo caminho correto)
      const userImg = document.createElement("img");
      userImg.src = "imagens/Gojo-Satoru.jpg";
      userImg.id = 'imagem-perfil'; // Adicione o ID da imagem se necessário
  
      // Adicione o nome do usuário (substitua pelo nome do usuário)
      const userName = document.createElement("p");
      userName.textContent = post.user;
  
      // Adicione a imagem e o nome do usuário à div do usuário
      userDiv.appendChild(userImg);
      userDiv.appendChild(userName);
  
      // Adicione a div do usuário à div do post
      postDiv.appendChild(userDiv);
  
      // Crie um parágrafo para exibir o texto do post
      const postParagraph = document.createElement("p");
      postParagraph.textContent = post.text;
      postParagraph.classList.add("txt-post");
  
      // Adicione o parágrafo à div do post
      postDiv.appendChild(postParagraph);
  
      // Crie um botão de curtir e exiba o número de curtidas
      const likeButton = document.createElement("button");
      likeButton.className = "like-button";
      likeButton.textContent = `Curtir (${post.likes} ${post.likes === 1 ? 'curtida' : 'curtidas'})`;
  
      likeButton.onclick = function() {
        likePost(likeButton, post);
      };
  
      postDiv.appendChild(likeButton);
  
      // Crie a seção de comentários
      const commentsSection = document.createElement("div");
      commentsSection.className = "comments";
  
      // Crie uma lista de comentários
      const commentList = document.createElement("div");
      commentList.className = "comment-list";
  
      // Adicione os comentários à lista
      post.comments.forEach((comment) => {
        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";
        commentDiv.textContent = comment;
        commentList.appendChild(commentDiv);
      });
  
      commentsSection.appendChild(commentList);
  
      // Crie o campo de entrada de comentários
      const commentInput = document.createElement("div");
      commentInput.className = "comment-input";
  
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.placeholder = "Adicione um comentário";
  
      const commentButton = document.createElement("button");
      commentButton.textContent = "Comentar";
  
      commentButton.onclick = function() {
        addComment(inputField, post);
      };
  
      commentInput.appendChild(inputField);
      commentInput.appendChild(commentButton);
  
      commentsSection.appendChild(commentInput);
  
      // Adicione a seção de comentários à div do post
      postDiv.appendChild(commentsSection);
  
      // Adicione o post à lista de posts
      postContainer.appendChild(postDiv);
    });
  }

  
  
  
  // Carregue os posts ao iniciar a página
  const initialPosts = loadPosts();
  displayPosts(initialPosts);
  