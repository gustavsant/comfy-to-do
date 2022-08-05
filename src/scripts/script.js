const textArea = document.getElementById('text-area')
const newNoteBtn = document.querySelector('#new-note-btn')
const clearBtn = document.querySelector('#clear-btn')
const grid = document.querySelector('.notes-grid ul')
const checkBoxBtn = document.querySelector('.check')


clearBtn.onclick = function(){
    localStorage.clear()
    const cards = document.querySelectorAll('.card')
    cards.forEach((each)=>{
        each.remove()
    })
    
    
}

let notes = JSON.parse(localStorage.getItem('newNote'))  || []
    
newNoteBtn.addEventListener('click', () => {
    notes.push(textArea.value)
    
    localStorage.setItem('newNote', JSON.stringify(notes))
    BuildNotes(textArea.value)
})

function LoadCards(){
    for(let c=0 ; c!=notes.length ; c++){
        BuildNotes(notes[c], c)
    }
    
}
function BuildNotes(value, id = notes.length+1){
    let card = document.createElement('li')
    card.innerText = value
    card.classList.add('card')
    card.classList.add(id)

    let btnDiv = document.createElement('div')
    btnDiv.classList.add('btns-div')
    let check = document.createElement('button')
    let del = document.createElement('button')
    btnDiv.appendChild(check)
    btnDiv.appendChild(del)
    

    check.classList.add('check')
    check.innerHTML = '<i class="bi bi-check-lg"></i>'

    del.classList.add('del')
    del.innerHTML = '<i class="bi bi-trash3"></i>'

    card.appendChild(btnDiv)
    grid.appendChild(card)
}
LoadCards()
   

