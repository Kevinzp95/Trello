const lists = document.querySelectorAll(".list");
const boards = document.querySelector(".boards");
const addBtn = document.querySelector(".add__item__btn");
const btn = document.querySelector(".add__btn");
const cancelBtn = document.querySelector(".cancel__item__btn");
const textarea = document.querySelector(".textarea");
const form = document.querySelector(".form");
const button = document.querySelector(".button");

let draggedItem;
let value;

function addTask() {
  btn.addEventListener("click", function () {
    form.style.display = "block";
    btn.style.display = "none";
    addBtn.style.display = "none";

    textarea.addEventListener("input", function (e) {
      value = e.target.value;

      if (value) {
        addBtn.style.display = "block";
      } else {
        addBtn.style.display = "none";
        btn.style.display = "none";
      }
    });
  });

  cancelBtn.addEventListener("click", clearForm);

  addBtn.addEventListener("click", function () {
    const newItem = document.createElement("div");
    newItem.classList.add("list__item");
    newItem.setAttribute("draggable", "true");
    newItem.setAttribute("contenteditable", "true");
    newItem.innerText = value;
    lists[0].appendChild(newItem);
    clearForm();
  });
}

function clearForm() {
  textarea.value = "";
  value = "";
  form.style.display = "none";
  btn.style.display = "block";

  dragNdrop();
}

addTask();

function addBoard() {
  const newBoard = document.createElement("div");
  newBoard.classList.add("boards__item");
  newBoard.innerHTML = `<span contenteditable="true" class="title">Введите название</span>
    <div class="list"></div>`;

  boards.appendChild(newBoard);

  changeTitle();
  dragNdrop();
}

button.addEventListener("click", addBoard);

function changeTitle() {
  const titles = document.querySelectorAll(".title");

  titles.forEach(function (title) {
    title.addEventListener("click", function (e) {
      e.target.innerText = "";
    });
  });
}
changeTitle();

function dragNdrop() {
  const listItems = document.querySelectorAll(".list__item");
  const lists = document.querySelectorAll(".list");

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];

    item.addEventListener("dragstart", function (e) {
      draggedItem = e.target;
      setTimeout(function () {
        item.style.display = "none";
      }, 0);
    });
    item.addEventListener("dragend", function () {
      setTimeout(function () {
        item.style.display = "block";
        draggedItem = null;
      }, 0);
    });
    item.addEventListener("dblclick", function () {
      item.remove();
    });

    for (let j = 0; j < listItems; j++) {
      const list = lists[j];

      list.addEventListener("dragover", function (e) {
        e.preventDefault();
      });
      list.addEventListener("drop", function () {
        this.appendChild(draggedItem);
      });
    }
  }
}
dragNdrop();
