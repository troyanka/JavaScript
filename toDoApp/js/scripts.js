
let finishedTasks = localStorage.getItem('finished-tasks') ? JSON.parse(localStorage.getItem('finished-tasks')) : [];

//Checks if there are existing (finished) tasks in the LS
function init (){
  //check unfunished tasks
   if(localStorage.getItem('tasks') !== null){
    var existingTasks = JSON.parse(localStorage.getItem('tasks'));
    
    existingTasks.forEach(function(task) {
       showTask(task.timeStamp, task.taskTitle, task.description, task.DueDate, task.taskStatus);
    });
   }

   //check finished tasks
   if(finishedTasks.length > 0){
     console.log('has finishedTasks');
    //var finishedTasks = JSON.parse(localStorage.getItem('finished-tasks'));
    
    finishedTasks.forEach(function(finishedTask) {
      showTask(finishedTask.timeStamp, finishedTask.taskTitle, finishedTask.description, finishedTask.DueDate, finishedTask.taskStatus);
    });
   }
}
init();

//Save task to the LS
function saveToLS(taskTitle, description, DueDate, taskStatus) {
   var timeStamp = new Date().getTime();
   var isInLS = JSON.parse(localStorage.getItem('tasks'));
   
   if(isInLS != null){
    var existingTasks = isInLS;
    existingTasks.push( { timeStamp, taskTitle, description, DueDate, "taskStatus":taskStatus } );
    localStorage.setItem('tasks', JSON.stringify(existingTasks) );
   }
   else{
    var newTask = [];
    newTask.push( { timeStamp, taskTitle, description, DueDate, "taskStatus":taskStatus} );
    localStorage.setItem('tasks', JSON.stringify(newTask) );
   }

   return timeStamp;
}

//Remove task from the DOM & LS
function removeTask(event) {
      var taskToDeleteId = event.target.parentElement.parentElement.dataset.noteId;
      var existingTasks = JSON.parse(localStorage.getItem('tasks'));
      var indexToDelete = existingTasks.findIndex(obj => obj.timeStamp == taskToDeleteId);
      
      //push the deleted object to the finished-tasks array
      var ObjToDelete = existingTasks[indexToDelete];
      ObjToDelete.taskStatus = 'done'
      finishedTasks.push(ObjToDelete);

      existingTasks.splice(indexToDelete, 1);
      localStorage.setItem('tasks', JSON.stringify(existingTasks) );
      event.target.parentElement.parentElement.remove();

      localStorage.setItem('finished-tasks', JSON.stringify(finishedTasks)); 
}

//Show the task on the DOM
function showTask( timeStamp, taskTitle, description, DueDate, status ){

  var tasksDesc = document.querySelector('.existing-tasks');
  var doneTasksDesc = document.querySelector('.finished-tasks');

  //main div
  var taskDiv = document.createElement('div');
  taskDiv.className = 'task card border-info';
  status == 'done' && (taskDiv.className = 'task card border-info bg-success');
  taskDiv.setAttribute("data-note-id", timeStamp);

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
  
  if(status != 'done'){
  //add delete button 
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete task';
    deleteButton.className="btn btn-primary delete-task";
    deleteButton.addEventListener('click', removeTask);

    //add done button 
    var addButton = document.createElement('button');
    addButton.innerHTML = 'Done';
    addButton.className = "btn btn-success task-done";
    addButton.addEventListener('click', removeTask);
  }

  //append created task divs to the panel
    taskDiv.appendChild(taskHeader);
    taskBody.appendChild(taskDate);
    taskBody.appendChild(taskDesc);
    deleteButton && taskBody.appendChild(deleteButton);
    addButton && taskBody.appendChild(addButton);
    taskDiv.appendChild(taskBody);

    if(status == 'done'){
      doneTasksDesc.appendChild(taskDiv);
    }
    else{
      tasksDesc.appendChild(taskDiv);
    }
}

var form = document.querySelector('form');
   form.addEventListener('submit', function (e) {
      e.preventDefault();
    
      var taskTitle = document.querySelector('.task-title');
      var description = document.querySelector('.task-description');
      var DueDate = document.querySelector('.task-due-date');

      //Create timeStamp and use it as id
      var timeStamp = saveToLS(taskTitle.value, description.value, DueDate.value, 'open');
      showTask(timeStamp, taskTitle.value, description.value, DueDate.value);

      //empty form-fields
      // taskTitle.value = "";
      // description.value = "";
      // DueDate.value = "";
  });