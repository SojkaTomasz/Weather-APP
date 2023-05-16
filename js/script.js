const input = document.querySelector('input');
const button = document.querySelector('button');
const nameCity = document.querySelector('.name-city');
const error = document.querySelector('.error');
const icon = document.querySelector('.icon');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const dataWeather = document.querySelector('.data-weather');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=68faec128c053b5f257100bb621562cc';
const API_UNITS = '&units=metric';

const pogoda = (data) => {
	temperature.textContent = data.main.temp.toFixed(0) + '°C';
	humidity.textContent = data.main.humidity + '%';
	weather.textContent = data.weather[0].main;
	nameCity.textContent = data.name;
	nameCity.style.visibility = 'visible';
	dataWeather.style.visibility = 'visible';
	error.style.visibility = 'hidden';
	input.value = '';

	const status = data.weather[0].id;
	if (status >= 200 && status < 300) {
		icon.setAttribute('src', './img/thunderstorm.png');
	} else if (status >= 300 && status < 400) {
		icon.setAttribute('src', './img/drizzle.png');
	} else if (status >= 500 && status < 600) {
		icon.setAttribute('src', './img/rain.png');
	} else if (status >= 600 && status < 700) {
		icon.setAttribute('src', './img/ice.png');
	} else if (status >= 700 && status < 800) {
		icon.setAttribute('src', './img/fog.png');
	} else if (status === 800) {
		icon.setAttribute('src', './img/sun.png');
	} else if (status > 800 && status < 805) {
		icon.setAttribute('src', './img/cloud.png');
	} else {
		icon.setAttribute('src', './img/unknown.png');
	}
};

async function test() {
	const city = input.value;
	const URL = API_LINK + city + API_KEY + API_UNITS;
	try {
		const res = await fetch(URL);
		const data = await res.json();
		pogoda(data);
	} catch {
		if (input.value.length == 0) {
			error.style.visibility = 'visible';
			error.textContent = 'Musisz podać miasto!';
		} else {
			error.style.visibility = 'visible';
			error.textContent = 'Nie znaleziono miasta!';
		}
	}
}

const clickEnter = (e) => {
	if (e.key == 'Enter') {
		test();
	}
};

input.addEventListener('keyup', clickEnter);
button.addEventListener('click', test);
