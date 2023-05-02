const postsList = document.querySelector('.posts__list');
const getPostsBtn = document.querySelector('.posts__get-posts');

const postTitle = document.querySelector('.new-post__title');
const postBody = document.querySelector('.new-post__body');
const addNewPost = document.querySelector('.new-post__add');

const modal = document.getElementById('modalForm');
const modalOpen = document.getElementById("modal__open");
const modalClose = document.getElementsByClassName("close")[0];

const pageNum = document.querySelector("#page-number");
const prevButton = document.querySelector(".prev")
const nextButton = document.querySelector(".next")

const state = {
   posts: [],
   newPost: {
      title: '',
      body: ''
   },
   editPost: {},
}

const postsPerPage = 10;
let startPost = 0;
let currentPage = 1;

const cleanData = () => {
   state.newPost.title = '';
   state.newPost.body = '';

   postTitle.value = '';
   postBody.value = '';
}

const editPost = (index) => {
   const editeblePost = state.posts[index];
   state.editPost = editeblePost;
   postTitle.value = state.editPost.title;
   postBody.value = state.editPost.body;
   modal.style.display = "block";
}

const deletePost = (index) => {
   const editeblePost = state.posts[index];
   removePostRequest(editeblePost.id);
   state.posts.splice(index, 1);
   fillPostsList(state.posts);
}

const createPost = (post, index) => `
   <div class="post">
      <div class=""post__wrapper>
      <a href="#" onclick="getPostsComments(${index})" class="wrapper__title">${post.title}</a>
      <div class="wrapper__body">${post.body}</div>
      </div>
      <div class="post__buttons">
         <button class="buttons__edit" onclick="editPost(${index})">Edit</button>
         <button class="buttons__delete" onclick="deletePost(${index})">Delete</button>
      </div>
      <div id="postComments${index}"></div>
   </div>
`

const createComment = (comment) => `
   <div class="comment">
      <div class="wrapper__title">${comment.name}</div>
      <div class="wrapper__body">${comment.email}</div>
      <div class="wrapper__body">${comment.body}</div>
   </div>
`

const fillPostsList = (posts) => {
   postsList.innerHTML = "";
   if (posts.length) {
      posts.forEach((post, index) => postsList.innerHTML += createPost(post, index));
   }
}

const getPostsComments = async (id) => {
   const replyPost = state.posts[id];
   const comments = await getCommentsRequest(replyPost.id);
   const currentPostsCommentElement = document.getElementById(`postComments${id}`);
   currentPostsCommentElement.classList.toggle("comment__body");
   currentPostsCommentElement.innerHTML = "";
   if (comments.length) {
      comments.forEach((comment) => currentPostsCommentElement.innerHTML += createComment(comment));
   }
}

postTitle.addEventListener('change', (e) => {
   if (!!state.editPost.title) {
      return state.editPost.title = e.target.value;
   }

   return state.newPost.title = e.target.value;
});

postBody.addEventListener('change', (e) => {
   if (!!state.editPost.title) {
      return state.editPost.body = e.target.value;
   }

   return state.newPost.body = e.target.value;
});

addNewPost.addEventListener('click', async () => {
   if (!!state.editPost.title || !!state.editPost.body) {
      await updatePostRequest();
   } else {
      await createPostRequest();
   }
   cleanData();
   fillPostsList(state.posts);
   modal.style.display = "none";
})

prevButton.addEventListener('click', async () => {
   currentPage = currentPage == 1 ? 1 : --currentPage;
   startPost = currentPage === 1 ? 0 : ((currentPage - 1) * postsPerPage) + 1;
   cleanPage();
   await getPostsRequest(startPost);
   fillPostsList(state.posts);
})

nextButton.addEventListener('click', async () => {
   currentPage = ++currentPage;
   startPost = ((currentPage - 1) * postsPerPage) + 1;
   cleanPage();
   await getPostsRequest(startPost);
   fillPostsList(state.posts);
})

async function getPosts () {
   state.posts = [];
   currentPage = 1;
   await getPostsRequest(0);
   fillPostsList(state.posts);
   pageNum.innerText = currentPage;
}


function getPostsRequest(start) {
   return fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${postsPerPage}`, {
         method: 'GET',
         headers: {
            "Content-type": "application/json; charset=UTF-8"
         }
      })
      .then((res) => res.json())
      .then((posts) => {
         state.posts = state.posts.concat(posts)
      });
}

function createPostRequest() {
   return fetch('https://jsonplaceholder.typicode.com/posts', {
         method: 'POST',
         body: JSON.stringify(state.newPost),
         headers: {
            "Content-type": "application/json; charset=UTF-8"
         }
      })
      .then((res) => res.json())
      .then((post) => state.posts.push(post))
}

function updatePostRequest() {
   return fetch(`https://jsonplaceholder.typicode.com/posts/${state.editPost.id}`, {
         method: 'PUT',
         body: JSON.stringify(state.editPost),
         headers: {
            "Content-type": "application/json; charset=UTF-8"
         }
      })
      .then((res) => res.json())
      .then((data) => data)
}

function removePostRequest(id) {
   return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
   })
}

function cleanPage() {
   pageNum.innerText = currentPage;
   state.posts = [];
   document.getElementsByClassName('posts__list').innerHTML = "";
}

function getCommentsRequest(id) {
   return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
         method: 'GET',
         headers: {
            "Content-type": "application/json; charset=UTF-8"
         }
      })
      .then((res) => res.json())
      .then((responseData) => {
         return responseData;
       })
}

modalOpen.onclick = function () {
   modal.style.display = "block";
}

modalClose.onclick = function () {
   modal.style.display = "none";
}

window.onclick = function (event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}

getPosts();