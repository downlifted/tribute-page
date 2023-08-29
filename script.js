// script.js
const memoryForm = document.getElementById('memory-form');
const memoryContainer = document.getElementById('memories-list');

memoryForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const memory = document.getElementById('memory').value;

    if (!name || !memory) {
        return;
    }

    // Store memory using the function from airtable.js
    submitMemory(name, memory);

    // Clear the form fields after submission
    document.getElementById('name').value = '';
    document.getElementById('memory').value = '';
});

// Fetch and display memories (as before)
// ...
