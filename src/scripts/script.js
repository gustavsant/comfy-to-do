
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
        notes.pop()
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
    del.addEventListener('click', DelTag)
    

    check.classList.add('check')
    check.innerHTML = '<i class="bi bi-check-lg"></i>'

    del.classList.add('del')
    del.innerHTML = '<i class="bi bi-trash3"></i>'

    card.appendChild(btnDiv)
    grid.appendChild(card)
}
LoadCards()
function DelTag(){
    let delBtn = document.querySelectorAll('.del')
    for(let c = 0 ; c < delBtn.length ; c++){
        delBtn[c].onclick = function(){
            let li = this.parentNode.parentNode
            li.classList.add('deleted')
            li.addEventListener('animationend', (animation) => {
                if(animation.animationName == 'deleted'){
                    let parent = this.parentElement.parentElement
                    parent.style.display = 'none'
                    let localNotes = JSON.parse(localStorage.newNote)
                    let valueToDel = parent.innerText
        
                    let index = notes.indexOf(valueToDel)
                    let indexLocal = localNotes.indexOf(valueToDel)
                    console.log(indexLocal);
                    console.log(index);
        
                    localNotes.splice(indexLocal, 1)
                    notes.splice(index, 1)
                    localStorage.setItem('newNote', JSON.stringify(notes))
                    console.log(localNotes)
                }
            })
        }
    }
}

