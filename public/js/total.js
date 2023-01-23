const containers = document.querySelectorAll('.special-container');
const totalTimeContainer = document.querySelector('.p-container')
const timeArray = [];

containers.forEach((container) => {
    const workout_time = parseInt(container.querySelector(`#workout-time`).value.trim());
    timeArray.push(workout_time);
    console.log('****', timeArray);
})

const totalTime = timeArray.reduce((a, b) => parseInt(a) + (parseInt(b) || 0), 0) / 60;
const totalTimeRounded = Math.round(totalTime * 100) / 100;

totalTimeContainer.innerHTML = totalTimeRounded;