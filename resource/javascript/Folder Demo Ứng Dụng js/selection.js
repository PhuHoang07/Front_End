// Get references to HTML elements
const options = Array.from(document.querySelectorAll('.options .option'));
const tagsContainer = document.querySelector('.tags');

// Create event listener function for option click +++ use it for fetching API
function handleOptionClick(event) {
    const selectedOptionText = event.target.textContent;
    const existingTag = Array.from(tagsContainer.children).find(tag =>
        tag.textContent.includes(selectedOptionText)
    );

    if (!existingTag) {
        // Option is selected, create tag
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.textContent = selectedOptionText;

        // Add close button to the tag
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = ' &times;';
        closeBtn.className = 'tag-close';
        closeBtn.addEventListener('click', () => {
            // Remove tag when close button is clicked
            tag.remove();
        });

        tag.appendChild(closeBtn);
        tagsContainer.appendChild(tag);
    } else {
        // Option is deselected, remove tag if exists
        existingTag.remove();
    }
}

// Add event listeners to options
options.forEach(option => {
    option.addEventListener('click', handleOptionClick);
});

/*----------------------------------------- button to open selection box -----------------------------------------------------*/
var overlaybg = document.querySelector(".overlay-background");
var exist = document.querySelector(".exist");

function selectSubject(button) {
    var btn = button.parentNode.parentNode;
    overlaybg.style.display = "block";
    exist.onclick = function () {
        overlaybg.style.display = "none";
    }
}

  window.onclick = function(event) {
    if (event.target == overlaybg) {
      overlaybg.style.display = "none";
    }
  }
