
let finishedTasks = localStorage.getItem('finished-tasks') ? JSON.parse(localStorage.getItem('finished-tasks')) : [];
let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

const sortedTasks = tasks.slice().sort(); //// new instance of tasks array is created and sorted
const sortedFinishedTasks = finishedTasks.slice().sort(); //// new instance of finishedTasks array is created and sorted

//TODO: add clear all button localStorage.clear();

//Sort task according to their due dates
function compare(a, b) {
  const taskA = a.dueDate;
  const taskB = b.dueDate;

  let comparison = 0;
  if (taskA > taskB) {
    comparison = 1;
  } else if (taskA < taskB) {
    comparison = -1;
  }
  return comparison;
}

sortedTasks.sort(compare);
sortedFinishedTasks.sort(compare);

//Checks if there are existing (finished) tasks in the LS
function init (){
  //check unfinished tasks
   if(tasks.length > 0){
    sortedTasks.forEach(function(task) {
       showTask(task.timeStamp, task.taskTitle, task.description, task.dueDate, task.taskStatus);
    });
   }

   //check finished tasks
   if(finishedTasks.length > 0){
    //add delete finished tasks button
    var finishedTasksDesc = document.getElementsByClassName('finished')[0];

    var clearAllButton = document.createElement('button');
    clearAllButton.innerHTML = 'Clear all';
    clearAllButton.className="btn btn-primary clear-all";

    //Good article about passing params to eventListener https://toddmotto.com/avoiding-anonymous-javascript-functions/
    clearAllButton.addEventListener('click', function(){
      deleteAllTasks("finished-tasks");
    });

    finishedTasksDesc.appendChild( clearAllButton );

    sortedFinishedTasks.forEach(function(finishedTask) {
      showTask(finishedTask.timeStamp, finishedTask.taskTitle, finishedTask.description, finishedTask.dueDate, finishedTask.taskStatus);
    });
   }
}
init();

//Clear from LS function
function deleteAllTasks(arrayToBeEmpty){
  localStorage.setItem(arrayToBeEmpty, JSON.stringify([]) );
  let finishedTasksDiv = document.querySelector('.finished-tasks');
  
  while (finishedTasksDiv.firstChild) {
    finishedTasksDiv.removeChild(finishedTasksDiv.firstChild);
  }

  document.querySelector('.clear-all').remove();
}

//Save task to the LS ad return timeStamp
function saveToLS(taskTitle, description, dueDate, taskStatus) {
   var timeStamp = new Date().getTime();
   
   tasks.push( { timeStamp, taskTitle, description, dueDate, "taskStatus":taskStatus } );
   localStorage.setItem('tasks', JSON.stringify(tasks) );

   return timeStamp;
}

//Remove task from the DOM & LS
function removeTask(event) {
      var taskToDeleteId = event.target.parentElement.parentElement.dataset.noteId;
      var indexToDelete = tasks.findIndex(obj => obj.timeStamp == taskToDeleteId);
      
      //push the deleted object to the finished-tasks array
      var ObjToDelete = tasks[indexToDelete];
      ObjToDelete.taskStatus = 'done'
      finishedTasks.push(ObjToDelete);
      tasks.splice(indexToDelete, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks) );
      event.target.parentElement.parentElement.remove();

      localStorage.setItem('finished-tasks', JSON.stringify(finishedTasks)); 
}

//Show the task on the DOM
function showTask( timeStamp, taskTitle, description, dueDate, status ){

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
  taskDate.innerHTML = dueDate;
  taskDate.className = 'card-text';

  //task description text
  var taskDesc = document.createElement('p');
  taskDesc.innerHTML = description;
  taskDesc.className = 'card-text task-due-date';
  
  if(status != 'done'){
  //add delete button 
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
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

    console.log(status);

    status == 'done' ? doneTasksDesc.appendChild(taskDiv) : tasksDesc.appendChild(taskDiv);
}

var form = document.querySelector('form');
   form.addEventListener('submit', function (e) {
      e.preventDefault();
    
      var taskTitle = document.querySelector('.task-title');
      var description = document.querySelector('.task-description');
      var dueDate = document.querySelector('.task-due-date');

      //Create timeStamp and use it as id
      var timeStamp = saveToLS(taskTitle.value, description.value, dueDate.value, 'open');
      showTask(timeStamp, taskTitle.value, description.value, dueDate.value);

      //empty form-fields
      //taskTitle.value = "";
      //description.value = "";
      //dueDate.value = "";
  });