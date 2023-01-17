const updateWorkout = async () => {
    // event.preventDefault();

    for (let i = 1; i <= 7; i++) {
        const workout = document.querySelector(`#workout-${i}`).value.trim();

        const workout_time = parseInt(document.querySelector(`#time-${i}`).value.trim());
        const response = await fetch(`/api/workout/${i}`, {
            method: 'PUT',
            body: JSON.stringify({ workout, workout_time }),
            headers: { 'Content-Type': 'application/json', },
        });
        console.log(response)
    }
    document.location.replace(`/profile`);
};


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