

// ===================================== REGISTER TABLES =================================================
const listSupervisor = document.getElementById('table_body_lecturer');
const listItemSupervisor = [];

async function fetchDataFromAPI() {
    try {
        const response = await fetchAPIData(
            'https://swp-esms-api.azurewebsites.net/api/lecturer/exams/available',
            'GET'
        );
        const data = response.data;
        renderExamSlotSupervisor(data);
    } catch (error) {
        console.error('Error fetching data from API:', error);
    }
}

// Gọi hàm fetchDataFromAPI để fetch dữ liệu từ API và render lên trang web
fetchDataFromAPI();

function renderExamSlotSupervisor(data) {
    listSupervisor.innerHTML = '';

    if (data.length === 0) {
        const noScheduleRow = document.createElement('tr');
        noScheduleRow.innerHTML = '<td colspan="4" class="no-schedule">No exam slot to register</td>';
        listSupervisor.appendChild(noScheduleRow);
    } else {
        data.forEach((examSlotAvailable) => {
            const tablerow = document.createElement('tr');
            tablerow.setAttribute('idt', examSlotAvailable.idt);
            listItemSupervisor.push(tablerow);
            tablerow.innerHTML = `
         
                <td>${examSlotAvailable.date}</td>
                <td>${examSlotAvailable.start} - ${examSlotAvailable.end}</td>
                <td><button class="buttn" onclick="showConfirmationModalRegister(this)">Register</button></td>

            `;
            listSupervisor.appendChild(tablerow);
        });
    }
}
// ================================================================================================================



// ===================================== REGISTERED TABLES =================================================
const listSupervisorRegistered = document.getElementById('registered-list');
const listItemSupervisorRegistered = [];
async function fetchDataFromAPIRegistered() {
    try {
        const response = await fetchAPIData(
            'https://swp-esms-api.azurewebsites.net/api/lecturer/exams/registered',
            'GET'
        );
        const data = response.data;
        renderExamSlotSupervisorRegistered(data);
    } catch (error) {
        console.error('Error fetching data from API:', error);
    }
}

// Gọi hàm fetchDataFromAPI để fetch dữ liệu từ API và render lên trang web
fetchDataFromAPIRegistered();

function renderExamSlotSupervisorRegistered(data) {
    listSupervisorRegistered.innerHTML = '';

    if (data.length === 0) {
        const noScheduleRow = document.createElement('tr');
        noScheduleRow.innerHTML = '<td colspan="4" class="no-schedule">No exam slot to registered</td>';
        listSupervisorRegistered.appendChild(noScheduleRow);
    } else {
        data.forEach((examSlotAvailable) => {
            const tablerow = document.createElement('tr');
            tablerow.setAttribute('idt', examSlotAvailable.idt);
            listItemSupervisorRegistered.push(tablerow);
            tablerow.innerHTML = `
                <td>${examSlotAvailable.date}</td>
                <td>${examSlotAvailable.start} - ${examSlotAvailable.end}</td>
                <td></td>
                <td><button class="buttn-registered">Registered</button></td>

            `;
            listSupervisorRegistered.appendChild(tablerow);
        });
    }
}
// =====================================================================================================================