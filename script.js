const form = document.getElementById("task-form");
const input = document.getElementById("new-task");
const list = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "\u2715"; // Multiplication X symbol
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    input.value = "";
    input.focus();
  }
});

renderTasks();

const randomBtn = document.getElementById("random-bakugan");
const bakuganInfo = document.getElementById("bakugan-info");

async function fetchBakugan() {
  if (!bakuganInfo) return;
  bakuganInfo.textContent = "Loading...";
  try {
    const response = await fetch(
      "https://bakugan.wiki/api.php?action=query&generator=random&grnnamespace=0&prop=extracts|pageimages&exintro=1&explaintext=1&piprop=original&grnlimit=1&format=json&origin=*"
    );
    const data = await response.json();
    const pages = data.query?.pages;
    const page = pages[Object.keys(pages)[0]];
    const title = page.title;
    const description = page.extract;
    const image = page.original?.source;
    bakuganInfo.innerHTML = `<h2>${title}</h2>`;
    if (image) {
      const img = document.createElement("img");
      img.src = image;
      img.alt = title;
      bakuganInfo.appendChild(img);
    }
    const p = document.createElement("p");
    p.textContent = description;
    bakuganInfo.appendChild(p);
  } catch (err) {
    bakuganInfo.textContent = "Failed to load Bakugan.";
  }
}

if (randomBtn) {
  randomBtn.addEventListener("click", fetchBakugan);
}
