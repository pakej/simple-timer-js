/*
* SimpleTimer 2.0.0
* Copyright © 2019 Zaim Ramlan
*/

class Timer {
    /**
     * Creates an instance of Timer.
     *
     * @constructor
     * @author: Zaim Ramlan
     * @param {number} duration The duration (in seconds) that the timer should countdown to.
     * @param {string} timer_container The class name of the timer's container.
     * @param {string} original_text The original text to be put back into the timer's container,
     * once the timer completes.
     */
    constructor(duration, timer_container, original_text) {
        this.duration = duration;
        this.time_left = duration;
        this.timer_container = timer_container;
        this.original_text = original_text;
        this.EVERY_SECOND = 1000;
        this.functionsToExecuteAtTimerEnd = function() {};
    }

    /**
     * Starts the timer.
     */
    startTimer() {
        this.timer_function = setInterval(this.updateTimerDisplay.bind(this), this.EVERY_SECOND);
    }

    /**
     * Force ends the timer and resets its container to their original state.
     */
    endTimer() {
        clearInterval(this.timer_function);
        this.time_left = this.duration;
        this.changeContainerText(this.timer_container, this.original_text);
        this.functionsToExecuteAtTimerEnd();
    }

    /* Helpers */

    /**
     * Updates the timer display to the timer countdown, or the original text.
     *
     * (This method is intended to only be called inside the Timer class)
     */
    updateTimerDisplay() {
        this.changeContainerText(this.timer_container, this.formatTimer(--this.time_left));

        var isTimerCompleted = this.time_left == 0;
        if (isTimerCompleted) {
            this.endTimer();
        }
    }

    /**
     * Updates the container text with the timer countdown.
     *
     * @param {string} container The class name of the container.
     * @param {string} text The text to replace the one inside the container.
     *
     * (This method is intended to only be called inside the Timer class)
     */
    changeContainerText(container, text) {
        var container = document.getElementsByClassName(container)[0];
        container.innerHTML = text;
    }

    /**
     * Formats time in MM:SS format, given the time in seconds
     *
     * @param {number} seconds_input The number of seconds remaining.
     * @return {string} The text formatted to represent timer countdown.
     */
    formatTimer(seconds_input) {
        var minutes = Math.floor(seconds_input / 60);
        var seconds = seconds_input % 60;
        var formatted_timer = (minutes < 10 ? "0" : "" ) + minutes + ":" + (seconds < 10 ? "0" : "" ) + seconds;
        return formatted_timer;
    }
}
