export const getEvenYearsSince = (date: string): number => {
    const start = new Date(date);
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();

    const anniversary = new Date(
        now.getFullYear(),
        start.getMonth(),
        start.getDate(),
    );

    if (now < anniversary) {
        years--;
    }

    return Math.floor(years / 2) * 2;
};
