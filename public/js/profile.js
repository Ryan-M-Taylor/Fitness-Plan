const updateWorkout = async () => {
    // event.preventDefault();
    const containers = document.querySelectorAll('.special-container');
    containers.forEach(async (container) => {
        const hiddenInputValue = container.querySelector('input').value;
        const workout_time = parseInt(container.querySelector(`#workout-time`).value.trim());
        const workout = container.querySelector(`#workout-desc`).value.trim();
        const weekday = container.querySelector(`.weekday`).textContent;
        const id = hiddenInputValue ? hiddenInputValue : 0;
        const res = await fetch(`/api/workout/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ workout, workout_time, weekday }),
            headers: { 'Content-Type': 'application/json', },
        });

        if (res.ok) {
            container.querySelector(`#workout-desc`).value = workout;
            container.querySelector(`#workout-time`).value = workout_time;
        }

        const data = await res.json();

        console.log(res, data,workout_time, workout);

        document.location.replace(`/profile`);
    })
    document.location.replace(`/profile`);
    //function to make days of the week display from monday to sunday
}

document.querySelector('#update-button').addEventListener('click', updateWorkout);