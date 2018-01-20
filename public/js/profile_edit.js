/*
To be handled: make editpage responsive to edits:
let user 
        type into bio/give input
        add meals (image, name, allergens)
        delete meals

IMPLEMENT "DONE" BUTTON
         
*/
// bloop

function main() {
  const profileId = window.location.search.substring(1);

  get('api/profile', {userId : profileId}, function(profileUser) {
    renderUserData(profileUser);
    }, function() {
    console.log("Couldn't access user data :(");
    });

  get('/api/whoami', {}, function(user) {
    renderNavbar(user);
  });
}

function renderUserData(user) {
    const userId = user.userId;
    // rendering name
    const nameContainer = document.getElementById('name-container');
    const nameHeader = document.createElement('h1');
    nameHeader.innerHTML = user.name;
    nameContainer.prepend(nameHeader);

    // rendering school
    const schoolHeader = document.createElement('h2');
    nameHeader.appendChild(schoolHeader);

    //render profile pic
    const profileImage = document.getElementById('user-profile-image');
    profileImage.setAttribute('src', user.profilePicture);

    // render bio w/jquery, let user edit
    // NEED TO MAKE DONE BUTTON MAKE BIO POST REQUEST
    $("#user-bio-text").html(user.bio);

    //upload new meal!
    const addMealBtn = document.getElementById("add-meal-btn");
    addMealBtn.addEventListener("click", function(){
        const newMealImg = $("#new-meal-image").value;
        console.log(newMealImg); // test

        const newMealTagline = document.getElementById("new-meal-tagline").value;
        // console.log(newMealTagline);
        const newMealDescription = document.getElementById("new-meal-description").value;
        // console.log(newMealDescription);
        const newMealIngredients = document.getElementById("new-meal-ingredients").value;
        // console.log(newMealIngredients);
        const newMealAllergens = document.getElementById("new-meal-allergens").value;
        // console.log(newMealAllergens);

        // make JSON bio obj
        const newMealObject = {};
        newMealObject.userId = userId;
        newMealObject.meal = {};
        newMealObject.meal.path = newMealImg;
        newMealObject.meal.tagline = newMealTagline;
        newMealObject.meal.description = newMealDescription;
        newMealObject.meal.ingredients = newMealIngredients;
        newMealObject.meal.allergens = newMealAllergens;
        console.log(newMealObject);

        post('api/upload_meal', newMealObject, function() {
            console.log("meal uploaded!");
            }, function() {
            console.log("Couldn't add meal");
            });
    });

    // rendering cookbook
    const cookbookCard = document.getElementById('cookbook-card');
    user.meals.forEach(renderMeals);

    function renderMeals(meal, index, arr, user) {
        const card = document.createElement('div');
        card.setAttribute('id', meal.name);
        card.className = 'mt-4';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        card.appendChild(cardBody);

        const mealImage = document.createElement('img');
        mealImage.className = 'meal-image-url';
        mealImage.setAttribute('src', meal.url);
        mealImage.className = 'rounded img-fluid';
        cardBody.appendChild(mealImage);

        // make button box div so that buttons are together
        const btnBox = document.createElement('div')
        btnBox.className = 'btn-group'

        renderDropdown(meal.tagline, 'tagline');
        renderDropdown(meal.description, 'description');
        renderDropdown(meal.allergens, 'allergens');
        renderDropdown(meal.ingredients, 'ingredients');

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn delete-btn';
        deleteBtn.setAttribute('type', 'button');
        deleteBtn.innerHTML = 'Delete';

        // delete image here/send request to server to delete, reload page
        deleteBtn.addEventListener("click", function(){
            // make JSON delete obj
            const deleteMealObject = {};
            deleteMealObject.mealKey = meal.key;
            // console.log(deleteMealObject);
            //post JSON delete obj
            post('api/delete_meal', deleteMealObject, function() {
            console.log("meal deleted!");
            }, function() {
            console.log("Couldn't delete meal :(");
            });
            // make deleted meal hidden:
            card.style.display = "none";
        }); 
        btnBox.appendChild(deleteBtn);

        // make change bio buttton functional 
        const changeBioBtn = document.getElementById("change-bio-btn");
        changeBioBtn.addEventListener("click", function(){
            const newUserBioText = document.getElementById("user-bio-text").innerHTML;
            // make JSON bio obj
            const newBioObject = {};

            newBioObject.userId = user.userId;
            newBioObject.bio = newUserBioText;
            //post JSON bio obj
            post('api/bio', newBioObject, function() {
            console.log("bio uploaded!");
            }, function() {
            console.log("Couldn't change bio");
            });
        });


        // render dropdown button
        function renderDropdown(item, itemName) {
            const dropdownDiv = document.createElement('div');
            dropdownDiv.className = 'dropdown col-xs-1';
            
            const dropdownBtn = document.createElement('button');
            dropdownBtn.className = 'btn btn-secondary dropdown-toggle';
            dropdownBtn.setAttribute('type', 'button');
            dropdownBtn.setAttribute('data-toggle', 'dropdown');
            dropdownBtn.setAttribute('aria-haspopup', 'true');
            dropdownBtn.setAttribute('aria-expanded', 'false');
            dropdownBtn.setAttribute('id', 'dropdownMenuButton');
            dropdownBtn.innerHTML = itemName;
            dropdownDiv.appendChild(dropdownBtn);
 
            // rendering dropdown menu
            const dropdownMenu = document.createElement('div');
            dropdownMenu.className = 'dropdown-menu';
            dropdownBtn.setAttribute('aria-labelledby', 'dropdownMenuButton');
            dropdownDiv.appendChild(dropdownMenu);

            // FUTURE: ADD MENU ITEM DATA, ONE FOR EACH OF INFO SECTIONS
            // i.e. ingredients, allergy warnings
            const menuItem = document.createElement('a');
            menuItem.className = 'dropdown-item';
            menuItem.innerHTML = item;

            // add blurb
            dropdownMenu.appendChild(menuItem);

            btnBox.appendChild(dropdownDiv);
            // btnBox.setAttribute('id', meal.key + '-btnbox');
            card.appendChild(btnBox);
            // card.setAttribute('id', meal.key + '-card');


        };

        cookbookCard.appendChild(card);
        // mealList.appendChild(card);
    };

    // cookbookCard.appendChild(mealCards);

}

main();
