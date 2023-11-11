//  fetch("https://fakestoreapi.com/products")
//     .then((data) => {
//        return data.json();
//     })
//     .then((objectData) => {
//        let tableData = " ";
//        objectData.forEach((values) => {
//           tableData += `<tr>
//        <td>${values.title}</td>
//        <td>${values.description}</td>
//        <td>${values.price}</td>
//        <td><img src="${values.image}"/></td>
//    </tr>`; /*lưu ý xài nút ~` thay vì xài '*/
//        });
//        document.getElementById("table_body").innerHTML = tableData;
//     }).catch((err)=>{
//        console.log(err);
//    });




// var postAPI =  "https://fakestoreapi.com/products";
// fetch(postAPI).then(function(response){
//     return response.json();
// }).then(function(post){
//     //console.log(post);
//     var htmls = post.map(function(post){
//         return `<tr>
//                 <td>${post.title}</td>
//                 <td>${post.description}</td>
//                 <td>${post.price}</td>
//                 <td><img src="${post.image}"/></td>
//                 </tr>`;
//     });
//            var html = htmls.join('');
//            document.getElementById("table_body").innerHTML = html;

// }).catch((err)=> {
//     //console.log(err); //or
//     alert('lỗi!!!');
// })

// const list = document.getElementById("table_body");
// const search = document.getElementById("search");
// const listItem = [];

// search.addEventListener('input', (e) => filterInput(e.target.value))

// getDataAPI();
// //------------------------------------------------fectch data into table------------------------------------------------------------------ 
// async function getDataAPI() {
//   try {
//     const responseAPI = await fetch("https://fakestoreapi.com/products");
//     const data = await responseAPI.json();
//     console.log(data); // Check the response data structure
//     //---------------------------------pagination------------------------------------------------------------------------------------------
   

//     //-------------------------------------------------------------------------------------------------------------------------------------------
//     const trow = document.createElement('tr');
//     trow.innerHTML = '<td colspan="5">Loading ...</td>';
//     list.appendChild(trow);
//     setTimeout(()=>{
//         list.innerHTML = " ";
//         data.forEach(result => {
//             const tablerow = document.createElement('tr');
//             listItem.push(tablerow);//đẩy vô để search ra data.
//             tablerow.innerHTML = `
//               <td>${result.title}</td>
//               <td>${result.description}</td>
//               <td>${result.price}</td>
//               <td><img src="${result.image}"/></td>
//               <td>${result.category}</td>
//             `;
//             list.appendChild(tablerow);
//           });
//     }, 2000);
    
//   } catch (error) {
//     console.log(error);
//   }
// }

//======================================================================================================================================================================================================

const list = document.getElementById("table_body");
  const search = document.getElementById("search");
  const listItem = [];
  search.addEventListener('input', (e) => filterInput(e.target.value)); 
  
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
  


//------------------------------------------------fectch data into table------------------------------------------------------------------ 
async function renderAccountList(data) {

  

    list.innerHTML = '';
    if(data.length == 0){
      const noAccount = document.createElement('tr');
      noAccount.innerHTML =
      '<td colspan="8" class="no-schedule">No exam schedule</td>';
    list.appendChild(noAccount);
    }else{

      let numgrade = 1;
    data.forEach((account) =>{

      
      
      const tablerow = document.createElement('tr');  
      listItem.push(tablerow);
            tablerow.innerHTML = `
            <td>${numgrade++}</td>
            <td>${account.userName}</td>
            <td>${account.name}</td>
            <td><select class="role-select" id="role-select">
            <option value=" ">${account.role}</option>
            </td>
            <td> <button id="detail-list" class="view-list-button" onclick="userInfo(this)">Details</button> </td>
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

//---------------------------------------------------Get User Info By User Name----------------------------------------------------------------------------
 function userInfo(button){
    if (!button) {
      console.error("Button is undefined.");
      return;
    } 
    selectedButton = button;
    userNameInfo = button.parentNode?.parentNode?.cells[1].innerText;
    roleInfo =  button.parentNode?.parentNode?.cells[3].innerText;
    console.log(userNameInfo,roleInfo);

   userDetails(userNameInfo,roleInfo);
}

async function userDetails(userNameInfo, roleInfo){
  if(roleInfo === "Testing Admin"){
    const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/admin/users/${userNameInfo}", "GET");
    window.location.href = "TestingAdminProfile.html";
    
  }

  if(roleInfo === "Admin"){
    const data ={
      body:{
        userName: userNameInfo
      }
    }
    const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/admin/users/${userNameInfo}" + userNameInfo, "GET",data);
    window.location.href = "AdminProfile.html";
  }

  if(roleInfo === "Student"){
    const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/admin/users/${userNameInfo}"+ userNameInfo, "GET");
    window.location.href = "StudentProfile.html";
  }

  if(roleInfo === "Lecturer"){
    const res = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/admin/users/${userNameInfo}" + userNameInfo, "GET");
    window.location.href = "LecturerProfile.html";
  }
}