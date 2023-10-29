let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();//calling the function(optional)
});
searchBtn.addEventListener("click", () => { // Sidebar open when you click on the search iocn
    sidebar.classList.toggle("open");
    menuBtnChange(); //calling the function(optional)
});
// following are the code to change sidebar button(optional)
function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the iocns class
    }
}

//dropdown content
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("dropdown-icon").classList.toggle("rotate");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
    var dropdown = document.getElementById("myDropdown");
    var dropdownIcon = document.getElementById("dropdown-icon");
  
    if (!e.target.matches('.dropbtn')) {
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
      if (dropdownIcon.classList.contains('rotate')) {
        dropdownIcon.classList.remove('rotate');
      }
    }
  }

//default welcome section