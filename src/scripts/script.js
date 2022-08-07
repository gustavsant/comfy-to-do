const mainArea = document.querySelector('main')
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

mainArea.addEventListener('animationend', (anim)=>{
    if(anim.animationName == 'nono'){
        mainArea.classList.remove('nono')
    }
})
textArea.addEventListener('animationend', (anim)=>{
    if(anim.animationName == 'no'){
        textArea.classList.remove('no')
    }
})




let notes = JSON.parse(localStorage.getItem('newNote'))  || []
let checkeds = JSON.parse(localStorage.getItem('checkeds')) || []


textArea.addEventListener('keypress', (evt)=>{
    if(evt.keyCode != 13){
       return
    }
    evt.preventDefault()
    if(textArea.value == '' || notes.includes(textArea.value)){
        textArea.classList.add('no')
        mainArea.classList.add('nono')
    }else{
        AddNote()
    }
    
    textArea.value = ''

})
newNoteBtn.addEventListener('click', AddNote)

function AddNote(){
    if(textArea.value == '' || notes.includes(textArea.value)){
        textArea.classList.add('no')
        mainArea.classList.add('nono')
    }else{
        notes.push(textArea.value)
        localStorage.setItem('newNote', JSON.stringify(notes))
        BuildNotes(textArea.value)
    }
    
}
function LoadCards(){
    for(let c=0 ; c!=notes.length ; c++){
        BuildNotes(notes[c])
    }
    setTimeout(Matches, 500)
}

function Matches(){
    const notesToCheck = checkeds.filter(element => notes.includes(element))  
    const cards = document.querySelectorAll('.card')
    notesToCheck.forEach((each)=>{
        for(let i = 0 ; i!=notes.length ; i++){
            if(notes[i] == each){
                cards.forEach((e)=>{
                    if(e.innerText == each){
                        e.classList.add('checked')
                    }
                })
            }
        }
    })
}
function BuildNotes(value){
    let card = document.createElement('li')
    card.innerText = value
    card.classList.add('card')


    card.addEventListener('click', Check)

    let btnDiv = document.createElement('div')
    btnDiv.classList.add('btns-div')

    let del = document.createElement('button')

    btnDiv.appendChild(del)
    del.addEventListener('click', DelTag)

    del.classList.add('del')
    del.innerHTML = '<i class="bi bi-x-lg"></i>'

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


                   
        

                    localNotes.splice(indexLocal, 1)
                    notes.splice(index, 1)
                    localStorage.setItem('newNote', JSON.stringify(notes))
             
                }
            })
        }
    }
}
function Check(){
    if(this.classList.contains('checked')){
        this.classList.remove('checked')
        let indexChecked = checkeds.indexOf(this.innerText)
        checkeds.splice(indexChecked, 1)
        localStorage.setItem('checkeds', JSON.stringify(checkeds))
    }else{
        checkeds.push(this.innerText)
        this.classList.add('checked')
        localStorage.setItem('checkeds', JSON.stringify(checkeds))
    }
    
}



