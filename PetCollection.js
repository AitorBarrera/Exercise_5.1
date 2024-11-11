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
        let pet = this.pets.find(pet => {
             return petId == pet.code;
        });
        
        return pet;
    }

    editPet(editedPet){
        const searchedPetCode = editedPet.code;

        this.pets.forEach(pet =>{
            if (pet.code == searchedPetCode){
                for (const atributte in pet) {
                    pet[atributte] = editedPet[atributte];
                }
            }
        })
    }

    removePet(petId){
        this.pets = this.pets.filter(pet =>{
                
            return pet.code != petId;
            })
    }
}