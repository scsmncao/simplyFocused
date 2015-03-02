
// add a listener for the start button
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('start').addEventListener('click', function() {
		// uses the startBlock function in the background page
		localStorage.setItem("started", JSON.stringify("true"));
		chrome.extension.getBackgroundPage().startBlock();
		chrome.extension.getBackgroundPage().backgroundCount(JSON.parse(localStorage.getItem("seconds")));
	});
});

document.addEventListener('DOMContentLoaded', setTimer);

function setTimer() {
	var numberOfSeconds = JSON.parse(localStorage.getItem("seconds"));
	document.getElementById("countdown").innerHTML = numberOfSeconds.toString().toHHMMSS();
}

function countdown() {
	if (document.getElementById("countdown") != null) {
	    document.getElementById("countdown").innerHTML = JSON.parse(localStorage.getItem("seconds")).toString().toHHMMSS();
	    setTimeout(countdown, 1000);
	}
}

function setStartButton() {
	if (localStorage.getItem("started") == "true") {
		document.getElementById('start').disabled = true;
	}
}

document.addEventListener('DOMContentLoaded', countdown);

document.addEventListener('DOMContentLoaded', setStartButton);

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}