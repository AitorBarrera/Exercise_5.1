export default class PetsCollection{
    constructor(pets = []){
        this.pets = pets;
    }

    addPet(newPet){
        this.pets.push(newPet);
    }

    displayPets(){
        console.log(this.pets);
    }

    getPets(){
        return this.pets;
    }

    getPetById(petId){
        return this.pets.filter(pet => {
            petId == pet.id;
        })
    }
}