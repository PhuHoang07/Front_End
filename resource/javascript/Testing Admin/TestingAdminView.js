const listItemview = [];
const listview = document.getElementById('Schedule_TableView');
renderExamTimeview();

//------------------------------------------------fectch data into table------------------------------------------------------------------
async function renderExamTimeview() {
    listview.innerHTML = '';
    const response = await fetchAPIData(
        'https://swp-esms-api.azurewebsites.net/api/exams/current',
        'GET'
    );
    const data = response.data;
console.log(response);
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