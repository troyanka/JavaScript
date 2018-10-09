//Checks if there are existing (finished) tasks in the LS
function init (){
  //check unfunished tasks
   if(localStorage.getItem('tasks') !== null){
    var existingTasks = JSON.parse(localStorage.getItem('tasks'));
    
    existingTasks.forEach(function(task) {
       showTask(task.TimeStamp, task.taskTitle, task.description, task.DueDate, task.taskStatus);
    });
   }

   //check funished tasks
   if(localStorage.getItem('finished-tasks') !== null){
    var finishedTasks = JSON.parse(localStorage.getItem('finished-tasks'));
    
    finishedTasks.forEach(function(finishedTask) {
       showTask(finishedTask.TimeStamp, finishedTask.taskTitle, finishedTask.description, finishedTask.DueDate, finishedTask.taskStatus);
    });
   }
}
init();

//Save task to the LS
function saveToLS(taskTitle, description, DueDate, taskStatus) {
   var TimeStamp = new Date().getTime();
   var isInLS = JSON.parse(localStorage.getItem('tasks'));
   
   if(isInLS != null){
    var existingTasks = isInLS;
    existingTasks.push( { TimeStamp, taskTitle, description, DueDate, "taskStatus":taskStatus } );
    localStorage.setItem('tasks', JSON.stringify(existingTasks) );
   }
   else{
    var newTask = [];
    newTask.push( { TimeStamp, taskTitle, description, DueDate, "taskStatus":taskStatus} );
    localStorage.setItem('tasks', JSON.stringify(newTask) );
   }

   return TimeStamp;
}
//Remove task from the DOM & LS
function removeTask(event) {
      var taskToDeleteId = event.target.parentElement.parentElement.dataset.noteId;
      var existingTasks = JSON.parse(localStorage.getItem('tasks'));
      var indexToDelete = existingTasks.findIndex(obj => obj.TimeStamp == taskToDeleteId);
      existingTasks.splice(indexToDelete, 1);
      localStorage.setItem('tasks', JSON.stringify(existingTasks) );
      event.target.parentElement.parentElement.remove();
}

//Show the task on the DOM
function showTask(TimeStamp, taskTitle, description, DueDate, status ){
  //TODO: take care of status
  
  var tasksDesc = document.querySelector('.existing-tasks');
  
  //main div
  var taskDiv = document.createElement('div');
  taskDiv.className = 'task card border-info';
  taskDiv.setAttribute("data-note-id", TimeStamp);

  //task body
  var taskBody = document.createElement('div');
  taskBody.className = 'card-body';
  
  //task title
  var taskHeader = document.createElement('div');
  taskHeader.innerHTML = taskTitle;
  taskHeader.className = 'card-header';

 //task due date
  var taskDate = document.createElement('p');
  taskDate.innerHTML = DueDate;
  taskDate.className = 'card-text';

  //task description text
  var taskDesc = document.createElement('p');
  taskDesc.innerHTML = description;
  taskDesc.className = 'card-text task-due-date';

  //add delete button 
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete task';
    deleteButton.className="btn btn-primary delete-task";
    deleteButton.addEventListener('click', removeTask);

  //add done button 
      var addButton = document.createElement('button');
      addButton.innerHTML = 'Done';
      addButton.className="btn btn-success task-done";
      //addButton.addEventListener('click', doneTask);
    
  //append created task divs to the panel
    taskDiv.appendChild(taskHeader);
    taskBody.appendChild(taskDate);
    taskBody.appendChild(taskDesc);
    taskBody.appendChild(deleteButton);
    taskBody.appendChild(addButton);
    taskDiv.appendChild(taskBody);
    tasksDesc.appendChild(taskDiv);
}

//Get the values that the user typed
    var addButton = document.querySelector('.add-task'); 
    addButton.addEventListener("click", function () {
    var taskTitle = document.querySelector('.task-title').value;
    var description = document.querySelector('.task-description').value;
    var DueDate = document.querySelector('.task-due-date').value;

//Create timestamp and use it as id
    var TimeStamp = saveToLS(taskTitle, description, DueDate, 'open');
    showTask(TimeStamp, taskTitle, description, DueDate);
  })