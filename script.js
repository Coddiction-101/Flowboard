const prioritySelect = document.getElementById('prioritySelect');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const lists = document.querySelectorAll(".list");

let draggedCard = null;

window.addEventListener('DOMContentLoaded', () => {
    const isFirstVisit = !localStorage.getItem('flowboard_visited');
    if (isFirstVisit) {
        localStorage.removeItem('kanbanBoard');
        localStorage.setItem('flowboard_visited', 'true');
    }
    loadBoardState();
});

function createCard(text, priority) {
    const card = document.createElement('div');
    card.classList.add('card', priority);
    card.setAttribute('draggable', 'true');
    card.id = 'card-' + Date.now();

    const badge = document.createElement('span');
    badge.classList.add('priority-badge');
    badge.textContent = priority.toUpperCase();

    const content = document.createElement('div');
    content.classList.add('card-text');
    content.textContent = text;
    content.setAttribute('contenteditable', 'false');

    const actions = document.createElement('div');
    actions.classList.add('card-actions');

    const editBtn = document.createElement('button');
    editBtn.classList.add('card-btn', 'edit-btn');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => handleEdit(card, content, editBtn));

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('card-btn', 'delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        card.remove();
        saveBoardState();
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(badge);
    card.appendChild(content);
    card.appendChild(actions);

    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);

    return card;
}

function handleEdit(card, content, editBtn) {
    const isEditing = content.getAttribute('contenteditable') === 'true';

    if (!isEditing) {
        content.setAttribute('contenteditable', 'true');
        content.focus();

        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(content);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);

        editBtn.textContent = 'Save';
        editBtn.classList.add('saving');
        card.setAttribute('draggable', 'false');
    } else {
        const newText = content.textContent.trim();
        content.textContent = newText === '' ? 'Task cannot be empty' : newText;
        content.setAttribute('contenteditable', 'false');
        editBtn.textContent = 'Edit';
        editBtn.classList.remove('saving');
        card.setAttribute('draggable', 'true');
        saveBoardState();
    }
}

function addTask() {
    const text = taskInput.value.trim();
    const priority = prioritySelect?.value || "medium";
    if (text === "") return;

    const card = createCard(text, priority);
    document.getElementById('list1').appendChild(card);
    taskInput.value = "";
    saveBoardState();
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === "Enter") addTask();
});

document.getElementById('clearBoardBtn').addEventListener('click', () => {
    if (confirm('Clear all tasks? This cannot be undone.')) {
        document.querySelectorAll('.card').forEach(c => c.remove());
        localStorage.removeItem('kanbanBoard');
    }
});

for (const list of lists) {
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("drop", dragDrop);
}

function dragStart(e) {
    if (this.getAttribute('draggable') === 'false') return;
    draggedCard = this;
    this.classList.add('dragging');
    e.dataTransfer.setData("text/plain", this.id);
    e.dataTransfer.effectAllowed = "move";
}

function dragEnd(e) {
    if (draggedCard) draggedCard.classList.remove('dragging');
    draggedCard = null;
    document.querySelectorAll('.list').forEach(l => l.classList.remove('over'));
    saveBoardState();
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("over");
}

function dragLeave(e) {
    if (!this.contains(e.relatedTarget)) {
        this.classList.remove("over");
    }
}

function dragDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(id);
    if (card) this.appendChild(card);
    this.classList.remove("over");
    saveBoardState();
}

function saveBoardState() {
    const state = {};
    document.querySelectorAll('.list').forEach(list => {
        state[list.id] = [];
        list.querySelectorAll('.card').forEach(card => {
            const priority = ['high', 'medium', 'low'].find(p => card.classList.contains(p)) || 'medium';
            const text = card.querySelector('.card-text').textContent.trim();
            state[list.id].push({ text, priority });
        });
    });
    localStorage.setItem('kanbanBoard', JSON.stringify(state));
}

function loadBoardState() {
    const saved = localStorage.getItem('kanbanBoard');
    if (!saved) return;

    const state = JSON.parse(saved);
    Object.keys(state).forEach(listId => {
        const list = document.getElementById(listId);
        if (!list) return;
        state[listId].forEach(({ text, priority }) => {
            const card = createCard(text, priority);
            list.appendChild(card);
        });
    });
}
