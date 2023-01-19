const updateWorkout = async () => {
    // event.preventDefault();

    // for (let i = 1; i <= 7; i++) {
    const containers = document.querySelectorAll('.special-container');
    containers.forEach(async (container) => {
        const hiddenInputValue = container.querySelector('input').value;
        const workout_time = parseInt(container.querySelector(`#workout-time`).value.trim());
        const workout = container.querySelector(`#workout-desc`).value.trim();
        const weekday = container.querySelector(`.weekday`).textContent;
        const id = hiddenInputValue ? hiddenInputValue : 0;
        // api/workout/7
        // api/workout/
        await fetch(`/api/workout/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ workout, workout_time, weekday }),
            headers: { 'Content-Type': 'application/json', },
        });
    })
    // const workoutIds = event.target.attributes.data.workout_ids;
    // workoutIds.forEach(async(workoutId) => {
    //     // const id = document.querySelector(`#id-${i}`).value
    //     const workout = document.querySelector(`#workout-${workoutId}`).value.trim();

    //     // const weekday = document.querySelector(`#${i}`).value.trim();
    //     const workout_time = parseInt(document.querySelector(`#time-${workoutId}`).value.trim());
    //     const response = await fetch(`/api/workout/${id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({ workout, workout_time, }),
    //         headers: { 'Content-Type': 'application/json', },
    //     });
    //     console.log(response)
    //     })
    document.location.replace(`/profile`);
}




// const editPost = async (event) => {
//     event.preventDefault();

//     const title = document.querySelector('#post-name').value.trim();

//     const content = document.querySelector('#post-desc').value.trim();

//     const response = await fetch(`/api/posts/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify({ title, content }),
//       headers: { 'Content-Type': 'application/json', },
//     })

//     console.log(response);

//     if (response.ok) {
//       document.location.replace(`/posts/${id}`);
//     } else {
//       alert('Failed to edit post');
//     }
//   };


document.querySelector('#update-button').addEventListener('click', updateWorkout);