const inputField = document.querySelector(
  ".todo-container .inner-todo-container .inputContainer input"
);
const plusButton = document.querySelector(
  ".todo-container .inner-todo-container .inputContainer .addBtn"
);
const taskCompletionRecord = document.querySelector(
  ".todo-container .task-status-wrapper .task-status"
);
const taskContainer = document.querySelector(".tasksContainer");
const todoList = [];
let completedTasksNo = 0;
let editedTaskIndex;
let tickedCardsIndex = [];
let task;

//set the text monitoring checkbox to its default length
taskCompletionRecord.textContent = `${completedTasksNo} out of ${
  todoList.length
} ${todoList.length == 1 || todoList.length == 0 ? "task" : "tasks"} completed`;

//function that gets the value enetered in an inputfield
const inputFieldHandler = (e) => {
  task = e.target.value;
};
inputField.addEventListener("input", inputFieldHandler);

//function that is triggerd when plus btn is clicked
const submitTaskHandler = () => {
  if (inputField.value.trim() == "") {
    return;
  } else {
    if (todoList.includes(task)) {
      console.log("yes");
      return;
    } else {
      if (editedTaskIndex || editedTaskIndex == 0) {
        todoList[editedTaskIndex] = task;
        editedTaskIndex = null;
        console.log(todoList);
      } else {
        todoList.push(task);
        taskCompletionRecord.textContent = `${completedTasksNo} out of ${
          todoList.length
        } ${
          todoList.length == 1 || todoList.length == 0 ? "task" : "tasks"
        } completed`;
      }
    }
    inputField.value = "";
    renderTasksHandler();
  }
};
plusButton.addEventListener("click", submitTaskHandler);

//function that renders all tasks in the array
const renderTasksHandler = () => {
  //   const tasksElements = todoList.map((task) => {
  //     return `<div class="task-wrapper">
  //         <p class="task">Eat</p>
  //         <div class="icon-pack">
  //           <i class="fas fa-pen"></i>
  //           <input type="checkbox" class="i-check" />
  //         </div>
  //       </div>`;
  //   });
  taskContainer.innerHTML = ``;
  todoList.forEach((task, index) => {
    console.log(tickedCardsIndex.includes(index));
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-wrapper";
    taskDiv.innerHTML = ` <p class="task">${task}</p>
    <div class="icon-pack">
    <button class="editBtn">
      <i class="fas fa-pen"></i>
      </button>
      <input type="checkbox" class="i-check"/>
    </div>`;
    const penIcon = taskDiv.querySelector(".editBtn");
    penIcon.addEventListener("click", () => {
      const clickedTaskValue =
        penIcon.parentElement.parentElement.children[0].textContent;
      inputField.value = clickedTaskValue;
      editedTaskIndex = todoList.indexOf(clickedTaskValue);
      console.log(clickedTaskValue);
    });
    const checkMarkIcon = taskDiv.querySelector("input");
    if (tickedCardsIndex.includes(index)) {
      checkMarkIcon.checked = true;
    }
    console.log(checkMarkIcon);
    checkMarkIcon.addEventListener("change", () => {
      if (checkMarkIcon.checked) {
        completedTasksNo++;
        tickedCardsIndex.push(index);
        console.log(tickedCardsIndex);
      } else {
        completedTasksNo--;
        tickedCardsIndex = tickedCardsIndex.filter((pos) => pos !== index);
      }
      taskCompletionRecord.textContent = `${completedTasksNo} out of ${
        todoList.length
      } ${
        todoList.length == 1 || todoList.length == 0 ? "task" : "tasks"
      } completed`;
    });
    taskContainer.appendChild(taskDiv);
  });
  //   const newlyRenderedTaskElements = todoList.map((task) => {
  //     return taskDiv;
  //   });
};
