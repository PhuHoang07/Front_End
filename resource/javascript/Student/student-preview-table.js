const list = document.getElementById("table_body");
  const search = document.getElementById("search");
  const listItem = [];
  search.addEventListener('input', (e) => filterInput(e.target.value)); 
  
  async function fetchDataFromApi(){
    try{
      const response = await fetchAPIData(
        'https://swp-esms-api.azurewebsites.net/api/student/exams/schedule/preview',
        'GET'
      );
    const data = response.data;
    renderAccountList(data);
    }catch(error){
      console.error(error);
    }
    
  }
  fetchDataFromApi();
  


//------------------------------------------------fectch data into table own exam schedule------------------------------------------------------------------ 
async function renderAccountList(data) {

  

    list.innerHTML = '';
    if(data.length == 0){
      const noAccount = document.createElement('tr');
      noAccount.innerHTML =
      '<td colspan="8" class="no-schedule">No exam schedule</td>';
    list.appendChild(noAccount);
    }else{

      let numgrade = 1;
    data.forEach((schedule) =>{

      
      
      const tablerow = document.createElement('tr');  
      listItem.push(tablerow);
            tablerow.innerHTML = `
            <td>${numgrade++}</td>
            <td>${schedule.subjectId}</td>
            <td>${schedule.date}</td>
            <td>${schedule.type} </td>
            <td>${schedule.form}</td>
            <td>${schedule.time}</td>
            <td>${schedule.publishDate}</td>
            `;
            list.appendChild(tablerow);
    });}

}


 
//----------------------------------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------search data from table--------------------------------------------------------------- 
function filterInput(keySearch) {
  const searchTerm = keySearch.toLowerCase();
  let foundMatch = false; // Variable to track if any matches were found

  const existingMessage = document.getElementById('noResultMessage'); // chỉ show 1 dòng warning thôi
  if (existingMessage) {
    existingMessage.parentNode.removeChild(existingMessage);
  }

  listItem.forEach(item => {
    if (item.innerText.toLowerCase().includes(searchTerm)) {
      item.classList.remove('hidden');
      foundMatch = true; // At least one match found
    } else {
      item.classList.add('hidden');
    }
  });

  if (!foundMatch) {
    // No matches found, show status message
    const trows = document.createElement('tr');
    trows.id = 'noResultMessage';
    trows.innerHTML = '<td colspan="5">No Result At Here</td>';
    list.appendChild(trows);
  }
}
//------------------------------------------------fectch data into table Preview exam schedule------------------------------------------------------------------ 