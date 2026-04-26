// script.js

const Newtodo = document.querySelector(".newtodo");
const div = document.querySelector(".todo-form");
const title = document.querySelector("#title");
const description=document.querySelector("#description");
const date=document.querySelector("#date");
const priority=document.querySelector("#priority");

Newtodo.addEventListener("click", () => {
    div.style.display = "flex";
});