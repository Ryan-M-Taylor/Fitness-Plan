const sort_days = (users) => {
    // const weekDays = [{ weekday: 'Monday', id: 1 }, { weekday: 'Tuesday', id: 2 },
    // { weekday: 'Wednesday', id: 3 }, { weekday: 'Thursday', id: 4 }, { weekday: 'Friday', id: 5 },
    // { weekday: 'Saturday', id: 6 }, { weekday: 'Sunday', id: 7 }];

    const workoutDays = users.workouts.map((workout) => workout.weekday);
    for (let i = 0; i < workoutDays.length; i++) {

    }

    var data = [{ DayOfWeek: "Saturday", TotalCount: 30 }, { DayOfWeek: "Friday", TotalCount: 10 }, { DayOfWeek: "Monday", TotalCount: 23 }, { DayOfWeek: "Sunday", TotalCount: 18 }, { DayOfWeek: "Wednesday", TotalCount: 20 }],
        order = { Sunday: 1, Monday: 2, Tuesday: 3, Wednesday: 4, Thursday: 5, Friday: 6, Saturday: 7 };

    data.sort(function (a, b) {
        return order[a.DayOfWeek] - order[b.DayOfWeek];
    });


}