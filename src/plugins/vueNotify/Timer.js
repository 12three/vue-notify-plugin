export default class Timer {
    constructor(callback, delay) {
        this.timerId = null;
        this.startDate = null;
        this.callback = callback;
        this.remaining = delay;
    }

    _run() {
        this.startDate = new Date();
        window.clearTimeout(this.timerId);
        this.timerId = window.setTimeout(this.callback, this.remaining);
    }

    pause() {
        window.clearTimeout(this.timerId);
        this.remaining -= new Date() - this.startDate;
    }

    resume() {
        this._run();
    }

    start() {
        this._run();
    }
}