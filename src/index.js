// write your code here
const localAPI = "http://localhost:3000/images/1";
const imageContainer = document.getElementById("card-image");
const imageTitle = document.getElementById("card-title");
const likeCounter = document.getElementById("like-count");
const listComments = document.getElementById("comments-list");
const likeButton = document.getElementById("like-button");
const form = document.getElementById("comment-form");
let likes;

form.addEventListener("submit", addComment);

likeButton.addEventListener("click", () => {
  likes = likes + 1;
  showlikes();
});

fetch(localAPI)
  .then((res) => res.json())
  .then((data) => {
    updateDOM(data);
  });

function updateDOM(data) {
  likes = data.likes;
  imageContainer.src = `${data.image}`;
  imageTitle.textContent = `${data.title}`;
  showlikes();
  updateCommentsDOM(data.comments);
}

function showlikes() {
  likeCounter.textContent = `${likes} likes`;
}

function updateCommentsDOM(comments) {
  listComments.innerHTML = "";
  comments.forEach(showCommentOnDOM);
}

function showCommentOnDOM(comment) {
  const commentList = document.createElement("li");
  commentList.textContent = comment.content;
  listComments.append(commentList);
}

function addComment(e) {
  e.preventDefault();
  const userComment = e.target.comment.value;
  showCommentOnDOM({ content: userComment });
  e.target.reset();
}
