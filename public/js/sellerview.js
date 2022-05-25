function editRow(btn) 
{

    console.log("Inside the Edit button");
    var row = btn.parentNode.parentNode;
  var deleted_row= row.getElementsByTagName('td');
  mydict=
{
  name:deleted_row[0].innerHTML,
  category:deleted_row[1].innerHTML,
  type:deleted_row[2].innerHTML,
  price:deleted_row[3].innerHTML,
}
fetch('http://localhost:3000/delete2',{
                  method:'POST',
                  body:new URLSearchParams(mydict),
                  }).then(res => {
                    console.log(res);
                  })
  row.parentNode.removeChild(row);
  $("#addp").click();
}

function deleteRow(btn) {

  console.log("Inside the delete button");
  var row = btn.parentNode.parentNode;
  var deleted_row= row.getElementsByTagName('td');
  mydict=
{
  name:deleted_row[0].innerHTML,
  category:deleted_row[1].innerHTML,
  type:deleted_row[2].innerHTML,
  price:deleted_row[3].innerHTML,
}
fetch('http://localhost:3000/delete2',{
                  method:'POST',
                  body:new URLSearchParams(mydict),
                  }).then(res => {
                    console.log(res);
                  })
  row.parentNode.removeChild(row);
}


  function confirmm(e)
  {
    var myTab = document.getElementById('empTable');
    mydata=[];
      for (i = 1; i < myTab.rows.length; i++) {
        
          myarray=[];
          mydict={}; 
            var objCells = myTab.rows.item(i).cells;

      for (var j = 0; j < objCells.length; j++) {
              table_left= objCells.item(j).innerHTML;
              myarray.push(table_left);
    }
mydict=
{
  name:myarray[0],
  category:myarray[1],
  type:myarray[2],
  price:myarray[3],
}

mydata.push(mydict);
if(myarray.length!=0)
{
fetch('http://localhost:3000/confirm',{
               method:'POST',
               body:new URLSearchParams(mydict),
              }).then(res => {
                console.log(res);
                console.log("DONE DONE DONE");
                swal("Entries Confirmed!", "You will be Redirected to main menu!", "success"); 
                window.setTimeout(function(){$("#back").click();},2000);
                
                // $("#back").click();
                // location.reload();
              })
}
else
{
  console.log("nothing in table");
  swal("Okay!", "You have added no Entries!", "success");
}
}
}