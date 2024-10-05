const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${todo.done ? 'checked' : ''} onchange="toggleTodo(${index})">
            <span>${todo.text}</span>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        if (todo.done) {
            li.classList.add('done');
        }
        todoList.appendChild(li);
    });
}

function addTodo(e) {
    e.preventDefault();
    const newTodoText = todoInput.value.trim();
    if (newTodoText) {
        todos.push({ text: newTodoText, done: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].done = !todos[index].done;
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

todoForm.addEventListener('submit', addTodo);

renderTodos();