'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const creatures = document.querySelector('#sea-creatures')
    const creatureInfo = document.querySelector('#creature-info')
    const creatureForm = document.querySelector('#create-creature')
    creatureForm.addEventListener('submit', createNewCreature)

    fetch('http://localhost:8080/getAll')
    .then(response => response.json())
    .then(creatures => creatures.forEach(slapItOnTheDOM))

    function slapItOnTheDOM(creature){
        const creatureLi = document.createElement('li');
        creatureLi.dataset.id = creature.id
        creatureLi.innerHTML = `<span>${creature.name} ${creature.mammal} ${creature.dorsalFin} ${creature.lifeExpectancy}</span>`
        creatures.appendChild(creatureLi);

        const buttond = document.createElement('button')
        buttond.dataset.id = creature.id
        buttond.setAttribute("id", `delete-button-${creature.id}`)
        buttond.innerText = "Delete"
        creatures.appendChild(buttond);
        buttond.addEventListener('click', () => {deleteCreature(creature)})

        const buttonu = document.createElement('button')
        buttonu.dataset.id = creature.id
        buttonu.setAttribute("id", `update-button-${creature.id}`)
        buttonu.innerText = "Update"
        creatures.appendChild(buttonu);
        buttonu.addEventListener('click', () => {editCreature(creature)})
    }

    function gatherFormData(){
        return{
        name: event.target.name.value,
        mammal: event.target.mammal.value,
        dorsalFin: event.target.dorsalFin.value,
        lifeExpectancy:event.target.lifeExpectancy.value
    }}

    //Create

function createNewCreature(event){
    event.preventDefault();
    let newCreature = gatherFormData();
    return fetch('http://localhost:8080/create',{
        method: "POST",
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newCreature)
    })
    .then(response => response.json())
    .then(creature => (slapItOnTheDOM(creature)));
}

