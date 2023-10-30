const list = document.getElementById('table_body');
const search = document.getElementById('search');
const listItem = [];
const listItemview = [];
const listview = document.getElementById('table_bodyview');
// call fetch function from utils.js file
const response = await fetchAPIData(
    'https://swp-esms-api.azurewebsites.net/api/exams/current',
    'GET'
);
const data = response.data;
renderExamTime();
renderExamTimeview();

//------------------------------------------------fectch data into table------------------------------------------------------------------
function renderExamTime() {
    list.innerHTML = '';

    Object.keys(data).forEach((semester) => {
        data[semester].forEach((examTime) => {
            if (examTime.length == 0) {
                const noScheduleRow = document.createElement('tr');
                noScheduleRow.innerHTML =
                    '<td colspan="8" class="no-schedule">No exam schedule</td>';
                list.appendChild(noScheduleRow);
                return;
            }

            const tablerow = document.createElement('tr');
            tablerow.setAttribute('idt', examTime.idt);
            listItem.push(tablerow);
            tablerow.innerHTML = `
                <td>${examTime.date}</td>
                <td>${examTime.start} - ${examTime.end}</td>
                <td><button class="button-supervisor" onclick="showTable()">20/35</button></td>
                <td><button class="edit-button" onclick="showConfirmationModalEdit(this)">Edit</button></td>
                <td><button class="remove-button" onclick="showConfirmationModal(this)">Remove</button></td>
                <td>${examTime.publishDate}</td>
                <td>${examTime.slot}</td>
                <td><i onclick="showTable2(this) "class="fa-solid fa-square-caret-down fa-2xl btn-showExamSchedule"></i></td>


              `;

            list.appendChild(tablerow);
        });
    });

    Array.from(document.getElementsByClassName('btn-showExamSchedule')).forEach(
        (btn) => {
            const idt = btn.parentElement.parentElement.getAttribute('idt');
            btn.addEventListener('click', () => renderExamSchedule(idt));
        }
    );
}

//--------------------------------------------- for student table ----------------------------------------------------------------------------------------

//------------------------------------------------fetch data into table------------------------------------------------------------------
function renderExamSchedule(idt) {
    const list01 = document.getElementById('table_body_3');
    const listItem01 = [];

    const trow = document.createElement('tr');
    list01.appendChild(trow);

    let numgrade = 1;

    list01.innerHTML = '';

    // Retrieve the semester values from the API response
    const semesters = Object.keys(data);

    semesters.forEach((semester) => {
        const exams = data[semester];

        exams.forEach((exam) => {
            if (exam.idt != idt) return;

            const examSchedules = exam.examSchedules;
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

function renderExamTimeview() {
    listview.innerHTML = '';

    Object.keys(data).forEach((semester) => {
        data[semester].forEach((examTime) => {
            if (examTime.length == 0) {
                const noScheduleRow = document.createElement('tr');
                noScheduleRow.innerHTML =
                    '<td colspan="8" class="no-schedule">No exam schedule</td>';
                listview.appendChild(noScheduleRow);
                return;
            }

            const tablerow = document.createElement('tr');
            tablerow.setAttribute('idt', examTime.idt);
            listItemview.push(tablerow);
            tablerow.innerHTML = `
                <td>${examTime.date}</td>
                <td>${examTime.start} - ${examTime.end}</td>
                <td><button class="button-supervisor" onclick="showTable()">20/35</button></td>
                <td>${examTime.publishDate}</td>
                <td>${examTime.slot}</td>
                <td><i onclick="showTable2() "class="fa-solid fa-square-caret-down fa-2xl btn-showExamSchedule"></i></td>


              `;

            listview.appendChild(tablerow);
        });
    });

    Array.from(document.getElementsByClassName('btn-showExamSchedule')).forEach(
        (btn) => {
            const idt = btn.parentElement.parentElement.getAttribute('idt');
            btn.addEventListener('click', () => renderExamSchedule(idt));
        }
    );
}