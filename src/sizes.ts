export interface Padding {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

export const zeroPadding = (): Padding => ({ left: 0, top: 0, right: 0, bottom: 0 });

export const newPadding  = (left: number, top: number, right: number, bottom: number): Padding => ({ left, top, right, bottom }); 

export const newPaddingSame = (value: number): Padding => ({ left: value, top: value, right: value, bottom: value });