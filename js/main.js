// Declaración de variables para identificar los elementos del documento
const btnAddTask = document.getElementById("btnAddTask");
const spanUserName = document.getElementById("spanUserName");
const todayTaskContainer = document.getElementById("todayTaskContainer");
const importantTaskContainer = document.getElementById(
  "importantTaskContainer"
);
const pendingTaskContainer = document.getElementById("pendingTaskContainer");
const completedTaskContainer = document.getElementById(
  "completedTaskContainer"
);
const taskFormDisplay = document.getElementById("taskFormDisplay");
const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskCategory = document.getElementById("taskCategory");
const taskFinishTime = document.getElementById("taskFinishTime");
const taskDescription = document.getElementById("taskDescription");
const importanceCheckbox = document.getElementById("importanceCheckbox");
const btnSubmitTask = document.getElementById("btnSubmitTask");
const btnCloseForm = document.getElementById("btnCloseForm");
const allTasksArray = [];
let pendingTasksArray = [],
  todayTasksArray = [],
  importantTasksArray = [],
  completedTasksArray = [];
let taskId = 0;

class Task {
  constructor(
    id,
    name,
    category,
    finishTime,
    description,
    importance,
    completed
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.finishTime = finishTime;
    this.description = description;
    this.importance = importance;
    this.completed = completed;
  }
}

function resetForm() {
  taskName.value = null;
  taskCategory.value = null;
  taskFinishTime.value = null;
  taskDescription.value = null;
  importanceCheckbox.checked = false;
  taskFormDisplay.classList.add("d-none");
}

function firstLetterCap(phrase) {
  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}

function formatDatetime(finishTimeTaskDate) {
  return `${finishTimeTaskDate.getFullYear()}/${(
    finishTimeTaskDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${finishTimeTaskDate
    .getDate()
    .toString()
    .padStart(2, "0")} ${finishTimeTaskDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${finishTimeTaskDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}hs`;
}

function createTaskElement(
  idTask,
  nameTask,
  categoryTask,
  finishTimeTaskDate,
  descriptionTask
) {
  nameTask = firstLetterCap(nameTask);
  categoryTask = firstLetterCap(categoryTask);
  descriptionTask = firstLetterCap(descriptionTask);
  const newTask = document.createElement("li");
  newTask.classList.add("card");
  newTask.innerHTML = `
    <div class="card__color"></div>
    <div class="card__body">
    <h5 class="card__category">${categoryTask}</h5>
    <h4 class="card__name">${nameTask}</h4>
    <div class="card__div">
    <img class="card__svg" src="img/clock.svg" alt="clock">
    <p class="card__p">
    <span class="card__finish-time">${formatDatetime(finishTimeTaskDate)}</span>
    </p>
    </div>
    <div class="card__div">
    <img class="card__svg desc-svg" src="img/paragraph.svg" alt="description">
    <p class="card__p">
    <span class="card__description">${descriptionTask}</span>
    </p>
    </div>
    <button type="button" class="card__btn close" id="btnDelete${idTask}">
    <img class="card__btn-svg" src="img/close-x.svg" alt="close">
    </button>
    <button type="button" class="card__btn complete" id="btnComplete${idTask}">
    <img class="card__btn-svg" src="img/tick.svg" alt="complete">
    </button>
    </div>
    `;
  return newTask;
}

//TODO: Crear función que tome las Tareas de los diferentes Arrays y les haga Append en los respectivos contenedores según su Array

//TODO: Encontrar la manera de que el botón de ELIMINAR de cada Tarea remueva la Tarea del Array principal y actualice TODOS los Arrays para dejar de mostrar la Tarea Eliminada

//TODO: Encontrar la manera de que el botón de COMPLETAR de cada Tarea remueva la Tarea del Array de Pendientes, lo Añada al Array de Completadas & actualice TODOS los Arrays para mostrar la Tarea Completada en la sección de Tareas Completadas

function appendTaskToContainer(taskContainer, task) {
  taskContainer.appendChild(task);
}

function updateArrays() {
  pendingTasksArray = allTasksArray.filter((task) => task.completed == false);
  todayTasksArray = pendingTasksArray.filter((task) => {
    const currentDate = new Date();
    if (
      currentDate.setHours(0, 0, 0, 0) == task.finishTime.setHours(0, 0, 0, 0)
    ) {
      return true;
    } else {
      return false;
    }
  });
  importantTasksArray = pendingTasksArray.filter(
    (task) => task.importance == true
  );
  completedTasksArray = allTasksArray.filter((task) => task.completed == true);
}

document.addEventListener("DOMContentLoaded", function () {
  // Función para mostrar el formulario de la tarea a añadir
  btnAddTask.addEventListener("pointerdown", function showTaskForm(e) {
    taskFormDisplay.classList.remove("d-none");
  });
  // Función para cerrar el formulario y resetear lo escrito
  btnCloseForm.addEventListener("pointerdown", function closeTaskForm(e) {
    resetForm();
  });
  // Función para añadir la tarea al documento
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameTask = taskName.value;
    const categoryTask = taskCategory.value;
    const descriptionTask = taskDescription.value;
    const importanceTask = importanceCheckbox.checked;
    const finishTimeTask = taskFinishTime.value;
    const finishTimeTaskDate = new Date(finishTimeTask);

    let newTask = new Task(
      taskId,
      nameTask,
      categoryTask,
      finishTimeTaskDate,
      descriptionTask,
      importanceTask,
      false
    );
    allTasksArray.push(newTask);
    updateArrays();
    console.log("Todas");
    console.log(allTasksArray);
    console.log("Pendientes");
    console.log(pendingTasksArray);
    console.log("Hoy");
    console.log(todayTasksArray);
    console.log("Importantes");
    console.log(importantTasksArray);
    console.log("Completadas");
    console.log(completedTasksArray);
    // Aumento el valor de ID en 1 para diferenciar el siguiente objeto del objeto recién creado
    taskId++;

    // Mostrar Elemento
    //
    // todayTaskContainer.appendChild(
    //   createTaskElement(
    //     nameTask,
    //     categoryTask,
    //     finishTimeTask,
    //     descriptionTask,
    //     importanceTask
    //   )
    // );
    btnSubmitTask.addEventListener("pointerdown", resetForm());
  });
});
console.log("Todas");
console.log(allTasksArray);
console.log("Pendientes");
console.log(pendingTasksArray);
console.log("Hoy");
console.log(todayTasksArray);
console.log("Importantes");
console.log(importantTasksArray);
console.log("Completadas");
console.log(completedTasksArray);
