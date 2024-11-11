import PetsCollection from './PetCollection.js';

// Form alidation
(function () {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        const buttonForm = form.querySelector('.needs-validation button');
        buttonForm.addEventListener('click', function (event) {
            // HTML5 validation
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            //petCode validation
            let petCodeInput = document.getElementById('petCode');
            let petCodeValue = petCodeInput.value;

            if (petList.pets.find(pet => pet.petCode == petCodeValue) != null) {
                petCodeInput.setCustomValidity('The pet code cannot repeated');
                const validationMessage = document.querySelector('#petCode + div');

                validationMessage.textContent = "The pet code cannot repeated";

            } else {
                petCodeInput.setCustomValidity('');
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

//Adding a pet
const form = document.querySelector('form#addPet');
const buttonForm = document.querySelector('.needs-validation button');

buttonForm.addEventListener("click", function (event) {
    if (form.checkValidity()){
        event.preventDefault();
        event.stopPropagation();

        let birthdate = form.querySelector("input#birthdate").value.split("-");
        const newPet = {
            name: form.querySelector("input#name").value,
            description: form.querySelector("textarea#description").value,
            imageURL: form.querySelector("input#imageURL").value,
            birthdate: new Date(birthdate[0], birthdate[1]-1, birthdate[2]),
            price: Number.parseInt(form.querySelector("input#price").value),
            
            code: form.querySelector("input#petCode").value,
            sold: form.querySelector("input#sold").checked
        }

        petList.addPet(newPet);
        resetForm(form);
        // autofillForm(form);
        renderPets(petList.pets);
        
        //Close modal windows;
        const buttonCloseModalAdd = document.querySelector('#buttonCloseModalAdd');
        buttonCloseModalAdd.click();
    }
})

//Testing
// autofillForm(form);

// Declaring inicial pet list
let petsDefault = [
    { 
        name: "Milo", 
        description: "Milo is an energetic tabby cat with a short, striped coat and sharp green eyes.", 
        imageURL: "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_960_720.jpg", 
        birthdate: new Date(2021, 9, 9), 
        price: 12.30, 
        code: 'MIL303', 
        sold: false
    },
    { 
        name: "Oliver", 
        description: "Oliver is a plump, cheerful orange with big amber eyes and a dash of white on his nose.", 
        imageURL: "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_960_720.jpg", 
        birthdate: new Date(2017, 3, 5), 
        price: 30.50, 
        code: 'OLI404', 
        sold: true
    },
    { 
        name: "Bella", 
        description: "Daisy is a calm, small French bulldog with a smooth brindle coat and a wrinkled face.", 
        imageURL: "https://placedog.net/500/280?id=1", 
        birthdate: new Date(2018, 6, 14), 
        price: 25.99, 
        code: 'BEL001', 
        sold: false
    },
    { 
        name: "Daisy", 
        description: "Bella is a gentle, loyal golden retriever with a soft golden coat and warm brown eyes.", 
        imageURL: "https://placedog.net/500/280?id=3", 
        birthdate: new Date(2021, 4, 27), 
        price: 22.50, 
        code: 'DAI505', 
        sold: false
    },
    { 
        name: "Coco", 
        description: "Meet Luna, an adorable husky puppy with striking blue eyes and a soft, fluffy coat in shades of black, gray, and white. She's full of energy, curiosity, and a playful spirit that lights up any room she enters.", 
        imageURL: "https://placedog.net/500/280?id=5", 
        birthdate: new Date(2020, 5, 17), 
        price: 24.20, 
        code: 'COC909', 
        sold: true
    }
];


let petList = new PetsCollection(petsDefault);

renderPets(petList.pets);

//Creating cards
function renderPets(pets) { 
    
    const cardRow = document.querySelector("#cardRow");
    cardRow.innerHTML = "";

    const templateCards = document.querySelector("#cardTemplate").content;
    
    pets.forEach(pet =>{
        let card = templateCards.cloneNode(true);
        
        card.querySelector(".nameCard").textContent = pet.name;

        if (pet.description.length > 100) {
            card.querySelector(".descriptionCard").innerHTML = `${pet.description.substring(0,100)}...`
            card.querySelector("#showDescription").setAttribute('data-id',pet.code);
        } else {
            card.querySelector(".descriptionCard").parentElement.textContent = pet.description;
        }
        
        card.querySelector(".imageURLCard").src = pet.imageURL;

        let birthdate = pet.birthdate;
        
        card.querySelector("#birthdateCard").textContent = `${birthdate.getDate()}/${birthdate.getMonth()+1}/${birthdate.getFullYear()}`
        
        card.querySelector(".petCodeCard").textContent = pet.code;
        card.querySelectorAll(".icons a").forEach(button =>{
            button.setAttribute("data-id", pet.code);
        })
        
        if(pet.sold){
            card.querySelector(".priceCard").textContent = "SOLD";    
        } else {
            card.querySelector(".soldTitle").textContent = '';
            card.querySelector(".priceCard").textContent = `${pet.price}€`;
        }

        //Edit and delete pets with cardButtons
        const cardButtons = card.querySelectorAll(".card a");

        cardButtons.forEach(button =>{
            button.addEventListener("click", event =>{
                event.preventDefault();
                event.stopPropagation();

                let button = event.target.parentNode;

                let petCode = event.target.parentNode.getAttribute("data-id");

                if (button.id == 'soldIcon'){
                    let petToToggleSold = petList.getPetById(petCode);

                    petToToggleSold.sold = !petToToggleSold.sold;

                    petList.editPet(petToToggleSold);
                    renderPets(petList.pets);
                }

                if (button.id == 'deleteIcon'){
                    console.log(petList.pets);
                    
                    petList.removePet(petCode);
                    renderPets(petList.pets);
                }

                if (button.id == 'editIcon'){
                    let petToEdit = petList.getPetById(petCode);
                    
                    let editForm = document.querySelector('form#editPet');
                    document.querySelector('#petNameEditForm').textContent = petToEdit.name;
                    document.querySelector('#petCodeEditForm').textContent = petToEdit.code;

                    autofillForm(editForm,
                        petToEdit.name,
                        petToEdit.description,
                        petToEdit.imageURL,
                        petToEdit.birthdate,
                        petToEdit.price,
                        petToEdit.code,
                        petToEdit.sold,
                    )
                    
                }
            })
        })


        //Show description
        const buttonShowDescription = card.querySelector("#showDescription");
        console.log(buttonShowDescription);

        if (buttonShowDescription != null){
            buttonShowDescription.addEventListener("click", event =>{
                const petCode = buttonShowDescription.getAttribute("data-id");
                const description = petList.getPetById(petCode).description;
                
                const descriptionElement = buttonShowDescription.parentElement.querySelector(".descriptionCard");
                console.log(descriptionElement);
                
        
                if (descriptionElement.classList.contains('descriptionHidden')){
                    descriptionElement.innerHTML = `${description}`
                    descriptionElement.classList.remove('descriptionHidden');
                    buttonShowDescription.querySelector("i").style.rotate = "180deg"
        
                } else {
                    descriptionElement.innerHTML = `${description.substring(0,100)}...`
                    descriptionElement.classList.remove('descriptionHidden');descriptionElement.classList.add('descriptionHidden');
                    buttonShowDescription.querySelector("i").style.rotate = "0deg"
                }
            })
        }

        cardRow.append(card);
    })
}

//Edit pet form
const formEdit = document.querySelector('form#editPet');
const buttonFormEdit = formEdit.querySelector('button');

buttonFormEdit.addEventListener("click", function (event) {
    if (formEdit.checkValidity()){
        event.preventDefault();
        event.stopPropagation();

        let birthdate = formEdit.querySelector("input#birthdate").value.split("-");
        const editedPet = {
            name: formEdit.querySelector("input#name").value,
            description: formEdit.querySelector("textarea#description").value,
            imageURL: formEdit.querySelector("input#imageURL").value,
            birthdate: new Date(birthdate[0], birthdate[1]-1, birthdate[2]),
            price: Number.parseFloat(formEdit.querySelector("input#price").value),
            code: formEdit.querySelector("input#petCode").value,
            sold: formEdit.querySelector("input#sold").checked
        }

        petList.editPet(editedPet);
        resetForm(formEdit);
        renderPets(petList.pets);

        //Close modal windows;
        const buttonCloseModalEdit = document.querySelector('#buttonCloseModalEdit');
        buttonCloseModalEdit.click();
    }
})

//Reset form after adding or updating pet
function resetForm(form) {
    form.classList.remove('was-validated');
    const inputsForm = form.querySelectorAll("input, textarea");
    const checkboxForm = form.querySelector("input[type='checkbox']");
    checkboxForm.checked = false;
    
    inputsForm.forEach(input => {
        input.value = '';
    })
}

//Toggle modal windown
function toggleModal() {
    const modalWindown = document.querySelector("#modalWindown");
    
    if (modalWindown.classList.contains("show")) {
        modalWindown.classList.remove("show");

    } else {
        modalWindown.classList.add("show");
    }
}

//Autofill form
function autofillForm(
    form,
    name = "Pepe", 
    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quaerat itaque distinctio nesciunt perspiciatis necessitatibus expedita.", 
    imageURL = "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1xw:0.99967xh;center,top&resize=1200:*", 
    birthdate = '', 
    price = "55", 
    petCode = '', 
    sold = false) {
        form.querySelector("input#name").value = name;
        form.querySelector("textarea#description").value = description;
        form.querySelector("input#imageURL").value = imageURL;

        if (birthdate != '') {
            form.querySelector("input#birthdate").value = birthdate.toISOString().substring(0, 10)
        }

        form.querySelector("input#price").value = price;

        if (form.querySelector("input#petCode") != null)
            form.querySelector("input#petCode").value = petCode;

        form.querySelector("input#sold").checked = sold;
}