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
const db = firebase.firestore();

const memoryForm = document.getElementById('memory-form');
const memoryContainer = document.getElementById('memories-list');

memoryForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const memory = document.getElementById('memory').value;

    if (!name || !memory) {
        return;
    }

    // Store memory in Firestore
    db.collection('memories').add({
        name,
        memory,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Clear the form fields after submission
    document.getElementById('name').value = '';
    document.getElementById('memory').value = '';
});

// Fetch and display memories
db.collection('memories').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    memoryContainer.innerHTML = ''; // Clear existing memories
    snapshot.forEach(doc => {
        const memory = doc.data();
        const memoryItem = document.createElement('div');
        memoryItem.classList.add('memory-item');
        memoryItem.innerHTML = `
            <p><strong>${memory.name}</strong> said:</p>
            <p>${memory.memory}</p>
        `;
        memoryContainer.appendChild(memoryItem);
    });
});
