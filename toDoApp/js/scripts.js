function saveToLS(taskTitle, taskDescription) {
   var taskTimeStamp = new Date().getTime();
   console.log(taskTimeStamp);
    
   var isInLS = JSON.parse(localStorage.getItem('tasks'));
   if(isInLS != null){
    console.log('there are notes already');
   }
   else{
    console.log('there in no notes');
    
    var newTask = [];
    newTask.push( { taskTimeStamp, taskTitle, taskDescription } );
    localStorage.setItem('tasks', JSON.stringify(newTask) );
   }
}

var addButton = document.querySelector('.add-task'); 
addButton.addEventListener("click", function () {
    var taskTitle = document.querySelector('.task-title').value;
    var taskDescription = document.querySelector('.task-description').value;

      saveToLS(taskTitle, taskDescription);
  })