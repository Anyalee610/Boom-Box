//Dom Elements 
const form = document.getElementById('search');
const button = document.getElementById('button');
const foodpic = document.getElementById('foodpic');
const foodInstructions = document.getElementById('foodInstructions');
const ingredient = document.getElementById('ingredient');
const ingredientTiltle = document.getElementById('ingredient-title');
const oneRecipe = document.getElementById('one-recipe');
const mealinfo = document.getElementsByClassName('nav-item meal-type');
const homesearch = document.getElementById('home-search');
const recipeDiv = document.getElementById('recipes');
const itemDisplay = document.getElementById('display-item');
const innerDisplay = document.getElementById('inner-display');
const title = document.getElementById('title');

itemDisplay.style.display = "none";

fetch(`https://www.themealdb.com/api/json/v2/9973533/latest.php`)
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



//function for when the button is clicked on 
 const searchForRecipes = (event) =>{
    itemDisplay.style.display = "none";
    title.style.display = "none"
    recipeDiv.innerHTML= ""
    event.preventDefault()

    let name = form.value;
    if (name.length === 1){
        itemDisplay.style.display = "none";
        recipeDiv.innerHTML = ''
        recipeDiv.style.display = "flex";
        fetch(`https://www.themealdb.com/api/json/v2/9973533/search.php?f=${name}`)
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
    button.addEventListener('click',searchForRecipes)
        
    
    }else{
        itemDisplay.style.display = "flex";
        recipeDiv.style.display='none'
        fetch(`https://www.themealdb.com/api/json/v2/9973533/search.php?s=${name}`)
        .then(el=> el.json())
        .then(el => {
            console.log(name)
            foodpic.src = el.meals[0].strMealThumb
            foodInstructions.innerText = el.meals[0].strInstructions
            ingredientTiltle.innerText = "Ingredients"
            
            //we reset the innerText for ingredients
            ingredient.innerText = "";
            ingredient.appendChild(ingredientTiltle)
            //loop to set the foodingredients with the ingredients we fetched
            for(let i = 1; i< 30; i++){
                if(el.meals[0][`strIngredient${i}`]){
                    const foodingredients = document.createElement('dd')
                    foodingredients.innerText = el.meals[0][`strIngredient${i}`]
                    ingredient.appendChild(foodingredients)
                }
            }
            button.addEventListener('click',searchForRecipes)

        })
        
}
}
button.addEventListener('click',searchForRecipes)

recipeDiv.addEventListener('click', (e) => {
    itemDisplay.style.display = 'flex';
    innerDisplay.style.display = 'block';
    recipeDiv.style.display = 'none';
    let nameId = e.target.id
    fetch(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${nameId}`)
    .then(el=>el.json())
    .then(el => {
        // itemDisplay.style.display='inline'
        foodpic.src = el.meals[0].strMealThumb
        foodInstructions.innerText = el.meals[0].strInstructions
      
        //we reset the innerText for ingredients
        ingredient.innerText = "";
        ingredientTiltle.innerText = "Ingredients"

        ingredient.append(ingredientTiltle)

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