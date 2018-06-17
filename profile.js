
window.onload = function() {
  console.log("loaded");
  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {

      var db = firebase.firestore()


      var partsUsing = []
      console.log("wtf")
      db.collection("users").doc(firebase.auth().currentUser.email).get().then(function(doc){
        partsUsing = doc.data()["partsUsing"]

        var i;
        partsUsing.sort()
        for (i = 0; i < partsUsing.length; i ++) {
          var upToNow = partsUsing.slice(0,i)
          console.log(upToNow)
          console.log(i)
          console.log(partsUsing[i])
          if(!upToNow.includes(partsUsing[i]))  {
            addPartToList(partsUsing[i], getOccurrence(partsUsing, partsUsing[i]))

          } else {
            console.log("Duplicate!")
          }

        }
      }).catch(function(error){
        console.log("error getting document:", error)
      })

    } else {
      console.log("notsignedin")
      document.location.href = "signin.html";
    }

  });
}
function addPartToList(part, quantity){
  console.log(part, quantity)
  var db = firebase.firestore()
  var ul = document.getElementById("usersComponents");
  db.collection("components").doc(part).get().then(function(doc){
    console.log(doc.data())
    var li = document.createElement("li")
    var qt = document.createElement("span")
    var pic = document.createElement("img")
    var btn = document.createElement("button")
    btn.innerHTML = "Return"
    btn.addEventListener('click', function(){
        returnPart(part);

    });
    pic.src = doc.data()["image"]
    pic.width = "50"
    pic.height = "50"
    qt.className = "badge badge-primary badge-pill"
    li.className = "list-group-item d-flex justify-content-between align-items-center"
    li.id = part
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


    qt.appendChild(document.createTextNode(quantity))
    qt.id = doc.data()["name"]+"quantity"
    li.appendChild(qt)
    li.appendChild(btn)
    ul.appendChild(li);


  }).catch(function(error){
    console.log("erro", error)
  })

}
function returnPart(part){
  var db = firebase.firestore()
  var partsUsing = []
  var qunatity;
  db.collection("users").doc(firebase.auth().currentUser.email).get().then(function(doc){
    partsUsing = doc.data()["partsUsing"]
    quantity = getOccurrence(partsUsing, part)
  }).catch(function(error){
    console.log("error getting document:", error)
  })
  console.log(partsUsing, part)

  console.log(firebase.auth().currentUser.email + "wants to check out " + part)

  var ul = document.getElementById("usersComponents");
  db.collection('users').doc(firebase.auth().currentUser.email).get().then(function(doc){
    if (quantity == 1){
      var li = document.getElementById(part)
      li.parentNode.removeChild(li);
    } else {
      reduceQuantity(part, quantity, 1)

    }
    console.log(doc.data()["partsUsing"])
    console.log(part)

    db.collection("users").doc(firebase.auth().currentUser.email).set({
      partsUsing: arrayRemove(doc.data()["partsUsing"], part)
    }).then(function(){
      console.log("written")
    }).catch(function(error){
      console.log(error)
    })

  }).catch(function(error) {
      console.error("Error writing document: ", error);
  });
  db.collection("components").doc(part).get().then(function(doc){
    db.collection("components").doc(part).set({
      name: doc.data()["name"],
      description: doc.data()["description"],
      image:doc.data()["image"],
      location:doc.data()["location"],
      resources:doc.data()["resources"],
      quantity: doc.data()["quantity"]+1
    }).then(function(){
      console.log("written")
    }).catch(function(){
      console.log("error", error)
    })
  }).catch(function(error){
    console.log("error", error)
  })

}
function reduceQuantity(part, quantity, amount){
  var qt = document.getElementById(part+"quantity")
  console.log(qt.textContent)
  console.log(quantity)
  console.log(amount)
  qt.textContent = quantity-amount
  console.log(qt.textContent)
}
function arrayRemove(array, item){
  temp = []
  var i;
  index = array.indexOf(item)
  for (i = 0; i < array.length; i ++){
    if (i != index){
      temp.push(array[i])
    }
  }
  return temp;
}
function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}
function signOutAccount() {
  firebase.auth().signOut().then(function() {
    console.log("signing out")
  }).catch(function(error) {
    // An error happened.
  });

};
