// Objective 1: When the page loads, show the first 50 monsters. Each monster’s name, age, and
// description should be shown.

// Objective 2: Above your list of monsters, you should have a form to create a new monster.
// You should have fields for name, age, and description, and a ‘Create Monster
// Button’. When you click the button, the monster should be added to the list (only add to DOM, no persistence on server).

// Objective 3: At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

//fetch data - first 50
const urlFirst50 = 'http://localhost:3000/monsters/?_limit=50&_page=1';
const urlNext50 = 'http://localhost:3000/monsters/?_limit=50&_page=2';

//http://localhost:3000/monsters/?_limit=20&_page=3

function fetchData (pageNum) {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
    .then(resp => resp.json())
    .then(data => data.forEach(fillInfo))
}

//DOM to get on the page with the name, age, and description
function fillInfo(info) {
    //declare variables
    const cardContainer = document.createElement('div')
    const name = document.createElement('h2')
    const age = document.createElement('p')
    const description = document.createElement('p')

    //add content
    name.textContent = info.name
    age.textContent = info.age
    description.textContent = info.description    
    
    //append
    cardContainer.append(name, age, description)
    document.querySelector('#monster-container').append(cardContainer)
}

// Add event listener for the form submit
document.querySelector('#create-monster-form').addEventListener('submit', (e) => {
    e.preventDefault();

   let newCard = document.createElement('div')
   newCard.innerHTML = changeHTML(e)
   document.querySelector('#monster-container').append(newCard)


})

// Add a callback function that creates a new card
function changeHTML (e) {
return (`
        <h2>${e.target.name.value} </h2>
        <p> ${e.target.age.value} </p>
        <p>${e.target.description.value} </p>
    `)
}


//add event listener to the button
const frontButton = document.querySelector('#forward');

//make the callback function for that event -- fetch function on the 50-100 monsters + fillInfo function
let pageNum = 1;

// frontButton.addEventListener('click', () => pageNum ++)
frontButton.addEventListener('click', () => {
    pageNum = pageNum + 1
    document.querySelector("#monster-container").innerHTML = ''

    fetchData(pageNum)
})

fetchData(pageNum);
