const localAPI = "http://localhost:3000/images/1";
const imageContainer = document.getElementById("card-image");
const imageTitle = document.getElementById("card-title");
const likeCounter = document.getElementById("like-count");
const listComments = document.getElementById("comments-list");
const likeButton = document.getElementById("like-button");
const form = document.getElementById("comment-form");
listComments.innerHTML = "";
const inputField = document.getElementById("comment-input");
let likes;
fetch("http://localhost:3000/images/1")
  .then((resp) => resp.json())
  .then((data) => imageToDOM(data));

function imageToDOM(data) {
  likes = data.likes;
  imageTitle.textContent = data.title;
  imageContainer.src = data.image;
  showlikes();
}

const commentSection = () => {
  fetch("http://localhost:3000/comments")
    .then((response) => response.json())
    .then((data) => updateCommentsDOM(data));
};

function updateCommentsDOM(data) {
  data.forEach((comment) => {
    const commentList = document.createElement("li");
    commentList.textContent = comment.content;
    listComments.append(commentList);
  });
}

commentSection();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const li = document.createElement("li");
  li.textContent = event.target.comment.value;
  listComments.appendChild(li);
  postComments(event.target.comment.value);
});

function postComments(comment) {
  fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      imageId: 1,
      content: `${comment}`,
    }),
  });
}

likeButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (likeButton.textContent === "♥") {
    likeButton.textContent = "♡";
  } else {
    showlikes();
    likeButton.textContent = "♥";
  }
  updateLikesToServer();
});

function showlikes() {
  likes++;
  likeCounter.textContent = `${likes} likes`;
}

function updateLikesToServer() {
  fetch("http://localhost:3000/images/1", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: likes,
    }),
  });
}
