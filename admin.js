
window.onload = function() {
  console.log("loaded");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user.email == "admin@annex272.com") {
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
              btn.innerHTML = "More Info"       // Create a text node
              btn.addEventListener('click', function(){
                  document.location.href = "parts.html?part="+doc.data()["name"];
                //  moreInfo(doc.data()["name"]);
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
function signOutAccount() {
  firebase.auth().signOut().then(function() {
    console.log("signing out")
  }).catch(function(error) {
    // An error happened.
  });

};
