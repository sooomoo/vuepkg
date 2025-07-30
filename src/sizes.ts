export interface Padding {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

export const zeroPadding = (): Padding => ({ left: 0, top: 0, right: 0, bottom: 0 });

export const newPadding = (left: number, top: number, right: number, bottom: number): Padding => ({ left, top, right, bottom });

export const newPaddingSame = (value: number): Padding => ({ left: value, top: value, right: value, bottom: value });

export const newPaddingFromString = (padding: string): Padding => {
    const segs = padding
        .trim()
        .split(" ")
        .map((v) => v.trim())
        .filter((v) => v.length > 0);
    if (segs.length === 1) {
        const val = parseFloat(segs[0].replace("px", ""));
        return {
            top: val,
            right: val,
            bottom: val,
            left: val,
        };
    }
    if (segs.length === 2) {
        const ver = parseFloat(segs[0].replace("px", ""));
        const hor = parseFloat(segs[1].replace("px", ""));
        return {
            top: ver,
            right: hor,
            bottom: ver,
            left: hor,
        };
    }
    if (segs.length === 3) {
        const ver = parseFloat(segs[0].replace("px", ""));
        const hor = parseFloat(segs[1].replace("px", ""));
        return {
            top: ver,
            right: hor,
            bottom: parseFloat(segs[2].replace("px", "")),
            left: hor,
        };
    }
    if (segs.length === 4) {
        return {
            top: parseFloat(segs[0].replace("px", "")),
            right: parseFloat(segs[1].replace("px", "")),
            bottom: parseFloat(segs[2].replace("px", "")),
            left: parseFloat(segs[3].replace("px", "")),
        };
    }
    return zeroPadding();
};


export interface Gap {
    row: number;
    column: number;
}

export const newGapFromString = (gap: string): Gap => {
    const segs = gap
        .trim()
        .split(" ")
        .map((v) => v.trim())
        .filter((v) => v.length > 0);
    if (segs.length === 1) {
        const val = parseFloat(segs[0].replace("px", ""));
        return { row: val, column: val };
    }
    if (segs.length === 2) {
        return {
            row: parseFloat(segs[0].replace("px", "")),
            column: parseFloat(segs[1].replace("px", "")),
        };
    }
    return { row: 0, column: 0 };
};

export type Anchor =
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "rightTop"
    | "rightCenter"
    | "rightBottom"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight"
    | "leftTop"
    | "leftCenter"
    | "leftBottom";


export class Rect {
    x: number = 0;
    y: number = 0;
    width: number = 0;
    height: number = 0;

    static empty(): Rect {
        return new Rect(0, 0, 0, 0);
    }

    static fromDOMRect = (rect: DOMRect): Rect => {
        return new Rect(rect.x, rect.y, rect.width, rect.height);
    };

    constructor(x: number, y: number, width: number, height: number) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.width = Math.floor(width);
        this.height = Math.floor(height);
    }

    public get isEmpty(): boolean {
        return this.width === 0 && this.height === 0;
    }
    public get right(): number {
        return this.x + this.width;
    }
    public get bottom(): number {
        return this.y + this.height;
    }

    public isSameWith(rect: Rect, threshold: number = 1): boolean {
        const deltaX = Math.abs(this.x - rect.x);
        const deltaY = Math.abs(this.y - rect.y);
        const deltaWidth = Math.abs(this.width - rect.width);
        const deltaHeight = Math.abs(this.height - rect.height);
        return deltaX <= threshold && deltaY <= threshold && deltaWidth <= threshold && deltaHeight <= threshold;
    }

    /**
     * 从四周缩小指定值
     */
    public shrink(delta: number) {
        return new Rect(this.x + delta, this.y + delta, this.width - delta * 2, this.height - delta * 2);
    }
    public expand(delta: number) {
        return new Rect(this.x - delta, this.y - delta, this.width + delta * 2, this.height + delta * 2);
    }

    /**
     * 当目标矩形以当前矩形为锚定时，计算目标矩形锚定后的位置
     * @param anchor 锚点
     * @param targetRect 目标矩形
     * @returns 目标矩形锚定后的位置
     */
    public anchorOutside(anchor: Anchor, targetRect: Rect): Rect {
        switch (anchor) {
            case "topLeft":
                return new Rect(this.x, this.y - targetRect.height, targetRect.width, targetRect.height);
            case "topCenter":
                return new Rect(this.x + (this.width - targetRect.width) / 2, this.y - targetRect.height, this.width, this.height);
            case "topRight":
                return new Rect(this.right - targetRect.width, this.y - targetRect.height, this.width, this.height);
            case "rightTop":
                return new Rect(this.right, this.y, targetRect.width, this.height);
            case "rightCenter":
                return new Rect(this.right, this.y + (this.height - targetRect.height) / 2, this.width, this.height);
            case "rightBottom":
                return new Rect(this.right, this.bottom - targetRect.height, this.width, targetRect.height);
            case "bottomLeft":
                return new Rect(this.x, this.bottom, targetRect.width, this.height);
            case "bottomCenter":
                return new Rect(this.x + (this.width - targetRect.width) / 2, this.bottom, this.width, this.height);
            case "bottomRight":
                return new Rect(this.right - targetRect.width, this.bottom, this.width, this.height);
            case "leftTop":
                return new Rect(this.x - targetRect.width, this.y, targetRect.width, this.height);
            case "leftCenter":
                return new Rect(this.x - targetRect.width, this.y + (this.height - targetRect.height) / 2, targetRect.width, this.height);
            case "leftBottom":
                return new Rect(this.x - targetRect.width, this.bottom - targetRect.height, targetRect.width, this.height);
        }
    }
}
