
const canvasContainer = document.querySelector('.draw__board');
const canvas = document.getElementById('canvas0');
const ctx = canvas.getContext('2d');
canvas.offsetWidth = canvasContainer.offsetWidth;
canvas.offsetHeight = canvasContainer.offsetHeight

console.log(canvas.offsetHeight);
console.log(canvas.offsetWidth);

ctx.fillStyle = 'black';
ctx.fillRect(0,0, canvas.offsetWidth, canvas.offsetHeight);














