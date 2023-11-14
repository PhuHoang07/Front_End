StartFilter();
window.addEventListener('load', async function() {
    await loadSubject();
  });
  

  const leftSelect = document.getElementById("Subject_filter_Left");
  const rightSelect = document.getElementById("Subject_filter_Right");
    function addClickListeners(selectFrom, selectTo) {
      selectFrom.addEventListener('click', (event) => {
          if (event.target.tagName === 'OPTION') {
              // Clone the option and append it to the other select
              const clonedOption = event.target.cloneNode(true);
              selectTo.appendChild(clonedOption);
  
              // Remove the original option from the current select
              selectFrom.removeChild(event.target);
          }
      });
  }
  
  // Add click listeners to the right select for moving to the left
  addClickListeners(rightSelect, leftSelect);
  
  // Add click listeners to the left select for moving to the right
  addClickListeners(leftSelect, rightSelect);
  const listview = document.getElementById('Schedule_TableView');
const listItemview = [];
const showSemester = document.getElementById('ShowSemester');


//------------------------------------------------fectch data into table------------------------------------------------------------------
async function renderExamTimeview() {
    listview.innerHTML = '';
    showSemester.innerHTML = '';
    const response = await fetchAPIData(
        'https://swp-esms-api.azurewebsites.net/api/exams/filter',
        'GET'
    );
    const res = await fetchAPIData(
        'https://swp-esms-api.azurewebsites.net/api/exams/current',
        'GET'
    );
    const datas = res.data;
   const Semter = document.createElement('h2');
   Semter.innerHTML = `Semster:${Object.getOwnPropertyNames(datas)}`;
  
    showSemester.appendChild(Semter);

    const data = response.data;
console.log(response);
console.log(data);
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
                <td><button class="button-supervisor" onclick="showSupervisor(this)">${examTime.totalSupervisor}/${examTime.requireSupervisor}</button></td>
                <td>${examTime.publishDate}</td>
                <td>${examTime.slot}</td>
                <td><i onclick="showTable2(this) "class="fa-solid fa-square-caret-down fa-2xl btn-showExamSchedule"></i></td>


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




let idt;

function getoption() {
    const option = document.getElementById("subject-input");
    option.innerHTML
}
function showTable() {
    const hiddenTable = document.getElementById('hiddenTable');
    if (hiddenTable.style.display === 'none') {
        hiddenTable.style.display = 'block';
    } else {
        hiddenTable.style.display = 'none';
    }
}
function closeModalAddExamSchedule() {
    const hiddenTable = document.getElementById("hiddenTable-addTableExamSchedule");
    hiddenTable.style.display = "none";
}

function showTable2(button) {
    const hiddenTable = document.getElementById("hiddenTable-2");
    idt = button.parentNode.parentNode.getAttribute('idt');
    console.log(idt);

    if (hiddenTable.style.display === "none") {
        hiddenTable.style.display = "block";
    } else {
        hiddenTable.style.display = 'none';
    }
    
}
function showTimeFiltered(button) {
    const hiddenTable = document.getElementById("filtered_Time-2");
    idt = button.parentNode.parentNode.getAttribute('idt');
    console.log(idt);

    if (hiddenTable.style.display === "none") {
        hiddenTable.style.display = "block";
    } else {
        hiddenTable.style.display = 'none';
    }
    
}
async function showSupervisor(button) {
    const listItem=[];
    const hiddenTable = document.getElementById("SupervisorTable");
    idt = button.parentNode.parentNode.getAttribute('idt');
    console.log(idt);
const table = document.getElementById("table_body_super");

table.innerHTML=``;

const data = {
    params :{
        'idt': idt
    }
}
const tableContainer = document.getElementById('table-container-hidden-2');


const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/time/proctors","GET",data);
console.log(res);
if(res.data.length === 0){
    const noSupRow = document.createElement('tr');
        listItem.push(noSupRow);
        noSupRow.innerHTML =`<td colspan="8" class="no-Supervisor">No Supervisor</td>`;
            table.appendChild(noSupRow);
            if (hiddenTable.style.display === "none") {
                hiddenTable.style.display = "block";
            } else {
                hiddenTable.style.display = 'none';
            }
            return;
}
res.data.forEach((item, index) => {
    const tablerow = document.createElement('tr');
    listItem.push(tablerow);
    tablerow.innerHTML = `
            <td>${index+1}</td>
            <td>${item.name}</td>
            <td>${item.username}</td>
            <td>${item.email}</td>
          `;
    table.appendChild(tablerow);
});

    if (hiddenTable.style.display === "none") {
        hiddenTable.style.display = "block";
    } else {
        hiddenTable.style.display = 'none';
    }
}


async function reFetchSup(button) {
    const listItem=[];
    const hiddenTable = document.getElementById("SupervisorTable");
    console.log(idt);
const table = document.getElementById("table_body_super");
const data = {
    params :{
        'idt': idt
    }
}
const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/time/proctors","GET",data);
console.log(res);

res.data.forEach((item, index) => {
    const tablerow = document.createElement('tr');
    listItem.push(tablerow);
    tablerow.innerHTML = `
            <td>${index+1}</td>
            <td>${item.name}</td>
            <td>${item.username}</td>
            <td>${item.email}</td>
          `;
    table.appendChild(tablerow);
});
hiddenTable.style.display = "block";
    
}

function showConfirmationModalExamSchedule(button) {
    var modal = document.getElementById("confirmationModalExamSchedule");
    modal.style.display = "block";

    // Lưu trạng thái nút Remove hiện tại để xác định hàng cần xóa
    selectedButton = button;
    subject = button.parentNode.parentNode.cells[1].innerText; // Lấy giá trị từ cột thứ 2
    room = button.parentNode.parentNode.cells[3].innerText;
    console.log(idt);
}
async function confirmRemoveExamSchedule(confirmation) {

    console.log(idt);
    var modal = document.getElementById("confirmationModalExamSchedule");
    modal.style.display = "none";
    if (confirmation) {
        // Perform delete action here
        var row = selectedButton.parentNode.parentNode;
        row.remove();
        const data = {
            body: {
                'idt': idt,
                'subjectID': subject,
                'roomNumber': room

            }
        }

        const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/schedule/delete", "DELETE", data);
        if (res.isSuccess == true) {
            console.log(res.message);
            var messageElement = document.getElementById('messageRemove');
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

function textEreaAddSup(){
    const hiddenTable = document.getElementById('SupervisorTable');
    const hiddenTable4 = document.getElementById('superTextToAdd');

    if (hiddenTable.style.display === 'block') {
        hiddenTable4.style.display = 'block';
        hiddenTable4.style.position = 'absolute';
        hiddenTable4.style.top = getComputedStyle(hiddenTable).top;
        hiddenTable4.style.left =
            parseInt(getComputedStyle(hiddenTable).left) + 250 + 'px';
    }
}

async function showModalAddExamSchedule() {
    const hiddenTable = document.getElementById("hiddenTable-addTableExamSchedule");
    const data = {
        body: {

        }
    }


    const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/subjects", "GET", data);
    const selectElement = document.getElementById("subject-input");
    res.data.forEach((item, index) => {
        const optionElement = document.createElement("option");
        optionElement.value = index; // Giá trị của option (có thể là một giá trị duy nhất hoặc index)
        optionElement.text = item; // Nội dung của option
        selectElement.appendChild(optionElement);
    });
    const selectElementr = document.getElementById("room-input");
    selectElement.addEventListener("change", async function () {
        const selectedIndex = selectElement.selectedIndex; // Lấy chỉ số của lựa chọn
        const selectedOption = selectElement.options[selectedIndex]; // Lựa chọn đã chọn
        const noiDungLuaChon = selectedOption.textContent; // Lấy nội dung của lựa chọn
        const datar = {
            params: {
                'idt': idt,
                'subjectId': noiDungLuaChon
            }
        }
        const resr = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/available-rooms", "GET", datar);
        resr.data.forEach((item, index) => {
            const optionElement = document.createElement("option");
            optionElement.value = index; // Giá trị của option (có thể là một giá trị duy nhất hoặc index)
            optionElement.text = item; // Nội dung của option
            selectElementr.appendChild(optionElement);
        });
    });

    if (hiddenTable.style.display === "none") {
        hiddenTable.style.display = "block";
    } else {
        hiddenTable.style.display = "none";
    }

}


async function addRowToTablesch() {
    // Lấy giá trị từ các trường input/select trong hiddenTable-6
    const errorMessage = document.querySelector("#error-messagesche");
    const errorMessage2 = document.getElementById('error-messagesche2');
    const nameInput = document.querySelector('[name="name"]');
    const typeInput = document.getElementById("type");
    const selectRoom = document.querySelector('#room-input');
    const selectedRIndex = selectRoom.selectedIndex;
    const selectedROption = selectRoom.options[selectedRIndex];
    const selectSubject = document.querySelector('#subject-input');
    const selectedIndex = selectSubject.selectedIndex;
    const selectedOption = selectSubject.options[selectedIndex];

    if (!nameInput.value || !typeInput.value || !selectRoom.value || !selectSubject.value) {
        errorMessage.style.display = "none";
        errorMessage2.style.display = "flex"; // Hiển thị thông báo
        return; // Dừng việc thêm dòng mới nếu có trường không hợp lệ.
    } else {
        errorMessage2.style.display = "none"; // Ẩn thông báo nếu tất cả trường hợp lệ.
    }
    const selectedOptionText = selectedOption.text;
    const enteredValue = nameInput.value;
    const selectedROptionText = selectedROption.text;
    const enteredtype = typeInput.value;
    const data = {
        body: {
            'idt': idt,
            "subjectID": selectedOptionText,
            "roomNumber": selectedROptionText,
            "form": enteredValue,
            "type": enteredtype
        }
    }
    const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/schedule/add", "POST", data);
    if (res.isSuccess == true) {
        console.log(res.message);
        errorMessage.style.display = "flex";
        errorMessage.innerHTML = res.message;
        renderExamSchedule(idt);
    } else {
        console.log(res.message);
        errorMessage.style.display = "flex";
        errorMessage.innerHTML = res.message;
    }
}


async function showTable3(button) {
    // const list = document.getElementById('add-tsu');

    const table = document.getElementById("add-tsu");
    table.innerHTML = ``;
    const listItem = [];
   
    selectedButton = button;
    subject = button.parentNode.parentNode.cells[1].innerText; // Lấy giá trị từ cột thứ 2
    room = button.parentNode.parentNode.cells[3].innerText;
    console.log(idt);
    console.log(room);
    console.log(subject);


    const hiddenTable = document.getElementById("hiddenTable-3");
    if (hiddenTable.style.display === "none") {
        hiddenTable.style.display = "block";
        hiddenTable.style.zIndex = 100;
    } else {
        hiddenTable.style.display = 'none';
    }
    const data = {
        params: {
            'idt': idt,
            'subject': subject,
            'room': room
        }
    }
    console.log(data);
    
    const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/schedule/students", "GET", data);
    // const table = document.getElementById("stu-list")
    const tableBody = hiddenTable.querySelector('#add-tsu');
    console.log(res.data.studentList);
    if(res.data.studentList.length === 0){
        const noSupRow = document.createElement('tr');
        listItem.push(noSupRow);
        noSupRow.innerHTML =`<td colspan="8" class="no-Student">No Student...</td>`;
            table.appendChild(noSupRow);
           
                hiddenTable.style.display = "block";
           
            return;
    }
    res.data.studentList.forEach((item, index) => {
        const tablerow = document.createElement('tr');
        listItem.push(tablerow);
        tablerow.innerHTML = `
                <td>${index+1}</td>
                <td>${item.rollNumber}</td>
                <td>${item.name}</td>
                <td>${item.userName}</td>
              `;
              tableBody.appendChild(tablerow);
    });
}
async function reFetch(){
    const data = {
        params: {
            'idt': idt,
            'subject': subject,
            'room': room
        }
    }
    const listItem = [];
    const hiddenTable = document.getElementById("hiddenTable-3");
    const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/schedule/students", "GET", data);
    // const table = document.getElementById("stu-list")
    const tableBody = hiddenTable.querySelector('#add-tsu');
    console.log(res);
    res.data.studentList.forEach((item, index) => {
        const tablerow = document.createElement('tr');  
        listItem.push(tablerow);
        tablerow.innerHTML = `
                <td>${index+1}</td>
                <td>${item.rollNumber}</td>
                <td>${item.name}</td>
                <td>${item.userName}</td>
              `;
              tableBody.appendChild(tablerow);
    });
}
const openButton = document.getElementById('open-dropdown');
const dropdown = document.getElementById('dropdown-Search');
const searchInput = document.getElementById('searchInput');
const options = document.getElementById('Search_options');
let isDropdownOpen = false;

openButton.addEventListener('click', () => {
  if (isDropdownOpen) {
    dropdown.style.display = 'none';
        const selectElement = document.getElementById("Subject_filter_Left"); 
      const options = Array.from(selectElement.options).map(option => option.value);
      console.log(options);
  const optionsCount = selectElement.options.length;

  // Update the button text with the options count
  const button = document.getElementById("open-dropdown");
  button.textContent = ` <${optionsCount}> Subjects`;
  } else {
    dropdown.style.display = 'flex';
  }
  isDropdownOpen = !isDropdownOpen;
});


  

async function loadSubject() {
  const SubjectWindowRight = document.getElementById('Subject_filter_Right');
  const SemesterSelect = document.getElementById('Semester_Select');
    const data = {
        params : {
        }
    }
    const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/subjects","GET",data)
    res.data.forEach((item) => {
        const option = document.createElement('option');
        option.id="";
        option.value = item;
        option.textContent = item;
        SubjectWindowRight.appendChild(option);
    });
    console.log(res);

    const resSem = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/semesters","GET",data)
    resSem.data.forEach((item) => {
        const option = document.createElement('option');
        option.id="";
        option.value = item;
        option.textContent = item;
        SemesterSelect.appendChild(option);
    });
    console.log(resSem);
  }
  


// async function StartFilter(){
//     const dateInput = document.querySelector("#Filter_Date input[type='date']");
//     const startTimeInput = document.querySelector("#Filter_Date input[type='time']");
//     const endTimeInput = document.querySelectorAll("#Filter_Date input[type='time']")[1]; // Lấy thứ hai input[type='time']
//     const publishDateInput = document.querySelectorAll("#Filter_Date input[type='date']")[1]; // Lấy trường "Publish Date"
//     const selectedSemester = document.getElementById("Semester_Select");
//     const selectElement = document.getElementById("Subject_filter_Left"); 
//     const ListTime = document.getElementById('table_body_Filtered_Time');
//     const list = document.getElementById('Schedule_TableView');
//     list.innerHTML = ``;
//     ListTime.innerHTML = ``;
//     const semester = selectedSemester.value;
//     const from = dateInput.value;
//     const to = publishDateInput.value;
//     const start = startTimeInput.value;
//     const end = endTimeInput.value;    
//     const subjects = Array.from(selectElement.options).map(option => option.value);

//     let params = {};
//     semester && (params.semester = semester);
//     from && (params.from = from);
//     to && (params.to = to);
//     start && (params.start = start);
//     end && (params.end = end);
//     subjects.length > 0 && (params.subjects = subjects);
    

//   const data = {
//     params
//   };
//   console.log(data);
 

//   const listItem = [];
//       const res = await fetchAPIDataS("https://swp-esms-api.azurewebsites.net/api/exams/filter","GET",data);
//       console.log(res);
//       if(res.isSuccess = true){
//         const datas = res.data;
//     Object.keys(datas).forEach((semester) => {
//         datas[semester].forEach((examSchedules) => {
//             if (examSchedules.length == 0) {
//                 const noScheduleRow = document.createElement('tr');
//                 noScheduleRow.innerHTML =
//                     '<td colspan="8" class="no-schedule">No exam schedule</td>';
//                 list.appendChild(noScheduleRow);
//                 return;
//             }

//             const tablerow = document.createElement('tr');
//             tablerow.setAttribute('idt', examSchedules.idt);
//             listItem.push(tablerow);
//             tablerow.innerHTML = `
//                 <td>${examSchedules.date}</td>
//                 <td>${examSchedules.start} - ${examSchedules.end}</td>
//                 <td><button class="button-supervisor" onclick="showSupervisor(this)">${examSchedules.totalSupervisor}/${examSchedules.requireSupervisor}</button></td>
//                 <td>${examSchedules.publishDate}</td>
//                 <td>${examSchedules.slot}</td>
//                 <td><i onclick="showTimeTable(this) "class="fa-solid fa-square-caret-down fa-2xl btn-showExamSchedule"></i></td>
//               `;
//               list.innerHTML = ``;
//             list.appendChild(tablerow);

            
//     Array.from(document.getElementsByClassName('btn-showExamSchedule')).forEach(
//         (btn) => {
//             const idt = btn.parentElement.parentElement.getAttribute('idt');
//             btn.addEventListener('click', () => renderExamSchedule(idt));
//         }
//         );
        
//         const listItemTime = [];
//        console.log(examSchedules.examSchedules.forEach((item,index) => {

//         const tablerow = document.createElement('tr');
//         listItemTime.push(tablerow);
//                 tablerow.innerHTML = `
//             <td>${index++}</td>
//             <td>${item.subject}</td>
//             <td>${item.form}</td>
//             <td>${item.room}</td>
//             <td>${item.type}</td>
//             <td><button class="button-supervisor" onclick="showTable3(this)">${item.totalStudent}/${item.capacity}</button></td>
//           `;
//           ListTime.appendChild(tablerow);

//        })) ;
       
//         });
//     });

//       }else{

//       }
     
// }


async function StartFilter(){
    const dateInput = document.querySelector("#Filter_Date input[type='date']");
    const startTimeInput = document.querySelector("#Filter_Date input[type='time']");
    const endTimeInput = document.querySelectorAll("#Filter_Date input[type='time']")[1]; // Lấy thứ hai input[type='time']
    const publishDateInput = document.querySelectorAll("#Filter_Date input[type='date']")[1]; // Lấy trường "Publish Date"
    const selectedSemester = document.getElementById("Semester_Select");
    const selectElement = document.getElementById("Subject_filter_Left"); 
    const ListTime = document.getElementById('time_tbody_filtered');
    const list = document.getElementById('Schedule_TableView');
    const showSemester = document.getElementById('ShowSemester');
    ListTime.innerHTML = ``;
    showSemester.innerHTML = ``;
    const semester = selectedSemester.value;
    const from = dateInput.value;
    const to = publishDateInput.value;
    const start = startTimeInput.value;
    const end = endTimeInput.value;    
    const subjects = Array.from(selectElement.options).map(option => option.value);

    let params = {};
    semester && (params.semester = semester);
    from && (params.from = from);
    to && (params.to = to);
    start && (params.start = start);
    end && (params.end = end);
    subjects.length > 0 && (params.subjects = subjects);
    
  const data = {
    params
  };
  console.log(data);

  const loadingContainer = document.getElementById('loading-container');
  
  loadingContainer.style.display = 'block';

  const listItem = [];
  try {
      const res = await fetchAPIDataFilter("https://swp-esms-api.azurewebsites.net/api/exams/filter","GET",data);
      loadingContainer.style.display = 'none';
      const dataKeysCount = Object.keys(res.data).length;
      console.log(res);
      const OBJ = res.data;
      console.log(OBJ);
      loadingContainer.style.display = 'none';
      renderExamTimeFiltered();
      if (dataKeysCount == 0) {
        console.log("no");
        const noScheduleRow = document.createElement('tr');
        noScheduleRow.innerHTML =
            '<td colspan="8" class="no-schedule">No exam schedule</td>';
        list.appendChild(noScheduleRow);
        return;
    }

    function renderExamTimeFiltered() {
        const container = document.getElementById("Exam_schedule_table");
        container.innerHTML = ''; // Clear the container
    
        const semesters = Object.keys(OBJ);
    
        semesters.forEach((semester) => {
            const semesterTable = document.createElement('table');
            const semesterHeaderRow = document.createElement('tr');
            semesterHeaderRow.innerHTML = `
                <th></th>
                <th>Date</th>
                <th>Time</th>
                <th>Supervisor</th>
                <th>Publish Date</th>
                <th>Slot</th>
                <th></th>
            `;
            semesterTable.appendChild(semesterHeaderRow);
    
            if (OBJ[semester].length === 0) {
                // If no data for this semester, display a message row
                const messageRow = document.createElement('tr');
                messageRow.innerHTML = `
                    <td colspan="7" class="no-data-message">No exam schedule for this semester</td>
                `;
                semesterTable.appendChild(messageRow);
            } else {
                // If there is data, render the rows
                OBJ[semester].forEach((examTime) => {
                    const tablerow = document.createElement('tr');
                    tablerow.setAttribute('idt', examTime.idt);
                    listItem.push(tablerow);
                    tablerow.innerHTML = `
                        <td>
                            <i onclick="exportExcel(this)" class="fa-solid fa-file-excel fa-2xl tooltip" style="cursor:pointer">
                                <span class="tooltiptext">Export To Excel!</span>
                            </i>
                        </td>
                        <td>${examTime.date}</td>
                        <td>${examTime.start} - ${examTime.end}</td>
                        <td><button class="button-supervisor" onclick="showSupervisor(this)">${examTime.totalSupervisor}/${examTime.requireSupervisor}</button></td>
                        <td>${examTime.publishDate}</td>
                        <td>${examTime.slot}</td>
                        <td>
                            <i onclick="showTimeFiltered(this)" class="fa-solid fa-square-caret-down fa-2xl btn-showExamSchedule"></i>
                        </td>
                    `;
                    semesterTable.appendChild(tablerow);
                });
            }
    
            const showSemester = document.createElement('h2');
            showSemester.className = 'semester-title';
            showSemester.innerHTML = `Semester: ${semester}`;
    
            container.appendChild(showSemester);
            container.appendChild(semesterTable);
        });
    
        Array.from(document.getElementsByClassName('btn-showExamSchedule')).forEach(
            (btn) => {
                const idt = btn.parentElement.parentElement.getAttribute('idt');
                console.log(idt);
                btn.addEventListener('click', () => renderExamScheduleFIltered(idt));
            }
        );
        loadingContainer.style.display = 'none';
    }
    

    function renderExamScheduleFIltered(idt) {
        const listItem01 = [];
        const trow = document.createElement('tr');
        ListTime.appendChild(trow);
        ListTime.innerHTML = ``;
        let numgrade = 1;
    
        // Retrieve the semester values from the API response
        const semesters = Object.keys(OBJ);
    
        semesters.forEach((semester) => {
            const exams = OBJ[semester];
    console.log(semester);
            exams.forEach((exam) => {
                console.log(parseInt(exam.idt));
                console.log(idt);
                if (parseInt(exam.idt) !== parseInt(idt)) {
                    return;}
    
                const examSchedules = exam.examSchedules;
                if (examSchedules.length == 0) {
                    const noScheduleRow = document.createElement('tr');
                    noScheduleRow.innerHTML =
                        '<td colspan="8" class="no-schedule">No exam schedule</td>';
                        ListTime.appendChild(noScheduleRow);
                }
    
                examSchedules.forEach((schedule) => {
                    console.log(schedule);
                    const tablerow = document.createElement('tr');
                    listItem01.push(tablerow);
                    tablerow.innerHTML = `
                <td>${numgrade++}</td>
                <td>${schedule.subject}</td>
                <td>${schedule.form}</td>
                <td>${schedule.room}</td>
                <td>${schedule.type}</td>
                <td>${schedule.proctor}</td>
                <td><button class="button-supervisor" onclick="showTable3(this)">${schedule.totalStudent}/${schedule.capacity}</button></td>
              `;
              console.log(tablerow);
              ListTime.appendChild(tablerow);
              console.log(tablerow);
                });
            });
        });
    }
    } catch (error) {
        const container = document.getElementById("Exam_schedule_table");
      // Handle API request error and hide the loading container
      container.innerHTML = `<h2 class="title toll_box">Empty OR Failed to fetch data!</h2>`;
      loadingContainer.style.display = 'none';
    }
  }
      

// async function exportExcel(button) {
//     idt = button.parentNode.parentNode.getAttribute('idt');
//     console.log(idt);
//     const data = {
//         params :{
//             idt
//         }
//     }
//     const res = fetchAPIData('https://swp-esms-api.azurewebsites.net/api/exams/time/export-excel','GET',data);
//     console.log(res);
//     const downloadLink = res.downloadLink;

//     // Use the download link as needed (e.g., create a download button)
//     console.log('Download Link:', downloadLink);
// }
function showTimeTable(button){
    console.log(idt);
    idt = button.parentNode.parentNode.getAttribute('idt');
    console.log(idt);
    const hiddenTable = document.getElementById('filtered_time_table');
    if (hiddenTable.style.display === 'none') {
        hiddenTable.style.display = 'block';
    } else {
        hiddenTable.style.display = 'none';
    }
}

function closeFIlteredTimeTable() {
    const FIlteredTimeTable = document.getElementById('filtered_time_table');

    FIlteredTimeTable.style.display = 'none';
}

const getSelectedButton = document.getElementById("get-selected");
// Add a click event listener to the "Get Selected" button
async function getSelectedData() {
    const textarea = document.getElementById("inputStu");
    const inputtedText = textarea.value;    
    const usernameArray = inputtedText.split("\n").filter(username => username.trim() !== '');
    if(usernameArray.length === 0){
        console.log("Empty Array");
        const notificationContainer = document.getElementById("notificationContainer");

        const notification = document.createElement("div");
        notification.className = "notification";
        notification.innerText = "Please Input UserName!";
  
        notificationContainer.appendChild(notification);
  
        // Tự động ẩn thông báo sau một khoảng thời gian (ví dụ: 3 giây)
        setTimeout(function() {
          notification.style.display = "none"; // Ẩn thông báo
        }, 3000);
      
        return;

    }else{

    
    console.log("Inputted Text:", usernameArray);

    const data = {
       body: {
            'idt': idt,
            "subject": subject,
            "room": room,
            "students": usernameArray
          }
    }
    const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/schedule/students/add","POST",data);
    console.log(res);

    const notificationContainer = document.getElementById("notificationContainer");
    const notification = document.createElement("div");

    notification.className = "notification";
    notification.innerText = res.message;
    notificationContainer.appendChild(notification);

    // Tự động ẩn thông báo sau một khoảng thời gian (ví dụ: 3 giây)
    setTimeout(function() {
      notification.style.display = "none"; // Ẩn thông báo
    }, 3000);
}
};
function AddStudent(){
    getSelectedData();
    const hiddenTable = document.getElementById("hiddenTable-3");
    const tableBody = hiddenTable.querySelector('#add-tsu');
    tableBody.innerHTML = ``;
    reFetch();
    
}


function addSuper(){
    getSelectedDataSup();
}
async function getSelectedDataSup() {
    const notificationContainer = document.getElementById("notificationContainerSup");
    const textarea = document.getElementById("inputSuper");
    const inputtedText = textarea.value;    
    const usernameArray = inputtedText.split("\n").filter(username => username.trim() !== '');
    console.log("Inputted Text:", usernameArray);
    if(usernameArray.length === 0){
        console.log("Empty Array");
        const notification = document.createElement("div");
        notification.className = "notification";
        notification.innerText = "Please Input UserName!";
        notificationContainer.appendChild(notification);
  
        // Tự động ẩn thông báo sau một khoảng thời gian (ví dụ: 3 giây)
        setTimeout(function() {
          notification.style.display = "none"; // Ẩn thông báo
        }, 3000);
      
        return;

    }else{
    const data = {
       body: {
            'idt': idt,
            "proctorList": usernameArray
    }
}
    const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/time/proctors/add","POST",data);
    console.log(res);
    if(res.isSuccess = true){
        const notification = document.createElement("div");
        notification.className = "notification";
        notification.innerText = res.message;
        notificationContainer.appendChild(notification);
  
        // Tự động ẩn thông báo sau một khoảng thời gian (ví dụ: 3 giây)
        setTimeout(function() {
          notification.style.display = "none"; // Ẩn thông báo
        }, 3000);
        const table = document.getElementById("table_body_super");
    table.innerHTML=``;
    reFetchSup();
    }else{
        const notification = document.createElement("div");
        notification.className = "notification";
        notification.innerText = res.message;
        notificationContainer.appendChild(notification);
  
        // Tự động ẩn thông báo sau một khoảng thời gian (ví dụ: 3 giây)
        setTimeout(function() {
          notification.style.display = "none"; // Ẩn thông báo
        }, 3000);
    }
    }
    
    
};


function showTable4() {
    const hiddenTable = document.getElementById('hiddenTable-6');
    if (hiddenTable.style.display === 'none') {
        hiddenTable.style.display = 'block';
    } else {
        hiddenTable.style.display = 'none';
    }
}

function showTable5() {
    const hiddenTable = document.getElementById('hiddenTable-7');
    if (hiddenTable.style.display === 'none') {
        hiddenTable.style.display = 'block';
    } else {
        hiddenTable.style.display = 'none';
    }
}

async function showModalEditExamSchedule(button) {
    
    //------------------------------------------------------lấy data từ thằng schedule đc chọn ----------------------------------------------------------------------------
    selectedButton = button;
    subject = button.parentNode.parentNode.cells[1].innerText; // Lấy giá trị từ cột thứ 2
    room = button.parentNode.parentNode.cells[3].innerText;
       // console.log(subject);
       // console.log(room);
       const hiddenTableRow = document.getElementById("hiddenTable-editTableExamSchedule");
       
       const dataRow = {
           params: {
               'idt': idt,
               'subjectID': subject,
               'roomNumber': room
           }
       }
   console.log(dataRow);
   
    //------------------------------------------------------dùng để lấy môn học mới ra nha --------------------------------------------------------------------------------   
       
   
       const data = {
           body: {
   
           }
       }
   
   
       const response = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/subjects", "GET", data);
       const selectElement = document.getElementById("subject-input-edit");
       response.data.forEach((item, index) => {
           const optionElement = document.createElement("option");
           optionElement.value = index; // Giá trị của option (có thể là một giá trị duy nhất hoặc index)
           optionElement.text = item; // Nội dung của option
           selectElement.appendChild(optionElement);
       });
       console.log(response.data);
       const selectElementr = document.getElementById("room-input-edit");
       selectElement.addEventListener("change", async function () {
           const selectedIndex = selectElement.selectedIndex; // Lấy chỉ số của lựa chọn
           const selectedOption = selectElement.options[selectedIndex]; // Lựa chọn đã chọn
           const noiDungLuaChon = selectedOption.textContent; // Lấy nội dung của lựa chọn
           const datar = {
               params: {
                   'idt': idt,
                   'subjectId': noiDungLuaChon
               }
           }
           console.log(datar);
           const resr = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/available-rooms", "GET", datar);
           resr.data.forEach((item, index) => {
               const optionElement = document.createElement("option");
               optionElement.value = index; // Giá trị của option (có thể là một giá trị duy nhất hoặc index)
               optionElement.text = item; // Nội dung của option
               selectElementr.appendChild(optionElement);
           });
       });
   
       if (hiddenTableRow.style.display === "none") {
           hiddenTableRow.style.display = "block";
       } else {
           hiddenTableRow.style.display = 'none';
       } 
       editRowToTableSchedule(subject, room);  
   }
   //============================================================Điền những thằng cần update ==================================================================================================
async function editRowToTableSchedule(subject, room){
    
    const errorMessage = document.getElementById("error-messagesche-Edit");
    const errorMessage2 = document.getElementById("error-messagesche-Edit2");
    const nameInput = document.querySelector('[name="name-edit"]'); // form input
    const typeInput = document.getElementById("type-edit");
    const selectRoom = document.querySelector('#room-input-edit');
    const selectedRIndex = selectRoom.selectedIndex;
    const selectedROption = selectRoom.options[selectedRIndex];
    const selectSubject = document.querySelector('#subject-input-edit');
    const selectedIndex = selectSubject.selectedIndex;
    const selectedOption = selectSubject.options[selectedIndex];

    if (!nameInput.value || !typeInput.value || !selectRoom.value || !selectSubject.value) {
        errorMessage.style.display = "none";
        errorMessage2.style.display = "flex"; // Hiển thị thông báo
        return; // Dừng việc thêm dòng mới nếu có trường không hợp lệ.
    } else {
        errorMessage2.style.display = "none"; // Ẩn thông báo nếu tất cả trường hợp lệ.
    }

    
    const selectedOptionText = selectedOption.text;
    const enteredValue = nameInput.value;
    const selectedROptionText = selectedROption.text;
    const enteredtype= typeInput.value;

 const data = {
    body : {
        'idt': idt,
        "subjectID":subject,
        "roomNumber":room,
        "updSubjectID":selectedOptionText,
        "updRoomNumber": selectedROptionText,
        "updForm":enteredValue,
        "updType":enteredtype
    }
 }
 console.log(data);
 var modal = document.getElementById("confirmationModalEditExamSchedule");
    modal.style.display = "block";
    var confirmButton = document.getElementById("Yes-edit_confirm"); // assuming the confirm button has an element ID of "confirmButton"
    var cancelButton = document.getElementById("No-edit_confirm");
    confirmButton.addEventListener("click", function() {
        confirmEditExamSchedule(true, subject, room, selectedOptionText, selectedROptionText, enteredValue, enteredtype);
        modal.style.display = "none";
      });
      
    cancelButton.addEventListener("click", function() {
        modal.style.display = "none";
      });


}

//==============================================================confirmation để truyền dô update API=========================================================================================

async function confirmEditExamSchedule(confirmation, subject, room, selectedOptionText, selectedROptionText, formValue, typeValue){
    console.log(idt);
    const errorMessage = document.getElementById("error-messagesche-Edit");
    const errorMessage2 = document.getElementById("error-messagesche-Edit2");
    var modalEdit = document.getElementById("hiddenTable-editTableExamSchedule");
    if(confirmation){
        const data = {
            body : {
                'idt': idt,
                "subjectID":subject,
                "roomNumber": room,
                "updSubjectID":selectedOptionText,
                "updRoomNumber":selectedROptionText,
                "updForm":formValue,
                "updType":typeValue
            }
         }
         console.log(data);
          const response = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/schedule/update","PATCH",data);
   
     if (response.isSuccess == true) {
        
         errorMessage.style.display = "flex";
         errorMessage.innerHTML = response.message;
         console.log(response.message);
         document.getElementById('messageRemove-2').innerText = response.message;

        } else {
            errorMessage.style.display = "flex";
            errorMessage.innerHTML = response.message;
            console.log(response.message);   
        }

    }
}
//=================================================================================================================================================================================================
function closeTable() {
    const hiddenTable = document.getElementById('hiddenTable');
    const hiddenTable4 = document.getElementById('hiddenTable-4');

    hiddenTable.style.display = 'none';
    hiddenTable4.style.display = 'none';
}

function closeTable2() {
    const hiddenTable2 = document.getElementById('hiddenTable-2');
    const hiddenTable5 = document.getElementById('hiddenTable-5');

    hiddenTable2.style.display = 'none';
    hiddenTable5.style.display = 'none';
}
function closeTableTimeFiltered() {
    const filtered_Time = document.getElementById('filtered_Time-2');

    filtered_Time.style.display = 'none';
}
function closeSupervisorTable() {
    const SPtable = document.getElementById('SupervisorTable');
    const hiddenTable5 = document.getElementById('hiddenTable-5');

    SPtable.style.display = 'none';
}

function closeTable3() {
    const hiddenTable = document.getElementById('hiddenTable-3');
    const hiddenStudentListToAdd = document.getElementById('hiddenTable-StudentListToAdd');
    hiddenTable.style.display = 'none';
    hiddenStudentListToAdd.style.display = 'none';
}

function closeTable4() {
    const hiddenTable = document.getElementById('hiddenTable-6');
    hiddenTable.style.display = 'none';
    const message = document.getElementById('error-message');
    message.style.display = 'none';
}

function closeTable5() {
    const hiddenTable = document.getElementById('hiddenTable-7');
    hiddenTable.style.display = 'none';
}

function closeModalEditExamSchedule() {
    const hiddenTable = document.getElementById('hiddenTable-editTableExamSchedule');
    hiddenTable.style.display = 'none';
}

function showStudentListToAdd() {
    const hiddenTable = document.getElementById('hiddenTable-3');
    const hiddenTable4 = document.getElementById('hiddenTable-StudentListToAdd');

    if (hiddenTable.style.display === 'block') {
        hiddenTable4.style.display = 'block';
        hiddenTable4.style.position = 'absolute';
        hiddenTable4.style.top = getComputedStyle(hiddenTable).top;
        hiddenTable4.style.left =
            parseInt(getComputedStyle(hiddenTable).left) + 250 + 'px';
    }
}

//--------------------------------------Edit time đang hoàn thiện truyền dữ liệu vô -------------------------------------------------------------------------------------------------------------------
function showConfirmationModalEdit(button) {
    
    const hiddenTable = document.getElementById("hiddenTable-7");
    hiddenTable.style.display = "block";
    // Lưu trạng thái nút Remove hiện tại để xác định hàng cần xóa
    selectedButton = button;
    idt = button.parentNode.parentNode.getAttribute('idt');
    date = button.parentNode.parentNode.cells[0].innerText; // Lấy giá trị từ cột thứ 2
       timeRange = button.parentNode.parentNode.cells[1].innerText;
       publishDate = button.parentNode.parentNode.cells[5].innerText; // Lấy giá trị từ cột thứ 2
       slot = button.parentNode.parentNode.cells[6].innerText;
    console.log(idt);
    console.log(date);
    console.log(timeRange);
    console.log(publishDate);

    const formattedDate = formatDate(date);
    const formattedPublishDate = formatPublishDate(publishDate);

    // Extract the start and end times
    const [startTime, endTime] = extractTimes(timeRange);

    // Pass the values to the HTML code
    const dateInput = document.getElementById("date-time");
    dateInput.value = formattedDate;

    const startTimeInput = document.getElementById("start-time-input-2");
    startTimeInput.value = startTime;

    const endTimeInput = document.getElementById("end-time-input-2");
    endTimeInput.value = endTime;

    const publishDateInput = document.getElementById("publish-date-input-2");
    publishDateInput.value = formattedPublishDate;


    //function convert time--------------------------------------------------------------------------------------------------------------------------------------------------------
    function formatDate(dateString) {
        const parts = dateString.split("/");
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        return formattedDate;
      }
      
      // Function to extract the start and end times
      function extractTimes(timeRangeString) {
        const times = timeRangeString.split(" - ");
        return times;
      }
     
      function formatPublishDate(dateString) {
        const parts = dateString.split("/");
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        return formattedDate;
      }  
      
}
async function confirmEdit(confirmation, dateValue, startTimeValue, endTimeValue, publishDate) {
    console.log(idt);
    const erormes = document.getElementById("error-messageEdit");
    const erormes2 = document.getElementById("error-messageEdit2");
    var modal = document.getElementById("hiddenTable-7");
    if (confirmation) {
        const data = {
            body: {
                'idt': idt,
                date: dateValue,
                start: startTimeValue,
                end: endTimeValue,
                publishDate: publishDate
            }
        }
        const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/time/update", "PATCH", data);
        console.log(res);
        if (res.isSuccess == true) {
            erormes.style.display = "flex";
        erormes.innerHTML = res.message;
             console.log(res.message);
             document.getElementById('messageRemove').innerText = res.message;
         }else{
            erormes.style.display = "flex";
        erormes.innerHTML = res.message;
        console.log(res.message);
         }
    }
}
async function editRows() {
    // Lấy giá trị từ các trường input/select trong hiddenTable-6
    const dateInput = document.querySelector("#hiddenTable-7 input[type='date']");
    const startTimeInput = document.querySelector("#hiddenTable-7 input[type='time']");
    const endTimeInput = document.querySelectorAll("#hiddenTable-7 input[type='time']")[1]; // Lấy thứ hai input[type='time']
    const publishDateInput = document.querySelectorAll("#hiddenTable-7 input[type='date']")[1]; // Lấy trường "Publish Date"
    // const slotInput = document.querySelectorAll("#hiddenTable-6");
    const errorMessage = document.querySelector("#error-message");
    const errorMessagetest = document.getElementById('error-message');
    // Kiểm tra xem tất cả các trường đã được điền đầy đủ
    if (!dateInput.value || !startTimeInput.value || !endTimeInput.value || !publishDateInput.value) {
        errorMessage.style.display = "flex"; // Hiển thị thông báo
        return; // Dừng việc thêm dòng mới nếu có trường không hợp lệ.
    } else {
        errorMessage.style.display = "none"; // Ẩn thông báo nếu tất cả trường hợp lệ.
    }

    const dateValue = dateInput.value;
    const startTimeValue = startTimeInput.value;
    const endTimeValue = endTimeInput.value;
    const publisDate = publishDateInput.value;

    const data = {
        body: {
            'idt': idt,
            date: dateValue,
            start: startTimeValue,
            end: endTimeValue,
            publishDate: publisDate
        },
    };
    console.log(data);
    var modal = document.getElementById("confirmationModal-2");
    modal.style.display = "block";
    var confirmButton = document.getElementById("Yes-confirm"); // assuming the confirm button has an element ID of "confirmButton"
    var cancelButton = document.getElementById("No-confirm");

    confirmButton.addEventListener("click", function() {
        confirmEdit(true, dateValue, startTimeValue, endTimeValue, publisDate);
        modal.style.display = "none";
      });
      
    cancelButton.addEventListener("click", function() {
        modal.style.display = "none";
      });      
}
function showConfirmationModal(button) {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "block";

    // Lưu trạng thái nút Remove hiện tại để xác định hàng cần xóa
    selectedButton = button;

    idt = button.parentNode.parentNode.getAttribute('idt');
    console.log(idt);
}
async function confirmRemove(confirmation) {
    console.log(idt);
    var modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
    if (confirmation) {
        // Perform delete action here
        var row = selectedButton.parentNode.parentNode;
        row.remove();
        const data = {
            body: {
                'idt': idt
            }
        }

        const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/time/delete", "DELETE", data);
        if (res.isSuccess == true) {
            console.log(res.message);

            var messageElement = document.getElementById('messageRemove');
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

async function addRowToTable2() {
    // Lấy giá trị từ các trường input/select trong hiddenTable-6
    const dateInput = document.querySelector(
        "#hiddenTable-6 input[type='date']"
    );
    const startTimeInput = document.querySelector(
        "#hiddenTable-6 input[type='time']"
    );
    const endTimeInput = document.querySelectorAll(
        "#hiddenTable-6 input[type='time']"
    )[1]; // Lấy thứ hai input[type='time']
    const publishDateInput = document.querySelectorAll(
        "#hiddenTable-6 input[type='date']"
    )[1]; // Lấy trường "Publish Date"
    // const slotInput = document.querySelectorAll("#hiddenTable-6");
    const errorMessage = document.querySelector('#error-message');
    const errorMessagetest = document.getElementById('error-message');
    // Kiểm tra xem tất cả các trường đã được điền đầy đủ
    if (
        !dateInput.value ||
        !startTimeInput.value ||
        !endTimeInput.value ||
        !publishDateInput.value
    ) {
        errorMessage.style.display = 'flex'; // Hiển thị thông báo
        return; // Dừng việc thêm dòng mới nếu có trường không hợp lệ.
    } else {
        errorMessage.style.display = 'none'; // Ẩn thông báo nếu tất cả trường hợp lệ.
    }

    const dateValue = dateInput.value;
    const startTimeValue = startTimeInput.value;
    const endTimeValue = endTimeInput.value;

    const publisdate = publishDateInput.value;
    const data = {
        body: {
            date: dateValue,
            start: startTimeValue,
            end: endTimeValue,
            publishDate: publisdate,
        },
    };
    const res = await fetchAPIData('https://swp-esms-api.azurewebsites.net/api/exams/time/add', 'POST', data);
    console.log(res);

    if (res.isSuccess == true) {
        console.log(res.message);
        errorMessagetest.style.display = 'flex';
        errorMessagetest.innerHTML = res.message;
        renderExamTime();
    } else {
        console.log(res.message);
        errorMessagetest.style.display = 'flex';
        errorMessagetest.innerHTML = res.message;
    }
}

let editedRow = null; // Biến để theo dõi dòng đang được chỉnh sửa
let initialDateValue = ''; // Biến để lưu trữ giá trị ban đầu của trường Date
let initialStartTimeValue = ''; // Biến để lưu trữ giá trị ban đầu của trường Start Time
let initialEndTimeValue = ''; // Biến để lưu trữ giá trị ban đầu của trường End Time
let initialPublishDateValue = ''; // Biến để lưu trữ giá trị ban đầu của trường Publish Date


async function editRowInTableContainer() {

    // Lấy thông tin từ hiddenTable-7
    const dateInput = document.querySelector(
        "#hiddenTable-7 input[type='date']"
    );
    const startTimeInput = document.querySelector(
        '#hiddenTable-7 #start-time-input-2'
    );
    const endTimeInput = document.querySelector(
        '#hiddenTable-7 #end-time-input-2'
    );
    const publishDateInput = document.querySelector(
        '#hiddenTable-7 #publish-date-input'
    ); // Lấy thông tin từ "Publish Date"
    // const errorMessage = document.querySelector("#error-message-2");

    // Lấy giá trị mới từ trường nhập liệu
    const dateValue = dateInput.value;
    const startTimeValue = startTimeInput.value;
    const endTimeValue = endTimeInput.value;
    const publishDateValue = publishDateInput.value; // Lấy giá trị "Publish Date" và định dạng lại

    const publisdate = publishDateInput.value;
    const data = {
        body: {
            date: dateValue,
            start: startTimeValue,
            end: endTimeValue,
            publishDate: publisdate,
        },
    };
    const res = await fetchAPIData(
        'https://swp-esms-api.azurewebsites.net/api/exams/update-time',
        'POST',
        data
    );
    console.log(res);

    if (res.isSuccess == true) {
        console.log(res.message);
        location.reload();
    } else {
        console.log(res.message);
        errorMessagetest.style.display = 'block';
        errorMessagetest.innerHTML = res.message;
    }

    const hiddenTable = document.getElementById('hiddenTable-7');
    hiddenTable.style.display = 'none';
}

const confirmCancel = document.querySelector(
    '#confirmationModal-2 .modal-button.no'
);
confirmCancel.onclick = function () {
    confirmationModal.style.display = 'none';
};

// Hàm này đóng Confirmation Modal
function closeConfirmationModal() {
    const confirmationModal = document.getElementById('confirmationModal-2');
    confirmationModal.style.display = 'none';
}







async function renderExamTime() {
    const list = document.getElementById('table_body');
const listItem = [];
// call fetch function from utils.js file
const response = await fetchAPIData(
    'https://swp-esms-api.azurewebsites.net/api/exams/current',
    'GET'
);
const data = response.data;

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
                <td><button class="button-supervisor" onclick="showSupervisor(this)">${examTime.totalSupervisor}/${examTime.requireSupervisor}</button></td>
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
async function renderExamSchedule(idt) {
    const response = await fetchAPIData(
        'https://swp-esms-api.azurewebsites.net/api/exams/current',
        'GET'
    );
    const data = response.data;
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
          `;
                list01.appendChild(tablerow);
            });
        });
    });
}

// document.getElementById('exportToExcel').addEventListener('click', function () {
//     const table = document.getElementById('Exam_schedule_table'); // Replace 'yourTableId' with the actual table ID
//     const rows = table.querySelectorAll('tr');

//     // Create a new Excel workbook
//     const workbook = new ExcelJS.Workbook();

//     // Add a worksheet to the workbook
//     const sheet = workbook.addWorksheet('Exam Time');

//     // Define and apply styles to the headers (entire row)
//     sheet.getRow(1).font = { bold: true };
//     sheet.getRow(1).alignment = { horizontal: 'center' };

//     // Populate the sheet with table headers
//     const headerCells = rows[0].querySelectorAll('th');
//     headerCells.forEach((cell, index) => {
//         sheet.getCell(1, index + 1).value = cell.textContent;
//         sheet.getCell(1, index + 1).fill = {
//             type: 'pattern',
//             pattern: 'solid',
//             fgColor: { argb: '00FF00' }, // Green color
//         };
//         sheet.getCell(1, index + 1).alignment = { horizontal: 'center' };
//     });

//     // Populate the sheet with table data
//     for (let i = 1; i < rows.length; i++) {
//         const dataRow = rows[i].querySelectorAll('td');
//         dataRow.forEach((cell, index) => {
//             const excelCell = sheet.getCell(i + 1, index + 1);
//             excelCell.value = cell.textContent;

//             // Apply styles to the data rows (white and grey stripes)
//             excelCell.fill = {
//                 type: 'pattern',
//                 pattern: 'solid',
//                 fgColor: { argb: (i % 2 === 0) ? 'FFFFFF' : 'DDDDDD' }, // Alternate between white and grey
//             };

//             // Center-align the cell content
//             excelCell.alignment = { horizontal: 'center' };
//         });
//     }

//     // Generate the Excel file
//     workbook.xlsx.writeBuffer().then(function (data) {
//         const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//         saveAs(blob, 'table_data.xlsx'); // Use the saveAs function to download the file
//     });
// });


const notificationContainer = document.getElementById("notificationContainerSup");

async function exportExcel(button){
    const row = button.parentNode.parentNode;
    idt = button.parentNode.parentNode.getAttribute('idt');
    const token = localStorage.getItem('token');
    const date = row.cells[1].textContent;
    const time = row.cells[2].textContent;
    console.log(date,time);
    console.log(idt);
    try {
        const response = await fetch(`https://swp-esms-api.azurewebsites.net/api/exams/time/export-excel?idt=${idt}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Add your authorization token if required
            },
        });

        if (!response.ok) {
           
const errorResponse = await response.json();
            const notification = document.createElement("div");
            notification.className = "notificationERR";
            notification.innerText = errorResponse.message;
            notificationContainer.appendChild(notification);
    
            // Tự động ẩn thông báo sau một khoảng thời gian (ví dụ: 3 giây)
            setTimeout(function () {
                notification.style.display = "none"; // Ẩn thông báo
                notification.remove();
            }, 3000);

            
            console.error('API Error:', errorResponse.message);
            return;
        }

        // The response is a File, Blob, or other binary data
        const fileBlob = await response.blob();

        // Create a link element and initiate the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(fileBlob);
        link.download = `${date} (${time}).xlsx`; // Specify the desired filename
        document.body.appendChild(link);
        link.click();

        // Clean up the link element
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    } catch (error) {
        const notification = document.createElement("div");
        notification.className = "notificationERR";
        notification.innerText = error.message;
        console.log(notification);
        notificationContainer.appendChild(notification);
        console.error('Fetch Error:', error);

    }

};
function clearSearchFields() {
    // Get references to the input elements
    const dateInput = document.querySelector(".search-group label[for='date'] + input[type='date']");
    const startTimeInput = document.getElementById("start-time-input");
    const endTimeInput = document.getElementById("end-time-input");
    const publishDateInput = document.querySelector(".search-group label[for='date'] + input[type='date']:nth-of-type(2)");

    // Clear the values
    if (dateInput) {
        dateInput.value = "";
    }
    if (startTimeInput) {
        startTimeInput.value = "";
    }
    if (endTimeInput) {
        endTimeInput.value = "";
    }
    if (publishDateInput) {
        publishDateInput.value = "";
    }
}