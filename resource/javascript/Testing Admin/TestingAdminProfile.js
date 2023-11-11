const list = document.getElementById("table_body");
  const left = document.getElementsByClassName("left")[0];
  const right = document.getElementsByClassName("right")[0];
  const listItem = [];
  
  async function fetchDataFromApi(){
    try{
      const response = await fetchAPIData(
        'https://swp-esms-api.azurewebsites.net/api/user/profile',
        'GET'
      );
    const data = response.data;
    console.log(data);
    renderProfile(data);
    }catch(error){
      console.error(error);
    }
    
  }
  fetchDataFromApi();
  


//------------------------------------------------fectch data into table------------------------------------------------------------------ 
async function renderProfile(data) {
    
      left.innerHTML = `
      <img src="${data.image}" alt="user" width="100">
                <h4>${data.name}</h4>
                <p>${data.role}</p>
      `;
      right.innerHTML = `
      <div class="info">
      <h3>Information</h3>
      <div class="info_data">
          <div class="data">
              <h4>Email</h4>
              <p>${data.email}</p>
          </div>
      </div>
      <div class="data">
          <h4>Phone</h4>
          <p>${data.phoneNumber}</p>
      </div>

      <div class="data">
          <h4>Date of Birth</h4>
          <p>${data.dateOfBirth}</p>
      </div>

      <div class="data">
          <h4>Gender</h4>
          <p>${data.gender}</p>
      </div>

      <div class="data">
          <h4>ID Card</h4>
          <p>${data.idcard}</p>
      </div>

      <div class="data">
          <h4>Address</h4>
          <p>${data.address}</p>
      </div>
      <br />
      <h3>Academic</h3>
      <div class="data">
          <h4>Member code</h4>
          <p>${data.userName}</p>
      </div>

      <div class="data">
          <h4>Roll number</h4>
          <p>${data.rollNumber}</p>
      </div>

      <div class="data">
          <h4>Major</h4>
          <p>${data.department}</p>
      </div>
  </div>
      `;

}

