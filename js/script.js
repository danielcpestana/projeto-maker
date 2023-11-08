// Função para salvar uma postagem no Local Storage
function savePostToLocalStorage(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Função para carregar postagens do Local Storage
function loadPosts() {
    return JSON.parse(localStorage.getItem("posts")) || [];
}

function addComment(button, postIndex) {
    const posts = loadPosts();
    const post = posts[postIndex];
    const commentInput = button.parentElement.querySelector("input[type='text']");
    const commentText = commentInput.value;

    if (commentText.trim() === "") {
        alert("Digite algo no comentário.");
        return;
    }

    post.comments.push(commentText);
    savePostToLocalStorage(posts);

    // Atualize o conteúdo dos comentários na página
    displayPosts(loadPosts());

    // Limpe o campo de entrada de comentários
    commentInput.value = "";
}


function displayPosts(posts) {
    const postContainer = document.querySelector("#post-container");
    postContainer.innerHTML = "";

    posts.forEach((post, postIndex) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = `
            <div class="user-info">
                <p><strong>${post.user}</strong></p>
                <p class="post-text">${post.text}</p>
            </div>
            <div class="comments">
                <h2>Comentários</h2>
                <div class="comment-list" id="comment-list-${postIndex}"></div>
                <div class="comment-input">
                    <input type="text" placeholder="Adicione um comentário">
                    <button onclick="addComment(this, ${postIndex})">Comentar</button>
                </div>
                <button class="like-button" data-likes="${post.likes}" onclick="likePost(this)">Curtir (${post.likes} ${post.likes === 1 ? 'curtida' : 'curtidas'})</button>
            </div>
        `;

        const commentList = postDiv.querySelector(`#comment-list-${postIndex}`);
        if (post.comments && post.comments.length > 0) {
            post.comments.forEach(comment => {
                const commentItem = document.createElement("div");
                commentItem.textContent = comment;
                commentList.appendChild(commentItem);
            });
        }

        

       

        postContainer.appendChild(postDiv);
    });
}



// Função para adicionar uma nova postagem
function addPost() {
    const postText = document.querySelector("#post-textarea").value;
    if (postText.trim() === "") {
        alert("Digite algo no post.");
        return;
    }

    const post = {
        user: "Usuário", // Substitua pelo nome do usuário ou qualquer outra informação que desejar
        text: postText,
        likes: 0,
        comments: []
    };

    const posts = loadPosts();
    posts.push(post);

    // Armazene a postagem no Local Storage
    savePostToLocalStorage(posts);

    // Chame a função para exibir as postagens (atualize a lista de postagens)
    displayPosts(loadPosts());

    // Limpe o campo de texto após a postagem
    document.querySelector("#post-textarea").value = "";

   
}

function likePost(button) {
    const posts = loadPosts();
    const postDiv = button.closest(".post");
    const postIndex = Array.from(postDiv.parentNode.children).indexOf(postDiv);

    const post = posts[postIndex];

    if (button.classList.contains("liked")) {
        // Descurtir o post (remover a classe "liked" e diminuir o número de curtidas)
        button.classList.remove("liked");
        post.likes -= 1;
    } else {
        // Curtir o post (adicionar a classe "liked" e aumentar o número de curtidas)
        button.classList.add("liked");
        post.likes += 1;
    }

    button.setAttribute("data-likes", post.likes);
    button.textContent = `Curtir (${post.likes} ${post.likes === 1 ? "curtida" : "curtidas"})`;

    // Atualize o post no array de posts e salve no armazenamento local
    posts[postIndex] = post;
    savePostToLocalStorage(posts);
}




// Função para adicionar um comentário a uma postagem de exemplo
function addCommentExample(button) {
    const postDiv = button.closest(".example-post");
    const commentInput = postDiv.querySelector(".comment-input input");
    const commentText = commentInput.value;
    
    if (commentText.trim() === "") {
        alert("Digite algo no comentário.");
        return;
    }
    
    const postID = postDiv.getAttribute("data-post-id");
    const comments = loadComments() || {};
    
    if (!comments[postID]) {
        comments[postID] = [];
    }
    
    comments[postID].push(commentText);
    
    // Armazene os comentários no Local Storage
    saveComments(comments);
    
    commentInput.value = "";
    
    // Atualize os comentários na postagem de exemplo
    displayExampleComments(postID);
}

// Função para exibir os comentários nas postagens de exemplo
function displayExampleComments() {
    const examplePosts = document.querySelectorAll(".example-post");
    
    examplePosts.forEach(postDiv => {
        const postID = postDiv.getAttribute("data-post-id");
        const commentList = postDiv.querySelector(".comment-list");
        const comments = loadComments();
        
        if (comments && comments[postID]) {
            commentList.innerHTML = ""; // Limpe a lista de comentários
            
            comments[postID].forEach(commentText => {
                const commentItem = document.createElement("div");
                commentItem.textContent = commentText;
                commentList.appendChild(commentItem);
            });
        }
    });
}

// Chame a função para exibir os comentários nas postagens de exemplo ao carregar a página
displayExampleComments();

