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


// Function to create the OpenAI assistant
function createAssistant() {
    $.ajax({
        url: 'YOUR_OPENAI_API_ENDPOINT', // Replace with the endpoint for creating the assistant
        type: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer YOUR_OPENAI_API_KEY'); // Replace with your OpenAI API key
        },
        contentType: 'application/json',
        data: JSON.stringify({
            name: 'Math Tutor',
            instructions: 'You are a personal math tutor. Write and run code to answer math questions.',
            tools: [{ type: 'code_interpreter' }],
            model: 'gpt-4-turbo-preview'
        }),
        success: function(response) {
            console.log('Assistant created successfully:', response);
            // Optionally, you can perform further actions after creating the assistant
            createThread(response.id); // Call function to create a thread after assistant creation
        },
        error: function(xhr, status, error) {
            console.error('Error creating assistant:', error);
        }
    });
}

// Function to create a thread
function createThread(assistantId) {
    $.ajax({
        url: 'YOUR_OPENAI_API_ENDPOINT', // Replace with the endpoint for creating a thread
        type: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer YOUR_OPENAI_API_KEY'); // Replace with your OpenAI API key
        },
        contentType: 'application/json',
        data: JSON.stringify({
            assistant_id: assistantId
        }),
        success: function(response) {
            console.log('Thread created successfully:', response);
            // Optionally, you can perform further actions after creating the thread
            // For example, you can add a message to the thread
            addMessageToThread(response.id);
        },
        error: function(xhr, status, error) {
            console.error('Error creating thread:', error);
        }
    });
}

// Function to add a message to a thread
function addMessageToThread(threadId) {
    $.ajax({
        url: 'YOUR_OPENAI_API_ENDPOINT', // Replace with the endpoint for adding a message
        type: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer YOUR_OPENAI_API_KEY'); // Replace with your OpenAI API key
        },
        contentType: 'application/json',
        data: JSON.stringify({
            thread_id: threadId,
            role: 'user',
            content: 'I need to solve the equation `3x + 11 = 14`. Can you help me?'
        }),
        success: function(response) {
            console.log('Message added to thread successfully:', response);
            // Optionally, you can perform further actions after adding the message
            // For example, you can run the assistant to get a response
            runAssistant(threadId);
        },
        error: function(xhr, status, error) {
            console.error('Error adding message to thread:', error);
        }
    });
}
