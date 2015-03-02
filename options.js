var arrayOfPredefinedSites = ["facebook", "amazon", "twitter", "tumblr", "youtube", "pinterest", "instagram", "buzzfeed"];
var currentlyAdded = [];
var saved = false;

// this will initially load the options everytime the options is open
function loadOptions() {

	var currentlyBlocked = JSON.parse(localStorage.getItem("simpleBlocked"));

	if (currentlyBlocked.length == 0) {
		return
	}

	if (JSON.parse(localStorage.getItem("started")) == "true") {
		document.getElementById('delete').disabled = true;
		document.getElementById('clear').disabled = true;
		document.getElementById('durationHours').disabled = true;
	}
	// for every check box site, see if it's intialized first and then get true or false depending on localStorage
	for (i = 0; i < currentlyBlocked.length; i++) {
		element = currentlyBlocked[i];
		indexOfSuffix = element.indexOf(".com");
		if (arrayOfPredefinedSites.indexOf(element.substring(0, indexOfSuffix)) > -1) {
			console.log(element.substring(0, indexOfSuffix));
			// enable the checkbox and uncheck the box
			var option = document.createElement("option");
	 		option.text = element;
	 		selector.add(option);
			document.getElementById(element).checked = true;
	 		document.getElementById(element).disabled = true;
		}
		// if the localStorage value for the site is true, check the box and disable it
		else {
			var option = document.createElement("option");
	 		option.text = element;
	 		selector.add(option);
		}
	}

	document.getElementById('durationHours').value = (JSON.parse(localStorage.getItem("seconds")) / 3600).toPrecision(1);
}

//add a listener for when the options is loaded so we can inialize it
document.addEventListener('DOMContentLoaded', loadOptions, false);

// the add sites function will add the sites that are selected and also the user text box as well
function addSites(){

	//the selector for the html page
	var selector = document.getElementById("selector");

	// we are checking every predifined site to see if they're checked and then if it is add it to the list of 
	// sites that need to be blocked
	for (i = 0; i < arrayOfPredefinedSites.length; i++) {

		// the current element that we're on in the loop of arrayOfPredefinedSites
		var element = arrayOfPredefinedSites[i];

		var elementWithSuffix = element + ".com"

		// get the checkbox element
		var site = document.getElementById(elementWithSuffix);

		// if the element in the storage is not true and if the site is checked, create a new option for the selector
		// and set the option to true
		if (site.checked && (localStorage.getItem("simpleBlocked").indexOf(elementWithSuffix) == -1 && currentlyAdded.indexOf(elementWithSuffix) == -1)) {
	 		var option = document.createElement("option");
	 		option.text = elementWithSuffix;
	 		selector.add(option);
	 		site.disabled = true;
	 		currentlyAdded.push(elementWithSuffix);
 		}
	}
	if (document.getElementById("urlText").value != "") {
		addURL(document.getElementById("urlText").value);
	}
}

// this function will remove a site from the selector
function removeSites() {

	// get the value from the selector and set it to false in the storage
	var selector = document.getElementById("selector");
	// localStorage[selector.value] = "false";

	//check to see if the url being deleted is a preselected one
	indexOfSuffix = selector.value.indexOf(".com");
	if (arrayOfPredefinedSites.indexOf(selector.value.substring(0, indexOfSuffix)) > -1) {
		// enable the checkbox and uncheck the box
		document.getElementById(selector.value).disabled = false;
		document.getElementById(selector.value).checked = false;
	}
	var simpleBlockSites = JSON.parse(localStorage.getItem("simpleBlocked"));
	if (simpleBlockSites.indexOf(selector.value) != -1) {
		var indexOfSite = simpleBlockSites.indexOf(selector.value);
		simpleBlockSites.splice(indexOfSite, 1);
		localStorage.setItem("simpleBlocked", JSON.stringify(simpleBlockSites));
	}
	else {
		var indexOfSite = currentlyAdded.indexOf(selector.value);
		currentlyAdded.splice(indexOfSite, 1);
	}
	selector.remove(selector.selectedIndex);

}

// this function will clear all the sites in the selector
function clearSites() {

	// gets the selector element in the html
	var selector = document.getElementById("selector");

	// goes through every site and checks to see if it's true
	for (i = 0; i < arrayOfPredefinedSites.length; i++) {

		// get the element in the arrayOfPredefinedSites
		element = arrayOfPredefinedSites[i]

		document.getElementById(element + ".com").disabled = false;
		document.getElementById(element + ".com").checked = false;
	}
	currentlyAdded = [];
	selector.options.length = 0;
	localStorage.setItem("blocked", JSON.stringify([]));
	localStorage.setItem("simpleBlocked", JSON.stringify([]));
}

// adds the url given and only accepts urls with a suffix and no www. to make it easier to block
function addURL(url) {
	var selector = document.getElementById("selector");
	if (url.indexOf("www.") == -1) {
		if (url.indexOf(".") == -1) {
			alert("Please add a suffix (eg. .com, .net, .org)");
		}
		else {
			var option = document.createElement("option");
	 		option.text = url;
	 		selector.add(option);
			currentlyAdded.push(url);
			document.getElementById("urlText").value = "";
		}
	}
	else {
		alert("Do not put www.");
	}
}

//saves the sites to local storage that are in the currentlyAdded array
function saveSites() {
	var savedList = []
	var selector = document.getElementById("selector");
	var simpleList = []
	for (i = 0; i < selector.length; i++) {
		console.log(selector[i].value);
		savedList.push("*://" + selector[i].value + "/*");
		savedList.push("*://www." + selector[i].value + "/*");
		simpleList.push(selector[i].value);
	}
	localStorage.setItem("blocked", JSON.stringify(savedList));
	localStorage.setItem("simpleBlocked", JSON.stringify(simpleList));
	var durationHours = parseFloat(document.getElementById("durationHours").value);
	if (durationHours && durationHours > 0) 
	    localStorage.setItem("seconds", JSON.stringify(parseInt(durationHours * 3600)));
	saved = true;
}

window.onbeforeunload = function(e) {
	if (saved == false)
		saveSites();
}

// add a listener for the add button, delete button, and clear button
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('add').addEventListener('click', addSites);
});
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('delete').addEventListener('click', removeSites);
});
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('clear').addEventListener('click', clearSites);
});
