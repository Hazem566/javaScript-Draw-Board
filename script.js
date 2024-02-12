

const canvas = document.getElementById('canvas0');
const ctx = canvas.getContext('2d');
const tools = document.querySelectorAll('.tool');
const fillColor = document.getElementById('fill__color');
const colors = document.querySelectorAll('.colors .option');
const colorPicker = document.getElementById('color__picker');
const sizeSlider = document.getElementById('size__slider');
const clear = document.getElementById('clear');
const save = document.getElementById('save');

const mouse = {
    x: undefined,
    y: undefined
};

let selectedTool = "brush";
let selectedColor = "#000";
let lineWidth = 5;
let isDrawing = false;
let snapshot;


window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

clear.addEventListener('click', () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
});

sizeSlider.addEventListener('change', () => {
    lineWidth = sizeSlider.value;
});

colors.forEach( color => {
    color.addEventListener('click', () => {
        colors.forEach(color=>color.classList.remove('selected'));
        color.classList.add('selected');
        selectedColor = window.getComputedStyle(color).getPropertyValue('background-color');
    });
});

colorPicker.addEventListener('change', () => {
    colorPicker.parentElement.style.backgroundColor = colorPicker.value;
    colorPicker.parentElement.click();
});

tools.forEach( tool => {
    tool.addEventListener('click', () => {
        tools.forEach(tool=>tool.classList.remove('active'));
        tool.classList.add('active');
        selectedTool = tool.id;
    });
});

const drawRect = (e) => {
    if(fillColor.checked)
    {
        ctx.fillRect(mouse.x, mouse.y, e.offsetX-mouse.x, e.offsetY-mouse.y);
        ctx.fill();
    } 
    else
    {
        ctx.strokeRect(mouse.x, mouse.y, e.offsetX-mouse.x, e.offsetY-mouse.y);
        ctx.stroke();
    }
}

const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(
        Math.pow(e.offsetX-mouse.x, 2) + Math.pow(e.offsetY-mouse.y, 2)
    );
    ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI*2);
    fillColor.checked ? ctx.fill() : ctx.stroke();
};

const startDraw = (e) => {
    isDrawing = true;
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = selectedColor;
    ctx.strokeStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};
const drawing = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    if(selectedTool === 'brush' || selectedTool === 'erase') {
        ctx.strokeStyle = selectedTool === 'brush'? selectedColor : "#fff";
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if(selectedTool === 'rect') {
        drawRect(e);
    } else if(selectedTool === 'circle') {
        drawCircle(e);
    }
    
};

canvas.addEventListener('mousedown', (e) => {
    startDraw(e);
})
canvas.addEventListener('mousemove', (e) => {
    drawing(e);
})
canvas.addEventListener('mouseup',() => isDrawing = false);







