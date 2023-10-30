
function showTable() {
    const hiddenTable = document.getElementById("hiddenTable");
    if (hiddenTable.style.display === "none") {
        hiddenTable.style.display = "block";

    } else {
        hiddenTable.style.display = "none";
    }
}

function showTable2() {
    const hiddenTable = document.getElementById("hiddenTable-2");
    if (hiddenTable.style.display === "none") {
        hiddenTable.style.display = "block";
        
    } else {
        hiddenTable.style.display = "none";
    }
}

function showTable3() {
    const hiddenTable = document.getElementById("hiddenTable-3");
    if (hiddenTable.style.display === "none") {
        hiddenTable.style.display = "block";
    } else {
        hiddenTable.style.display = "none";
    }
}

function showTable4() {
    const hiddenTable = document.getElementById("hiddenTable-6");
    if (hiddenTable.style.display === "none") {
        hiddenTable.style.display = "block";
    } else {
        hiddenTable.style.display = "none";
    }
}

function showTable5() {
    const hiddenTable = document.getElementById("hiddenTable-7");
    if (hiddenTable.style.display === "none") {
        hiddenTable.style.display = "block";
    } else {
        hiddenTable.style.display = "none";
    }
}

function showModalAddExamSchedule() {
    const hiddenTable = document.getElementById("hiddenTable-addExamSchedule");
    if (hiddenTable.style.display === "none") {
        hiddenTable.style.display = "block";
    } else {
        hiddenTable.style.display = "none";
    }
}

function closeTable() {
    const hiddenTable = document.getElementById("hiddenTable");
    const hiddenTable4 = document.getElementById("hiddenTable-4");

    hiddenTable.style.display = "none";
    hiddenTable4.style.display = "none";
}

function closeTable2() {
    const hiddenTable2 = document.getElementById("hiddenTable-2");
    const hiddenTable5 = document.getElementById("hiddenTable-5");

    hiddenTable2.style.display = "none";
    hiddenTable5.style.display = "none";
}

function closeTable3() {
    const hiddenTable = document.getElementById("hiddenTable-3");
    hiddenTable.style.display = "none";
}

function closeTable4() {
    const hiddenTable = document.getElementById("hiddenTable-6");
    hiddenTable.style.display = "none";
}

function closeTable5() {
    const hiddenTable = document.getElementById("hiddenTable-7");
    hiddenTable.style.display = "none";
}

function closeModalAddExamSchedule() {
    const hiddenTable = document.getElementById("hiddenTable-addExamSchedule");
    hiddenTable.style.display = "none";
}

function addNewTable() {
    const hiddenTable = document.getElementById("hiddenTable");
    const hiddenTable4 = document.getElementById("hiddenTable-4");

    if (hiddenTable.style.display === "block") {
        hiddenTable4.style.display = "block";
        hiddenTable4.style.position = "absolute";
        hiddenTable4.style.top = getComputedStyle(hiddenTable).top;
        hiddenTable4.style.left = (parseInt(getComputedStyle(hiddenTable).left) + 250) + "px";
    }
}

// function openTableAddExamSchedule() {
//     const hiddenTable2 = document.getElementById("hiddenTable-2");
//     const hiddenTable5 = document.getElementById("hiddenTable-5");

//     if (hiddenTable2.style.display === "block") {
//         hiddenTable5.style.display = "block";
//         hiddenTable5.style.position = "absolute";
//         hiddenTable5.style.top = getComputedStyle(hiddenTable2).top;
//         hiddenTable5.style.left = (parseInt(getComputedStyle(hiddenTable2).left) + 250) + "px";
//     }
// }

