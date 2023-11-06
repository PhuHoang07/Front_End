// Function to register the row and open the modal
// function registerRow(button) {
//   var row = button.parentNode.parentNode;
//   row.classList.add("highlighted");
//   button.disabled = true;
//   button.style.backgroundColor = "gray";
// }

// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var spanc = document.getElementsByClassName("close")[0];

// // Get the <span> element that confirms the modal
// var spano = document.getElementsByClassName("confirm")[0];

// // Function to confirm the registration and change the row color
// function confirmRegistration(button) {
//   var row = button.parentNode.parentNode;
//   modal.style.display = "block";
//   spanc.onclick = function() {
//     modal.style.display = "none";
//   }
//   spano.onclick = function () {
//     var tbody = document.querySelector("tbody");
//   tbody.insertBefore(row, tbody.firstElementChild); //nhảy lên trên khi insert.
//      row.classList.add("highlighted"); // highlight dòng đăng kí mới nhất
//   button.disabled = true;
//   button.style.display = "none";// tắt cái button register đi
//     modal.style.display = "none"; // Close the modal after confirming
//   }
// }

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <spanc> (close), close the modal
// spanc.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks on <spano> (confirm), call the confirmRegistration function to change the row color
// spano.onclick = function () {
//   confirmRegistration(this);
//   modal.style.display = "none"; // Close the modal after confirming
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }


// ====================================================================================================================================================


function showConfirmationModalRegister(button) {
  var modal = document.getElementById("confirmationModalRegister");
  modal.style.display = "block";
  selectedButton = button;
  idt = button.parentNode.parentNode.getAttribute('idt');
  console.log(idt);
}
async function confirmRegisterLecturer(confirmation) {

  console.log(idt);
  var modal = document.getElementById("confirmationModalRegister");
  modal.style.display = "none";
  if (confirmation) {
    var row = selectedButton.parentNode.parentNode;
        row.remove();
        
      const data = {
          body: idt
      }

      const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/lecturer/exams/register", "POST", data);
      if (res.isSuccess == true) {
          console.log(res.message);
        
      }
  }
}


function showTableRegistered() {
  const hiddenTable = document.getElementById('hiddenTable-Registered');
  console.log(hiddenTable);
  // idt = button.parentNode.parentNode.getAttribute('idt');
  // console.log(idt);

  if (hiddenTable.style.display === "none") {
      hiddenTable.style.display = "block";
  } else {
      hiddenTable.style.display = 'none';
  }
}


function closeTableRegistered() {
  const hiddenTable = document.getElementById('hiddenTable-Registered');
  hiddenTable.style.display = 'none';
}