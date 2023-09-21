import { drawBackground } from './draw/background.ts';
import { clamp } from './draw/helpers.ts';

const container = document.querySelector<HTMLDivElement>('#container')!;
const canvas = document.querySelector<HTMLCanvasElement>('#graph')!;
const ctx = canvas.getContext('2d', { alpha: false })!;

const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        if (entry.contentBoxSize) {
            const box = entry.contentBoxSize[0]!;
            canvas.width = box.inlineSize;
            canvas.height = box.blockSize;
        } else {
            const rect = entry.contentRect;
            canvas.width = rect.width;
            canvas.height = rect.height;
        }
        redraw();
    }
});
resizeObserver.observe(container);

window.addEventListener('load', redraw);
document.addEventListener('focus', redraw, true);
document.addEventListener('blur', redraw, true);
canvas.addEventListener('wheel', zoomAction, true);
canvas.addEventListener('mousemove', dragAction, true);
canvas.addEventListener('mouseup', resetCursor, true);
canvas.addEventListener('mouseleave', resetCursor, true);

let zoom = 1;
const offset = { x: 0, y: 0 };

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground(ctx, zoom, offset);
}
redraw();

function zoomAction(e: WheelEvent) {
    if (e.deltaY < 0) {
        zoom += 0.1;
    } else if (e.deltaY > 0) {
        zoom -= 0.1;
    }
    zoom = +clamp(zoom, 0.4, 1.4).toFixed(1);

    redraw();
}

function dragAction(e: MouseEvent) {
    if (e.buttons === 4) {
        offset.x += e.movementX;
        offset.y += e.movementY;

        document.body.style.cursor = 'grabbing';
    }

    redraw();
}

function resetCursor() {
    document.body.style.cursor = 'auto';
}
