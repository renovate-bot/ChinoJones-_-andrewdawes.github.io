const secondsHand = document.getElementsByClassName('second')[0];
const minutesHand = document.getElementsByClassName('minute')[0];
const hoursHand = document.getElementsByClassName('hour')[0];
let seconds = 0;
let minutes = 0;
let hours = 0;
let lastMinute = false;

const getSeconds = () => (seconds === 62 ? (seconds = 1) : ++seconds);
const getMinutes = () => ++minutes;
const getHours = () => (hours === 12 ? (hours = 1) : ++hours);

const getTime = () => {
	seconds = getSeconds();
	if (seconds === 62) {
		minutes = getMinutes();
	}
	if (minutes === 60) {
		hours = getHours();
		minutes = 0;
	}
	return {
		seconds: seconds,
		minutes: minutes,
		hours: hours,
	};
};

const getAnimationFrames = (degrees) => {
	return [
		{ transform: `rotate(${degrees}deg)` },
		{ transform: `rotate(${degrees - 3}deg)` },
		{ transform: `rotate(${degrees + 3}deg)` },
		{ transform: `rotate(${degrees - 2}deg)` },
		{ transform: `rotate(${degrees}deg)` },
	];
};

const secondsToDegrees = (seconds) => (seconds > 60 ? 0 : seconds * 6);

const minutesToDegrees = (minutes) => minutes * 6;
const hoursToDegrees = (hours, minutes) => {
	let hourDegrees = hours * 30;
	let percentageIntoHour = minutes / 60;
	let minuteDegrees = 30 * percentageIntoHour;
	return hourDegrees + minuteDegrees;
};

const updateSecondsHand = (seconds) => {
	if (seconds === 61) {
		secondsHand.classList.remove('transition');
	}
	if (seconds === 62) {
		secondsHand.classList.add('transition');
	}
	let degrees = secondsToDegrees(seconds);
	secondsHand.style.transform = `rotate(${degrees}deg)`;
};

const updateMinutesHand = (minutes) => {
	if (lastMinute && lastMinute !== minutes) {
		let degrees = minutesToDegrees(minutes);
		minutesHand.style.transform = `rotate(${degrees}deg)`;
		minutesHand.animate(getAnimationFrames(degrees), {
			duration: 260,
			iterations: 1,
		});
		lastMinute = minutes;
	} else if (!lastMinute) {
		let degrees = minutesToDegrees(minutes);
		minutesHand.style.transform = `rotate(${degrees}deg)`;
		lastMinute = minutes;
	}
};

const updateHoursHand = (hours) => {
	let degrees = hoursToDegrees(hours, minutes);
	hoursHand.style.transform = `rotate(${degrees}deg)`;
};

const updateClock = () => {
	const { seconds, minutes, hours } = getTime();
	updateSecondsHand(seconds);
	updateMinutesHand(minutes);
	updateHoursHand(hours);
};

const beginClock = () => {
	let date = new Date();
	seconds = date.getSeconds();
	minutes = date.getMinutes();
	hours = date.getHours() % 12 || 12;
	setInterval(updateClock, 966);
};

beginClock();
