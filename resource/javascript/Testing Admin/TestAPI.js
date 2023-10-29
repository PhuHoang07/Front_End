const list = document.getElementById('table_body');
const search = document.getElementById('search');
const listItem = [];

// call fetch function from utils.js file
const response = await fetchAPIData(
    'https://swp-esms-api.azurewebsites.net/api/exams/current',
    'GET'
);

const data = response.data;

renderExamTime();

//------------------------------------------------fectch data into table------------------------------------------------------------------
function renderExamTime() {
    list.innerHTML = '';

    Object.keys(data).forEach((semester) => {
        data[semester].forEach((examTime) => {
            if (examTime.length == 0) {
                const noScheduleRow = document.createElement('tr');
                noScheduleRow.innerHTML =
                    '<td colspan="8" class="no-schedule">No exam schedule</td>';
                list01.appendChild(noScheduleRow);
                return;
            }

            const tablerow = document.createElement('tr');
            tablerow.setAttribute('idt', examTime.idt);

            listItem.push(tablerow);
            tablerow.innerHTML = `
                <td>${examTime.date}</td>
                <td>${examTime.start} - ${examTime.end}</td>
                <td><button class="button-supervisor" onclick="showTable()">20/35</button></td>
                <td><button class="edit-button" onclick="showTable5()">Edit</button></td>
                <td><button class="remove-button" onclick="showConfirmationModal(this)">Remove</button></td>
                <td>${examTime.publishDate}</td>
                <td>${examTime.slot}</td>
                <td><i onclick="renderExamSchedule()" class="fa-solid fa-square-caret-down"></i></td>
              `;
            list.appendChild(tablerow);
        });
    });
}

//--------------------------------------------- for student table ----------------------------------------------------------------------------------------

const list01 = document.getElementById('table_body_3');
const listItem01 = [];

//------------------------------------------------fetch data into table------------------------------------------------------------------
function renderExamSchedule() {
    const trow = document.createElement('tr');
    list01.appendChild(trow);

    let numgrade = 1;

    list01.innerHTML = '';

    // Retrieve the semester values from the API response
    const semesters = Object.keys(data);

    semesters.forEach((semester) => {
        const exams = data[semester];

        exams.forEach((exam) => {
            const examSchedules = exam.examSchedules;
            console.log(examSchedules);
            if (examSchedules.length == 0) {
                const noScheduleRow = document.createElement('tr');
                noScheduleRow.innerHTML =
                    '<td colspan="8" class="no-schedule">No exam schedule</td>';
                list01.appendChild(noScheduleRow);
            }

            examSchedules.forEach((schedule) => {
                const tablerow = document.createElement('tr');
                listItem01.push(tablerow);
                tablerow.innerHTML = `
            <td>${numgrade++}</td>
            <td>${schedule.subject}</td>
            <td>${schedule.form}</td>
            <td>${schedule.room}</td>
            <td>${schedule.type}</td>
            <td><button class="button-supervisor" onclick="showTable3()">20/35</button></td>
            <td><button class="edit-button">Edit</button></td>
            <td><button class="remove-button" onclick="showConfirmationModal(this)">Remove</button></td>
          `;
                list01.appendChild(tablerow);
            });
        });
    });
}
