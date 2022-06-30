
//ADD YOUR FIREBASE LINKS HERE
const firebaseConfig = {
      apiKey: "AIzaSyCj_RQK6sA8FXeqb8tezOOsl0b9og58LLU",
      authDomain: "let-s-chat-app-bdd0a.firebaseapp.com",
      databaseURL: "https://let-s-chat-app-bdd0a-default-rtdb.firebaseio.com",
      projectId: "let-s-chat-app-bdd0a",
      storageBucket: "let-s-chat-app-bdd0a.appspot.com",
      messagingSenderId: "714238843354",
      appId: "1:714238843354:web:190f24c21b09dba15088e3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var userName = localStorage.getItem("userName")
document.getElementById("welcome").innerHTML = "Welcome " + userName
function addRoom() {
      var roomName = document.getElementById("roomName").value
      firebase.database().ref("/").child(roomName).update({
            purpose: "addingRoomName"
      })
      localStorage.setItem("roomName", roomName)
      window.location = "kwitter_page.html"

}
function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  roomNames = childKey;
                  console.log(roomNames)
                  var row = "<div class = 'room_name' id = '" + roomNames + "' onclick = 'redirectToRoom(this.id)'> #" + roomNames + " </div>"
                  document.getElementById("output").innerHTML += row
            });
      });
}
getData();

function redirectToRoom(name) {
      console.log(name)
      localStorage.setItem("roomName", name)
      window.location = "kwitter_page.html"
}

function logout(){
      localStorage.removeItem("roomName")
      localStorage.removeItem("userName")
      window.location = "index.html"
}
