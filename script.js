// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcjhpCEGyL2FGXBoWXfWvTQC6ctp_adsY",
    authDomain: "rfid-937d8.firebaseapp.com",
    databaseURL: "https://rfid-937d8-default-rtdb.firebaseio.com",
    projectId: "rfid-937d8",
    storageBucket: "rfid-937d8.firebasestorage.app",
    messagingSenderId: "980552143223",
    appId: "1:980552143223:web:04dc787a69a384cc069172"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM Elements
const searchInput = document.getElementById('search');
const attendanceBody = document.getElementById('attendanceBody');

// Listen for attendance data
database.ref('attendance').on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        displayAttendance(Object.values(data));
    }
});

// Display attendance data
function displayAttendance(records) {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredRecords = records.filter(record => 
        record.studentName.toLowerCase().includes(searchTerm) ||
        record.studentId.toLowerCase().includes(searchTerm)
    );

    attendanceBody.innerHTML = filteredRecords.map(record => `
        <tr>
            <td>${record.studentId}</td>
            <td>${record.studentName}</td>
            <td>${record.busNumber}</td>
            <td>${record.date}</td>
            <td>${record.loginTime || '-'}</td>
            <td>${record.logoutTime || '-'}</td>
        </tr>
    `).join('');
}

// Search functionality
searchInput.addEventListener('input', () => {
    database.ref('attendance').once('value').then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            displayAttendance(Object.values(data));
        }
    });
});
