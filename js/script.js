document.addEventListener("DOMContentLoaded", function () {
	console.log(`Ready`)

	// Array of pictures to display depeding on the Love Calculator Result"
	const pictures = [
		{ picName: `Broken_heart.png`, alt: `Brokengit s` },
		{ picName: `emptyheart.png`, alt: `empty heart` },
		{ picName: `happyheart.png`, alt: `happy heart` },
		{ picName: `shappyheart.png`, alt: `super happy heart` }
	]

	//Select and storage HTML elements
	const loveForm = document.querySelector(`#loveForm`)
	const fname = document.querySelector(`#fname`)
	const sname = document.querySelector(`#sname`)
	const newCalc = document.querySelector(`#newLoveCalc`)
	const loveResult = document.querySelector(`#resultPanel`)

	//Function to clear input's values
	const clearForm = () => {
		fname.value = ""
		sname.value = ""
	}

	// Function to hide or display Preloading picture
	const toggleLoader = function () {
		const lder = document.querySelector(`#loader`)
		lder.classList.toggle(`hide`)
		lder.classList.toggle(`loader`)
	}
	// Function to hide or display Result panel
	const toggleResult = function () {
		loveResult.classList.toggle(`hide`)
		loveResult.classList.toggle(`resultPanel`)
	}

	// Function to hide or display the Form
	const toggleForms = function () {
		loveForm.classList.toggle(`hide`)
		loveForm.classList.toggle(`loveForm`)
		fname.classList.remove(`alert`)
		sname.classList.remove(`alert`)

	}

	//Function to create elements to display
	//the result of the API (calculateLove())
	function printLoveResult(fname, sname, per, res) {
		toggleLoader()
		let srcpic = ""
		let altpic = ""
		//Set the name and description of the picture to display 
		//based on the percetaje rate result
		if (per <= 30) {
			srcpic = pictures[0].picName
			altpic = pictures[0].alt
		} else if (per <= 50) {
			srcpic = pictures[1].picName
			altpic = pictures[1].alt
		} else if (per <= 80) {
			srcpic = pictures[2].picName
			altpic = pictures[2].alt
		} else {
			srcpic = pictures[3].picName
			altpic = pictures[3].alt
		}

		//Populate the Love Result Panel
		loveResult.innerHTML = `
		<p class="pgraphResult"><span>Percentage of love between:</span><span><b>${fname.toUpperCase()}</b> and <b>${sname.toUpperCase()}</b></span><span class="percent">${per}%</span><span>"${res}"</span></p>
		<div class="heartContainer">
		<img class="heart" src="./img/${srcpic}" alt="${altpic}">
		</div>
		`
		//Create a button and add it to Love Result Panel to Make a new calculation
		const newLoveCalc = document.createElement(`button`)
		newLoveCalc.classList.add(`newLoveCalc`)
		newLoveCalc.setAttribute(`id`, `newLoveCalc`)
		newLoveCalc.innerHTML = `Make another calculation`
		newLoveCalc.addEventListener(`click`, function () { toggleForms(), toggleResult(), clearForm() })
		loveResult.appendChild(newLoveCalc)
	}

	// Function to call the API: Love Calculator
	function calculateLove() {
		fetch(`https://love-calculator.p.rapidapi.com/getPercentage?fname=${fname.value}&sname=${sname.value}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "0b168600abmsh79f9a6cdaf4fc2ep120417jsn341f4e4f7d29",
				"x-rapidapi-host": "love-calculator.p.rapidapi.com"
			}
		})
			.then((response) => response.json())
			.then(response => {
				//call function to print the results
				printLoveResult(response.fname, response.sname, Number(response.percentage), response.result)
			})
			.catch(err => {
				console.error(err)
			});
	}

	//function that call the functions that hide Preloader and Forms.
	// Display the Result panel with delay
	function runPreLoader() {
		let timing = ``
		toggleLoader()
		toggleForms()
		timing = setTimeout(function () { toggleResult() }, 1000);
	}

	//Function to alert when one of the input's values are empty	
	function makeAlert() {
		fname.classList.add(`alert`)
		sname.classList.add(`alert`)
		fname.placeholder = `*Enter your name`
		sname.placeholder = `*Enter your crush name`

	}

	//Function to make the submit button clicable
	loveForm.addEventListener("submit", function (event) {
		event.preventDefault()
		if (fname.value && sname.value) {
			//Call funtion that display the Preloader
			runPreLoader()
			//Call function that calls the API
			calculateLove()
		} else {
			makeAlert()
		}
	})
})