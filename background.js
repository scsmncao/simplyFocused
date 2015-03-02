
// checks the local storage to see if the blocked list exists (for first boot up)
if (localStorage.getItem("blocked") == null) {
	localStorage.setItem("blocked", JSON.stringify([]));
}

// startblock to add a webrequest listener
function startBlock() {
	var blockedSites = JSON.parse(localStorage.getItem("blocked"));
	chrome.webRequest.onBeforeRequest.addListener(
		function(details){return {cancel: true};},
		{urls: blockedSites},
		["blocking"]);
}