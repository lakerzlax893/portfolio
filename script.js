document.addEventListener("DOMContentLoaded", function() {
    // Function to refresh calendar by reloading the iframe
    function refreshCalendar() {
        // Reload the iframe containing the Google Calendar
        var iframe = document.querySelector("#calendarData iframe");
        iframe.src = iframe.src; // Refresh the iframe by setting its src attribute again
    }

    // Event listener for the refresh button
    var refreshButton = document.getElementById("refreshButton");
    refreshButton.addEventListener("click", function() {
        refreshCalendar(); // Call the refreshCalendar function when the button is clicked
    });
});
