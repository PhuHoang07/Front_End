


const showSemesterContainer = document.getElementById('table_container');
const listItem = [];
let semesterTable;
const search = document.getElementById("search");
search.addEventListener('input', (e) => filterInput(e.target.value)); 

const list = document.getElementById("table_allowance");

async function fetchData() {
    try {
        const response = await fetchAPIData('https://swp-esms-api.azurewebsites.net/api/staff/allowance', 'GET');
        const data = await response.data;

        renderAllowance(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
//để table ra bên ngoài luôn

function renderAllowance(data) {
    showSemesterContainer.innerHTML = '';

    if (data.length === 0) {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = '<td colspan="4">There is no information to display</td>';
        const noDataTable = document.createElement('table');
        noDataTable.className = 'table-container';
        noDataTable.appendChild(noDataRow);
        showSemesterContainer.appendChild(noDataTable);
        return;
    }

    data.forEach((semesterData) => {
        semesterTable = document.createElement('table');
        semesterTable.className = 'table-container';

        const headerRow = document.createElement('tr'); //header of table
        headerRow.innerHTML = `
            <th>Username</th>
            <th>Fullname</th>
            <th>Total time</th>
            <th>Allowance</th>
        `;
        
        semesterTable.appendChild(headerRow);

        // Semester name for each table
        const semesterHeader = document.createElement('h2');
        semesterHeader.className = 'semester-header';
        semesterHeader.innerHTML = `Semester: ${semesterData.semester}`;
        showSemesterContainer.appendChild(semesterHeader);
        //==============================================================

        // table body data for each semester
        semesterData.allowances.forEach((examTime) => {
            const tablerow = document.createElement('tr');
            tablerow.setAttribute('idt', examTime.idt);
            listItem.push(tablerow);
            tablerow.innerHTML = `
                <td>${examTime.username}</td>
                <td>${examTime.fullname}</td>
                <td>${examTime.totalTime}</td>
                <td>${examTime.allowance}</td>
            `;

            semesterTable.appendChild(tablerow);
        });

        showSemesterContainer.appendChild(semesterTable);
    });


}


// function filterInput(keySearch) {
//   const searchTerm = keySearch.toLowerCase();
//   let foundMatch = false; // Variable to track if any matches were found

//   const existingMessage = document.getElementById('noResultMessage'); // chỉ show 1 dòng warning thôi
//   if (existingMessage) {
//     existingMessage.parentNode.removeChild(existingMessage);
//   }

//   listItem.forEach(item => {
//     if (item.innerText.toLowerCase().includes(searchTerm)) {
//       item.classList.remove('hidden');
//       foundMatch = true; // At least one match found
//     } else {
//       item.classList.add('hidden');
//     }
//   });

//   if (!foundMatch) {
//     // No matches found, show status message
//   const trows = document.createElement('tr');
//   trows.id = 'noResultMessage';
//   trows.innerHTML = '<td colspan="4">No Result At Here</td>'; // Reduce colspan to match the number of columns in your table (4 in this case)
  
//   semesterTable.appendChild(trows);
//   }
// }

function filterInput(keySearch) {
  const searchTerm = keySearch.toLowerCase();
  let foundMatch = false; // Variable to track if any matches were found

  listItem.forEach(item => {
    if (item.innerText.toLowerCase().includes(searchTerm)) {
      item.classList.remove('hidden');
      foundMatch = true; // At least one match found
    } else {
      item.classList.add('hidden');
    }
  });

  // Clear existing status messages
  const existingMessages = document.querySelectorAll('.noResultMessage');
  existingMessages.forEach(message => message.parentNode.removeChild(message));

  // Check if any matches were found
  if (!foundMatch) {
    // No matches found, show status message in all tables
    semesterTable = document.querySelectorAll('.table-container');
    semesterTable.forEach(table => {
      const noResultRow = document.createElement('tr');
      noResultRow.className = 'noResultMessage';
      noResultRow.innerHTML = '<td colspan="4">No Result At Here</td>'; // Reduce colspan to match the number of columns in your table (4 in this case)

      table.appendChild(noResultRow);
    });
  }
}

