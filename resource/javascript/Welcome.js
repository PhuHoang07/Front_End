
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
});

// Add an event listener to the search button
searchBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
});

// Add an event listener to the options in the sidebar
document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault(); // Prevent the default behavior of following the link
        event.stopPropagation(); // Prevent the click event from reaching the window
        const href = link.getAttribute("href");
        navigateTo(href);
    });
});

function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
}

function navigateTo(href) {
    window.location.href = href;
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
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}

//default welcome section