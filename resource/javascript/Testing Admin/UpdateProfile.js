//================================================================update profile nha ======================================================================

async function fetchDataFromApi(){
    try{
      const response = await fetchAPIData(
        'https://swp-esms-api.azurewebsites.net/api/user/profile',
        'GET'
      );
    const data = response.data;
    console.log(data);
    renderUpdateProfile(data);
    }catch(error){
      console.error(error);
    }
    
  }
  fetchDataFromApi();

  //function load luôn cái update dữ liệu data=============================================
  const container = document.getElementsByClassName("container");
  function renderUpdateProfile(data){
 
    document.getElementById("full-name").value = data.name;
    document.getElementById("dateBirth").value = data.dateOfBirth;
    document.getElementById("gender-input-update").value = data.gender;
    document.getElementById("id-card").value = data.idcard;
    document.getElementById("address").value = data.address;
    document.getElementById("phone").value = data.phoneNumber;

    }

//=========================================================================================



    const genderData = ["M","F"];
    const genderSelectElement = document.getElementById("gender-input-update");
        genderData.forEach((gender) => {
            const optionElement = document.createElement("option");
            optionElement.value = gender;
            optionElement.text = gender;
            genderSelectElement.appendChild(optionElement);
});


async function UpdateProfile(confirmation){
    
    const errorMessage = document.getElementById("error-messagesche-Update");
    const errorMessage2 = document.getElementById("error-messagesche-Update2");
    const nameInput = document.querySelector("#full-name");      //Fullname
    const dateInput  = document.querySelector("#info input[type='date']");     //Date of Birth
    //==========================================Gender===================================
    const genderSelectElement = document.getElementById("gender-input-update");
    const selectedGender = genderSelectElement.value;
    //=====================================================================================
    const idInput = document.querySelector("#id-card");         //IDCard
    const addressInput = document.querySelector("#address");    //address
    const phoneInput = document.querySelector("#phone");      //Phone

    if(!nameInput || !dateInput || !idInput || !addressInput || !phoneInput || !selectedGender){

        errorMessage.style.display = "flex";
        return;
    }
    else{
        errorMessage.style.display = "none";
    }

    const nameValue = nameInput.value;
    const dateValue = dateInput.value;
    const idValue = idInput.value;
    const addressValue = addressInput.value;
    const phoneValue = phoneInput.value;

    if(confirmation){
        
            const data = {
                body: {
                    name: nameValue,
                    dateOfBirth: dateValue,
                    gender: selectedGender,
                    idcard: idValue,
                    address: addressValue,
                    phoneNumber: phoneValue
                }
            }
            console.log(data);
            const response = await fetchAPIData("https://swp-esms-api.azurewebsites.net/api/user/update","PATCH",data);
            if (response.isSuccess == true) {
                errorMessage.style.display = "flex";
                errorMessage.innerHTML = response.message;
                console.log(response.message);
                // thêm function load lại data dô

                setTimeout(() => {
                    errorMessage.style.display = "none";
                  }, 3000);
                  renderUpdateProfile(data);
            }
            else{
                errorMessage.style.display = "flex";
                errorMessage.innerHTML = response.message;
                console.log(response.message);
                setTimeout(() => {
                    errorMessage.style.display = "none";
                  }, 3000);
            }
        }     
}