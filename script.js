const notecontainer=document.querySelector(".note-container");
const createbtn=document.querySelector(".btn"); 
let notes=document.querySelectorAll(".input-box");

function shownotes(){
    notecontainer.innerHTML = localStorage.getItem("notes");
}
shownotes();

function updateStorage(){
    localStorage.setItem("notes", notecontainer.innerHTML);
}

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
