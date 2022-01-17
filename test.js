// Drag n drop

window.addEventListener('load', dragFunctionality);

function dragFunctionality() {
  draggables = document.querySelectorAll('.draggable');
  dragStart();
  dragOver();
   
}

function dragStart(){
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
}

function dragOver(){
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
}

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









// Drag n drop

window.addEventListener('load', dragFunctionality);

function dragFunctionality() {
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
  
}