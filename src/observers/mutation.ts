import { logger } from "../logger";

export class FallbackMutationObserver implements MutationObserver {
    disconnect(): void {
        logger.debug("disconnect");
    }
    observe(target: Element, options?: MutationObserverInit): void {
        logger.debug("observe", target, options);
    }
    takeRecords(): MutationRecord[] {
        return [];
    }
}

export const newMutationObserver = (callback: MutationCallback): MutationObserver => {
    if (typeof MutationObserver === "undefined") {
        return new FallbackMutationObserver();
    } else {
        return new MutationObserver(callback);
    }
};
