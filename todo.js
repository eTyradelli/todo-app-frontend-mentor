const tasksContainer = document.querySelector('.todo__body__tasks');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');
const todoCountElement = document.querySelector('.todo__count');
const taskTemplate = document.getElementById('todo__template');

const LOCAL_STORAGE_TASK_KEY = 'todo.listOfTasks';
let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];

// If local storage has no items saved, then load original HTML todos.

document.addEventListener('DOMContentLoaded', populateList);

function populateList(){
  if (tasks.length > 0 ){
    clearElement(tasksContainer);
    tasks.forEach(task => {
      appendTask(task);
      saveTasks();
    })
  }else{
    const initialTodos = document.querySelectorAll('[data-todo-item]');
    for (let todo of initialTodos){
      const checkbox = todo.querySelector('input');
      checkbox.addEventListener('change', saveTasks);
      const deleteBtn = todo.querySelector('button');
      deleteBtn.addEventListener('click', deleteTodo);
    }
  }
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}


// Every time a new todo is added, if it has input, turn it into a new todo (object) and append it in HTML.
// Then update local storage to have all tasks.

newTaskForm.addEventListener('submit', e => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  if(taskName == null || taskName === "") return;
  const task = createTask(taskName);
  newTaskInput.value = null;
  appendTask(task);
  saveTasks();
})


// Delete a single todo

function deleteTodo(){
  this.parentElement.remove();
  saveTasks();
}


function createTask(name) {
  return {
    id: Date.now().toString(),
    name: name,
    complete: false
  }
}

function appendTask(element) {
  const taskElement = document.importNode(taskTemplate.content, true);
  const checkbox = taskElement.querySelector('input');
  checkbox.id = element.id;
  checkbox.checked = element.complete;
  checkbox.addEventListener('change', saveTasks);
  const label = taskElement.querySelector('label');
  label.htmlFor = element.id;
  label.append(element.name);
  const deleteBtn = taskElement.querySelector('button');
  deleteBtn.addEventListener('click', deleteTodo);
  tasksContainer.appendChild(taskElement);
}



function saveTasks(){
  const updatedTodoList = [];
  const updatedTodos = tasksContainer.querySelectorAll('[data-todo-item]');
  updatedTodos.forEach(todo => {
    let todoObject = {
      id: todo.querySelector('input').id,
      name: todo.innerText,
      complete: todo.querySelector('input').checked
    }
    updatedTodoList.push(todoObject);
  })
  localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(updatedTodoList));
}




// Filters

