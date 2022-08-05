const textArea = document.getElementById('text-area')
const newNoteBtn = document.querySelector('#new-note-btn')
const clearBtn = document.querySelector('#clear-btn')
const grid = document.querySelector('.notes-grid ul')

clearBtn.onclick = function(){
    localStorage.clear()
}

let notes = JSON.parse(localStorage.getItem('newNote'))  || []
    
newNoteBtn.addEventListener('click', () => {
    notes.push(textArea.value)
    
    localStorage.setItem('newNote', JSON.stringify(notes))
    BuildNotes(textArea.value)
})

function LoadCards(){
    for(let c=0 ; c!=notes.length ; c++){
        BuildNotes(notes[c])
    }
    
}
function BuildNotes(value){
    let card = document.createElement('li')
    let radio = document.createElement('button')
    radio.innerHTML = '<i class="bi bi-check-lg"></i>'
    card.innerText = value
    grid.appendChild(card)
    card.appendChild(radio)
}
LoadCards()