// Função para carregar os comentários do Local Storage
function loadComments() {
    return JSON.parse(localStorage.getItem("comments"));
}

// Função para salvar os comentários no Local Storage
function saveComments(comments) {
    localStorage.setItem("comments", JSON.stringify(comments));
}

function likePostExample(button, postID) {
    const liked = button.getAttribute("data-liked") === "true";
    let likesCount = parseInt(button.getAttribute("data-likes"));
    
    if (liked) {
        // Descurtir o post
        button.setAttribute("data-liked", "false");
        likesCount--;
    } else {
        // Curtir o post
        button.setAttribute("data-liked", "true");
        likesCount++;
    }
    
    button.setAttribute("data-likes", likesCount);
    button.textContent = `Curtir (${likesCount})`;
    
    // Atualize o Local Storage com as informações de curtidas
    updateLocalStorageLikes(postID, liked, likesCount);
}


function updateLocalStorageLikes(postID, liked, likesCount) {
    const exampleLikes = loadExampleLikes() || {};
    exampleLikes[postID] = { liked, likesCount };
    localStorage.setItem("exampleLikes", JSON.stringify(exampleLikes));
}


function loadExampleLikes() {
    return JSON.parse(localStorage.getItem("exampleLikes")) || {};
}

function displayExampleLikes() {
    const exampleLikes = loadExampleLikes();
    const examplePosts = document.querySelectorAll(".example-post");
    
    examplePosts.forEach(postDiv => {
        const postID = postDiv.getAttribute("data-post-id");
        const likeButton = postDiv.querySelector(".like-button");
        const likesInfo = exampleLikes[postID] || { liked: false, likesCount: 0 };
        
        likeButton.setAttribute("data-liked", likesInfo.liked);
        likeButton.setAttribute("data-likes", likesInfo.likesCount);
        likeButton.textContent = `Curtir (${likesInfo.likesCount})`;
        if (likesInfo.liked) {
            likeButton.classList.add("liked");
        }
    });
}

function resetLikes() {
    const examplePosts = document.querySelectorAll(".example-post");
    examplePosts.forEach(postDiv => {
        const likeButton = postDiv.querySelector(".like-button");
        likeButton.setAttribute("data-liked", "false");
        likeButton.setAttribute("data-likes", "0");
        likeButton.textContent = "Curtir (0)";
        likeButton.classList.remove("liked");
    });
    
    // Redefina as informações de curtidas no Local Storage
    localStorage.removeItem("exampleLikes");
}



// Event listener para reverter destaque quando o campo de pesquisa está vazio
const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("input", function() {
    if (this.value.trim() === "") {
        clearHighlight();
    }
});

// Função para lidar com a entrada no campo de pesquisa
function handleSearchInput(event) {
    if (event.key === "Enter") {
        searchPosts();
    }
}

// Função para destaque de palavras-chave
function highlightKeywords(text, keywords) {
    const regex = new RegExp(keywords, "gi");
    return text.replace(regex, match => `<span class="highlighted">${match}</span>`);
}

// Função para pesquisa de postagens
function searchPosts() {
    const searchInput = document.querySelector("#search-input");
    const keyword = searchInput.value.trim().toLowerCase();

    const postTextElements = document.querySelectorAll(".post-text");

    postTextElements.forEach(postTextElement => {
        const postText = postTextElement.textContent.toLowerCase();
        const highlightedText = highlightKeywords(postTextElement.textContent, keyword);

        // Remover destaque anterior
        postTextElement.innerHTML = highlightedText;
    });
}

// Função para reverter destaque de palavras-chave
function clearHighlight() {
    const postTextElements = document.querySelectorAll(".post-text");

    postTextElements.forEach(postTextElement => {
        postTextElement.innerHTML = postTextElement.textContent;
    });
}


// Função para excluir todas as postagens do Local Storage
function clearAllPosts() {
    localStorage.removeItem("posts");
    displayPosts([]); // Atualize a exibição para mostrar a lista vazia de postagens
}

// // // Função para apagar todos os comentários nas postagens de exemplo
//  function clearAllExampleComments() {
//     const examplePosts = document.querySelectorAll(".example-post");

//     examplePosts.forEach(postDiv => {
//         const postID = postDiv.getAttribute("data-post-id");
//         clearComments(postID);
//          displayExampleComments(postID); // Atualize a exibição de comentários após a limpeza
//      });
//  }

//  // Função para apagar os comentários de uma postagem específica no Local Storage
//  function clearComments(postID) {
//     const comments = loadComments() || {};

//      if (comments[postID]) {
//         comments[postID] = [];
//         saveComments(comments);
//      }
// }

// // // Chame a função para apagar todos os comentários nas postagens de exemplo
//  clearAllExampleComments();

const clearPostsButton = document.querySelector("#clear-posts-button");

clearPostsButton.addEventListener("click", clearAllPosts);

// Carregue e exiba as postagens ao carregar a página
window.addEventListener("load", () => {
    displayPosts(loadPosts());
    displayExampleLikes();
});

