
window.onload = function() {
  console.log("loaded");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user.email == "admin@annex272.com") {
      var db = firebase.firestore();
      var ul = document.getElementById("requestList")

      db.collection("hardwareRequests").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              console.log(doc.id, " => ", doc.data()["name"])
              var li = document.createElement("li");
              li.id = doc.data()["name"]
              li.appendChild(document.createTextNode(doc.data()["name"]))
              li.appendChild(document.createElement("br"))
              li.appendChild(document.createTextNode(doc.data()["email"]))
              li.appendChild(document.createElement("br"))
              li.appendChild(document.createTextNode(doc.data()["description"]))
              li.appendChild(document.createElement("br"))

              li.appendChild(document.createElement("p").appendChild(document.createTextNode(doc.data()["whypart"])))
              var whypart = document.createElement("a")

              whypart.appendChild(document.createTextNode(doc.data()["whypart"]))
              li.appendChild(whypart)
              var email = document.createElement("a")
              email.href = doc.data()["email"]
              email.appendChild(document.createTextNode("Link"))
              li.appendChild(email)


              var btn = document.createElement("button")        // Create a <button> element
              btn.innerHTML = "delete"       // Create a text node
              btn.addEventListener('click', function(){
                  console.log("delete")
                  console.log(doc.data())
                  deleteRequest(doc.data()["name"])
              });

              li.className = "list-group-item d-flex justify-content-between align-items-center"



              li.appendChild(btn)
              ul.appendChild(li);
          });
      });
    } else {
      console.log("notsignedin")
      document.location.href = "index.html";
    }
  });
}
function deleteRequest(part){
  var db = firebase.firestore();
  console.log("deleting", part)
  var li = document.getElementById(part)
  li.parentNode.removeChild(li);
  db.collection("hardwareRequests").doc(part).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

}
function signOutAccount() {
  firebase.auth().signOut().then(function() {
    console.log("signing out")
  }).catch(function(error) {
    // An error happened.
  });

};
