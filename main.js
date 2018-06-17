
window.onload = function() {
  console.log("loaded");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      var db = firebase.firestore()
      var ul = document.getElementById("componentList");

      db.collection("components").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              console.log(doc.id, " => ", doc.data()["name"])
              var li = document.createElement("li");
              var quantity = document.createElement("span")
              var pic = document.createElement("img")
              var btn = document.createElement("button")        // Create a <button> element
              btn.innerHTML = "Check out"       // Create a text node
              btn.addEventListener('click', function(){
                  checkOut(doc.data()["name"]);
              });
              pic.src = doc.data()["image"]
              pic.width = "50"
              pic.height = "50"
              quantity.className = "badge badge-primary badge-pill"
              li.className = "list-group-item d-flex justify-content-between align-items-center"

              li.appendChild(document.createTextNode(doc.data()["name"]))
              li.appendChild(document.createElement("br"))
              li.appendChild(document.createTextNode(doc.data()["description"]))
              li.appendChild(document.createElement("br"))
              li.appendChild(document.createElement("p").appendChild(document.createTextNode(doc.data()["location"])))

              var resources = document.createElement("a")
              resources.href = doc.data()["resources"]
              resources.appendChild(document.createTextNode("resources"))

              li.appendChild(pic)
              li.appendChild(resources)


              quantity.append(document.createTextNode(doc.data()["quantity"]));
              quantity.id = doc.data()["name"]+"quantity"
              li.appendChild(quantity)
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
function checkOut(part){
  var db = firebase.firestore()
  console.log(firebase.auth().currentUser.email + "wants to check out " + part)

  var docRef = db.collection("components").doc(part);

  docRef.get().then(function(doc) {
    if (doc.exists){
      console.log(doc.data())
      if(doc.data()["quantity"] > 0){
        db.collection("components").doc(part).set({
            name: doc.data()["name"],
            description: doc.data()["description"],
            image:doc.data()["image"],
            location:doc.data()["location"],
            resources:doc.data()["resources"],
            quantity: doc.data()["quantity"]-1
        })
        .then(function() {
            console.log("Document successfully written!");
            document.getElementById(part+"quantity").textContent = doc.data()["quantity"]-1
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

        db.collection('users').doc(firebase.auth().currentUser.email).get().then(function(userDoc){
          var tempe = userDoc.data()["partsUsing"]
          tempe.push(part)
          db.collection("users").doc(firebase.auth().currentUser.email).set({
            partsUsing: tempe
          })
          .then(function() {
              console.log("Document successfully written!");
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });
        }).catch(function(error){
          console.log("error getting document:", error)
        })


      } else {
        alert("Sorry, we are out of parts! Talk to a CRC Leader or Mrs. Elia, or submit a hardware request to get the part.")
      }
    }


  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

}


function signOutAccount() {
  firebase.auth().signOut().then(function() {
    console.log("signing out")
  }).catch(function(error) {
    // An error happened.
  });

};
