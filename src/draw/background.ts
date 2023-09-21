import { graphTheme } from './theme.ts';

export function drawBackground(
    ctx: CanvasRenderingContext2D,
    zoom: number,
    offset: { x: number; y: number }
) {
    const { width: cw, height: ch } = ctx.canvas;

    ctx.fillStyle = graphTheme.colors.bg.base;
    ctx.fillRect(0, 0, cw, ch);

    const finePerWide = 6;
    const smallCellSize = 24 * zoom;
    const largeCellSize = smallCellSize * finePerWide;

    drawGrid(
        ctx,
        offset.x % smallCellSize,
        offset.y % smallCellSize,
        smallCellSize,
        graphTheme.colors.bg.fineGrid,
        { every: finePerWide, xOffset: offset.x, yOffset: offset.y }
    );
    drawGrid(
        ctx,
        offset.x % largeCellSize,
        offset.y % largeCellSize,
        largeCellSize,
        graphTheme.colors.bg.wideGrid
    );
}

export function drawGrid(
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    cellSize: number,
    style: string,
    skip?: { every: number; xOffset: number; yOffset: number }
) {
    const { width: cw, height: ch } = ctx.canvas;
    ctx.fillStyle = style;

    let hCells = cw / cellSize;
    let vCells = ch / cellSize;

    if (startX < 0) {
        hCells++;
    }
    if (startY < 0) {
        vCells++;
    }

    // vertical lines
    for (let x = 0; x < hCells; x++) {
        if (skip) {
            const n = Math.trunc(
                (skip.xOffset % (cellSize * skip.every)) / cellSize
            );
            if ((x - n) % skip.every === 0) {
                continue;
            }
        }

        const xPos = x * cellSize + startX;
        ctx.fillRect(xPos, 0, 1, ch);
    }

    // horizontal lines
    for (let y = 0; y < vCells; y++) {
        if (skip) {
            const n = Math.trunc(
                (skip.yOffset % (cellSize * skip.every)) / cellSize
            );
            if ((y - n) % skip.every === 0) {
                continue;
            }
        }

        const yPos = y * cellSize + startY;
        ctx.fillRect(0, yPos, cw, 1);
    }
}
