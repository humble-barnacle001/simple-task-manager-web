const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInp = document.querySelector('#task');
const dispTask = document.querySelector('.card-action');

loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearAll);
    filter.addEventListener('keyup',filterTasks);
}

function getTasks(){
    if(localStorage.getItem('tasks') === null){
        dispTask.classList.add('hide');
    }
    else{
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function(task) {
            const li = document.createElement('li');
            li.className = 'collection-item';
            const text = document.createElement('div');
            text.className = 'text';
            text.appendChild(document.createTextNode(task));
            li.appendChild(text);
            const link = document.createElement('a');
            link.setAttribute('href','#');
            link.className = 'delete-item';
            link.innerHTML = '<i class="fas fa-minus-circle"></i>';
            li.appendChild(link);
            if(dispTask.classList.contains('hide')){
                dispTask.classList.remove('hide');
            }
            taskList.appendChild(li);
        });
    }
}

function addTask(e){
    e.preventDefault();
    if(taskInp.value === ''){
        alert('Enter a task');
    }
    else{
        const li = document.createElement('li');
        li.className = 'collection-item';
        const text = document.createElement('div');
        text.className = 'text';
        text.appendChild(document.createTextNode(taskInp.value));
        li.appendChild(text);
        const link = document.createElement('a');
        link.setAttribute('href','#');
        link.className = 'delete-item';
        link.innerHTML = '<i class="fas fa-minus-circle"></i>';
        li.appendChild(link);
        if(dispTask.classList.contains('hide')){
            dispTask.classList.remove('hide');
        }
        taskList.appendChild(li);
        localStore(taskInp.value);
        taskInp.value = '';
        filter.value = '';
        filterTasks();
    }
}

function removeTask(e) {
    e.preventDefault();
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            const task = e.target.parentElement.parentElement.firstElementChild.textContent;
            let tasks = Array.from(JSON.parse(localStorage.getItem('tasks')));
            for(let i = 0; i < tasks.length; i++){
                if(tasks[i] === task){
                    tasks.splice(i, i+1);
                    break;
                }
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));
            e.target.parentElement.parentElement.remove();
            filterTasks();
            if(!taskList.firstElementChild){
                dispTask.classList.add('hide');
            }
        }
    }
}

function clearAll(e) {
    e.preventDefault();
    if(confirm('Clear all the tasks?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
            dispTask.classList.add('hide');
        }
        localStorage.removeItem('tasks');
    }
}

function filterTasks() {
    const text=filter.value.toLowerCase();
    if(text === ''){
        clearBtn.classList.remove('hide');
    }
    else{
        clearBtn.classList.add('hide');
    }
    let ct = 0;
    Array.from(taskList.children).forEach(task => {
        const item = task.firstElementChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'flex';
            ct++;
        }
        else{
            task.style.display = 'none';
        }
    });
    if(ct==0){
        filter.parentElement.nextElementSibling.classList.remove('hide');
    }
    else{
         filter.parentElement.nextElementSibling.classList.add('hide');
    }
}


function localStore(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}