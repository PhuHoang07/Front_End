const list = document.getElementById('table_body');
const search = document.getElementById('search');
const showSemester = document.getElementById('ShowSemester');
const listItem = [];
// call fetch function from utils.js file
const response = await fetchAPIData(
    'https://swp-esms-api.azurewebsites.net/api/exams/current',
    'GET'
);
const data = response.data;
//------------------------------------------------fectch data into table------------------------------------------------------------------
function renderExamTime() {
    list.innerHTML = '';

    showSemester.innerHTML = '';
    const Semter = document.createElement('h2');
    Semter.innerHTML = `Semster:${Object.getOwnPropertyNames(data)}`;
   console.log(Object.getOwnPropertyNames(data));
     showSemester.appendChild(Semter);
 

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
                <td><button class="button-supervisor" onclick="showSupervisor(this)">${examTime.totalSupervisor}/${examTime.requireSupervisor}</button></td>
                <td><button class="edit-button" onclick="showConfirmationModalEdit(this)">Edit</button></td>
                <td><button class="remove-button" onclick="showConfirmationModal(this)">Remove</button></td>
                <td>${examTime.publishDate}</td>
                <td>${examTime.slot}</td>
                <td><i onclick="showTable2(this) "class="fa-solid fa-square-caret-down fa-2xl btn-showExamSchedule" id="btn"></i></td>


              `;

            list.appendChild(tablerow);
        });
    });

    Array.from(document.getElementById("btn")).forEach(
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
            <td><button class="button-supervisor" onclick="showTable3(this)">${schedule.totalStudent}/${schedule.capacity}</button></td>
            <td><button class="edit-button" onclick="showModalEditExamSchedule(this)">Edit</button></td>
            <td><button class="remove-button" onclick="showConfirmationModalExamSchedule(this)">Remove</button></td>
          `;
                list01.appendChild(tablerow);
            });
        });
    });
}


// const studentList = document.getElementById('add-tsu');
// const responseStudent = await fetchAPIData(
//     'https://swp-esms-api.azurewebsites.net/api/exams/schedule/students',
//     'GET'
// );
// const dataStudent = responseStudent.data;
// function renderStudent() {
//     studentList.innerHTML = '';

//     Object.keys(dataStudent).forEach((studentList) => {
//         data[studentList].forEach((studentInfo) => {
//             if (studentInfo.length == 0) {
//                 const noStudentRow = document.createElement('tr');
//                 noStudentRow.innerHTML =
//                     '<td colspan="8" class="no-student">No student</td>';
//                     studentList.appendChild(noStudentRow);
//                 return;
//             }

//             const tablerow = document.createElement('tr');
//             tablerow.setAttribute('idt', studentInfo.idt);
//             listItem.push(tablerow);
//             tablerow.innerHTML = `
//                 <td>${studentInfo.userName}</td>
//                 <td>${studentInfo.name}</td>
//                 <td>${studentInfo.rollNumber}</td>
//               `;

//               studentList.appendChild(tablerow);
//         });
//     });

//     Array.from(document.getElementsByClassName('btn-showStudentList')).forEach(
//         (btn) => {
//             const idt = btn.parentElement.parentElement.getAttribute('idt');
//             btn.addEventListener('click', () => renderExamSchedule(idt));
//         }
//     );
// }

// const studentList = document.getElementById('add-stu');
// const responseStudent = await fetchAPIData(
//     'https://swp-esms-api.azurewebsites.net/api/exams/schedule/students',
//     'GET'
// );
// const dataStudent = responseStudent.data;

// function renderStudentList(idt) {
//     const list01 = document.getElementById('add-tsu');
//     const listItem01 = [];

//     const trow = document.createElement('tr');
//     list01.appendChild(trow);

//     let numgrade = 1;

//     list01.innerHTML = '';

//     // Retrieve the semester values from the API response
//     const studentList = Object.keys(dataStudent);

//     studentList.forEach((studentInfo) => {
//         // const studentInfo = data[studentInfo];

       
//             if (studentInfo.idt != idt) return;

//             const examSchedules = studentInfo.studentList;
//             if (examSchedules.length == 0) {
//                 const noScheduleRow = document.createElement('tr');
//                 noScheduleRow.innerHTML =
//                     '<td colspan="8" class="no-schedule">No student</td>';
//                 list01.appendChild(noScheduleRow);
//             }

//             examSchedules.forEach((studentInfo) => {
//                 const tablerow = document.createElement('tr');
//                 listItem01.push(tablerow);
//                 tablerow.innerHTML = `
//             <td>${numgrade++}</td>
//             <td>${studentInfo.userName}</td>
//             <td>${studentInfo.name}</td>
//             <td>${studentInfo.rollNumber}</td>
    
//             <td><button class="remove-button" onclick="showConfirmationModalExamSchedule(this)">Remove</button></td>
//           `;
//                 list01.appendChild(tablerow);
//             });
        
//     });
// }