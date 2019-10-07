
var myButton1 = document.getElementById("button1");
var modal = document.getElementById("modal1");
var exitSign = document.getElementById("exit1");
myButton1.onmouseup = function(){
  modal.style.display = "block";
}

exitSign.onclick = function(){
  modal.style.display = "none";
}
