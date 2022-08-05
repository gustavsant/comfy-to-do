const textArea = document.getElementById('text-area')
const newNoteBtn = document.querySelector('#new-note-btn')
const clearBtn = document.querySelector('#clear-btn')

clearBtn.onclick = function(){
    localStorage.clear()
}

let notes = JSON.parse(localStorage.getItem('newNote'))  || []
    
newNoteBtn.addEventListener('click', () => {
    notes.push(textArea.value)
    localStorage.setItem('newNote', JSON.stringify(notes))
})

function LoadCards(){
    const grid = document.querySelector('.notes-grid')
    for(let c=0 ; c!=notes.length ; c++){
        let card = document.createElement('li')
        card.innerText = notes[c]
        grid.appendChild(card)
    }
    
}
LoadCards()