function addAndRemoveRows() {
    const numToAdd = parseInt(document.getElementById("searchInput").value, 10);
    const hiddenTable4 = document.getElementById("hiddenTable-4");
    const hiddenTable = document.getElementById("hiddenTable");
    const hiddenTableBody = hiddenTable.querySelector("tbody");

    // Lấy tất cả các dòng trong hiddenTable-4
    const rows4 = hiddenTable4.querySelectorAll("tbody tr");

    // Tính số thứ tự tiếp theo trong hiddenTable
    const currentRowCount = hiddenTableBody.children.length;
    let nextRowNumber = currentRowCount + 1;

    for (let i = 0; i < numToAdd && i < rows4.length; i++) {
        const row4 = rows4[i];
        const cells4 = row4.querySelectorAll("td");

        // Tạo một dòng mới trong hiddenTable
        const newRow = document.createElement("tr");

        // Thêm số thứ tự vào dòng mới
        const cellNo = document.createElement("td");
        cellNo.textContent = nextRowNumber;
        newRow.appendChild(cellNo);

        // Sao chép các cột (ngoại trừ cột "No") từ hiddenTable-4
        for (let j = 1; j < 3; j++) {
            const cell = document.createElement("td");
            cell.textContent = cells4[j].textContent;
            newRow.appendChild(cell);
        }

        // Tạo một nút "Remove" và thêm nó vào dòng mới
        const removeButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.textContent = "Remove";
        removeButton.onclick = function () {
            showConfirmationModal(this); // Gọi hàm `showConfirmationModal` với nút "Remove" đã được ấn
        };
        const removeCell = document.createElement("td");
        removeCell.appendChild(removeButton);
        newRow.appendChild(removeCell);

        hiddenTableBody.appendChild(newRow);

        // Tăng số thứ tự cho dòng tiếp theo
        nextRowNumber++;

        // Loại bỏ dòng đã thêm vào hiddenTable-4
        row4.remove();
    }


    //   let count = 0;
    //   for (let i = 0; i < rows4.length; i++) {
    //     const row4 = rows4[i];
    //     const cells4 = row4.querySelectorAll("td");
    //     count == 1;
    //     cells4[0].textContent = count++; // Đặt số thứ tự thành 1
    //   }

    let count = 1; // Bắt đầu từ số 1
    for (let i = 0; i < rows4.length; i++) {
        const row4 = rows4[i];
        const cells4 = row4.querySelectorAll("td");
        cells4[0].textContent = count;
        count++; // Tăng giá trị của count sau mỗi lần sử dụng
    }
}

// function addExamSchedule() {
//     const numToAdd = parseInt(document.getElementById("searchInput2").value, 10);
//     const hiddenTable4 = document.getElementById("hiddenTable-5");
//     const hiddenTable = document.getElementById("hiddenTable-2");
//     const hiddenTableBody = hiddenTable.querySelector("tbody");

//     // Lấy tất cả các dòng trong hiddenTable-4
//     const rows4 = hiddenTable4.querySelectorAll("tbody tr");

//     // Tính số thứ tự tiếp theo trong hiddenTable
//     const currentRowCount = hiddenTableBody.children.length;
//     let nextRowNumber = currentRowCount + 1;

//     for (let i = 0; i < numToAdd && i < rows4.length; i++) {
//         const row4 = rows4[i];
//         const cells4 = row4.querySelectorAll("td");

//         // Tạo một dòng mới trong hiddenTable
//         const newRow = document.createElement("tr");

//         // Thêm số thứ tự vào dòng mới
//         const cellNo = document.createElement("td");
//         cellNo.textContent = nextRowNumber;
//         newRow.appendChild(cellNo);


//         for (let j = 1; j < 4; j++) {
//             const cell = document.createElement("td");
//             cell.textContent = cells4[j].textContent;
//             newRow.appendChild(cell);
//         }

//         const listStudent = document.createElement("button");
//         listStudent.className = "button-supervisor";
//         listStudent.onclick = function () {
//             showTable3(); // Đặt hàm xử lý sự kiện cho nút listStudent ở đây
//         };

//         const listCell = document.createElement("td");
//         listCell.appendChild(listStudent);
//         newRow.appendChild(listCell);