//Replace
function editCreature(creature){
    console.log(`${creature.name} edit button has been clicked!`)
    const eForm = document.createElement('form')
    eForm.id = "update-form"
    eForm.innerHTML = `<h2> Update ${creature.name}</h2>
    Name:<input type="Text" name="name" value="${creature.name}"><br>
    Mammal:<select name="mammal" value="${creature.mammal}">
    <option vaule="true">true</option>
    <option value="false">false</option>
    </select><br>
    DorsalFin:<select name="dorsalFin" value="${creature.dorsalFin}">
    <option vaule="true">true</option>
    <option value="false">false</option>
    </select><br>
    Life Expectancy:<input type="Text" name="lifeExpectancy" value="${creature.lifeExpectancy}><br>
    <input type="submit" name="">`
    creatureInfo.append(eForm)
    eForm.addEventListener('submit', (event) => updateCreature(event, creature))
}
function updateCreature(event, creature){
    event.preventDefault();
    let updatedCreature = gatherFormData()
    updateOnBackend(updatedCreature, creature.id)
    .then(updateOnFrontEnd)
}
function updateOnBackend(updatedCreature, id){
    console.log("fetch began")
    return fetch('http://localhost:8080/replace/${id}',{
        method: "PUT",
        body: JSON.stringify(updatedCreature),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
}
function updateOnFrontEnd(creature){
    console.log(`${creature.name} updated`)
    const creatureSpan = creatures.querySelector(`li[data-id="${creature.id}"]>span`)
    creatureSpan.innerText = `${creature.name} ${creature.mammal} ${creature.dorsalFin} ${creature.lifeExpectancy} `
    console.log(`${creature.name} updated`)
}

//Remove
function deleteCreature(creature){
    console.log(`${creature.name} is going`)
    const creatureLi = document.querySelector(`[data-id="${creature.id}"]`);
    const buttond = document.querySelector(`#delete-button-${creature.id}`);
    const buttonu = document.querySelector(`#update-button-${creature.id}`);
    return fetch (`http://localhost:8080/remove/{id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(() => {
        creatureLi.remove();
        buttond.remove()
        buttonu.remove()
    })
}
})

// const creatures = "http://localhost"
// [
//     {
//         "name":"Octopus",
//         "mammal":false,
//         "dorsalFin":false,
//         "lifeExpectancy":4,
//     },
//     {
//         "name":"Norwhal",
//         "mammal":true,
//         "dorsalFin":false,
//         "lifeExpectancy":50,
//     },
//     {
//         "name":"Orca",
//         "mammal":true,
//         "dorsalFin":true,
//         "lifeExpectancy":50,
//     },
//     {
//         "name":"Clownfish",
//         "mammal":false,
//         "dorsalFin":false,
//         "lifeExpectancy":3,
//     }

// ];

//Setup

// function inputForm(){
//     if(btn1.value=="Show Form"){
//         form1.style.visibility="visible";
//         btn1.value="Hide Form"
//     }else{
//         form1.style.visibility="hidden";
//         btn1.value="Show Form"
//     }}


// const RESULTS_DIV = document.querySelector("#results1");
// const FORM_DIV = document.querySelector("#form1");

// const CREATE_BTN = document.querySelector("#create1");


//Get (Read)
// let refTable=""
// function doit(){
//     refTable=document.createElement("table");
//     refTable.border=1
//     for(let i=0;i<creatures.length;i++){
//         showCreature(creatures[i].name,creatures[i].mammal,creatures[i].dorsalFin,creatures[i].lifeExpectancy)
//     }
// }

// function showCreature(name1, mammal1, dorsalFin1, lifeExpectancy1){
//                 let refRow=document.createElement("tr")
//                 let refTd1=document.createElement("td")
//                 let refTd2=document.createElement("td")
//                 let refTd3=document.createElement("td")
//                 let refTd4=document.createElement("td")

//                 refTd1.innerHTML=name1
//                 refTd2.innerHTML=mammal1
//                 refTd3.innerHTML=dorsalFin1
//                 refTd4.innerHTML=lifeExpectancy1

//                 refRow.appendChild(refTd1);
//                 refRow.appendChild(refTd2);
//                 refRow.appendChild(refTd3);
//                 refRow.appendChild(refTd4);

//                 refTable.appendChild(refRow)
//                 document.body.appendChild(refTable)
// }

// let showCreature = () => (
//     readSetup())
//     getAll();

// const NAME = document.querySelector(".name-input");
// const MAMMAL = document.querySelector(".mammal-input");
// const DORSALFIN = document.querySelector(".dorsalFin-input");
// const LIFEEXPECTANCY = document.querySelector(".lifeExpectancy-input");

// const Setup = () => (
//     datepickerSetup())
//     getAll();

// const getAll = () => {
// axios.get(`http://localhost:8080/api/getAll`)
// .then((response) => {
//     RESULTS_DIV.innerHTML = "";
//     const RESULTS = response.data;
//     for(let result of RESULTS){
//         printResult(result);
//     }
// }).catch((err)=> console,error(`${err}`))
// }
//     if(response.status !== 200){
//         console.error(`status: ${response.status}`);
//         return;
//     }
//     response.json()
//     .then(data => console.info(data))
// }).catch((err)=> console,error(`${err}`)))


//Post (Create)
// function createCreature(){
//     let Name = na.value;
//     let Mammal = mammal.value;
//     let DorsalFin = dorsalFin.value;
//     let LifeExpectancy = lifeExpectancy.value;
//     if(Name==""){
//         nameErr.style.visibility="visible"
//     }else{
//         nameErr.style.visibility="hidden"
//     }
//    if(LifeExpectancy==""){
//        lifeExpectancyErr.style.visibility="visible"
//    }else{
//        lifeExpectancyErr.style.visibility="hidden"
//    }
//    if(Name!="" && Mammal!="" && DorsalFin!="" && LifeExpectancy!=""){
//        if(parseInt(LifeExpectancy)>=0 && parseInt(LifeExpectancy)<=500){
//            lifeExpectancyErr.style.visibility="hidden"
//            creatures.push({
//                "name":Name,
//                "mammal":Mammal,
//                "dorsalFin": DorsalFin,
//                "lifeExpectancy": LifeExpectancy})
//            showCreature(Name,Mammal,DorsalFin,LifeExpectancy)
//        }else{
//            lifeExpectancyErr.innerHTML="Invalid Life Expectancy range is 0-500"
//            lifeExpectancyErr.style.visibility="visible"
//        }
//    }
//    }

// const create = () => {
//     if(validateForm("create")){
//         return;
//     }
// }

// const NAME_VALUE = NAME.value;
// const MAMMAL_VALUE = MAMMAL.value;
// const DORSALFIN_VALUE = DORSALFIN.value;
// const LIFEEXPECTANCY_VALUE = LIFEEXPECTANCY.value;


// fetch("http://localhost:8080/api/create",{
//     method: 'post',
//     headers:{
//         "Add Sea Creature": "applocation/json"
//     },
//     body: JSON.stringify(
//         {
//             "name": "octopus",
//             "mammal": "False",
//             "dorsalFin": "False",
//             "lifeExpectancy": 4
//         }
//     )
// })
// .then(res => res.json())
// .then((data) => console.log(`Request succeeded with JSON response ${data}`))
// .catch((error) => console.log(`Request failed ${error}`))


//Put (Replace)
// fetch("http://localhost:8080/replace/1",{
//     method: 'put',
//     headers:{
//         "Add Sea Creature": "applocation/json"
//     },
//     body: JSON.stringify(
//         {
//            "id": 1,
//             "name": "octopus",
//             "mammal": "False",
//             "dorsalFin": "False",
//             "lifeExpectancy": 4
//         }
//     )
// })
// .then(res => res.json())
// .then((data) => console.log(`Request succeeded with JSON response ${data}`))
// .catch((error) => console.log(`Request failed ${error}`))}
