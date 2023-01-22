const sortDays = (user) => {
    order = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 7 };
    user.workouts.sort(function (a, b) {
        return order[a.weekday] - order[b.weekday];
    });
}

module.exports = sortDays;