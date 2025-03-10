const COHORT = "2502-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    events: [],
  };

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

  
  async function addEvents(event) {
      event.preventDefault();
      
      await createEvents(
        //   partyform.partyname.value
        //   location
        //   date
        //   description
        )
    }
    // async function createEvent(name, location, date, description)
    //  try {
    //     const response = await fetch(API_URL, {
    //         method: "POST",
    //         headers: { "Content Type": "application/json" },
    //         body: JSON.stringify(events),
    //     });
    //     const json = await response.json();
        
    //     if (json.error) {
    //         throw new Error(json.error.message);
    //     }
    // } catch (error) {
    //     console.error(error);
    // }
    
    
    
    async function render() {
        await getEvents();
        renderEvents();
    }
    
    render();


    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        
        
        await addArtist(events);
        render();
    });