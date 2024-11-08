import PetsCollection from './PetCollection.js';

// Validation
(function () {
    'use strict';
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {

        form.addEventListener('submit', function (event) {
            // HTML5 validation
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            //imageURL validation
            let imageURLInput = document.getElementById('imageURL');
            let imageURLInputValue = imageURLInput.value;
            let regEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;

            if (!regEx.test(imageURLInputValue)) {
                imageURLInput.setCustomValidity('Needs to be a valid URL.');
                const validationMessage = document.querySelector('#imageURL + div');

                validationMessage.textContent = "Needs to be a valid URL.";

            } else {
                imageURLInput.setCustomValidity('');
            }

            //Birthdate validation
            let birthdayInput = document.getElementById('birthdate');
            let birthdayInputValue = Date.parse(birthdayInput.value);

            if (Date.now() - birthdayInputValue < 0) {
                birthdayInput.setCustomValidity('Needs to be a past date.');
                const validationMessage = document.querySelector('#birthdate + div');

                validationMessage.textContent = "Needs to be a past date.";

            } else {
                birthdayInput.setCustomValidity('');
            }

            //Price validation
            const priceInput = document.getElementById('price');
            if (priceInput.value < 0) {
                priceInput.setCustomValidity('Price needs to be bigger than 0.');
                const validationMessage = document.querySelector('#price + div');
                validationMessage.textContent = "Price needs to be bigger than 0.";

            } else {
                priceInput.setCustomValidity('');
            }

            //Petcode validation
            const petcodeInput = document.getElementById('petCode');
            regEx = /^[a-z]{3}\d{3}$/i;

            if (!regEx.test(petcodeInput.value)) {
                petcodeInput.setCustomValidity('Pet code needs to be 3 letters follow by 3 numbers.');
                const validationMessage = document.querySelector('#petCode + div');
                validationMessage.textContent = "Pet code needs to be 3 letters follow by 3 numbers.";

            } else {
                petcodeInput.setCustomValidity('');
            }

            // Add Bootstrap validation classes
            form.classList.add('was-validated');
        }, false);
    });
})();

//Testing
    document.querySelector("input#name").value = "asdas",
    document.querySelector("textarea#description").value = "asdas",
    document.querySelector("input#imageURL").value = "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1xw:0.99967xh;center,top&resize=1200:*",
    document.querySelector("input#birthdate").value = new Date(2024, 12, 14),
    document.querySelector("input#price").value = "55",
    document.querySelector("input#petCode").value = "asd321",
    document.querySelector("input#sold").value = true

//Adding pets
let pets = [
    { name: "Ryos", description: "Dasdasdaf", imageURL: "www.google.com", birthdate: new Date(2023,2,3), price: 20.43, code: 'CAT123', sold: false},
    { name: "Klisa", description: "vxcnbvkcx", imageURL: "www.face.com", birthdate: new Date(2019,12,18), price: 15.40, code: 'PAR290', sold: true}
  ];

let petList = new PetsCollection(pets);

console.log(petList);

let form = document.querySelector("form#addPet");
console.log(form);

form.addEventListener("submit", function (event) {
    if (form.checkValidity()){
        event.preventDefault();
        event.stopPropagation();

        let birthdate = document.querySelector("input#birthdate").value.split("-");
        const newPet = {
            name: document.querySelector("input#name").value,
            description: document.querySelector("textarea#description").value,
            imageURL: document.querySelector("input#imageURL").value,
            birthdate: new Date(birthdate[0], birthdate[1], birthdate[2]),
            price: Number.parseInt(document.querySelector("input#price").value),
            code: document.querySelector("input#petCode").value,
            sold: document.querySelector("input#sold").checked
        }

        petList.addPet(newPet);
        console.log(newPet);
        
        petList.displayPets();
        renderPets(pets);
    }
})


//Creating cards
renderPets(pets);

function renderPets(pets) { 
    const cardRow = document.querySelector("#cardRow");
    cardRow.innerHTML = "";

    const templateCards = document.querySelector("#cardTemplate").content;

    console.log(templateCards);
    console.log(cardRow);
    
    pets.forEach(pet =>{
        let card = templateCards.cloneNode(true);
        
        card.querySelector(".nameCard").textContent = pet.name;
        card.querySelector(".descriptionCard").textContent = pet.description;
        // card.querySelector(".imageURLCard").src = pet.imageURL;

        let birthdate = pet.birthdate;
        card.querySelector("#birthdateCard").textContent = `${birthdate.getUTCDate()}/${birthdate.getMonth()}/${birthdate.getFullYear()}`
        card.querySelector(".priceCard").textContent = pet.price;
        card.querySelector(".petCodeCard").textContent = pet.code;
        
        //still needs sold

        cardRow.append(card);
    })
}

