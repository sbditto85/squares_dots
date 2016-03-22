document.getElementById("sendLogin").onclick = function() {
  var url = "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php";
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var postStr = "userName="+email+"&password="+password;
  var messageDiv = document.getElementById("debug");
  var request = new XMLHttpRequest();
  request.open("POST", url, false); //false to do sync not async
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var obj = JSON.parse(request.responseText);
      if(typeof obj.result != "undefined") {
        if(obj.result == "valid") {
          localStorage.setItem("cs2550timestamp", obj.userName + ' ' + obj.timestamp);
          window.location.href = "index.html";
        } else {
          //assume invalid
          messageDiv.innerHTML = "Username or Password is incorrect.";
        }
      }
    }
  };
  request.send(postStr);
};
