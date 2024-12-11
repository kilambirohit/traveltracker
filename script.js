<script>
        document.getElementById("travel-form").addEventListener("submit", function (e) {
            e.preventDefault();

            // Get form values
            const country = document.getElementById("country").value;
            const budget = document.getElementById("budget").value;

            // Add to the country list
            const countriesList = document.getElementById("countries");
            const newCountry = document.createElement("li");

            // Add country details with a remove button and mark as done button
            newCountry.innerHTML = `
                <span>${country} - £${budget}</span>
                <div>
                    <button class="done-button">Mark as Done</button>
                    <button class="remove-button">Remove</button>
                </div>
            `;

            countriesList.appendChild(newCountry);

            // Show confirmation message
            const confirmation = document.getElementById("confirmation");
            confirmation.classList.remove("hidden");
            setTimeout(() => confirmation.classList.add("hidden"), 2000);

            // Clear form
            document.getElementById("travel-form").reset();
        });

        // Event delegation to handle click events on dynamically added buttons
        document.getElementById("countries").addEventListener("click", function (e) {
            if (e.target.classList.contains("remove-button")) {
                const listItem = e.target.parentElement.parentElement;
                listItem.remove(); // Remove the country item
            } else if (e.target.classList.contains("done-button")) {
                const listItem = e.target.parentElement.parentElement;
                listItem.classList.toggle("completed"); // Mark as completed
            }
        });
    </script>
