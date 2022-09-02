const firebaseConfig = {
  apiKey: "AIzaSyC93kb7eX0Qt-bagExyNli7GX_kCRi6kZ8",
  authDomain: "yoshiko-app-3d3f7.firebaseapp.com",
  databaseURL: "https://yoshiko-app-3d3f7-default-rtdb.firebaseio.com",
  projectId: "yoshiko-app-3d3f7",
  storageBucket: "yoshiko-app-3d3f7.appspot.com",
  messagingSenderId: "525470538777",
  appId: "1:525470538777:web:45de29e4345d00030a9e88",
  measurementId: "G-658K5QP7ZD",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const loginEmail = document.getElementById("userId");
const loginPassword = document.getElementById("userPassword");
const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((credential) => {
      console.log("user has successfully logged");
      window.location.href = "/home";
    })
    .catch((error) => {
      console.log(error);
    });
});
