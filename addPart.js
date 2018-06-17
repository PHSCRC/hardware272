
window.onload = function() {
  console.log("loaded");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user.email == "admin@annex272.com") {

    } else {
      console.log("notsignedin")
      document.location.href = "index.html";
    }
  });
}
function addPart(){
  var db = firebase.firestore()
  name = document.getElementById('name').value
  description = document.getElementById('description').value
  resources = document.getElementById('resources').value
  image = document.getElementById('image').value
  quantity = document.getElementById('quantity').value
  location = document.getElementById('location').value

  if (name == "" || description == "" || resources == "" || image == "" || quantity == "" || location = ""){
    alert("We need the name of the part")
  } else {
    db.collection("components").doc(name).set({
      name: name,
      description: description,
      quantity: Number(quantity),
      resources: resources,
      image: image,
      location: location
    })
    .then(function(docRef) {
        alert("Part added")
        console.log("Document written");
        document.location.href = "admin.html";
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
