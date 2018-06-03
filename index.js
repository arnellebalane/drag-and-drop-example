// Draggables behavior
const text = document.querySelector('.draggable.text');
text.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', text.textContent);
});

const link = document.querySelector('.draggable.link');
link.addEventListener('dragstart', e => {
    const url = link.firstElementChild.href;
    e.dataTransfer.setData('text/uri-list', url);
    e.dataTransfer.setData('text/plain', url);
});

const image = document.querySelector('.draggable.image');
image.addEventListener('dragstart', e => {
    const url = image.firstElementChild.src;
    e.dataTransfer.setData('text/uri-list', url);
    e.dataTransfer.setData('text/plain', url);
});

const html = document.querySelector('.draggable.html');
html.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/html', html.outerHTML);
    e.dataTransfer.setData('text/plain', html.textContent);
});

[text, link, image, html].forEach(draggable => {
    draggable.addEventListener('dragstart', e => {
        e.target.classList.add('dragging');
    });

    draggable.addEventListener('dragend', e => {
        e.target.classList.remove('dragging');
    });
});


// Dropzone functionality
const dropzone = document.querySelector('.dropzone');

dropzone.addEventListener('dragenter', e => {
    dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', e => {
    if (e.target === dropzone) {
        dropzone.classList.remove('dragover');
    }
});

dropzone.addEventListener('dragover', e => {
    e.preventDefault();
});

dropzone.addEventListener('drop', e => {
    e.preventDefault();
    e.target.classList.remove('dragover');

    const transfer = e.dataTransfer;
    dropzone.innerHTML = '';

    if (transfer.types.includes('text/plain')) {
        logDropData(dropzone, 'text', transfer.getData('text/plain'));
    }
    if (transfer.types.includes('text/uri-list')) {
        logDropData(dropzone, 'url', transfer.getData('text/uri-list'));
    }
    if (transfer.types.includes('text/html')) {
        logDropData(dropzone, 'html', transfer.getData('text/html'));
    }

    e.dataTransfer.items.clear();
});

function logDropData(dropzone, type, data) {
    const h3 = document.createElement('h3');
    h3.textContent = type;

    const p = document.createElement('p');
    p.textContent = data;

    const div = document.createElement('div');
    div.appendChild(h3);
    div.appendChild(p);

    dropzone.appendChild(div);
}
