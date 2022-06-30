//YOUR FIREBASE LINKS
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

var roomName = localStorage.getItem("roomName")
var userName = localStorage.getItem("userName")

function send() {
      var send = document.getElementById("message").value
      firebase.database().ref(roomName).push({
            message: send,
            name: userName,
            like: 0
      })
}

function getData() {
      firebase.database().ref("/" + roomName).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id)
                        console.log(message_data)
                        var like = message_data["like"]
                        var name = message_data["name"]
                        var message = message_data["message"]
                        nameTag = "<h4>" + name + "<img src ='tick.png' class ='user_tick'></h4>"
                        messageTag = "<h4 class = 'message_h4'>" + message + "</h4>"
                        buttonTag = "<button class= 'btn btn-warning' id = '" + firebase_message_id + "' value = '"+ like + "' onclick ='updateLikes(this.id)'>"
                        spanTag = "<span class = 'glyphicon glyphicon-thumbs-up'>" + like + "</span></button> <hr>"
                        var output = nameTag + messageTag + buttonTag + spanTag
                        document.getElementById("output").innerHTML += output
                        //Start code

                        //End code
                  }
            });
      });
}
function updateLikes(messageId){
      var like = document.getElementById(messageId).value
      like = Number(like) + 1
      firebase.database().ref(roomName).child(messageId).update({
            like: like
      })
}
getData();
