import { sortArray, createHTMLofItems } from "../novo/utils/utils.js";
import { handleStatus, log } from "../novo/utils/promise-helpers.js";


const stopLoading = () => {

    const standart = document.querySelectorAll('.standart-container')[0];
    standart.classList.remove('d-none')
    const loading = document.querySelectorAll('.loading-container')[0];
    loading.classList.add('animation')

}

const draggableList = document.getElementById('draggable-list');
let dragStartIndex;

let originalList;
let objectList;


function configureAPI(){
    const limit = 10
    const URL = `https://forbes400.herokuapp.com/api/forbes400?limit=${limit}`;
    getListWithApi(URL)
}

function displayError(data){
    console.log(data)
    const loading = document.querySelectorAll('.loading-container')[0];
    loading.innerHTML = 'Cannot connect to server, please refresh the page.';
}

function configureList(data) {
    stopLoading()
    
    objectList = data;
    const getPersonNames = (data.map(data => data.personName));
    originalList = getPersonNames

    
    createListFromApi(objectList)

}

function getListWithApi(URL){

   fetch(URL)
   .then(handleStatus)
   .then(configureList)
   .catch(displayError)
//    .catch(err => console.log('Um erro ocorreu: ' + err))
}

configureAPI()

function createListFromApi(objectList){

   const sortedArray = sortArray([...objectList]);
        
    sortedArray.
    forEach((person, index) => {

        
        const listItem = document.createElement('li');

        listItem.setAttribute('data-index', index);

        listItem.innerHTML = createHTMLofItems(index, person, objectList);

        draggableList.appendChild(listItem)
   })

   addEventListeners()

}


function dragStart(){
    //this = e.target

    // console.log(this.parentElement)
    dragStartIndex =+ this.closest('li').getAttribute('data-index');

}
function dragEnter(){

    // console.log('enter')
}
function dragDrop(){
    const dragEndIndex =+ this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('drag-enter')
    this.classList.remove('drag-start')



    // console.log('drop')
}
function dragOver(e){
    // console.log('over')
    e.preventDefault()
    this.classList.add('drag-enter')

}
function dragLeave(){
    // console.log('leave')
    this.classList.remove('drag-start')
    this.classList.remove('drag-enter')

}

function swapItems(fromIndex, toIndex){
    const liLIst = document.querySelectorAll('li');
    // console.log(fromIndex,toIndex);

    // console.log(listItems[toIndex]);

    liLIst.forEach(liItem => {
        const dataset = liItem.getAttribute('data-index');

        if(dataset == fromIndex){
            let fromPersonName = liLIst[dataset].children[0].children[1];
            let toPersonName = liLIst[toIndex].children[0].children[1];


            [toPersonName.innerHTML, fromPersonName.innerHTML] =  [fromPersonName.innerHTML, toPersonName.innerHTML]; 
            
            // console.log(fromPersonName)
            // console.log(toPersonName)

            let fromPersonBio = fromPersonName.parentElement.nextElementSibling;
            let toPersonBio = toPersonName.parentElement.nextElementSibling;

           [toPersonBio.innerHTML, fromPersonBio.innerHTML] = [fromPersonBio.innerHTML, toPersonBio.innerHTML] 

        }

    })


}



function addEventListeners(){

    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
    const openBioBtns = document.querySelectorAll('.open-bio');

    openBioBtns.forEach(openBioBtn => {
        openBioBtn.addEventListener('click', (e) => {


                const bio = openBioBtn.parentElement.parentElement.parentElement.querySelector('.bio');
                
                if(bio.classList.contains('hidden')){
                    bio.classList.remove('hidden');
                    bio.classList.add('show');
                    e.target.classList.remove('remove-rotate')
                    e.target.classList.add('rotate')
                    
                }else{
                    e.target.classList.toggle('rotate')
                    bio.classList.add('hidden');
                    bio.classList.remove('show');
          
                    e.target.classList.remove('rotate')
                    e.target.classList.add('remove-rotate')

                }

                console.log(e.target)


        })
    })

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(draggable => {
        draggable.addEventListener('dragover', dragOver)
        draggable.addEventListener('drop', dragDrop)
        draggable.addEventListener('dragenter', dragEnter)
        draggable.addEventListener('dragleave', dragLeave)
    })

}


const btn = document.querySelector('#check');

btn.addEventListener('click', validatePersonsPositions)

function validatePersonsPositions(){
     const dragListItems = document.querySelectorAll('.draggable-list li')

     for (let i = 0; i < dragListItems.length; i++) {

        let index = dragListItems[i];
        let person = index.querySelector('.person-name');
        if(person.textContent == originalList[i]){

         person.parentElement.children[1].classList.remove('wrong')
         person.parentElement.children[1].classList.add('right')
     }else{
        person.parentElement.children[1].classList.remove('right')
        person.parentElement.children[1].classList.add('wrong')
        }

        
     }
     window.scrollTo(0, 0);
    
}