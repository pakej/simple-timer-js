/*
* SimpleTimer 2.0.0
* Copyright © 2019 Zaim Ramlan
*/

class SimpleTimer {
    /**
     * Creates an instance of Timer.
     *
     * @constructor
     * @author: Zaim Ramlan
     * @param {number} duration The duration (in seconds) that the timer should countdown to.
     * @param {string} timerContainer The class name of the timer's container.
     * @param {string} originalText The original text to be put back into the timer's container,
     * once the timer completes.
     */
    constructor(duration, timerContainer, originalText) {
        this.duration = duration;
        this.timeLeft = duration;
        this.timerContainer = timerContainer;
        this.originalText = originalText;
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
        this.timeLeft = this.duration;
        this.changeContainerText(this.timerContainer, this.originalText);
        this.functionsToExecuteAtTimerEnd();
    }

    /* Helpers */

    /**
     * Updates the timer display to the timer countdown, or the original text.
     *
     * (This method is intended to only be called inside the Timer class)
     */
    updateTimerDisplay() {
        this.changeContainerText(this.timerContainer, this.formatTimer(--this.timeLeft));

        var isTimerCompleted = this.timeLeft == 0;
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
     * @param {number} secondsInput The number of seconds remaining.
     * @return {string} The text formatted to represent timer countdown.
     */
    formatTimer(secondsInput) {
        var minutes = Math.floor(secondsInput / 60);
        var seconds = secondsInput % 60;
        var formattedTimer = (minutes < 10 ? "0" : "" ) + minutes + ":" + (seconds < 10 ? "0" : "" ) + seconds;
        return formattedTimer;
    }
}
