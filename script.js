const notecontainer=document.querySelector(".note-container");
const createbtn=document.querySelector(".create-btn");
const speechBtn = document.getElementById("speechBtn");
let notes=document.querySelectorAll(".input-box");

// Speech Recognition setup
let recognition;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Set language, can be changed

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        // Create a new note with the speech input
        let inputbox = document.createElement("p");
        let img = document.createElement('img');
        inputbox.className = "input-box";
        inputbox.setAttribute("contenteditable","true");
        inputbox.textContent = transcript;
        img.src="delete.jpeg";
        notecontainer.appendChild(inputbox).appendChild(img);
        updateStorage();
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        alert('Speech recognition failed. Please try again.');
    };
} else {
    speechBtn.disabled = true;
    speechBtn.textContent = 'Speech Not Supported';
}

function shownotes(){
    notecontainer.innerHTML = localStorage.getItem("notes");
}
shownotes();

function updateStorage(){
    localStorage.setItem("notes", notecontainer.innerHTML);
}

speechBtn.addEventListener("click", ()=>{
    if (recognition) {
        recognition.start();
    }
});

createbtn.addEventListener("click", ()=>{
    let inputbox = document.createElement("p");
    let img = document.createElement('img');
    inputbox.className = "input-box";
    inputbox.setAttribute("contenteditable","true");
    img.src="delete.jpeg";
    notecontainer.appendChild(inputbox).appendChild(img);
})

notecontainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        updateStorage();
    }
    else if(e.target.tagName === "p"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt =>{
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }
})
