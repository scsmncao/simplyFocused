
// add a listener for the start button
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('start').addEventListener('click', function() {
		// uses the startBlock function in the background page
		chrome.extension.getBackgroundPage().startBlock();
	});
});