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
            <td><button class="remove-button" onclick="">Remove</button></td>
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
            <td><button class="remove-button" onclick="">Remove</button></td>
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
                <td><button class="remove-button" onclick="">Remove</button></td>
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
                <td><button class="remove-button" onclick="">Remove</button></td>
              `;
              tableBody.appendChild(tablerow);
    });
}

const getSelectedButton = document.getElementById("get-selected");
// Add a click event listener to the "Get Selected" button
async function getSelectedData() {
    const textarea = document.getElementById("inputStu");
    const inputtedText = textarea.value;    
    const usernameArray = inputtedText.split("\n").filter(username => username.trim() !== '');
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
    
    
};
function AddStudent(){
    getSelectedData();
    reFetch();
}

function addSuper(){
    getSelectedDataSup();
    reFetchSup();
}
async function getSelectedDataSup() {
    const textarea = document.getElementById("inputSuper");
    const inputtedText = textarea.value;    
    const usernameArray = inputtedText.split("\n").filter(username => username.trim() !== '');
    console.log("Inputted Text:", usernameArray);
    const data = {
       body: {
            'idt': idt,
            "proctorList": usernameArray
    }
}
    const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/time/proctors/add","POST",data);
    console.log(res);
    
    
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
    location.reload();
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








