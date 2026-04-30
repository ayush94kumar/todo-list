const newtodo = document.querySelector(".newtodo");
const form = document.querySelector(".todo-form");

const title = document.querySelector("#title");
const description = document.querySelector("#description");
const date = document.querySelector("#date");
const priority = document.querySelector("#priority");

const cancel = document.querySelector("#cancel");
const output = document.querySelector("#output");

// Show form
newtodo.addEventListener("click", () => {
    form.style.display = "flex";
});

// Save todos to localStorage
function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todos from localStorage
function getTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}

// Show todos on screen
function renderTodos() {
    const todos = getTodos();

    output.innerHTML = todos.map((todo, index) => `
        <div class="todo-item">
            <input type="checkbox" class="todo-checkbox" id="check-${index}">
            <span class="todo-title"><b>${todo.title}</b></span>
            <span class="todo-date">${todo.date}</span>            
            <span class="todo-priority">${todo.priority}</span>  
            <button class="view-btn" data-index="${index}">view</button>     
        </div>
    `).join("");
}

// function view()
// {
//     const view_index=
// }

// Listen to the form 'submit', not button 'click'

form.addEventListener("submit", (e) => {
    // 1. This prevents the page from refreshing! It is strictly necessary.
    e.preventDefault(); 

    // 2. Gather the data
    const todo = {
        title: title.value,
        description: description.value,
        date: date.value,
        priority: priority.value
    };

    // 3. Save and render
    let todos = getTodos();      
    todos.push(todo);            
    saveTodos(todos);            
    renderTodos();               

    // 4. Clean up the UI
    form.reset(); // Clears the input fields for the next time
    form.style.display = "none";
});

// Cancel button
cancel.addEventListener("click", () => {
    form.style.display = "none";
});

// Show saved todos when page loads
window.addEventListener("load", renderTodos);