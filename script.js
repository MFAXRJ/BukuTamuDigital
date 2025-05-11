// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ2V3iC-BTMtKN716wFVoAtOCWNuKmuSQ",
  authDomain: "bukutamudigital-webapp.firebaseapp.com",
  projectId: "bukutamudigital-webapp",
  storageBucket: "bukutamudigital-webapp.firebasestorage.app",
  messagingSenderId: "592642517947",
  appId: "1:592642517947:web:a38350760bef8a6b07f29e",
  measurementId: "G-Z3FNM8CRHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Menangani pengiriman form
const form = document.getElementById('guestbook-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Menyimpan data ke Firestore
    db.collection('guests').add({
        name: name,
        email: email,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert('Pesan berhasil dikirim!');
        form.reset();
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
});

// Menampilkan data tamu
const guestbookDiv = document.getElementById('guestbook');
db.collection('guests').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
    guestbookDiv.innerHTML = '';
    snapshot.forEach(doc => {
        const guest = doc.data();
        const guestElement = document.createElement('div');
        guestElement.innerHTML = `
            <h3>${guest.name}</h3>
            <p>Email: ${guest.email}</p>
            <p>Pesan: ${guest.message}</p>
            <hr>
        `;
        guestbookDiv.appendChild(guestElement);
    });
});
