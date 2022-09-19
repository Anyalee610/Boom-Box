//Dom Elements 
const form = document.forms[0][0];
const button = document.getElementById('button');
const foodpic = document.getElementById('foodpic');
const foodInstructions = document.getElementById('foodInstructions')
const ingredient = document.getElementById('ingredient')

//function for when the button is clicked on 
const searchForRecipes = () =>{
    let name = form.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then(el=> el.json())
    .then(el => {
        foodpic.src = el.meals[0].strMealThumb
        foodInstructions.innerText = el.meals[0].strInstructions

        //we reset the innerText for ingredients
        ingredient.innerText = "";
         
        //loop to set the foodingredients with the ingredients we fetched
        for(let i = 1; i< 30; i++){
            if(el.meals[0][`strIngredient${i}`]){
                const foodingredients = document.createElement('dd')
                foodingredients.innerText = el.meals[0][`strIngredient${i}`]
                ingredient.appendChild(foodingredients)
            }
        }
       

    })
    


}

button.addEventListener('click',searchForRecipes)
