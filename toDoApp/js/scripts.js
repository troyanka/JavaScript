
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
       showTask({"timeStamp":task.timeStamp, "taskTitle":task.taskTitle, "description":task.description, "dueDate":task.dueDate});
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
      showTask({"timeStamp":finishedTask.timeStamp, "taskTitle":finishedTask.taskTitle, "description":finishedTask.description, "dueDate":finishedTask.dueDate});
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
function saveToLS( myTask ) {
   var timeStamp = new Date().getTime();

   myTask.timeStamp = timeStamp;

   tasks.push( myTask );
   localStorage.setItem('tasks', JSON.stringify(tasks) );

   return timeStamp;
}

//Remove task from the DOM & LS
function finishTask(event) {
      var taskToDeleteId = event.target.parentElement.parentElement.dataset.noteId;
      var indexToDelete = tasks.findIndex(obj => obj.timeStamp == taskToDeleteId);

      // //push the deleted object to the finished-tasks array
      var ObjToDelete = tasks[indexToDelete];
      finishedTasks.push(ObjToDelete);
      // tasks.splice(indexToDelete, 1);
      // localStorage.setItem('tasks', JSON.stringify(tasks) );
      // event.target.parentElement.parentElement.remove();

      deleteTask(event);

      localStorage.setItem('finished-tasks', JSON.stringify(finishedTasks)); 
}

function deleteTask(event) {
  var taskToDeleteId = event.target.parentElement.parentElement.dataset.noteId;
  var indexToDelete = tasks.findIndex(obj => obj.timeStamp == taskToDeleteId);
  var ObjToDelete = tasks[indexToDelete];
  tasks.splice(indexToDelete, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks) );
  event.target.parentElement.parentElement.remove();
}



//Show the task on the DOM
function showTask( taskObject ){
  var tasksDesc = document.querySelector('.existing-tasks');
  var doneTasksDesc = document.querySelector('.finished-tasks');

  //main div
  var taskDiv = document.createElement('div');
  taskDiv.className = 'task card border-info';
  //taskObject.taskStatus == 'done' && (taskDiv.className = 'task card border-info')
  taskDiv.setAttribute("data-note-id", taskObject.timeStamp);

  //task body
  var taskBody = document.createElement('div');
  taskBody.className = 'card-body';
  
  //task title
  var taskHeader = document.createElement('div');
  taskHeader.innerHTML = taskObject.taskTitle;
  taskHeader.className = 'card-header';

 //task due date
  var taskDate = document.createElement('p');
  taskDate.innerHTML = taskObject.dueDate;
  taskDate.className = 'card-text';

  //task description text
  var taskDesc = document.createElement('p');
  taskDesc.innerHTML = taskObject.description;
  taskDesc.className = 'card-text task-due-date';
  
  if(taskObject.taskStatus != 'done'){
  //add delete button 
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.className="btn btn-primary delete-task";
    deleteButton.addEventListener('click', deleteTask);

    //add done button 
    var addButton = document.createElement('button');
    addButton.innerHTML = 'Done';
    addButton.className = "btn btn-success task-done";
    addButton.addEventListener('click', finishTask);
  }

  //append created task divs to the panel
    taskDiv.appendChild(taskHeader);
    taskBody.appendChild(taskDate);
    taskBody.appendChild(taskDesc);
    deleteButton && taskBody.appendChild(deleteButton);
    addButton && taskBody.appendChild(addButton);
    taskDiv.appendChild(taskBody);

    //doneTasksDesc.appendChild(taskDiv) : tasksDesc.appendChild(taskDiv);
 }

var form = document.querySelector('form');
   form.addEventListener('submit', function (e) {
      e.preventDefault();
    
      var taskTitle = document.querySelector('.task-title').value;
      var description = document.querySelector('.task-description').value;
      var dueDate = document.querySelector('.task-due-date').value;

      //Create timeStamp and use it as id
      var timeStamp = saveToLS({taskTitle, description, dueDate});

      showTask({ "timeStamp": timeStamp, taskTitle, description, dueDate});

      //empty form-fields
      //taskTitle.value = "";
      //description.value = "";
      //dueDate.value = "";
  });