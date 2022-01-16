const tasksContainer = document.querySelector('[data-todo-list]');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');
const todoCountElement = document.querySelector('[data-todo-counter]');
const taskTemplate = document.getElementById('[data-todo-template]');

const LOCAL_STORAGE_TASK_KEY = 'todo.listOfTasks';
let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];

const initialTodos = [
  {
    id: "initialTask-1",
    name: "Complete online JavaScript course",
    complete: true
  },
  {
    id: "initialTask-2",
    name: "Jog around the park 3x",
    complete: false
  },
  {
    id: "initialTask-3",
    name: "10 minutes meditation",
    complete: false
  },
  {
    id: "initialTask-4",
    name: "Read for 1 hour",
    complete: false
  },
  {
    id: "initialTask-5",
    name: "Pick up groceries",
    complete: false
  },
  {
    id: "initialTask-6",
    name: "Complete Todo App on Frontend Mentor",
    complete: false
  }
]

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
    for(let todo of initialTodos){
      appendTask(todo);
    }
    getCount()
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


function deleteTodo(){
  this.parentElement.remove();
  saveTasks();
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
  getCount()
  localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(updatedTodoList));
}


// Remaining todos counter

function getCount(){
  const incompleteTodoList = [];
  let todoWord = "";
  const incompleteTodos = tasksContainer.querySelectorAll('[data-todo-item]');
  for(let todo of incompleteTodos){
    if(!todo.querySelector('input').checked){
      incompleteTodoList.push(todo)
    }
  }
  if(incompleteTodoList.length === 1){
    todoWord = "item"
  }else if(incompleteTodoList.length > 1){
    todoWord = "items"
  }
  todoCountElement.innerHTML = `${incompleteTodoList.length} ${todoWord} remaining`
}


// Clear all complete todos

const clearCompletedBtn = document.querySelector('[data-clear-completed]');

clearCompletedBtn.addEventListener('click', clearIncompleteTodos);

function clearIncompleteTodos(){
  const allTodos = tasksContainer.querySelectorAll('[data-todo-item]');
  for (let todo of allTodos){
    if(todo.querySelector('input').checked){
      todo.remove();
    }
  }
  saveTasks();
}





// Filters

const filterAllBtns = document.querySelectorAll('[data-filter-all]');
const filterIncompleteBtns = document.querySelectorAll('[data-filter-incomplete]');
const filterCompleteBtns = document.querySelectorAll('[data-filter-complete]');

for(let btn of filterAllBtns){
  btn.addEventListener('click', () => {
    const allFilters = btn.parentElement.querySelectorAll('button');
    for(let filter of allFilters){
      filter.classList.remove('active');
    }
    btn.classList.add('active');
    filterAll()
  });
}

for(let btn of filterIncompleteBtns){
  btn.addEventListener('click', () => {
    const allFilters = btn.parentElement.querySelectorAll('button');
    for(let filter of allFilters){
      filter.classList.remove('active');
    }
    btn.classList.add('active');
    filterIncomplete()
  });
}

for(let btn of filterCompleteBtns){
  btn.addEventListener('click', () => {
    const allFilters = btn.parentElement.querySelectorAll('button');
    for(let filter of allFilters){
      filter.classList.remove('active');
    }
    btn.classList.add('active');
    filterAll()
  });
}

for(let btn of filterIncompleteBtns){
  btn.addEventListener('click', filterIncomplete);
}

for(let btn of filterCompleteBtns){
  btn.addEventListener('click', filterComplete);
}


function filterAll(){
  const allTodos = tasksContainer.querySelectorAll('[data-todo-item]');
  for (let todo of allTodos){
    todo.style.display = "grid";
  }
}

function filterIncomplete(){
  const allTodos = tasksContainer.querySelectorAll('[data-todo-item]');
  for (let todo of allTodos){
    if(!todo.querySelector('input').checked){
      todo.style.display = "grid";
    }else {
      todo.style.display = "none";
    }
  }
}

function filterComplete(){
  const allTodos = tasksContainer.querySelectorAll('[data-todo-item]');
  for (let todo of allTodos){
    if(!todo.querySelector('input').checked){
      todo.style.display = "none";
    }else {
      todo.style.display = "grid";
    }
  }
}




// Drag n drop

window.addEventListener('load', function () {
  draggables = document.querySelectorAll('.draggable');
  
  draggables.forEach(draggable => {
    
    draggable.addEventListener('dragstart', e => {
      draggable.classList.add('dragging');
      const img = new Image();
      img.src = 'images/todo-dragndrop-transparency.png';
      e.dataTransfer.setDragImage(img, 0, 0);
    })
    
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
      saveTasks();
    })
    
  })

  tasksContainer.addEventListener('dragover', e=> {
    e.preventDefault();
    const afterElement = getDragAfterElement(tasksContainer, e.clientY);
    const currentDraggable = document.querySelector('.draggable.dragging');
    if (afterElement == null) {
      tasksContainer.appendChild(currentDraggable);
    } else {
      tasksContainer.insertBefore(currentDraggable, afterElement);
    }
  })

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
  
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }
  
})

