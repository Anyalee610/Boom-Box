
const recipeDiv = document.getElementById('recipes')
const foodpic = document.getElementById('foodpic');
const foodInstructions = document.getElementById('foodInstructions')
const ingredient = document.getElementById('ingredient')
const ingredientTiltle = document.getElementById('ingredient-title')
const itemDisplay = document.getElementById('display-item')
const innerDisplay = document.getElementById('inner-display')

function display(){
    innerDisplay.style.display = 'none';
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
    .then(res=> res.json())
    .then(json => json.meals.forEach(meal => {
        let div = document.createElement('div');
        div.setAttribute('class', 'card');
        div.setAttribute('style','width: 18rem;');
        let img = document.createElement('img');
        img.setAttribute('class', 'card-img-top');
        let innerDiv = document.createElement('div');
        innerDiv.setAttribute('class','card-body')
        let p = document.createElement('p');
        p.setAttribute('class','card-text');
        innerDiv.append(p);
        div.append(img,innerDiv)
        const mealName = meal.strMeal;
        const mealPic = meal.strMealThumb;
        const mealId = meal.idMeal;
        div.setAttribute('id',`${mealId}`)
        img.setAttribute('src', `${mealPic}`)
        img.setAttribute('id',`${mealId}`)
        p.setAttribute('id',`${mealId}`)
        p.innerText = mealName
        recipeDiv.append(div)
        
    }))
    

}

recipeDiv.addEventListener('click', (e) => {
    innerDisplay.style.display = 'block';
    recipeDiv.style.display = 'none';
    let nameId = e.target.id
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${nameId}`)
    .then(el=>el.json())
    .then(el => {
        // itemDisplay.style.display='inline'
        foodpic.src = el.meals[0].strMealThumb
        foodInstructions.innerText = el.meals[0].strInstructions
      
        //we reset the innerText for ingredients
        ingredient.innerText = "";
        ingredientTiltle.innerText = "Ingredients"
        //loop to set the foodingredients with the ingredients we fetched
        for(let i = 1; i< 21; i++){
            if(el.meals[0][`strIngredient${i}`]){
                const foodingredients = document.createElement('dd')
                foodingredients.innerText = el.meals[0][`strIngredient${i}`]
                ingredient.appendChild(foodingredients)
            }
        }
       

    })

})

// const searchForRecipes = (e) =>{
//     recipeDiv.style.display = 'none';
//     let nameId = e.target.id 
//     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${nameId}`)
//     .then(el=> el.json())
//     .then(el => {
//         foodpic.src = el.meals[0].strMealThumb
//         foodInstructions.innerText = el.meals[0].strInstructions
      
//         //we reset the innerText for ingredients
//         ingredient.innerText = "";
//         ingredientTiltle.innerText = "Ingredients"
//         //loop to set the foodingredients with the ingredients we fetched
//         for(let i = 1; i< 21; i++){
//             if(el.meals[0][`strIngredient${i}`]){
//                 const foodingredients = document.createElement('dd')
//                 foodingredients.innerText = el.meals[0][`strIngredient${i}`]
//                 ingredient.appendChild(foodingredients)
//             }
//         }
       

//     })
// } 

display()