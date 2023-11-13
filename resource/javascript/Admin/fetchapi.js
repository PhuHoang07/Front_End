
  const list = document.getElementById("table_body");
  const search = document.getElementById("search");
  search.addEventListener('input', (e) => filterInput(e.target.value)); 
  const listItem = [];

async function fetchDataFromApi(){
    try{
      const response = await fetchAPIData(
        'https://swp-esms-api.azurewebsites.net/api/admin/users',
        'GET'
      );
    const data = response.data;
      
    renderAccountList(data);
    }catch(error){
      console.error(error);
    }
    
  }
  fetchDataFromApi();
  




async function renderAccountList(data) {
  list.innerHTML = ' ';

  if (data.length === 0) {
    const noAccount = document.createElement('tr');
    noAccount.innerHTML = '<td colspan="8" class="no-schedule">No exam schedule</td>';
    list.appendChild(noAccount);
  } else {
    let currentIndex = 1;

    data.forEach((account) => {
      const tablerow = document.createElement('tr');
      listItem.push(tablerow);

      tablerow.innerHTML = `
        <td>${currentIndex++}</td>
        <td>${account.userName}</td>
        <td>${account.name}</td>
        <td>
          <select class="role-select"  onchange="ChangeRole(this)">
            <option value="${account.role}" selected>${account.role}</option>
          </select>
        </td>
        <td>
          <button class="view-list-button" onclick="userInfo(this)">Details</button>
        </td>
      `;

      list.appendChild(tablerow);
      // xuất role theo đúng api yêu cầu.
      const select = tablerow.querySelector('.role-select');

      account.availableRoles.forEach((role) => {
        const options = document.createElement('option');
        options.value = role.id;
        options.text = role.name;
        select.appendChild(options);
      });
    });
  }
}  

      

  // async function renderAccountList(){

  //   const response = await fetchAPIData(
  //     'https://swp-esms-api.azurewebsites.net/api/admin/users',
  //     'GET'
  //   );
  // const data = response.data;
  // let currentIndex = 1;
  //     list.innerHTML = " ";
  //     Object.keys(data).forEach((account) => {
  //       const tablerow = document.createElement('tr');
  //             listItem.push(tablerow);
        
  //             tablerow.innerHTML = `
  //               <td>${currentIndex++}</td>
  //               <td>${account.userName}</td>
  //               <td>${account.name}</td>
  //               <td>
  //                 <select class="role-select"  onchange="ChangeRole(this)">
  //                   <option value="${account.role}" selected>${account.role}</option>
  //                 </select>
  //               </td>
  //               <td>
  //                 <button class="view-list-button" onclick="userInfo(this)">Details</button>
  //               </td>
  //             `;
        
  //             list.appendChild(tablerow);

  //             const select = tablerow.querySelector('.role-select');

  //                   data[account.availableRoles].forEach((role) => {
  //                     const options = document.createElement('option');
  //                     options.value = role.id;
  //                     options.text = role.name;
  //                     select.appendChild(options);
  //                   });
  //     });
  // }
  // renderAccountList();

// lấy for change role (update role)
function ChangeRole(selectElement) {
  const tdElement = selectElement.parentNode;
  const trElement = tdElement.parentNode;
  const userNameUpd = trElement.cells[1].innerText;
  const roleIdUpd = selectElement.value;

  const data ={
    body:{
      userName: userNameUpd,
      roleId: roleIdUpd
    }
  }
  console.log( userNameUpd);
  console.log( roleIdUpd);
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
 ConfirmationRole(true, userNameUpd, roleIdUpd);
  // Sử dụng thông tin đã lấy để thực hiện các thao tác cần thiết  
}

async function ConfirmationRole(confirmation,userNameUpd,roleIdUpd) {
  if(confirmation === true){

    var modal = document.getElementById("myModal");
    var result = document.getElementById("result");
    var yes = document.getElementById("yes-button");
    var no = document.getElementById("no-button");
    var confirm = document.getElementById("confirm-button");
    
    yes.onclick = async function() {
    const data ={
      body:{
        userName: userNameUpd,
        roleId: roleIdUpd
      }
    }
    const response = await fetchAPIData(`https://swp-esms-api.azurewebsites.net/api/admin/users/update`, "PATCH",data);
    console.log(response);
    if (response.isSuccess == true) {
      modal.style.display = "none";
      result.style.display = "block";
        confirm.onclick = function () {
            result.style.display = "none";
        };
        const response = await fetchAPIData(
          'https://swp-esms-api.azurewebsites.net/api/admin/users',
          'GET'
        );
        const newdata = response.data;
        renderAccountList(newdata);
    }
    else{

    }
  }

    no.onclick = function () {
      modal.style.display = "none";
    };
  }
  
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
    
function userInfo(button){
  if (!button) {
    console.error("Button is undefined.");
    return;
  } 
  selectedButton = button;
  userNameInfo = button.parentNode?.parentNode?.cells[1].innerText;
  roleInfo =  button.parentNode?.parentNode?.cells[3].innerText;
  console.log(userNameInfo,roleInfo);

 userDetails(userNameInfo);
}

async function userDetails(userNameInfo){
  const data ={
    body:{
      userName: userNameInfo
    }
  }
    const res = await fetchAPIData(`https://swp-esms-api.azurewebsites.net/api/admin/users/${userNameInfo}`, "GET",data);
    console.log(res);
    const dataResult = res.data;
    console.log(dataResult);
    localStorage.setItem("dataResult", JSON.stringify(dataResult));
    window.location.href = "../Admin/AccountProfile.html";   
   
}
 