//         // Sau khi đã thêm button vào dòng, bạn có thể cập nhật số dòng ở đây
//         const hiddenTable3 = document.getElementById("hiddenTable-3");
//         if (hiddenTable3) {
//             // Truy cập tbody của bảng hiddenTable-3
//             const tbody = hiddenTable3.querySelector("tbody");
//             if (tbody) {
//                 // Đếm số lượng dòng trong tbody
//                 const rowCount = tbody.rows.length;
//                 listStudent.textContent = `${rowCount}/35`;
//             }
//         }


//         const editButton = document.createElement("button");
//         editButton.className = "edit-button";
//         editButton.textContent = "Edit";
//         editButton.onclick = function () {
//             showEditModal(this); // Đặt hàm xử lý sự kiện cho nút Edit ở đây
//         };
//         const editCell = document.createElement("td");
//         editCell.appendChild(editButton);
//         newRow.appendChild(editCell);

//         // Tạo một nút "Remove" và thêm nó vào dòng mới
//         const removeButton = document.createElement("button");
//         removeButton.className = "remove-button";
//         removeButton.textContent = "Remove";
//         removeButton.onclick = function () {
//             showConfirmationModal(this); // Gọi hàm `showConfirmationModal` với nút "Remove" đã được ấn
//         };
//         const removeCell = document.createElement("td");
//         removeCell.appendChild(removeButton);
//         newRow.appendChild(removeCell);

//         hiddenTableBody.appendChild(newRow);

//         // Tăng số thứ tự cho dòng tiếp theo
//         nextRowNumber++;

//         // Loại bỏ dòng đã thêm vào hiddenTable-4
//         row4.remove();
//     }
// }

let idt;
function showConfirmationModal(button) {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "block";

    // Lưu trạng thái nút Remove hiện tại để xác định hàng cần xóa
    selectedButton = button;

    idt = button.parentNode.parentNode.getAttribute('idt')
}

async function confirmRemove(confirmation) {
    console.log(idt);
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
    if (confirmation) {
        // Perform delete action here
        var row = selectedButton.parentNode.parentNode;
        row.remove();
        const data = {
            body: {
                'idt': idt,
            }
        }
        const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/exams/delete-time", "POST", data);
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
    const dateInput = document.querySelector("#hiddenTable-6 input[type='date']");
    const startTimeInput = document.querySelector("#hiddenTable-6 input[type='time']");
    const endTimeInput = document.querySelectorAll("#hiddenTable-6 input[type='time']")[1]; // Lấy thứ hai input[type='time']
    const publishDateInput = document.querySelectorAll("#hiddenTable-6 input[type='date']")[1]; // Lấy trường "Publish Date"
    // const slotInput = document.querySelectorAll("#hiddenTable-6");
    const errorMessage = document.querySelector("#error-message");
    const errorMessagetest = document.getElementById('error-message');
    // Kiểm tra xem tất cả các trường đã được điền đầy đủ
    if (!dateInput.value || !startTimeInput.value || !endTimeInput.value || !publishDateInput.value) {
        errorMessage.style.display = "block"; // Hiển thị thông báo
        return; // Dừng việc thêm dòng mới nếu có trường không hợp lệ.
    } else {
        errorMessage.style.display = "none"; // Ẩn thông báo nếu tất cả trường hợp lệ.
    }

    const dateValue = dateInput.value;
    const startTimeValue = startTimeInput.value;
    const endTimeValue = endTimeInput.value;
    const publishDateValue = publishDateInput.value;



    // Tạo một dòng mới trong table-container
    const tableContainer = document.querySelector(".table-container table tbody");
    const newRow = tableContainer.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);
    const cell8 = newRow.insertCell(7);

    // Định dạng giờ để hiển thị "giờ:phút - giờ:phút"
    const formattedStartTime = startTimeValue;
    const formattedEndTime = endTimeValue;

    // Thêm giá trị từ hiddenTable-6 vào dòng mới
    cell1.innerHTML = dateValue;
    cell2.innerHTML = `${formattedStartTime} - ${formattedEndTime}`;
    cell3.innerHTML = '<button class="button-supervisor" onclick="showTable()">20/35</button>';
    cell4.innerHTML = `<button class="edit-button" onclick="editRow(this)">Edit</button>`;
    cell5.innerHTML = `<button class="remove-button" onclick="removeRow(this)">Remove</button>`;
    cell6.innerHTML = `${publishDateValue}`;
    cell7.injnerHTML = `<td>1</td>`
    cell8.innerHTML = `<td><i onclick="showTable2()" class="fa-solid fa-square-caret-down"></i></td>`;


    // Đặt giá trị của các trường trong hiddenTable-6 về giá trị mặc định
    dateInput.value = "";
    startTimeInput.value = "";
    endTimeInput.value = "";
    publishDateInput.value = "";

    // Đóng hiddenTable-6
    closeTable4();


}

