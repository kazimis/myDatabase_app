
var mytable = document.getElementById("myTable");
var del_link = document.getElementById("deleteLink");
var update_link = document.getElementById("updateLink");
var form = document.getElementById("updateForm");


function gett(id){
  location.href = "/info".concat(id);
}

update_link.onclick = function(){
  var id = mytable.rows[1].cells[0].innerHTML;
  location.href = "/update".concat(id);
}

del_link.onclick = function(){
  var id = mytable.rows[1].cells[0].innerHTML;
  location.href = "/del".concat(id);
}
add_data_button.onmouseup = function(){
  window.location.pathname = '/addData';
}
read_all_button.onmouseup = function(){
  window.location.pathname = '/readAll';
}


//function to validate form entry before submission.
function ifEmpty(){
  var formLength = document.getElementById("myForm").length;
  var s1 = document.getElementById("myForm")[0].value;
  var s2 = document.getElementById("myForm")[formLength-2].value;
  if(s1 =="" || s2 ==""){
    alert("There is at least one invalid entry! You can not submit this form!");
    return false;
  }
  //check for entries if they are filled
  for(var i = 1; i < formLength-2; i++){
    var s = document.getElementById("myForm")[i].value;
    //if at least one entry is filled and is valid.
    if(s=="" || isNaN(s) || s < 0 || s > 100){
        alert("There is at least one invalid entry! You can not submit this form!");
        return false;
    }
  }
  return true;
}

// //function to validate form entry
// function ifEmpty_update(){
//   var formLength = document.getElementById("myForm").length;
//
//   //check for entries if they are filled
//   for(var i = 1; i < formLength-2; i++){
//     var s = document.getElementById("myForm")[i].value;
//     //if at least one entry is filled and is valid.
//     if(s!=""){
//         if(isNaN(s))
//           alert("There is at least one invalid entry! You can not submit this form!");
//         return false;
//     }
//   }
//   form.action = "/mydatabase".concat(location.href);
//   return true;
// }
