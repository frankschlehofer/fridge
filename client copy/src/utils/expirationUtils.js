export function daysBetween(dateToday, dateExpires) {
    // Ensure the dates are valid Date objects
    if (!(dateToday instanceof Date) || !(dateExpires instanceof Date)) {
      return "Invalid input: Both arguments must be Date objects.";
    }
  
    // To avoid issues with timezones and potential time components affecting the day count,
    // it's a good practice to set the time components to the beginning of the day (midnight).
    const date1Midnight = new Date(dateToday);
    date1Midnight.setHours(0, 0, 0, 0);
  
    const date2Midnight = new Date(dateExpires);
    date2Midnight.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = date2Midnight.getTime() - date1Midnight.getTime();
  
    // Convert milliseconds to days
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const differenceInDays = Math.round(differenceInMilliseconds / millisecondsInDay);
  
    return differenceInDays;
}