
const recipeDiv = document.getElementById('recipes')
const foodpic = document.getElementById('foodpic');
const foodInstructions = document.getElementById('foodInstructions')
const ingredient = document.getElementById('ingredient')
const ingredientTiltle = document.getElementById('ingredient-title')
const itemDisplay = document.getElementById('display-item')
const innerDisplay = document.getElementById('inner-display')
const mealinfo = document.getElementsByClassName('meal-type')
const eachMealType1 = mealinfo[0]
const eachMealType2 = mealinfo[1]
const eachMealType3 = mealinfo[2]
const eachMealType4 = mealinfo[3]
let displayName;
eachMealType1.addEventListener('click', function(e){
        e.preventDefault();
        recipeDiv.style.display = 'flex';
        itemDisplay.style.display = 'none';
        displayName = e.target.textContent
        recipeDiv.innerHTML = ''
        display()
    })

eachMealType2.addEventListener('click', function(e){
        e.preventDefault();
        recipeDiv.style.display = 'flex';
        itemDisplay.style.display = 'none';
        displayName = e.target.textContent;
        recipeDiv.innerHTML = '';
        display()
})
eachMealType3.addEventListener('click', function(e){
        e.preventDefault();
        recipeDiv.style.display = 'flex';
        itemDisplay.style.display = 'none';
        displayName = e.target.textContent
        recipeDiv.innerHTML = ''
        display()
})
eachMealType4.addEventListener('click', function(e){
        e.preventDefault();
        recipeDiv.style.display = 'flex';
        itemDisplay.style.display = 'none';
        displayName = e.target.textContent
        recipeDiv.innerHTML = ''
        display()
})




// eachMealType.forEach(el => {
//     el.addEventListener("click", function(){
//         displayName = el.textContent
//         console.log(displayName)
//     })
// })

//console.log(displayName)
//console.log(eachMealType[0].textContent)
function display(){
    
    innerDisplay.style.display = 'none';
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${displayName}`)
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
    itemDisplay.style.display = 'flex';
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
        ingredient.appendChild(ingredientTiltle)
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

//display()