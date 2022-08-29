const imageContainer = document.getElementById("card-image");
const imageTitle = document.getElementById("card-title");
const likeCounter = document.getElementById("like-count");
const listComments = document.getElementById("comments-list");
const likeButton = document.getElementById("like-button");
const form = document.getElementById("comment-form");
listComments.innerHTML = "";
const inputField = document.getElementById("comment-input");
let like;

let images = [];

const getImages = () => {
  return fetch("http://localhost:3000/images").then((response) =>
    response.json()
  );
};

function updateUI() {
  images.forEach((image) => {
    imageTitle.textContent = image.title;
    imageContainer.src = image.image;
    likeCounter.textContent = `${image.likes} likes`;
  });
}
function showCommentOnDOM(comment) {
  const commentList = document.createElement("li");
  commentList.textContent = comment.content;
  listComments.append(commentList);
}

let usercomments = [];
const getComments = () => {
  return fetch("http://localhost:3000/comments").then((response) =>
    response.json()
  );
};

function updateComments() {
  usercomments.forEach((comment) => {
    const commentList = document.createElement("li");
    commentList.textContent = comment.content;
    listComments.append(commentList);
  });
}
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
document.addEventListener("DOMContentLoaded", async () => {
  images = await getImages();
  console.log(images[0].likes);
  updateUI(images);
  usercomments = await getComments();
  updateComments(usercomments);

  likeButton.addEventListener("click", () => {
    like = images[0].likes;
    if (likeButton.textContent === "♥") {
      likeButton.textContent = "♡";
      like = like - like;
    } else {
      likeButton.textContent = "♥";
      like++;
    }
    likeCounter.textContent = `${like} likes`;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    postComments(e.target.comment.value);
  });
});
