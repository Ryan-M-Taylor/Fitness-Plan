window.addEventListener('beforeprint', () => {
    myChart.resize(500, 500);
});
window.addEventListener('afterprint', () => {
    myChart.resize();
});

const containers = document.querySelectorAll('.special-container');
const timeArray = [];

containers.forEach((container) => {
    const workout_time = parseInt(container.querySelector(`#workout-time`).value.trim());
    timeArray.push(workout_time);
    console.log('****', timeArray);
})

Chart.defaults.font.size = 17;
const ctx = document.getElementById('myChart');
const totalTime = timeArray.reduce((a, b) => parseInt(a) + (parseInt(b) || 0), 0) / 60;
const totalTimeRounded = Math.round(totalTime * 100) / 100
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: `Minutes spent exercising this day `,
            data: timeArray,
            borderWidth: 1,
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 159, 64, 0.7)',
                'rgba(255, 205, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(201, 203, 207, 0.7)'
            ],
            color: 'rgba(255, 99, 132, 0.7)',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                display: true,
                title: {
                    display: true,
                    text: 'Daily Workout Time (min)',
                }
            }
        }
    }
});