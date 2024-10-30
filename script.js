const form = document.getElementById('travel-form');
const countryList = document.getElementById('country-list');

let countries = JSON.parse(localStorage.getItem('countries')) || [];

// Function to render countries
function renderCountries() {
    countryList.innerHTML = '';
    countries.forEach((country) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${country.name}</strong><br>
            Flight: ${country.flight}<br>
            Notes: ${country.notes}<br>
            Itinerary: ${country.itinerary}<br>
            Budget: £${country.budget}
        `;
        countryList.appendChild(li);
    });
}

// Add country to the list
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const countryName = document.getElementById('country').value;
    const flightDetails = document.getElementById('flight').value;
    const notes = document.getElementById('notes').value;
    const itinerary = document.getElementById('itinerary').value;
    const budget = document.getElementById('budget').value;

    const newCountry = {
        name: countryName,
        flight: flightDetails,
        notes: notes,
        itinerary: itinerary,
        budget: budget
    };

    countries.push(newCountry);
    localStorage.setItem('countries', JSON.stringify(countries));
    renderCountries();

    // Clear form inputs
    form.reset();
});

// Initial rendering of countries
renderCountries();
