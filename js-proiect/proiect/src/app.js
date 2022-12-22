"use strict";

class TaskManager {
    constructor(idContainer, idTemplate) {
        this.template = new Template(idTemplate, this.fillTask.bind(this));

        this.addBtn = document.querySelector(".add");
        this.addBtn.addEventListener("click", this.onAddTask.bind(this));
        document.addEventListener("keypress", this.addTaskEnter.bind(this));

        this.container = document.querySelector(idContainer);
        this.container.addEventListener("click", this.finishTask.bind(this));
        this.container.addEventListener("click", this.deleteTask.bind(this));
    }

    addTask() {
        const input = document.querySelector("input");
        for (let i = 0; i < data.length; i++) {
            if (input.value == data[i].title) {
                throw new Error("Task-ul se afla deja in lista");
            }
        }
        if (input.value) {
            data.push(new Task(input.value));
            this.fillList();
            input.value = "";
            this.addDataLocalStorage(data);
        } else {
            throw new Error("Nu a-ti introdus un task valid");
        }
    }

    onAddTask() {
        try {
            this.addTask();
        } catch (error) {
            alert(error.message);
        }
    }

    addTaskEnter(event) {
        if (event.key == "Enter") {
            try {
                this.addTask();
            } catch (error) {
                alert(error.message);
            }
        }
    }

    finishTask({ target }) {
        const taskTitle = target.textContent;
        for (let i = 0; i < data.length; i++) {
            if (data[i].title == taskTitle) {
                if (!data[i].done) {
                    data[i].done = true;
                    this.addDataLocalStorage(data);
                    target.parentElement.classList.add("done");
                } else {
                    data[i].done = false;
                    this.addDataLocalStorage(data);
                    target.parentElement.classList.remove("done");
                }
                break;
            }
        }
    }

    deleteTask({ target }) {
        if (target.classList[0] == "delete") {
            const index = target.parentElement.dataset.index;
            data.splice(index, 1);
            this.addDataLocalStorage(data);
            this.fillList();
        }
    }

    fillTask(itemData, result, index) {
        if (itemData.done) {
            result.querySelector(".task").classList.add("done");
        }
        result.querySelector(".task").dataset.index = index;
        result.querySelector(".title").textContent = itemData.title;
    }

    fillList() {
        const taskList = document.querySelector(".task-list");
        const tasks = this.template.fillCollection(data);
        while (taskList.lastElementChild) {
            taskList.removeChild(taskList.lastElementChild);
        }
        taskList.appendChild(tasks);
    }

    addDataLocalStorage(data) {
        localStorage.clear();
        localStorage.setItem("date", JSON.stringify(data));
    }
}

class Task {
    constructor(title) {
        this.title = title;
        this.done = false;
    }
}

const taskManager = new TaskManager("#container", "#template"); 
document.addEventListener("DOMContentLoaded", taskManager.fillList());
