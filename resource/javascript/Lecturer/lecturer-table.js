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
      var messageElement = document.getElementById('messageRegisterSuccess');
      messageElement.innerHTML = res.message;
      messageElement.style.display = "block";
      // Close modal
      document.addEventListener("click", function (event) {
        if (event.target !== messageElement && !messageElement.contains(event.target)) {
          messageElement.style.display = "none";
        }
      });

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
    reloadRegisteredList();

  } else {
    hiddenTable.style.display = 'none';
  }
}


function closeTableRegistered() {
  const hiddenTable = document.getElementById('hiddenTable-Registered');
  hiddenTable.style.display = 'none';
}
// =======================================================================
const showSemesterContainer = document.getElementById('table_container');
let semesterTable;
const listItem = [];

async function fetchDataAllowance() {
  try {
    const response = await fetchAPIData('https://swp-esms-api.azurewebsites.net/api/lecturer/allowance', 'POST');
    const data = await response.data;

    renderAllowance(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchDataAllowance();

function renderAllowance(data) {
  showSemesterContainer.innerHTML = ''; // Clear the container

  if (data.length === 0) {
      const noDataRow = document.createElement('tr');
      noDataRow.innerHTML = '<td colspan="2">There is no information to display</td>';
      const noDataTable = document.createElement('table');
      noDataTable.className = 'table-container';
      noDataTable.appendChild(noDataRow);
      showSemesterContainer.appendChild(noDataTable);
      return;
  }

  data.forEach((semesterData) => {
      const semesterWrapper = document.createElement('div');
      semesterWrapper.className = 'semester-wrapper';

      const semesterTable = document.createElement('table');
      semesterTable.className = 'table-container';

      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
          <th>Date</th>
          <th>Time</th>
      `;
      semesterTable.appendChild(headerRow);

      const semesterHeader = document.createElement('h2');
      semesterHeader.className = 'semester-header';
      semesterHeader.innerHTML = `Semester: ${semesterData.semester}`;

      semesterWrapper.appendChild(semesterHeader);

      if (semesterData.examTime.length === 0) {
          // Handle the case when there is no examTime data for the semester
          const noDataRow = document.createElement('tr');
          noDataRow.innerHTML = '<td colspan="2">There is no information to display</td>';
          semesterTable.appendChild(noDataRow);
      } else {
          semesterData.examTime.forEach((examTime) => {
              const tablerow = document.createElement('tr');
              tablerow.innerHTML = `
                  <td>${examTime.date}</td>
                  <td>${examTime.start} - ${examTime.end}</td>
              `;
              semesterTable.appendChild(tablerow);
          });
      }

      semesterWrapper.appendChild(semesterTable);

      // Add Total Time and Allowance below the table
      const totalTimeDiv = document.createElement('div');
      totalTimeDiv.className = 'total-time';
      totalTimeDiv.innerHTML = `Total Time: ${semesterData.allowanceModel.totalTime} hours`;

      const allowanceDiv = document.createElement('div');
      allowanceDiv.className = 'allowance';
      allowanceDiv.innerHTML = `Allowance: ${semesterData.allowanceModel.allowance}`;

      semesterWrapper.appendChild(totalTimeDiv);
      semesterWrapper.appendChild(allowanceDiv);

      showSemesterContainer.appendChild(semesterWrapper);
  });
}





