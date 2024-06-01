document.addEventListener('DOMContentLoaded', () => {
    const countryInput = document.getElementById('country');
    const visaStatusSelect = document.getElementById('visa-status');
    const visaApplicationStatusSelect = document.getElementById('visa-application-status');
    const visaInfoInput = document.getElementById('visa-info');
    const addCountryButton = document.getElementById('add-country');
    const countryList = document.getElementById('country-list');

    visaStatusSelect.addEventListener('change', () => {
        if (visaStatusSelect.value === 'Required') {
            visaApplicationStatusSelect.style.display = 'block';
        } else {
            visaApplicationStatusSelect.style.display = 'none';
        }
    });

    // Load countries from local storage
    const savedCountries = JSON.parse(localStorage.getItem('countries')) || [];
    savedCountries.forEach(country => addCountryToDOM(country));

    addCountryButton.addEventListener('click', () => {
        const countryName = countryInput.value.trim();
        const visaStatus = visaStatusSelect.value;
        const visaApplicationStatus = visaApplicationStatusSelect.value;
        const visaInfo = visaInfoInput.value.trim();

        if (countryName && visaStatus && visaInfo) {
            const country = {
                name: countryName,
                visaStatus: visaStatus,
                visaApplicationStatus: visaStatus === 'Required' ? visaApplicationStatus : '',
                visaInfo: visaInfo,
                completed: false
            };
            addCountryToDOM(country);
            saveCountryToLocalStorage(country);
            countryInput.value = '';
            visaStatusSelect.value = 'Required';
            visaApplicationStatusSelect.value = 'Application Submitted';
            visaInfoInput.value = '';
            visaApplicationStatusSelect.style.display = 'none';
        }
    });

    function addCountryToDOM(country) {
        const li = document.createElement('li');
        li.innerHTML = `<span>${country.name} - ${country.visaStatus}${country.visaStatus === 'Required' ? ' (' + country.visaApplicationStatus + ')' : ''} - ${country.visaInfo}</span>`;
        if (country.completed) {
            li.classList.add('completed');
        }
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        const completeButton = document.createElement('span');
        completeButton.textContent = 'Mark as Completed';
        completeButton.classList.add('complete-button');
        completeButton.addEventListener('click', () => {
            country.completed = !country.completed;
            li.classList.toggle('completed');
            updateCountryInLocalStorage(country);
        });

        const removeButton = document.createElement('span');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => {
            countryList.removeChild(li);
            removeCountryFromLocalStorage(country);
        });

        buttonsDiv.appendChild(completeButton);
        buttonsDiv.appendChild(removeButton);
        li.appendChild(buttonsDiv);
        countryList.appendChild(li);
    }

    function saveCountryToLocalStorage(country) {
        const countries = JSON.parse(localStorage.getItem('countries')) || [];
        countries.push(country);
        localStorage.setItem('countries', JSON.stringify(countries));
    }

    function updateCountryInLocalStorage(updatedCountry) {
        const countries = JSON.parse(localStorage.getItem('countries')) || [];
        const updatedCountries = countries.map(country => 
            country.name === updatedCountry.name &&
            country.visaInfo === updatedCountry.visaInfo ? updatedCountry : country
        );
        localStorage.setItem('countries', JSON.stringify(updatedCountries));
    }

    function removeCountryFromLocalStorage(country) {
        let countries = JSON.parse(localStorage.getItem('countries')) || [];
        countries = countries.filter(c => c.name !== country.name || c.visaInfo !== country.visaInfo);
        localStorage.setItem('countries', JSON.stringify(countries));
    }
});
