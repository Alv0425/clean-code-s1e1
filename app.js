"use strict";

const taskInput = document.getElementById("add-task");
const addButton = document.getElementsByTagName("button")[0];
const toDoList = document.getElementById("to-do-list");
const doneList = document.getElementById("done-list");

//New task list item
function createNewTaskElement(taskString) {
  //Create task elements
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");
  //Set task elements properties and class names
  label.innerText = taskString;
  label.className = "task__label";
  listItem.className = "task";
  checkBox.type = "checkbox";
  checkBox.classList.add("task__checkbox");
  editInput.type = "text";
  editInput.className = "task__field";
  editButton.innerText = "Edit";
  editButton.className = "task__button";
  deleteButton.className = "remove-button";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "remove-button__image";
  //Append all task elements to task node
  deleteButton.append(deleteButtonImg);
  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  //Return task item
  return listItem;
}

function addTask() {
  console.log("Add Task...");
  //Create a new task item
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  //append listItem to toDoList
  toDoList.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

//Edit an existing task
function editTask() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".task__field");
  const label = listItem.querySelector(".task__label");
  const editBtn = listItem.querySelector(".task__button");
  const containsClass = listItem.classList.contains("task_editing");
  //If class of the parent is .task_editing, 
  //set editInput value as innerText of label
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("task_editing");
}

//Delete task
function deleteTask() {
  console.log("Delete Task...");
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark task completed
function taskCompleted() {
  console.log("Complete Task...");
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  listItem.classList.add("task_completed");
  doneList.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked,
  //append the task list item to the todo list.
  const listItem = this.parentNode;
  listItem.classList.remove("task_completed");
  toDoList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function ajaxRequest() {
  console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //Select ListItems children
  const checkBox = taskListItem.querySelector(".task__checkbox");
  const editButton = taskListItem.querySelector(".task__button");
  const deleteButton = taskListItem.querySelector(".remove-button");
  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//Cycle over toDoList ul list items
for (let i = 0; i < toDoList.children.length; i++) {
  //Bind events to list items
  bindTaskEvents(toDoList.children[i], taskCompleted);
}

//Cycle over doneList ul list items
for (let i = 0; i < doneList.children.length; i++) {
  //Bind events to list items
  bindTaskEvents(doneList.children[i], taskIncomplete);
}