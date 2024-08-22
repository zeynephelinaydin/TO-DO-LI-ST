document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#addTaskForm");
    const input = document.querySelector("#txtTaskName");
    const btnDeleteAll = document.querySelector("#btnDeleteAll");
    const taskList = document.querySelector("#task-list");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        if (input.value.trim() === '') {
            Swal.fire('Please enter a task');
        } else {
            createItem(input.value);
            setItemToLS(input.value);
            input.value = '';
        }
    });

    taskList.addEventListener("click", function(e) {
        if (e.target.classList.contains('fa-times')) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    e.target.parentElement.parentElement.remove();
                    deleteToDoFromStorage(e.target.parentElement.parentElement.textContent);
                    Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
                }
            });
        }
    });

    btnDeleteAll.addEventListener("click", function(e) {
        e.preventDefault();
        if (taskList.children.length > 0) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You will delete all tasks!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete all!'
            }).then((result) => {
                if (result.isConfirmed) {
                    while (taskList.firstChild) {
                        taskList.removeChild(taskList.firstChild);
                    }
                    localStorage.clear();
                    Swal.fire('Deleted!', 'All tasks have been deleted.', 'success');
                }
            });
        } else {
            Swal.fire('There are no tasks to delete');
        }
    });

    function createItem(text) {
        const li = document.createElement("li");
        li.className = "list-group-item list-group-item-secondary";
        li.appendChild(document.createTextNode(text));
        const a = document.createElement("a");
        a.classList = "delete-item float-right";
        a.setAttribute("href", "#");
        a.innerHTML = '<i class="fas fa-times"></i>';
        li.appendChild(a);
        taskList.appendChild(li);
    }

    function setItemToLS(text) {
        let todos = getItemsFromLS();
        todos.push(text);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function getItemsFromLS() {
        let todos = localStorage.getItem("todos");
        return todos ? JSON.parse(todos) : [];
    }

    function deleteToDoFromStorage(text) {
        let todos = getItemsFromLS();
        todos = todos.filter(t => t !== text.trim());
        localStorage.setItem("todos", JSON.stringify(todos));
    }
});
