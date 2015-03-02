var arrayOfPredefinedSites = ["Facebook", "Twitch", "Twitter", "Tumblr", "YouTube", "Pinterest", "Instagram", "Buzzfeed"];

// this will initially load the options everytime the options is open
function loadOptions() {
	// for every check box site, see if it's intialized first and then get true or false depending on localStorage
	for (i = 0; i < arrayOfPredefinedSites.length; i++) {
		element = arrayOfPredefinedSites[i]
		// we have to initialize the localStorage on first startup
		if (localStorage.getItem(element) == null) {
			localStorage[element] = "false";
		}
		// if the localStorage value for the site is true, check the box and disable it
		if (localStorage.getItem(element) == "true") {
			var option = document.createElement("option");
	 		option.text = element;
	 		selector.add(option);
	 		document.getElementById(element.toLowerCase()).checked = true;
	 		document.getElementById(element.toLowerCase()).disabled = true;
		}
	}
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

		// get the checkbox element
		var site = document.getElementById(element.toLowerCase());

		// get the element from storage
		var elementInStorage = localStorage.getItem(element);

		// if the element in the storage is not true and if the site is checked, create a new option for the selector
		// and set the option to true
		if (site.checked && elementInStorage != "true") {
	 		var option = document.createElement("option");
	 		option.text = element;
	 		selector.add(option);
	 		site.disabled = true;
	 		localStorage[element] = "true";
	 		blockedSites = JSON.parse(localStorage.getItem("blocked"));
	 		//twitter is a little weird, we need to add both twitter.com and www.twitter.com
	 		if element == "Twitter":
	 			blockedSites.push("*://" + element.toLowerCase() + ".com/*");
	 		blockedSites.push("*://www." + element.toLowerCase() + ".com/*");
	 		localStorage.setItem("blocked", JSON.stringify(blockedSites));
 		}
	}
}

// this function will remove a site from the selector
function removeSites() {

	// get the value from the selector and set it to false in the storage
	var selector = document.getElementById("selector");
	localStorage[selector.value] = "false";

	// enable the checkbox and uncheck the box
	document.getElementById(selector.value.toLowerCase()).disabled = false;
	document.getElementById(selector.value.toLowerCase()).checked = false;

	// remove the site from the blocked list in local storage
	blockedSites = JSON.parse(localStorage.getItem("blocked"));
	var indexOfSite = blockedSites.indexOf("://www." + selector.value.toLowerCase() + ".com/*");
	blockedSites.splice(indexOfSite);

	// twitter is a special case and needs to remove twitter.com as well
	if selector.value == "Twitter":
	 	indexOfSite = blockedSites.indexOf("*://" + selector.value.toLowerCase() + ".com/*");
	 	blockedSites.splice(indexOfSite);
	localStorage.setItem("blocked", JSON.stringify(blockedSites));
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

		// if the localStorage for the site is true, change the storage to false and all the checkboxes
		if (localStorage.getItem(element) == "true") {

			// sets the storage to false and enables the box and unchecks it
			localStorage[element] = "false";
			document.getElementById(element.toLowerCase()).disabled = false;
			document.getElementById(element.toLowerCase()).checked = false;

			// remove the site from the blocked list in local storage
			blockedSites = JSON.parse(localStorage.getItem("blocked"));
			var indexOfSite = blockedSites.indexOf("://www." + selector.value + ".com/*");
			blockedSites.splice(indexOfSite);

			// special case for tiwtter need to remove twitter.com as well
			if selector.value == "Twitter":
			 	indexOfSite = blockedSites.indexOf("*://" + selector.value.toLowerCase() + ".com/*");
			 	blockedSites.splice(indexOfSite);
			localStorage.setItem("blocked", JSON.stringify(blockedSites));
		}
	}
	// set the selector options to 0
	selector.options.length = 0;
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
