

const input = document.querySelector('#add-todo');
const addBtn = document.getElementById('add-btn');
const clearAll = document.getElementsByClassName('clear-all')[0];
const clearDone = document.getElementsByClassName('clear-done')[0];
const save = document.getElementById('save');
const todoContainer = document.getElementById('todo-container');
const spinner = document.getElementById('spinner');
const fetchBtn = document.getElementById("fetch")
const FETCH_COUNT = 10;
let  startIndex = 0;

const todoItems = [];


function TodoItem(desciption,id,isCompleted) {
    this.desciption = desciption;
    this.id = id;
    this.isCompleted = isCompleted;
}

addBtn.addEventListener('click',(e) => createTodoItem());
// addBtn.innerHTML = '';
// let addBtnContent = addBtn.innerHTML
// console.dir(addBtnContent);

function createTodoItem(fetchedTodoItem = '') {
        if(input.value || fetchedTodoItem) {
            const p = document.createElement('p');
            const desciption = fetchedTodoItem ? fetchedTodoItem.desciption : input.value;
            const id = fetchedTodoItem ? fetchedTodoItem.id : Date.now().toString();
            const completed = fetchedTodoItem ? fetchedTodoItem.isCompleted : false;
            if(completed) p.style.textDecoration = 'line-through';
            p.innerText = desciption;
            p.setAttribute('id',id)
            p.addEventListener('click',(e) => {
                p.style.textDecoration = "line-through";
                markAsDone(e.target.id)
            })
            todoContainer.appendChild(p)
            const todo = new TodoItem(desciption,id,completed);
            todoItems.push(todo)
        }
        console.log(todoItems)
        
}



// {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
function init() {
    spinner.style.display = 'block';
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then((data) => {
        spinner.style.display = 'none';
        const spliced = data.splice(startIndex,FETCH_COUNT)
        const preparedArr = spliced.map((el) => {
            return {
                id : el.id,
                desciption : el.title,
                isCompleted : el.completed,
            }
        })
        preparedArr.forEach((el) => createTodoItem(el))
    })
    startIndex = startIndex + FETCH_COUNT;
}

function markAsDone(id) {
    todoItems.find((el) => el.id == id).isCompleted = true;
}

// init();

fetchBtn.addEventListener('click', init)

// clearDone.addEventListener('click', deleteDone)






clearAll.addEventListener('click', deleteAll)


function deleteAll(){
   todoItems.length = 0;
   todoContainer.innerHTML= '';
   localStorage.removeItem('todos')

}


