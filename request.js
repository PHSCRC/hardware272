
window.onload = function() {
  console.log("loaded");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

    } else {
      console.log("notsignedin")
      document.location.href = "index.html";
    }
  });
}
function submitHardwareRequest(){
  var db = firebase.firestore()
  name = document.getElementById('name').value
  description = document.getElementById('description').value
  price = document.getElementById('price').value
  whypart = document.getElementById('whypart').value
  link = document.getElementById('link').value

  if (name == ""){
    alert("We need the name of the part")
  } else if (description == ""){
    alert("We need a description of the part")
  }else if (price == ""){
    alert("We need the price of the part")
  }else if (whypart == ""){
    alert("We need to know why we need the part")
  } else if (link == ""){
    alert("We need a link to purchase it")
  }else {
    db.collection("hardwareRequests").doc(name).set({
      name: name,
      description: description,
      price: price,
      whypart: whypart,
      link: link,
      email: firebase.auth().currentUser.email
    })
    .then(function(docRef) {
        alert("Request submitted, we will try and get the part if we can. Stay updated.")
        console.log("Document written");
        document.location.href = "main.html";
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
}
function signOutAccount() {
  firebase.auth().signOut().then(function() {
    console.log("signing out")
  }).catch(function(error) {
    // An error happened.
  });

};
