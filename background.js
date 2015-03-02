
// checks the local storage to see if the blocked list exists (for first boot up)
if (localStorage.getItem("blocked") == null) {
	localStorage.setItem("blocked", JSON.stringify([]));
}

if (localStorage.getItem("seconds") == null) {
	localStorage.setItem("seconds", JSON.stringify(0));
}

if (localStorage.getItem("simpleBlocked") == null) {
	localStorage.setItem("simpleBlocked", JSON.stringify([]));
}

callback = function(details){return {cancel: true};};

// startblock to add a webrequest listener
function startBlock() {
	var blockedSites = JSON.parse(localStorage.getItem("blocked"));
	chrome.webRequest.onBeforeRequest.addListener(
		callback,
		{urls: blockedSites},
		["blocking"]);
}

function backgroundCount(remaining) {
	localStorage.setItem("seconds", JSON.stringify(remaining));
    if(remaining <= 0) {
        localStorage.setItem("blocked", JSON.stringify([]));
        localStorage.setItem("simpleBlocked", JSON.stringify([]));
        localStorage.setItem("seconds", JSON.stringify(0));
        alert("Time's up! Hope you got your work done.")
        localStorage.setItem("started", JSON.stringify("false"));
        chrome.webRequest.onBeforeRequest.removeListener(callback);
        return;
    }
    setTimeout(function(){ backgroundCount(remaining - 1); }, 1000);
}

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