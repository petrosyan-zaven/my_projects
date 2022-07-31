//selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.todo-filter');


//events 

todoButton.addEventListener('click', addTodoFunc);
todoList.addEventListener('click', checkTodoFunc);
todoFilter.addEventListener('click', filterTodoFunc);
document.addEventListener('DOMContentLoaded', getTodos)

function addTodoFunc(event) {
    event.preventDefault();

    if( !todoInput.value.trim() ) return;

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const span1 = document.createElement('span');
    span1.classList.add('todo-text');
    span1.innerText = todoInput.value;

    const span2 = document.createElement('span');
    span2.innerHTML = '<i class="fa-solid fa-check"></i>' ;
    span2.innerHTML += '<i class="fa-solid fa-trash"></i>';

    todoDiv.appendChild(span1);
    todoDiv.appendChild(span2);
    todoList.appendChild(todoDiv);

    saveInLocalStorage(todoInput.value);

    todoInput.value = '';

}

function checkTodoFunc(event) {
    const item = event.target;
   

    if(item.classList[1] === 'fa-check') {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle('completed');

    } else if(item.classList[1] === 'fa-trash') {
        const todo = item.parentElement.parentElement;
        removeFromLocalStorage(todo.children[0].innerText)
        todo.classList.add('fall');
        todo.addEventListener('transitionend', ()=>{
            todo.remove();
        });
    }

}

function filterTodoFunc(event) {
    const todos = document.querySelectorAll('.todo');
    todos.forEach(todo =>{
        switch (event.target.value) {
            case 'all': todo.style.display = 'flex';
            break
            case 'completed': 
                if(todo.classList.contains('completed'))  todo.style.display = 'flex';
                else todo.style.display = 'none';
            break;
            case 'uncompleted':
                if( !todo.classList.contains('completed'))  todo.style.display = 'flex';
                else todo.style.display = 'none';
            break;
            default: todo.style.display = 'flex';
        }
    })
}
function getTodos() {
    let todos;

    if(localStorage.getItem('todos') == null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos') );
    }

    todos.forEach((text)=>{
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        const span1 = document.createElement('span');
        span1.classList.add('todo-text');
        span1.innerText = text;
    
        const span2 = document.createElement('span');
        span2.innerHTML = '<i class="fa-solid fa-check"></i>' ;
        span2.innerHTML += '<i class="fa-solid fa-trash"></i>';
    
        todoDiv.appendChild(span1);
        todoDiv.appendChild(span2);
        todoList.appendChild(todoDiv);
    })
}

function saveInLocalStorage(text) {
    let todos;

    if(localStorage.getItem('todos') == null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos') );
    }

    todos.push(text);
    localStorage.setItem('todos',JSON.stringify(todos) );
        

}

function removeFromLocalStorage(text) {
    let  todos = JSON.parse(localStorage.getItem('todos') );

    const index = todos.indexOf(text);
    todos.splice(index, 1)

    localStorage.setItem('todos',JSON.stringify(todos) );
        

}