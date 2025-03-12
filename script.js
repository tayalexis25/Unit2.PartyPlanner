const COHORT = "2502-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    events: [],
  };

  const eventList = document.querySelector("#partyList");
  const eventForm = document.querySelector("#partyForm");
  eventForm.addEventListener("submit", addEvents);
  eventList.addEventListener("click", deleteEvents);

  //=====GRABBING FROM API======
  async function getEvents() {
    try {
    const response = await fetch(API_URL)
    const json = await response.json();
    state.events = json.data;
    console.log(state.events)
    } catch (error) {
    console.error(error);    
    }
  } 
//=======RENDERING PT.1=======
  async function render() {
    await getEvents();
    renderEvents();
}

render();


  function renderEvents() {
    const eventList = document.querySelector("#parties");

    if (!state.events.length) {
        eventList.innerHTML = "<li>No events.</li>";
        return;
      }
      const eventCards = state.events.map((party) => {
        const card = document.createElement("li");
        card.innerHTML = `
         <h2>${party.name}</h2>
         <h6>${party.location}</h6>
         <p>${party.date}</p>
         <p>${party.description}</p>
         `
         return card;
      });
      eventList.replaceChildren(...eventCards);
  }

  //========ADDING EVENT========
  async function addEvents(event) {
      event.preventDefault();
      
      const name = document.querySelector("#name").value;
      const date = new Date(document.querySelector("#date").value);
      const location = document.querySelector("#location").value;
      const description = document.querySelector("#description").value;
     }


    const newParty = {
      name,
      date,
      location,
      description,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newParty),
      });
      const json = await response.json();
      console.log(json.data);
      renderParty(json.data);
    } catch (error) {
      console.log(error);
    }

  //========DELETEING EVENT========
  async function deleteEvents(event) {
    if (event.target.classList.contains("delete-button")) {
      const partyId = event.target.dataset.partyId;
    console.log(partyId);
    try {
      await fetch(`${API_URL}/${partyId}`, {
        method: "DELETE",
      });
      event.target.parentElement.remove();
    } catch (error) {
      console.log(error);
    }
  }
}

//=====RENDERING PT.2======
function renderEventsList() {
  state.parties.forEach((event) => {
    renderParty(event);
  });
}

function renderParty(event) {
  const li = document.createElement("li");
  li.innerHTML = `
        <strong>${event.name}</strong><br>
        Date: ${new Date(event.date).toLocaleDateString()}<br>
        Location: ${event.location}<br>
        Description: ${event.description}<br>
        <button class="delete-button" data-event-id="${
          event.id
        }">Delete</button>
      `;
  partyList.appendChild(li);
}


    // const form = document.querySelector("form");
    // form.addEventListener("submit", async (event) => {
    //     event.preventDefault();
        
        
        
    //     await addArtist(events);
    //     render();
    // });