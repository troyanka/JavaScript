function init (){
   if(localStorage.getItem('tasks') !== null){
    var existingTasks = JSON.parse(localStorage.getItem('tasks'));
    
    existingTasks.forEach(function(task) {
       showTask(task.taskTimeStamp, task.taskTitle, task.taskDescription);
    });
   }
}
init();

function saveToLS(taskTitle, taskDescription) {
   var taskTimeStamp = new Date().getTime();
   console.log(taskTimeStamp);
    
   var isInLS = JSON.parse(localStorage.getItem('tasks'));
   
   if(isInLS != null){
    var existingTasks = isInLS;
    existingTasks.push( { taskTimeStamp, taskTitle, taskDescription } );
    localStorage.setItem('tasks', JSON.stringify(existingTasks) );
   }
   else{
    var newTask = [];
    newTask.push( { taskTimeStamp, taskTitle, taskDescription } );
    localStorage.setItem('tasks', JSON.stringify(newTask) );
   }
}

function showTask(taskTimeStamp, taskTitle, taskDescription){
  var tasksDesc = document.querySelector('.existing-tasks');
  var taskDiv = document.createElement('div');
  taskDiv.className = 'task';
  taskDiv.setAttribute("data-note-id", taskTimeStamp);

  var taskHeader = document.createElement('h1');
  taskHeader.innerHTML = taskTitle;

  var taskDesc = document.createElement('p');
  taskDesc.innerHTML = taskDescription;

  taskDiv.appendChild(taskHeader);
  taskDiv.appendChild(taskDesc);
  tasksDesc.appendChild(taskDiv);
}

var addButton = document.querySelector('.add-task'); 
addButton.addEventListener("click", function () {
    var taskTitle = document.querySelector('.task-title').value;
    var taskDescription = document.querySelector('.task-description').value;

      saveToLS(taskTitle, taskDescription);
      //showTask();
  })