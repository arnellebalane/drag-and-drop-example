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
    e.target.classList.add('dragover');
});

dropzone.addEventListener('dragleave', e => {
    e.target.classList.remove('dragover');
});

dropzone.addEventListener('dragover', e => {
    e.preventDefault();
});

dropzone.addEventListener('drop', e => {
    e.preventDefault();
    e.target.classList.remove('dragover');

    const transfer = e.dataTransfer;

    for (let i = 0; i < transfer.items.length; i++) {
        const type = transfer.items[i].type;
        console.log(transfer.getData(type));
    }
});
