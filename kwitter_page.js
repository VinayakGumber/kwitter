//FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyCQ6QnFbTQsTkTH-S329HJz9-NGX9npb2E",
      authDomain: "kwitter-bba36.firebaseapp.com",
      databaseURL: "https://kwitter-bba36-default-rtdb.firebaseio.com",
      projectId: "kwitter-bba36",
      storageBucket: "kwitter-bba36.appspot.com",
      messagingSenderId: "284526299281",
      appId: "1:284526299281:web:6d72cfaf1fdc180dfd1730",
      measurementId: "G-RPSJC9WX11"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");

    function send() 
    {
          msg = document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
                name: user_name,
                message: msg,
                like: 0 
          });
         document.getElementById("msg").value = ""; 
    }

    function logout() 
    {
          localStorage.removeItem("user_name");
          localStorage.removeItem("room_name");
          window.location = "index.html"
    }


function getData()
 {
      firebase.database().ref("/"+room_name).on('value', function(snapshot) 
      {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function(childSnapshot) 
            { 
                  childKey  = childSnapshot.key;
                  childData = childSnapshot.val();
                  if(childKey != "purpose") {
                         firebase_message_id = childKey;
                         message_data = childData;
                         
                         console.log(message_data);
                         console.log(firebase_message_id);
                         name = message_data['name'];
                         message = message_data['message'];
                         like = message_data['like'];

                         row = "<h4>"+ name + "<img class= 'user_tick' src= 'tick.png'> </h4> <h4 class= 'message_h4'>" +message+ "</h4> <button class= 'btn btn-warning' id= '"+firebase_message_id+"' value = '"+like+"' onclick = 'update_like(this.id)'> <span class= 'glyphicon glyphicon-thumbs-up'> Like:"+like+"</span> </button> <hr>";
                         document.getElementById("output").innerHTML += row;

                    }
}); }); }
getData();


function update_like(message_id) 
{
      console.log("clicked on like button - "+ message_id);
      button_id = message_id;
      like = document.getElementById(button_id).value;
      updated_likes = Number(like) + 1;      
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}