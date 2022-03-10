"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const creatures = document.querySelector("#sea-creatures");
  const creatureInfo = document.querySelector("#creature-info");
  const creatureForm = document.querySelector("#create-creature");
  creatureForm.addEventListener("submit", createNewCreature);

  fetch("http://localhost:8080/getAll")
    .then((response) => response.json())
    .then((creatures) => creatures.forEach(featuresOnDOM));

  //Layout of data once submitted
  function featuresOnDOM(creature) {
    const creatureLi = document.createElement("li");
    creatureLi.dataset.id = creature.id;
    creatureLi.innerHTML = `<span>${creature.name} <br>
        Is the sea creature a mammal? ${creature.mammal}<br>
        Does the sea creature have dorsal fin? ${creature.dorsalFin}<br>
        What is life expectancy of the sea creature? ${creature.lifeExpectancy}</span>`;
    creatures.appendChild(creatureLi);

    //Delete button
    const buttondel = document.createElement("button");
    buttondel.dataset.id = creature.id;
    buttondel.setAttribute("id", `delete-button-${creature.id}`);
    buttondel.innerText = "Delete";
    creatures.appendChild(buttondel);
    buttondel.addEventListener("click", () => deleteCreature(creature));

    //Update button
    const buttonup = document.createElement("button");
    buttonup.dataset.id = creature.id;
    buttonup.setAttribute("id", `update-button-${creature.id}`);
    buttonup.innerText = "Update";
    creatures.appendChild(buttonup);
    buttonup.addEventListener("click", () => editCreature(creature));
  }

  function readData() {
    return {
      name: event.target.name.value,
      mammal: event.target.mammal.value,
      dorsalFin: event.target.dorsalFin.value,
      lifeExpectancy: event.target.lifeExpectancy.value,
    };
  }

  //Create
  function createNewCreature(event) {
    event.preventDefault();
    let newCreature = readData();
    return fetch("http://localhost:8080/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newCreature),
    })
      .then((response) => response.json())
      .then((creature) => featuresOnDOM(creature));
  }

  //Replace
  //Layout when update button is clicked
  function editCreature(creature) {
    console.log(`${creature.name} edit button has been clicked!`);
    const eForm = document.createElement("form");
    eForm.id = "update-form";
    eForm.innerHTML = `<h2> Update ${creature.name}</h2>
    Name:<input type="Text" name="name" value="${creature.name}"><br>
    Mammal:<select name="mammal" value="${creature.mammal}">
    <option vaule="">Please Choose Option</option>
    <option vaule="true">True</option>
    <option value="false">False</option>
    </select><br>
    DorsalFin:<select name="dorsalFin" value="${creature.dorsalFin}">
    <option vaule="">Please Choose Option</option>
    <option vaule="true">True</option>
    <option value="false">False</option>
    </select><br>
    Life Expectancy:<input type="Text" name="lifeExpectancy" value="${creature.lifeExpectancy}"><br>
    <input type="submit" name="">`;
    creatureInfo.append(eForm);
    eForm.addEventListener("submit", (event) =>
      updateCreature(event, creature)
    );
  }
  function updateCreature(event, creature) {
    event.preventDefault();
    let updatedCreature = readData();
    updateOnBackend(updatedCreature, creature.id).then(updateOnFrontEnd);
  }
  //Updating data on MySQL
  function updateOnBackend(updatedCreature, id) {
    console.log("fetch began");
    // event.preventDefault();
    // let updatedCreature = gatherFormData()
    return fetch(`http://localhost:8080/replace/${id}`, {
      method: "PUT",
      // body: JSON.stringify(updatedCreature),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedCreature),
    }).then((response) => response.json());
  }
  //Updating on web page to show correct information
  function updateOnFrontEnd(creature) {
    console.log(`${creature.name} has been updated`);
    const creatureSpan = creatures.querySelector(
      `li[data-id="${creature.id}"]>span`
    );
    creatureSpan.innerHTML = `<span>${creature.name} <br>
    Is the sea creature a mammal? ${creature.mammal}<br>
    Does the sea creature have dorsal fin? ${creature.dorsalFin}<br>
    What is life expectancy of the sea creature? ${creature.lifeExpectancy}</span>`;
    console.log(`${creature.name} sea creature has been updated`);
  }

  //Remove
  function deleteCreature(creature) {
    console.log(`${creature.name} is going away`);
    const creatureLi = document.querySelector(`[data-id="${creature.id}"]`);
    const buttondel = document.querySelector(`#delete-button-${creature.id}`);
    const buttonup = document.querySelector(`#update-button-${creature.id}`);

    return (
        //Removing from MySQL
      fetch(`http://localhost:8080/remove/${creature.id}`, {
        method: "DELETE",
      })
        // .then(response => response.json())
        .then(() => {
            //Removing from web page (buttons and creature no longer show)
          creatureLi.remove();
          buttondel.remove();
          buttonup.remove();
        })
        .then(console.log(`${creature.name} is gone`))
    );
  }
});
