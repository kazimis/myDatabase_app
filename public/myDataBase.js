
var add_data_button = document.getElementById('addDataButton');
var read_all_button = document.getElementById('readAllButton');
var modal = document.getElementById("modal1");
var exitSign = document.getElementById("exit1");
var mytable = document.getElementById("myTable");
var del_link = document.getElementById("deleteLink");
var update_link = document.getElementById("updateLink");
var form = document.getElementById("updateForm");


function gett(id){

  location.href = "/".concat(id);

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



//function to calculate total,
// function cal_total(){
//   var num_of_elements = document.getElementById("myForm").length;
//   var sum=0;
//   for(var i = 1; i < num_of_elements-3; i++){
//      var string_2_int = Number(document.getElementById("myForm")[i].value);
//      sum += string_2_int;
//     document.getElementById("myForm")[num_of_elements-3].value = sum;
//   }
// }


//function to validate form entry before submission.
function ifEmpty(){
  var formLength = document.getElementById("myForm").length;

  //check for entries if they are filled
  for(var i = 0; i < formLength-1; i++){
    var s = document.getElementById("myForm")[i].value;
    //if at least one entry is filled and is valid.
    if(s==""){
        alert("There is at least one invalid entry! You can not submit this form!");
        return false;
    }
  }

  return true;
}

function ifEmpty_update(){
  var formLength = document.getElementById("myForm").length;

  //check for entries if they are filled
  for(var i = 1; i < formLength-1; i++){
    var s = document.getElementById("myForm")[i].value;
    //if at least one entry is filled and is valid.
    if(s!=""){
        if(isNaN(s))
          alert("There is at least one invalid entry! You can not submit this form!");
        return false;
    }
  }
  form.action = "/mydatabase".concat(location.href);
  return true;
}
