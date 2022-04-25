var fillArray = function (length, value) { return Array(length).fill(value); };

var Lethargy = /** @class */ (function () {
    function Lethargy(userConfig) {
        this.config = {
            stability: 8,
            sensitivity: 100,
            tolerance: 1.1,
            delay: 150, // Threshold for the amount of time between mousewheel events for them to be deemed separate
        };
        // Used internally and should not be manipulated
        this.lastUpDeltas = [];
        this.lastDownDeltas = [];
        this.deltasTimestamp = [];
        if (typeof (userConfig === null || userConfig === void 0 ? void 0 : userConfig.stability) !== 'undefined') {
            this.config.stability = Math.abs(userConfig.stability);
        }
        if (typeof (userConfig === null || userConfig === void 0 ? void 0 : userConfig.sensitivity) !== 'undefined') {
            this.config.sensitivity = 1 + Math.abs(userConfig.sensitivity);
        }
        if (typeof (userConfig === null || userConfig === void 0 ? void 0 : userConfig.tolerance) !== 'undefined') {
            this.config.tolerance = 1 + Math.abs(userConfig.tolerance);
        }
        if (typeof (userConfig === null || userConfig === void 0 ? void 0 : userConfig.delay) !== 'undefined') {
            this.config.delay = userConfig.delay;
        }
        this.lastUpDeltas = fillArray(this.config.stability * 2, null);
        this.lastDownDeltas = fillArray(this.config.stability * 2, null);
        this.deltasTimestamp = fillArray(this.config.stability * 2, null);
        console.log(this.lastDownDeltas, this.lastUpDeltas, this.deltasTimestamp);
    }
    // Checks whether the mousewheel event is an intent
    Lethargy.prototype.check = function (e) {
        // Normalize delta, -40 is a magic number
        var lastDelta = e.deltaY * -40;
        // Add the new event timestamp to deltasTimestamp array, and remove the oldest entry
        this.deltasTimestamp.push(Date.now());
        this.deltasTimestamp.shift();
        // If lastDelta is positive, it means the user scrolled up
        if (lastDelta > 0) {
            this.lastUpDeltas.push(lastDelta);
            this.lastUpDeltas.shift();
            return this.isInertia(1);
        }
        else {
            // Otherwise, the user scrolled down
            this.lastDownDeltas.push(lastDelta);
            this.lastDownDeltas.shift();
            return this.isInertia(-1);
        }
    };
    Lethargy.prototype.isInertia = function (direction) {
        console.log(direction);
    };
    return Lethargy;
}());

export { Lethargy as default };
