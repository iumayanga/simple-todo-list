import { Task } from './task';

const tasks:Task[] = loadTasks();

const list = document.querySelector<HTMLUListElement>('#list');
// 'getElementById()' => assertions
// const list = document.getElementById('list') as HTMLUListElement | null;

const input = document.querySelector<HTMLInputElement>('#new-task-title');

const form = document.querySelector<HTMLFormElement>('#new-task-form');
form?.addEventListener('submit', event => {
    // prevent the form submit
    event.preventDefault();

    // validate the input
    if(!(input?.value)) return;

    const task:Task = {
        title:input.value,
        completed:false,
        createdAt:new Date()
    }

    tasks.push(task);

    addListItem(task);
    saveTasks(tasks);
    input.value = '';
});

function addListItem(task:Task){
    const item = document.createElement('li');
    const label = document.createElement('label');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks(tasks);
    });

    label.append(checkbox,task.title);
    item.append(label);
    list?.append(item);
}

// save tasks to localStorage
function saveTasks(tasks: Task[]): void {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
}

// get tasks from localStorage
function loadTasks():Task[]{
    const tasksJSON = localStorage.getItem('TASKS');

    if(tasksJSON) return JSON.parse(tasksJSON);
    return [];
}

tasks.forEach(addListItem);
// tasks.forEach(task => { addListItem(task); });
