// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvlvUnuBdrJ0VYfTs_VsnbYEeUVzlGqzw",
    authDomain: "uncled-2ebbc.firebaseapp.com",
    projectId: "uncled-2ebbc",
    storageBucket: "uncled-2ebbc.firebasestorage.app",
    messagingSenderId: "466974712990",
    appId: "1:466974712990:web:7a33c564f53daa6093c78f"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(app);

// console.log(auth)


// onAuthStateChanged(auth, (user) => {
//     if (user){
//         window.location.href = 'dashboard.html'
//     };
// });

// Sign-up function
const displayError = document.querySelector('.displayError');


// Form submission handler
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmail = document.getElementById('email').value;
    const userPassword = document.getElementById('password').value;
    // console.log({userEmail, userPassword});
    signIn(userEmail, userPassword); 
});

async function signIn(email, password){
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // console.log(userCredential);
        if (!userCredential.user.emailVerified){
            displayError.innerHTML = `Please verify your email before logging in! <a href="#" class="resendlink"">Resend verification link</a>`;
            displayError.style.color = 'red';

            document.querySelector('.resendlink').addEventListener('click', resendVerificationEmail)
            return;
        };
        window.location.href = 'dashboard.html'
        // console.log('Successfully signed up');
    } catch (error) {
        const displayError = document.querySelector('.displayError');
        displayError.textContent = 'Invalid credentials. Please check your email and password.';
        displayError.style.color = 'red'
    }
};


async function resendVerificationEmail() {
    const user = auth.currentUser;

    // console.log(user);
    if (user && !user.emailVerified) {
        try {
            // Send verification email again
            await sendEmailVerification(user);
            displayError.textContent = 'Verification link has been sent. Please check your inbox!';
            displayError.style.color = 'green';
        } catch (error) {
            if (error.message = 'auth/too-many-requests'){
                displayError.textContent = 'Too many requests sent please try again later!';
                displayError.style.color = 'orange';
            }
            console.error('Error sending verification email:', error.message);
            alert('An error occurred while sending the verification email.');
        }
    } else {
        displayError.textContent = 'Your email is has been verified! Login in';
    }
}