const form = document.querySelector("form");
const input = document.querySelector("input");
const submit = document.getElementById("submit-btn");
const spinner = document.querySelector(".spinner");
const usersWrapper = document.querySelector(".users-wrapper");
const clear = document.querySelector(".clear-btn");

const fetchUsers = async (user) => {
  try {
    spinner.style.display = "flex";
    const res = await fetch(`https://api.github.com/search/users?q=${user}`);
    const users = await res.json();
    for (let i = 0; i < users.items.length; i++) {
      usersWrapper.innerHTML += `
      <div class="user">
    <div class="imageUser"><img src=${users.items[i].avatar_url}></div>
    <h3>${users.items[i].login}</h3>
    <div class="userInfo">
      <a href=${users.items[i].html_url} target="_blank">profile</a>
    </div>
  </div>
      `;
    }
  } catch (error) {
    console.log(error);
  } finally {
    spinner.style.display = "none";
  }
};

clear.addEventListener("click", clearAllUsers);

function clearAllUsers() {
  usersWrapper.innerHTML = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = input.value.trim();
  if (inputValue) {
    fetchUsers(inputValue);
  }
});
