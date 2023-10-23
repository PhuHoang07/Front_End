
  // Get the modal
  var modal = document.getElementById("myModal");
  
  
  // Get the <span> element that closes the modal
  var spanc = document.getElementsByClassName("close")[0];
  
  // Get the <span> element that confirms the modal
  var spano = document.getElementsByClassName("confirm")[0];
  
  // Function to confirm the registration and change the row color
  function confirmRegistration(select) {
    var row = select.parentNode.parentNode;
    modal.style.display = "block";
    spanc.onclick = function() {
      modal.style.display = "none";
    }
    spano.onclick = function () {
      modal.style.display = "none"; // Close the modal after confirming
    }
  }
  
  
  // When the user clicks on <spanc> (close), close the modal
  spanc.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks on <spano> (confirm), call the confirmRegistration function to change the row color
  spano.onclick = function () {
    confirmRegistration(this);
    modal.style.display = "none"; // Close the modal after confirming
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
  /* -------------------auto time disable------------------ */
  
  /* -------------------auto time disable------------------ */