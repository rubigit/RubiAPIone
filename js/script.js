document.addEventListener("DOMContentLoaded", function () {
	console.log(`Ready`)

	const pictures = [
		{ picName: `Broken_heart.svg`, alt: `Broken_heart` },
		{ picName: `emptyheart.svg`, alt: `emptyheart` },
		{ picName: `redheart.png`, alt: `redheart` }
	]

	const loveForm = document.querySelector(`#loveForm`)
	const fname = document.querySelector(`#fname`)
	const sname = document.querySelector(`#sname`)
	const newCalc = document.querySelector(`#newLoveCalc`)
	const loveResult = document.querySelector(`#resultPanel`)

	const toggleForms = function () {
		fname.value = ""
		sname.value = ""
		loveForm.classList.toggle(`hide`)
		loveForm.classList.toggle(`loveForm`)
		loveResult.classList.toggle(`hide`)
		loveResult.classList.toggle(`resultPanel`)
	}

	function printLoveResult(fname, sname, per, res) {
		let srcpic = ""
		let altpic = ""
		loveForm.classList.toggle(`hide`)
		loveForm.classList.toggle(`loveForm`)
		loveResult.classList.toggle(`hide`)
		loveResult.classList.toggle(`resultPanel`)

		if (per <= 30) {
			srcpic = pictures[0].picName
			altpic = pictures[0].alt
		} else if (per <= 50) {
			srcpic = pictures[1].picName
			altpic = pictures[1].alt
		} else {
			srcpic = pictures[2].picName
			altpic = pictures[2].alt
		}

		loveResult.innerHTML = `
		<p class="pgraphResult"><span>Percentage of love between</span><span>${fname} and ${sname}</span><span>${per}</span></p>
		<div>
		<img class="heart" src="./img/${srcpic}" alt="${altpic}">
		<p>${res}</p>
		</div>
		`
		const newLoveCalc = document.createElement(`button`)
		newLoveCalc.classList.add(`newLoveCalc`)
		newLoveCalc.setAttribute(`id`, `newLoveCalc`)
		newLoveCalc.innerHTML = `Make another calculation`
		newLoveCalc.addEventListener(`click`, function () { toggleForms() })
		loveResult.appendChild(newLoveCalc)
	}

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
				printLoveResult(response.fname, response.sname, Number(response.percentage), response.result)
			})
			.catch(err => {
				console.error(err)
			});
	}

	loveForm.addEventListener("submit", function (event) {
		event.preventDefault()
		if (fname.value && sname.value) {
			calculateLove()
		}

	})

})