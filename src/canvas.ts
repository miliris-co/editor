import { drawBackground } from './draw/background.ts';

const container = document.querySelector<HTMLDivElement>('#container')!;
const canvas = document.querySelector<HTMLCanvasElement>('#graph')!;
const ctx = canvas.getContext('2d', { alpha: false })!;

const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        if (entry.contentBoxSize) {
            const box = entry.contentBoxSize[0];
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
redraw();

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground(ctx);
}
