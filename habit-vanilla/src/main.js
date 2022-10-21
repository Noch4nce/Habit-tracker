const plusBtnSelector = document.getElementById('plusBtn')
const modalAddSelector = document.getElementById('modalAdd')
const addHabitBtnSelector = document.getElementById('addHabitBtn')
const modalInputSelector = document.getElementById('modalInput')
const habitsContainerSelector = document.getElementById('habitsContainer')
const progressBarSelector = document.getElementById('progressBar')

modalInputSelector.value = ''

// 	<img
// src="../assets/checked.png"
// alt="check-mark"
// width="50"
// 	/>
const habitsText = []
let totalDays = 0
let checkedCount = 0

const init = () => {
	const value = localStorage.getItem('habitValue')
	const parseValue = JSON.parse(value)
	console.log(parseValue, "parseValue")
	parseValue.map((value) => handleCreateHabit(value))
}

const handleShowModal = () => {
	modalAddSelector.classList.remove('hide')
}

const handleAddHabit = () => {
	const text = modalInputSelector.value.trim()
	if (text) {
		modalAddSelector.classList.add('hide')
		handleCreateHabit(text)
		habitsText.push(text)
		localStorage.setItem('habitValue', JSON.stringify(habitsText))
	}

	modalInputSelector.value = ''
	totalDays += 7
	countProgressBar()
}

const handleCreateHabit = (text) => {
	habitsContainerSelector.insertAdjacentHTML(
		'afterbegin',
		`<div class="mb-6">
			<div class="flex items-center gap-4 mb-5">
				<img
					src="../assets/lifestyle.png"
					alt="lifestyle"
					width="80"
				/>
				<span class="font-bold text-2xl">${text}</span>
			</div>
	
			<div class="flex items-center gap-6">
				<button class="habitDefault">M</button>
				<button class="habitDefault">T</button>
				<button class="habitDefault">W</button>
				<button class="habitDefault">T</button>
				<button class="habitDefault">F</button>
				<button class="habitDefault">S</button>
				<button class="habitDefault">S</button>
			</div>
		</div>
	`
	)
}

const handleChangeChecked = (event) => {
	if (event.target.classList.contains('habitDefault')) {
		event.target.className = 'habitChecked'
		checkedCount += 1
	} else if (event.target.classList.contains('habitChecked')) {
		event.target.className = 'habitDefault'
		checkedCount -= 1
	}

	countProgressBar()
}

const countProgressBar = () => {
	const progress = Math.round((checkedCount / totalDays) * 100)

	progressBarSelector.style.width = `${progress}%`
	progressBarSelector.innerText = `${progress}%`
}

plusBtnSelector.addEventListener('click', handleShowModal)
addHabitBtnSelector.addEventListener('click', handleAddHabit)
habitsContainerSelector.addEventListener('click', (event) =>
	handleChangeChecked(event)
)

init()
