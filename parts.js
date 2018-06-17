var urlParam = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
}



window.onload = function() {
  console.log("loaded");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user.email == "admin@annex272.com") {


      var part = decodeURI(urlParam('part'))
      console.log(part)
      console.log(user);
      var db = firebase.firestore()
      db.collection("users").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {

            if (doc.data()["partsUsing"].includes(part)){

              console.log(doc.id)
              console.log(doc.data()["partsUsing"])
              console.log(part)
              addToList(doc.id, getOccurrence(doc.data()["partsUsing"], part))
            }
          });
      });

      var docRef = db.collection("components").doc(part);
      docRef.get().then(function(doc) {
          if (doc.exists) {
              // console.log("Document data:", doc.data().status);
              document.getElementById("name").value = doc.data()["name"];
              document.getElementById("description").value = doc.data()["description"];
              document.getElementById("resources").value = doc.data()["resources"];
              document.getElementById("image").value = doc.data()["image"];
              document.getElementById("quantity").value = doc.data()["quantity"];
              document.getElementById("location").value = doc.data()["location"];


          } else {
              // doc.data() will be undefined in this case
              // document.getElementById("status").innerHTML = "Have not applied";
              // console.log("has not applied")
          }

      }).catch(function(error) {
          console.log("Error getting document:", error);
      });

      console.log(urlParam('part'))
    } else {
      console.log("notsignedin")
      document.location.href = "index.html";
    }
  });
}
function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}
function addToList(email, quantity){
  console.log(email, "has", quantity)
  var ul = document.getElementById("peopleWithPart")
  var li = document.createElement("li")
  li.className = "list-group-item d-flex justify-content-between align-items-center"
  li.appendChild(document.createTextNode(email))
  var span = document.createElement("span")
  span.className ="badge badge-primary badge-pill"
  span.innerHTML = quantity
  li.appendChild(span)
  ul.appendChild(li)
}
function editPart(){
  var db = firebase.firestore()

  name = document.getElementById('name').value
  description = document.getElementById('description').value
  resources = document.getElementById('resources').value
  image = document.getElementById('image').value
  quantity = document.getElementById('quantity').value
  where = document.getElementById('location').value

  if (name == "" || description == "" || resources == "" || image == "" || quantity == "" || location == ""){
    alert("We need the name of the part")
  } else {
    console.log(name)
    console.log(description)
    console.log(resources)
    console.log(image)
    console.log(quantity)
    console.log(where)

    db.collection("components").doc(name).update({
      name: name,
      description: description,
      quantity: quantity,
      resources: resources,
      image: image,
      location: where
    }).then(function(){
      console.log("written")
    }).catch(function(){
      console.log("error", error)
    })
    console.log("wtf")
  }
}
function signOutAccount() {
  firebase.auth().signOut().then(function() {
    console.log("signing out")
  }).catch(function(error) {
    // An error happened.
  });

};
