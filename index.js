function makeAccount() {
  email = document.getElementById('inputEmail').value
  password = document.getElementById('inputPassword').value
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorCode);
    alert(errorMessage);
  // ...
  });
};

function signInAccount() {
  email = document.getElementById('inputEmail').value
  password = document.getElementById('inputPassword').value
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

};


window.onload = function() {
  console.log("loaded");
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("signing in")
    document.location.href = "main.html";
  } else {

  }
});
