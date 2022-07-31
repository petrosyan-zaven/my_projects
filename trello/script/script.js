//selectors modal

const modal = document.querySelector('.modal');
const modalInput = document.querySelector('.modal input[type="text"]');
const createTodoBtn = document.querySelector('.modal input[type="submit"]');
const closeModalBtn = document.querySelector('.modal .close');

const all_status = document.querySelectorAll('.status');
const openModalBtn = document.querySelector('.add_btn');

//events

openModalBtn.addEventListener('click', openModalFunc);
closeModalBtn.addEventListener('click', closeModalFunc);
createTodoBtn.addEventListener('click', createTodoFunc);

all_status.forEach(status=> {
    status.addEventListener('dragover', dragOverFunc);
    status.addEventListener('dragenter', dragEnterFunc);
    status.addEventListener('dragleave', dragLeaveFunc);
    status.addEventListener('drop', dragDropFunc);
    status.addEventListener('click', removeTodoFunc) 
    
})

function openModalFunc() {
    modal.classList.add('active');
    modalInput.focus();
}

function closeModalFunc() {
    modal.classList.remove('active')
    modalInput.blur();
}

function createTodoFunc(e){
    e.preventDefault();
    if(!modalInput.value.trim()) return;

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.setAttribute('draggable', 'true');

    const span1 = document.createElement('span');
    span1.innerText = modalInput.value;

    const span2 = document.createElement('span');
    span2.classList.add('close');
    span2.innerText = '\u00D7'; // &times;

    todoDiv.appendChild(span1);
    todoDiv.appendChild(span2);

    todoDiv.addEventListener('dragstart', dragStartFunc);
    todoDiv.addEventListener('dragend', dragEndFunc);

    all_status[0].appendChild(todoDiv);
    modalInput.value = '';
    closeModalFunc();
    
}

function removeTodoFunc(e) {
    if(e.target.classList[0] == 'close') {
        e.target.parentElement.classList.add('fall');
        e.target.parentElement.addEventListener('transitionend', ()=> {
            e.target.parentElement.remove();
        })
    }
}
//todo block func

let draggableTodo = null;

function dragStartFunc(e) {
    draggableTodo = this;
    setTimeout(()=>{
        this.style.display = 'none';
    },2)
}

function dragEndFunc() {
    let draggableTodo = null;
    setTimeout(()=>{
        this.style.display = 'flex';
    },2)

}

// status block func

function dragOverFunc(e) {
    e.preventDefault();
}


function dragEnterFunc() {
    this.style.border = "1px solid #ccc";
}

function dragLeaveFunc() {
    this.style.border ="none";
}

function dragDropFunc() {
    this.style.border ="none";
    this.appendChild(draggableTodo)
}

