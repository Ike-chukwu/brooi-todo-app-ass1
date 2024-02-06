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
let todoList = [];
let listOfTickedCards = [];
let completedTasksNo = 0;
let taskToBeEditedIndex;
let task;
let temp;

//set the text monitoring checkbox/completed tasks to its default length
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
      return;
    } else {
      if (taskToBeEditedIndex || taskToBeEditedIndex == 0) {
        todoList[taskToBeEditedIndex] = task;
        if (listOfTickedCards.includes(temp)) {
          const indexOFTaskInTickedCards = listOfTickedCards.indexOf(temp);
          listOfTickedCards[indexOFTaskInTickedCards] = task;
        }
        temp = null;
        taskToBeEditedIndex = null;
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
  taskContainer.innerHTML = ``;
  todoList.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-wrapper";
    taskDiv.innerHTML = ` <p class="task">${task}</p>
    <div class="icon-pack">
    <button class="editBtn">
      <i class="fas fa-pen"></i>
      </button>
      <input type="checkbox" class="i-check"/>
      <button class="deleteBtn">
        <i class="fas fa-trash"></i>
        </button>
    </div>`;
    const penIcon = taskDiv.querySelector(".editBtn");
    penIcon.addEventListener("click", () => {
      const clickedTaskValue =
        penIcon.parentElement.parentElement.children[0].textContent;
      inputField.value = clickedTaskValue;
      taskToBeEditedIndex = todoList.indexOf(clickedTaskValue);
      temp = clickedTaskValue;
      console.log(clickedTaskValue);
    });
    const checkMarkIcon = taskDiv.querySelector("input");
    if (listOfTickedCards.includes(task)) {
      checkMarkIcon.checked = true;
    }
    checkMarkIcon.addEventListener("change", () => {
      if (checkMarkIcon.checked) {
        completedTasksNo++;
        const checkedTaskValue =
          checkMarkIcon.parentElement.parentElement.children[0].textContent;
        listOfTickedCards.push(checkedTaskValue);
        console.log(listOfTickedCards);
      } else {
        const checkedTaskValue =
          checkMarkIcon.parentElement.parentElement.children[0].textContent;
        listOfTickedCards = listOfTickedCards.filter(
          (task) => task !== checkedTaskValue
        );
        completedTasksNo--;
        console.log(listOfTickedCards);
      }
      taskCompletionRecord.textContent = `${completedTasksNo} out of ${
        todoList.length
      } ${
        todoList.length == 1 || todoList.length == 0 ? "task" : "tasks"
      } completed`;
    });
    const deleteBtn = taskDiv.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
      const value = taskDiv.querySelector(".task").textContent;
      if (listOfTickedCards.includes(value)) {
        listOfTickedCards = listOfTickedCards.filter((task) => task !== value);
        console.log(listOfTickedCards);
        completedTasksNo--;
      }
      todoList = todoList.filter((task) => task !== value);
      renderTasksHandler();
      taskCompletionRecord.textContent = `${completedTasksNo} out of ${
        todoList.length
      } ${
        todoList.length == 1 || todoList.length == 0 ? "task" : "tasks"
      } completed`;
    });
    taskContainer.appendChild(taskDiv);
  });
};
