//Dom Elements 
const form = document.getElementById('search');
const button = document.getElementById('button');
const foodpic = document.getElementById('foodpic');
const foodInstructions = document.getElementById('foodInstructions');
const ingredient = document.getElementById('ingredient');
const ingredientTiltle = document.getElementById('ingredient-title');
const countries = document.getElementById('countries');
const countriesfood = document.getElementById('countriesfood');
const body = document.querySelector('body')
const itemDisplay = document.getElementById('display-item')
const innerDisplay = document.getElementById('inner-display')
const recipeDiv = document.getElementById('countries')
countries.style.display='flex'
itemDisplay.style.display= 'none'

//function for when the button is clicked on 
const searchForRecipes = (event) =>{
    event.preventDefault()
    countries.style.display ='none'
    let name = form.value;
    if (name.length === 1){
        itemDisplay.style.display = "none";
        countriesfood.innerHTML = ''
        countriesfood.style.display = "flex";
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)
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
            countriesfood.append(div)
            
        
    }))
    button.addEventListener('click',searchForRecipes)
        
    
    }else{fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(el=> el.json())
        .then(el => {
            itemDisplay.style.display = "flex";
            countriesfood.style.display='none'
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
            

        })
        button.addEventListener('click',searchForRecipes)
    
}
}

button.addEventListener('click',searchForRecipes)

const countriesClickHandler = (event) => {
    let countryName = event.target.textContent.trim();
    console.log(countryName)
    countries.style.display='none'
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryName}`)
    .then(el=> el.json())
    .then(meal => meal.meals.forEach(meal => {
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
        div.append(img,innerDiv);
        const mealName = meal.strMeal;
        const mealPic = meal.strMealThumb;
        const mealId = meal.idMeal;
        div.setAttribute('id',`${mealId}`);
        img.setAttribute('src', `${mealPic}`);
        p.innerText = mealName;
        countriesfood.append(div);

    }))
        
        }

   
    


countriesfood.addEventListener('click', (e) => {
    let nameId = e.target.id
    itemDisplay.style.display = 'flex';
    innerDisplay.style.display = 'block';
    countriesfood.style.display = 'none';
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




const data = [
{img:"ca", text: "Canadian"},
{img:"cn", text: "Chinese"},
{img:"dz", text: "Algerian"},
{img:"eg", text: "Egyptian"},
{img:"es", text: "Spanish"},
{img:"fr", text: "French"},
{img:"gb", text: "British"},
{img:"gr", text: "Greek"},
{img:"hr", text: "Croatian"},
{img:"ie", text: "Irish"},
{img:"in", text: "Indian"},
{img:"it", text: "Italian"},
{img:"jm", text: "Jamaican"},
{img:"jp", text: "Japanese"},
{img:"kn", text: "Kenyan"},
{img:"ma", text: "Moroccan"},
{img:"mx", text: "Mexican"},
{img:"my", text: "Malaysian"},
{img:"nl", text: "Dutch"},
{img:"no", text: "Norwegian"},
{img:"pl", text: "Polish"},
{img:"pt", text: "Portuguese"},
{img:"ru", text: "Russian"},
{img:"th", text: "Thai"},
{img:"tn", text: "Tunisian"},
{img:"tr", text: "Turkish"},
{img:"us", text: "American"},
{img:"vn", text: "Vietnamese"},]

const insertFlags = (arrayOfFlags) => {
for (let i = 0; i < arrayOfFlags.length; i++){
    let newDiv = document.createElement('div');
    newDiv.classList.add('pic-country')
    let imgData = data[i].img
    let imgText = data[i].text
    let template = `<img  class = 'foodsimgs' src="/Users/anaya-lambright/Development/unit-6/ESCA-FOODS/image/${imgData}.png">
    <p class = 'foodstext' >${imgText}</p>
    `
    newDiv.innerHTML = template
    
    countries.append(newDiv);
    
}
}
insertFlags(data)

countries.addEventListener('click',countriesClickHandler)



