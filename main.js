const list = document.querySelector('#list');

let elements = JSON.parse(localStorage.getItem('elements')) || [];
let completeElements = JSON.parse(localStorage.getItem('completeElements')) || [];

function updateList() {
  list.innerHTML = '';
  elements.forEach((task) => {
    const li = document.createElement('li');
    li.textContent = task;
    li.classList.add('task-item');
    if (completeElements.includes(task)) {
      li.classList.add('complete');
    }
    li.addEventListener('click', completeTask);
    list.appendChild(li);
});
}

function saveToLocalStorage() {
  localStorage.setItem('elements', JSON.stringify(elements));
  localStorage.setItem('completeElements', JSON.stringify(completeElements));
}

const add = document.querySelector('#add-button');
add.addEventListener('click', addTask);
function addTask(){
  const answer = prompt('할 일 추가');
  if (!answer) {
    alert('할 일을 입력해주세요!');
    return;
  }
  elements.push(answer);
  saveToLocalStorage();
  updateList();
}

const deleted = document.querySelector('#delete-button');
deleted.addEventListener('click', deleteTask);
function deleteTask () {
  const answer = prompt('삭제 할 일 선택');
  if (!answer) {
    alert('삭제할 일을 입력해주세요!');
    return;
  }
  let i = null;
  elements.find((task, index) => {
    i = index;
    return task === answer;
  });
  elements.splice(i, 1);
  saveToLocalStorage();
  updateList();
}

const modify = document.querySelector('#modify-button');
modify.addEventListener('click', modifyTask);
function modifyTask() {
  const answer = prompt('변경할 일 선택');
  let secondAnswer = null;
  if (!answer) {
    alert('변경할 일을 입력해주세요!');
    return;
  }
  secondAnswer = prompt('할 일 입력');
  if (secondAnswer === null) {
    alert('할 일을 입력해주세요!');
    return;
  }
  let i = null;
  elements.find((task, index) => {
    i = index;
    return task === answer;
  });
  elements.splice(i, 1, secondAnswer);
  saveToLocalStorage();
  updateList();
}

function completeTask(event) {
  const taskName = event.target.textContent;
  const taskIndex = elements.indexOf(taskName);
  if (taskIndex !== -1) {
    if (!completeElements.includes(taskName)) {
      completeElements.push(taskName);
    } else {
      const completeIndex = completeElements.indexOf(taskName);
      if (completeIndex !== -1) {
        completeElements.splice(completeIndex, 1);
      }
    }
  }
  saveToLocalStorage();
  updateList();
}

updateList();