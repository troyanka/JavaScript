function init (){
   if(localStorage.getItem('tasks') !== null){
    var existingTasks = JSON.parse(localStorage.getItem('tasks'));
    
    existingTasks.forEach(function(task) {
       showTask(task.taskTimeStamp, task.taskTitle, task.taskDescription, task.taskDueDate);
    });
   }
}
init();

function saveToLS(taskTitle, taskDescription, taskDueDate) {
   var taskTimeStamp = new Date().getTime();
   var isInLS = JSON.parse(localStorage.getItem('tasks'));
   
   if(isInLS != null){
    var existingTasks = isInLS;
    existingTasks.push( { taskTimeStamp, taskTitle, taskDescription, taskDueDate } );
    localStorage.setItem('tasks', JSON.stringify(existingTasks) );
   }
   else{
    var newTask = [];
    newTask.push( { taskTimeStamp, taskTitle, taskDescription, taskDueDate } );
    localStorage.setItem('tasks', JSON.stringify(newTask) );
   }

   return taskTimeStamp;
}

function removeTask(event) {
      var taskToDeleteId = event.target.parentElement.parentElement.dataset.noteId;
      var existingTasks = JSON.parse(localStorage.getItem('tasks'));
      var indexToDelete = existingTasks.findIndex(obj => obj.taskTimeStamp == taskToDeleteId);
      existingTasks.splice(indexToDelete, 1);
      localStorage.setItem('tasks', JSON.stringify(existingTasks) );
      event.target.parentElement.parentElement.remove();
}

function showTask(taskTimeStamp, taskTitle, taskDescription, taskDueDate ){

    console.log(taskDueDate);
  var tasksDesc = document.querySelector('.existing-tasks');
  
  //main div
  var taskDiv = document.createElement('div');
  taskDiv.className = 'task card border-info';
  taskDiv.setAttribute("data-note-id", taskTimeStamp);

  //task body
  var taskBody = document.createElement('div');
  taskBody.className = 'card-body';
  
  //task title
  var taskHeader = document.createElement('div');
  taskHeader.innerHTML = taskTitle;
  taskHeader.className = 'card-header';

 //task due date
  var taskDate = document.createElement('p');
  taskDate.innerHTML = taskDueDate;
  taskDate.className = 'card-text';

  //task description text
  var taskDesc = document.createElement('p');
  taskDesc.innerHTML = taskDescription;
  taskDesc.className = 'card-text task-due-date';

  //delete button 
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete task';
    deleteButton.className="btn btn-primary delete-task";
    deleteButton.addEventListener('click', removeTask);
    
  //append created task divs to the panel
    taskDiv.appendChild(taskHeader);
    taskBody.appendChild(taskDate);
    taskBody.appendChild(taskDesc);
    taskBody.appendChild(deleteButton);
    taskDiv.appendChild(taskBody);
    tasksDesc.appendChild(taskDiv);
}

    var addButton = document.querySelector('.add-task'); 
    addButton.addEventListener("click", function () {
    var taskTitle = document.querySelector('.task-title').value;
    var taskDescription = document.querySelector('.task-description').value;
    var taskDueDate = document.querySelector('.task-due-date').value;
    console.log('fhdh', taskDueDate);

    var taskTimeStamp = saveToLS(taskTitle, taskDescription, taskDueDate);
    showTask(taskTimeStamp, taskTitle, taskDescription, taskDueDate);
  })