function get_todos() {
    var elements = new Array;
    var elements_str = localStorage.getItem('todo');
    if (elements_str !== null) {
        elements = JSON.parse(elements_str);
    }
    return elements;
}

function add() {
    var task = document.getElementById('task').value;
    var elements = get_todos();
    elements.push(task);
    localStorage.setItem('todo', JSON.stringify(elements));
    show();

    return false;
}

function remove() {
    var id = this.getAttribute('id');
    var elements = get_todos();
    elements.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(elements));
    show();
    return false;
}

function show() {
    var todos = get_todos();
    var html = '';
    var id = '01';
    for(var i=0; i<todos.length; i++) {
        html += '<p ondragstart="dragStart(event)" draggable="true" id=" + id">' + todos[i] + '<button class="remove" id="' + i  + '">X</button></p>';
    };
    document.getElementById('todos').innerHTML = html;

    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}

document.getElementById('add').addEventListener('click', add);
show();

function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);

}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));

}
$(document).ready(function (e) {
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});









