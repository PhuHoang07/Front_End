
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

function showConfirmationModal(button) {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "block";

    // Lưu trạng thái nút Remove hiện tại để xác định hàng cần xóa
    selectedButton = button;
}

function confirmRemove(confirmation) {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";

    if (confirmation) {
        // Thực hiện hành động xóa ở đây
        var row = selectedButton.parentNode.parentNode;
        row.remove();
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

function addNewTable2() {
    const hiddenTable2 = document.getElementById("hiddenTable-2");
    const hiddenTable5 = document.getElementById("hiddenTable-5");

    if (hiddenTable2.style.display === "block") {
        hiddenTable5.style.display = "block";
        hiddenTable5.style.position = "absolute";
        hiddenTable5.style.top = getComputedStyle(hiddenTable2).top;
        hiddenTable5.style.left = (parseInt(getComputedStyle(hiddenTable2).left) + 250) + "px";
    }
}

function addAndRemoveRows() {
    const numToAdd = parseInt(document.getElementById("searchInput").value, 10);
    const hiddenTable4 = document.getElementById("hiddenTable-4");
    const hiddenTable = document.getElementById("hiddenTable");

    // Lấy tất cả các dòng trong hiddenTable-4
    const rows = hiddenTable4.querySelectorAll("tbody tr");

    for (let i = 0; i < numToAdd && i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll("td");

        // Tạo một dòng mới trong hiddenTable
        const newRow = document.createElement("tr");

        // Chỉ thêm cột "No" và "Member Code" vào dòng mới
        for (let j = 0; j < 2; j++) {
            const cell = document.createElement("td");
            cell.textContent = cells[j].textContent;
            newRow.appendChild(cell);
        }
        const emptyCell = document.createElement("td");
        newRow.appendChild(emptyCell);

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

        hiddenTable.querySelector("tbody").appendChild(newRow);
    }

    for (let i = 0; i < numToAdd && i < rows.length; i++) {
        rows[i].remove();
    }
}

function addAndRemoveRows2() {
    const numToAdd = parseInt(document.getElementById("searchInput2").value, 10);
    const hiddenTable4 = document.getElementById("hiddenTable-5");
    const hiddenTable = document.getElementById("hiddenTable-2");

    // Lấy tất cả các dòng trong hiddenTable-4
    const rows = hiddenTable4.querySelectorAll("tbody tr");

    for (let i = 0; i < numToAdd && i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll("td");

        // Tạo một dòng mới trong hiddenTable
        const newRow = document.createElement("tr");

        // Chỉ thêm cột "No" và "Member Code" vào dòng mới
        for (let j = 0; j < 2; j++) {
            const cell = document.createElement("td");
            cell.textContent = cells[j].textContent;
            newRow.appendChild(cell);
        }
        const emptyCell = document.createElement("td");
        newRow.appendChild(emptyCell);
        const emptyCell2 = document.createElement("td");
        newRow.appendChild(emptyCell2);
        const emptyCell3 = document.createElement("td");
        newRow.appendChild(emptyCell3);

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.textContent = "Edit";
        editButton.onclick = function () {
            showEditModal(this); // Đặt hàm xử lý sự kiện cho nút Edit ở đây
        };
        const editCell = document.createElement("td");
        editCell.appendChild(editButton);
        newRow.appendChild(editCell);

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

        hiddenTable.querySelector("tbody").appendChild(newRow);
    }

    for (let i = 0; i < numToAdd && i < rows.length; i++) {
        rows[i].remove();
    }
}



function showConfirmationModal(button) {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "block";

    // Lưu trạng thái nút Remove hiện tại để xác định hàng cần xóa
    selectedButton = button;
}

function confirmRemove(confirmation) {
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "none";

    if (confirmation) {
        // Thực hiện hành động xóa ở đây
        var row = selectedButton.parentNode.parentNode;
        row.remove();
    }
}

function addRowToTable2() {
    // Lấy giá trị từ các trường input/select trong hiddenTable-6
    const dateInput = document.querySelector("#hiddenTable-6 input[type='date']");
    const timeInput = document.querySelector("#hiddenTable-6 input[type='time']");
    const slotTypeSelect = document.querySelector("#hiddenTable-6 #slot-type");
    const errorMessage = document.querySelector("#error-message");

    // Kiểm tra xem tất cả các trường đã được điền đầy đủ
    if (!dateInput.value || !timeInput.value || slotTypeSelect.value === "0") {
        errorMessage.style.display = "block"; // Hiển thị thông báo
        return; // Dừng việc thêm dòng mới nếu có trường không hợp lệ.
    } else {
        errorMessage.style.display = "none"; // Ẩn thông báo nếu tất cả trường hợp lệ.
    }
    const dateValue = dateInput.value;
    const timeValue = timeInput.value;

    // Chuyển đổi giá trị "Slot Type" thành số phút
    const slotTypeValue = slotTypeSelect.value;
    const slotTypeMinutes = parseInt(slotTypeValue);

    // Chuyển đổi thời gian bắt đầu thành số phút
    const [hours, minutes] = timeValue.split(":").map(Number);
    const startTimeMinutes = hours * 60 + minutes;

    // Tính thời gian kết thúc
    const endTimeMinutes = startTimeMinutes + slotTypeMinutes;
    const newHours = Math.floor(endTimeMinutes / 60);
    const newMinutes = endTimeMinutes % 60;

    const formattedDate = new Date(dateValue);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const year = formattedDate.getFullYear();

    // Định dạng giờ và phút để hiển thị
    const formattedStartTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    const formattedEndTime = `${newHours}:${newMinutes < 10 ? '0' : ''}${newMinutes}`;

    // Tạo một dòng mới trong table-container
    const tableContainer = document.querySelector(".table-container table tbody");
    const newRow = tableContainer.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);


    // Thêm giá trị từ hiddenTable-6 vào dòng mới
    cell1.innerHTML = `${day}/${month}/${year}`;
    cell2.innerHTML = `${formattedStartTime} - ${formattedEndTime}`;
    cell3.innerHTML = '<button class="button-supervisor" onclick="showTable()">20/35</button>';
    cell4.innerHTML = `<button class="edit-button" onclick="editRow(this)">Edit</button>`;
    cell5.innerHTML = `<button class="remove-button" onclick="removeRow(this)">Remove</button>`;
    cell6.innerHTML = `<td><i onclick="showTable2()" class="fa-solid fa-square-caret-down"></i></td>`
        ;

    // Đặt giá trị của các trường trong hiddenTable-6 về giá trị mặc định
    dateInput.value = "";
    timeInput.value = "";
    slotTypeSelect.selectedIndex = 0;

    // Đóng hiddenTable-6
    closeTable4();
}

// Hàm để xóa dòng
function removeRow(button) {
    // Lưu trạng thái nút Remove hiện tại để xác định hàng cần xóa
    selectedButton = button;

    // Hiển thị modal xác nhận
    var modal = document.getElementById("confirmationModal");
    modal.style.display = "block";
}

// Hàm để chỉnh sửa dòng
function editRow(button) {
    // Viết mã để xử lý chỉnh sửa dòng ở đây
    // Điều này có thể là một hộp thoại hoặc hiển thị các trường chỉnh sửa tùy thuộc vào yêu cầu của bạn.
}

let editedRow = null; // Biến để lưu dòng cần chỉnh sửa

function selectRowToEdit(row) {
    editedRow = row; // Lưu dòng cần chỉnh sửa
    // Hiển thị thông tin dòng trong hiddenTable-7 để chỉnh sửa
}

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
        const timeInput = document.querySelector("#hiddenTable-7 input[type='time']");
        const slotTypeSelect = document.querySelector("#hiddenTable-7 #slot-type");

        const dateValue = dateInput.value;
        const timeValue = timeInput.value;
        const slotTypeValue = slotTypeSelect.value;

        const dateCell = editedRow.cells[0].textContent;
        const timeCell = editedRow.cells[1].textContent;

        // Kiểm tra xem các giá trị đã thay đổi hay chưa
        if (dateValue !== dateCell || timeValue !== timeCell) {
            // Nếu có thay đổi, cập nhật giá trị mới
            if (dateValue !== dateCell) {
                editedRow.cells[0].textContent = formatDateToDayMonthYear(dateValue);
            }

            const slotTypeMinutes = parseInt(slotTypeValue);
            const [hours, minutes] = timeValue.split(":").map(Number);
            const startTimeMinutes = hours * 60 + minutes;
            const endTimeMinutes = startTimeMinutes + slotTypeMinutes;
            const newHours = Math.floor(endTimeMinutes / 60);
            const newMinutes = endTimeMinutes % 60;
            const formattedStartTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
            const formattedEndTime = `${newHours}:${newMinutes < 10 ? '0' : ''}${newMinutes}`;
            editedRow.cells[1].textContent = `${formattedStartTime} - ${formattedEndTime}`;
        }

        // Đóng hiddenTable-7 sau khi cập nhật
        const hiddenTable = document.getElementById("hiddenTable-7");
        hiddenTable.style.display = "none";
    };

    // Bấm nút "No" trong Confirmation Modal sẽ đóng Confirmation Modal
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



function formatDateToDayMonthYear(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
}









