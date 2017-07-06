var Beer = {};

Beer.Model = (function(){

	var elements = {
		container: document.querySelector('.beer-background'),
		resultsContainer: document.querySelector('.beer-results'),
		button: document.getElementById('beer-search-button'),
		form: document.querySelector('.beer-form'),
		input: document.querySelectorAll('input'),
		closeOutButton: document.querySelector('.beer-modal-close')
	};

 /**
     * Ajax get request
     *
     */

	function handleRequest(searchWord, searchType) {
		var baseUrl = "https://api.untappd.com/v4/search/" + searchType + "?q=";
		var url = baseUrl + searchWord + apiKey;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function() {
			if(xhr.status === 200) {
				handleResponse(JSON.parse(xhr.response));
			} else {
				console.log("There was an error " + xhr.status);
			}
		}
		xhr.send(null);
	};

 /**
     * Callback that handles data response
     *
     * @param {Array.<Object>} responseData
     *
     */

	function handleResponse(responseData) {
		var response = responseData.response;
		if(response.brewery) {
		    response.brewery.items.forEach(constructResults);
		} else {
			response.beers.items.forEach(constructResults);
		}
	};

 /**
     * sets up the HTMl elements with recieved data
     *
     * @param {Array.<Object>} searchResult
     */

	function constructResults(searchResult) {
		var childElement = document.createElement("div");
		var title = document.createElement("h4");
		var image = document.createElement("img");
		var description = document.createElement("h4");
		var country = document.createElement("h4");
			if(searchResult.beer) {
				title.textContent = searchResult.beer.beer_name;
		    image.src = searchResult.beer.beer_label;
		    description.textContent = searchResult.beer.beer_description;
	    } else {
				title.textContent = searchResult.brewery.brewery_name;
		    image.src = searchResult.brewery.brewery_label;
		    country.textContent = searchResult.brewery.country_name;
	    };
	  childElement.appendChild(title);
		childElement.appendChild(image);
		childElement.appendChild(description);
		childElement.appendChild(country);
		elements.resultsContainer.appendChild(childElement);
	  createResultsContainer();
	};

	/**
		* creates modal to display beer result
		*/

	function createResultsContainer() {
		elements.container.classList.add("beer-container--overlay");
		elements.resultsContainer.classList.add("beer-results--show");
		elements.closeOutButton.classList.add("beer-modal-close--show");
		elements.closeOutButton.addEventListener("click", onModalClose);
	};

	/**
		 * callback that handles modal close out functionality
		 */

	function onModalClose() {
		elements.container.classList.remove("beer-container--overlay");
		elements.resultsContainer.classList.remove("beer-results--show");
		clearInputs();
	};

};