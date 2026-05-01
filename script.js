const newtodo = document.querySelector(".newtodo");
const form = document.querySelector(".todo-form");

const title = document.querySelector("#title");
const description = document.querySelector("#description");
const date = document.querySelector("#date");
const priority = document.querySelector("#priority");

const cancel = document.querySelector("#cancel");
const output = document.querySelector("#output");

// this is for not creating newtodo after click on edit
let editindex = -1;
// Show form
newtodo.addEventListener("click", () => {
    editindex = -1;
    form.reset();
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
            <input type="checkbox" class="todo-checkbox" data-index="${index}" ${todo.completed ? "checked" : ""}>
            <span class="todo-title"><b>${todo.title}</b></span>
            <span class="todo-date">${todo.date}</span>            
            <span class="todo-priority">${todo.priority}</span>  
            <button class="edit_btn" data-index="${index}">edit</button>     
            <button class="del_btn" data-index="${index}">Del</button>
        </div>
    `).join("");
}

//Listen for edit
output.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit_btn")) {
        const click_ind = e.target.dataset.index;
        const todos = getTodos();
        const specificTodo = todos[click_ind];

        title.value = specificTodo.title;
        description.value = specificTodo.description;
        date.value = specificTodo.date;
        priority.value = specificTodo.priority;

        editindex = click_ind;

        form.style.display = "flex";
    }
    //Handle Delete button
    if(e.target.classList.contains("del_btn")) 
    {
        const click_ind=e.target.dataset.index;
        let todos= getTodos();
        //using splice to removes on specfic index
        todos.splice(click_ind,1);
        saveTodos(todos);
        renderTodos();
    }

});

//Listen for checkbox 
output.addEventListener("change", (e) => {
    if (e.target.classList.contains("todo-checkbox")) {
        const click_ind = e.target.dataset.index;
        const todos = getTodos();
        todos[click_ind].completed = e.target.checked;
        saveTodos(todos);
    }
});

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
    //check editidex and to avoid new creation after edit
    if (editindex === -1) {
        todo.completed = false;
        todos.push(todo);
    } else {
        todo.completed = todos[editindex].completed;
        todos[editindex] = todo;
    }
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