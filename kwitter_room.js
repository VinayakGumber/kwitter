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
    document.getElementById("user_name").innerHTML = "Welcome " + user_name +" ! " ;
    
    function addRoom()
    {
      room_name = document.getElementById("room_name").value;
    
      firebase.database().ref("/").child(room_name).update({
        purpose : "adding room name"
      });
    
        localStorage.setItem("room_name", room_name);
        
        window.location = "kwitter_page.html";
    }
    


    function getData() 
    {
          firebase.database().ref("/").on('value', function(snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function(childSnapshot) {
                childKey  = childSnapshot.key;
                Room_names = childKey;
      //Start code
      console.log("Room name - " + room_name);
      row = "<div class = 'room_name' id = "+Room_names+" onclick = 'redirectToRoomName(this.id)' > # "+Room_names+" </div> <hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoomName(name) 
{
      console.log(name);
      localStorage.setItem("room_name",name);
      window.location = "kwitter_page.html";
}

function logout() 
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}