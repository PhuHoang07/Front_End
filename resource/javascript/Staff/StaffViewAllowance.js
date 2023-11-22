


const showSemesterContainer = document.getElementById('table_container');
const listItem = [];
let semesterTable;

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

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Username</th>
            <th>Fullname</th>
            <th>Total time</th>
            <th>Allowance</th>
        `;
        semesterTable.appendChild(headerRow);
        const semesterHeader = document.createElement('h2');
        semesterHeader.className = 'semester-header';
        semesterHeader.innerHTML = `Semester: ${semesterData.semester}`;
        showSemesterContainer.appendChild(semesterHeader);
       

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



