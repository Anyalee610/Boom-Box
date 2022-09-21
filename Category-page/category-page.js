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


//function for when the button is clicked on 
const searchForRecipes = (event) =>{
    event.preventDefault()

    let name = form.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then(el=> el.json())
    .then(el => {
        console.log(name)
        foodpic.src = el.meals[0].strMealThumb
        foodInstructions.innerText = el.meals[0].strInstructions
        ingredientTiltle.innerText = "Ingredients"
       
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

   
    


 




const data = [{img:"ar", text: "Argentinian"},
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
{img:"sa", text: "Arabian"},
{img:"sk", text: "Slovakian"},
{img:"sy", text: "Syrian"},
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

button.addEventListener('click',searchForRecipes);
countries.addEventListener('click',countriesClickHandler)


