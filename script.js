// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDPRFnBR6P2q__VRbWDb4Q1pCz1_LqhnyE",
  authDomain: "alex-tribute.firebaseapp.com",
  projectId: "alex-tribute",
  storageBucket: "alex-tribute.appspot.com",
  messagingSenderId: "631521944474",
  appId: "1:631521944474:web:f1cdbdb75a4bc7ea049023",
  measurementId: "G-PZ5FZXEV1R"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const memoryForm = document.getElementById('memory-form');
const memoryContainer = document.getElementById('memories-list');

memoryForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const memory = document.getElementById('memory').value;

    if (!name || !memory) {
        return;
    }

    // Store memory in Firebase
    const memoryData = {
        name,
        memory,
        timestamp: new Date().toISOString(),
    };

    database.ref('memories').push(memoryData);

    // Clear the form fields after submission
    document.getElementById('name').value = '';
    document.getElementById('memory').value = '';
});

// Fetch and display memories
const memoriesRef = database.ref('memories');
memoriesRef.on('value', snapshot => {
    memoryContainer.innerHTML = ''; // Clear existing memories
    snapshot.forEach(memorySnapshot => {
        const memory = memorySnapshot.val();
        const memoryItem = document.createElement('div');
        memoryItem.classList.add('memory-item');
        memoryItem.innerHTML = `
            <p><strong>${memory.name}</strong> said:</p>
            <p>${memory.memory}</p>
        `;
        memoryContainer.appendChild(memoryItem);
    });
});
