export default function Timer(callback, delay) {
    var timerId, startDate, remaining = delay;

    function _run() {
        startDate = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    }

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - startDate;
    }

    this.resume = function() {
        _run();
    }

    _run();
}