function selectRowToEdit(row) {
    editedRow = row; // Lưu dòng cần chỉnh sửa
    // Hiển thị thông tin dòng trong hiddenTable-7 để chỉnh sửa
}

let editedRow = null; // Biến để theo dõi dòng đang được chỉnh sửa
let initialDateValue = ""; // Biến để lưu trữ giá trị ban đầu của trường Date
let initialStartTimeValue = ""; // Biến để lưu trữ giá trị ban đầu của trường Start Time
let initialEndTimeValue = ""; // Biến để lưu trữ giá trị ban đầu của trường End Time
let initialPublishDateValue = ""; // Biến để lưu trữ giá trị ban đầu của trường Publish Date

function editRowInTableContainer() {
    if (editedRow === null) {
        alert("Chọn một dòng để chỉnh sửa trước.");
        return;
    }

    // Hiển thị Confirmation Modal
    const confirmationModal = document.getElementById("confirmationModal-2");
    confirmationModal.style.display = "block";

    // Bấm nút "Yes" trong Confirmation Modal sẽ tiếp tục quá trình chỉnh sửa
    const confirmRemove = document.querySelector("#confirmationModal-2 .modal-button.yes");
    confirmRemove.onclick = function () {
        // Tắt Confirmation Modal
        confirmationModal.style.display = "none";

        // Lấy thông tin từ hiddenTable-7
        const dateInput = document.querySelector("#hiddenTable-7 input[type='date']");
        const startTimeInput = document.querySelector("#hiddenTable-7 #start-time-input-2");
        const endTimeInput = document.querySelector("#hiddenTable-7 #end-time-input-2");
        const publishDateInput = document.querySelector("#hiddenTable-7 #publish-date-input"); // Lấy thông tin từ "Publish Date"
        // const errorMessage = document.querySelector("#error-message-2");

        // Lấy giá trị mới từ trường nhập liệu
        const dateValue = dateInput.value;
        const startTimeValue = startTimeInput.value;
        const endTimeValue = endTimeInput.value;
        const publishDateValue = publishDateInput.value; // Lấy giá trị "Publish Date" và định dạng lại

        // Kiểm tra xem giá trị đã thay đổi hay chưa
        let hasChanges = false;

        if (dateValue !== initialDateValue) {
            editedRow.cells[0].textContent = formatDateToDayMonthYear(dateValue);
            hasChanges = true;
        }

        if (startTimeValue !== initialStartTimeValue || endTimeValue !== initialEndTimeValue) {
            editedRow.cells[1].textContent = `${startTimeValue} - ${endTimeValue}`;
            hasChanges = true;
        }



        if (publishDateValue !== initialPublishDateValue) {
            editedRow.cells[5].textContent = formatDateToDayMonthYear(publishDateValue);
            hasChanges = true;
        }

        if (!hasChanges) {
            alert("Không có thay đổi nào để cập nhật.");
        }

        // Đóng hiddenTable-7 sau khi cập nhật
        const hiddenTable = document.getElementById("hiddenTable-7");
        hiddenTable.style.display = "none";
    };

    const confirmCancel = document.querySelector("#confirmationModal-2 .modal-button.no");
    confirmCancel.onclick = function () {
        confirmationModal.style.display = "none";
    };
}



// Hàm này đóng Confirmation Modal
function closeConfirmationModal() {
    const confirmationModal = document.getElementById("confirmationModal-2");
    confirmationModal.style.display = "none";
}










