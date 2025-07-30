import { logger } from "../logger";

export class FallbackResizeObserver implements ResizeObserver {
    disconnect(): void {
        logger.debug("disconnect");
    }
    observe(target: Element, options?: ResizeObserverOptions): void {
        logger.debug("observe", target, options);
    }
    unobserve(target: Element): void {
        logger.debug("unobserve", target);
    }
}

export const newResizeObserver = (callback: ResizeObserverCallback): ResizeObserver => {
    if (typeof ResizeObserver === "undefined") {
        return new FallbackResizeObserver();
    } else {
        return new ResizeObserver(callback);
    }
};