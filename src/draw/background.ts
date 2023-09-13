import { graphTheme } from './theme.ts';

export function drawBackground(ctx: CanvasRenderingContext2D) {
    const { width: cw, height: ch } = ctx.canvas;

    ctx.fillStyle = graphTheme.colors.bg.base;
    ctx.fillRect(0, 0, cw, ch);

    drawGrid(ctx, 24, graphTheme.colors.bg.fineGrid, 6);
    drawGrid(ctx, 24 * 6, graphTheme.colors.bg.wideGrid);
}

export function drawGrid(
    ctx: CanvasRenderingContext2D,
    cellSize: number,
    style: string,
    skipEvery?: number
) {
    const { width: cw, height: ch } = ctx.canvas;
    ctx.fillStyle = style;

    const hCells = cw / cellSize;
    const vCells = ch / cellSize;

    // vertical lines
    for (let x = 1; x < hCells; x++) {
        if (skipEvery && x % skipEvery === 0) {
            continue;
        }
        const xPos = x * cellSize;
        ctx.fillRect(xPos, 0, 1, ch);
    }

    // horizontal lines
    for (let y = 1; y < vCells; y++) {
        if (skipEvery && y % skipEvery === 0) {
            continue;
        }
        const yPos = y * cellSize;
        ctx.fillRect(0, yPos, cw, 1);
    }
}
