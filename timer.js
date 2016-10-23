/*
* Timer.js by Zaim Ramlan
*
* duration 			- total duration of the timer (in seconds)
* timer_container 	- HTML element to target (i.e. '#html-element-id') as container to display timer
* original_text 	- the original text in the HTML element. if there aren't, put an empty string (i.e. "") 
*
* note: requires jQuery to work
*/

var Timer = function(duration, timer_container, original_text) {
	// duration is in seconds
	// constructor(duration, timer_container, original_text) {
		this.duration = duration;
		this.time_left = duration;
		this.timer_container = timer_container;
		this.original_text = original_text;
		
		// class-wide variables
		this.EVERY_SECOND = 1000;
		// functions to be executed after timer finishes
		this.functionsToExecuteAtTimerEnd = function(){};

		// formats time in MM:SS format, given the time in seconds
		this.formatTimer = function(seconds_input) {
		    var minutes = Math.floor(seconds_input/60);
		    var seconds = seconds_input % 60;
		    var formatted_timer = (minutes < 10 ? "0" : "" ) + minutes + ":" + (seconds < 10 ? "0" : "" ) + seconds;
		    return formatted_timer;
		}

		this.changeContainerText = function(container, text) {
			$(container).html(text);
		}

		this.startTimer = function() {
			this.timer_function = setInterval(this.updateTimerDisplay.bind(this), this.EVERY_SECOND);
		}	

		this.endTimer = function() {
			clearInterval(this.timer_function);
		}	

		this.resetTimer = function() {
			// reinitialize the time_left variable to the initial duration
			this.time_left = this.duration;
		}

		this.updateTimerDisplay = function() {
			this.changeContainerText(this.timer_container, this.formatTimer(--this.time_left));

			// when the timer finishes
			if(this.time_left == 0) {
				this.endTimer();
				this.changeContainerText(this.timer_container, this.original_text);
				this.functionsToExecuteAtTimerEnd();
			}
		}		
	// }	
}
