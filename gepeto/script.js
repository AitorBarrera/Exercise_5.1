document.addEventListener("DOMContentLoaded", () => {
    const petForm = document.getElementById("pet-form");
    const addPetBtn = document.getElementById("addPetBtn");
    const petList = document.getElementById("petList");
  
    let pets = [];
  
    addPetBtn.addEventListener("click", addPet);
  
    function addPet() {
      const petName = document.getElementById("petName").value;
      const description = document.getElementById("description").value;
      const imageUrl = document.getElementById("imageUrl").value;
      const birthdate = document.getElementById("birthdate").value;
      const price = parseFloat(document.getElementById("price").value);
      const petCode = document.getElementById("petCode").value;
      const sold = document.getElementById("sold").checked;
  
      if (!validateForm(petName, imageUrl, birthdate, price, petCode)) return;
  
      const newPet = {
        petName,
        description,
        imageUrl,
        birthdate,
        price,
        petCode,
        sold
      };
  
      pets.push(newPet);
      renderPets();
      petForm.reset();
    }
  
    function validateForm(name, imageUrl, birthdate, price, petCode) {
      const imagePattern = /\.(jpg|jpeg|png|gif)$/i;
      const codePattern = /^[A-Z]{3}[0-9]{3}$/;
  
      if (!name || !description || !imageUrl || !birthdate || !price || !petCode) {
        alert("Please fill out all fields.");
        return false;
      }
  
      if (!imagePattern.test(imageUrl)) {
        alert("Image URL must end in .jpg, .jpeg, .png, or .gif.");
        return false;
      }
  
      if (new Date(birthdate) > new Date()) {
        alert("Birthdate must be in the past.");
        return false;
      }
  
      if (price <= 0) {
        alert("Price must be a positive number.");
        return false;
      }
  
      if (!codePattern.test(petCode)) {
        alert("Pet Code must be in the format ABC123.");
        return false;
      }
  
      if (pets.some(pet => pet.petCode === petCode)) {
        alert("Pet code must be unique.");
        return false;
      }
  
      return true;
    }
  
    function renderPets() {
      petList.innerHTML = "";
  
      pets.forEach((pet, index) => {
        const petDiv = document.createElement("div");
        petDiv.classList.add("pet-profile");
  
        petDiv.innerHTML = `
          <img src="${pet.imageUrl}" alt="${pet.petName}">
          <h3>${pet.petName}</h3>
          <p>${pet.description}</p>
          <p>Birthdate: ${pet.birthdate}</p>
          <p>Price: $${pet.price.toFixed(2)}</p>
          <p>Pet Code: ${pet.petCode}</p>
          ${pet.sold ? '<span class="sold-badge">Sold</span>' : ''}
          <button onclick="toggleSold(${index})">Toggle Sold</button>
          <button onclick="editPet(${index})">Edit</button>
          <button onclick="deletePet(${index})">Delete</button>
        `;
  
        petList.appendChild(petDiv);
      });
    }
  
    window.toggleSold = function(index) {
      pets[index].sold = !pets[index].sold;
      renderPets();
    };
  
    window.editPet = function(index) {
      const pet = pets[index];
      document.getElementById("petName").value = pet.petName;
      document.getElementById("description").value = pet.description;
      document.getElementById("imageUrl").value = pet.imageUrl;
      document.getElementById("birthdate").value = pet.birthdate;
      document.getElementById("price").value = pet.price;
      document.getElementById("petCode").value = pet.petCode;
      document.getElementById("sold").checked = pet.sold;
  
      deletePet(index);
    };
  
    window.deletePet = function(index) {
      pets.splice(index, 1);
      renderPets();
    };
  });
  