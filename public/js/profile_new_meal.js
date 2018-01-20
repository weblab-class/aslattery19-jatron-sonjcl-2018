// js for new meal page: CHANGE ALL EXCEPT NAVBAR TO FORMS TO FILL FOR NEW MEALS

function main() {
  const profileId = window.location.search.substring(1);
  get('/api/user', {'_id': profileId}, function(profileUser) {
    renderUserData(profileUser);
  });
  get('/api/whoami', {}, function(user) {
    renderNavbar(user);
  });
}

function renderUserData(user) {
    // rendering name
    // const nameContainer = document.getElementById('name-container');
    // const nameHeader = document.createElement('h1');
    // nameHeader.innerHTML = user.name;
    // nameContainer.prepend(nameHeader);

    // // rendering profile image
    // const profileImage = document.getElementById('profile-image');
    // profileImage.style = 'background-image:url(https://i.pinimg.com/736x/98/e0/7d/98e07decc7c1ca58236995de3567e46a--cat-shirts-kitties-cutest.jpg)';

    // // rendering cookbook
    // const cookbookCard = document.getElementById('cookbook-card');

    // // rendering meals list for cookbook
    // const mealCount = user.meals.length;

    // // make new meal button trigger upload file form
    // const newMealBtn = document.getElementById('new-meal-btn');
    // newMealBtn
    // newMealBtn.className = 'btn delete-btn';
    //     newMealBtn.setAttribute('type', 'button');
    //     newMealBtn.innerHTML = 'Delete';
    //     newMealBtn.addEventListener("click", function(){
    //         newMealBtn.innerHTML = 'Deleted!';
    //         // add image here/popup upload image file and make forms appear
    //         // redirect to add meal page?
    //     });


//     user.meals.forEach(renderMeals);

// // Use bootstrap, see how to make a grid
//     function renderMeals(meal, index, arr) {
//         // let li = document.createElement('li');
//         const card = document.createElement('div');
//         card.setAttribute('id', meal.name);
//         card.className = 'mt-4';

//         const cardBody = document.createElement('div');
//         cardBody.className = 'card-body';
//         card.appendChild(cardBody);

//         const mealImage = document.createElement('img');
//         mealImage.className = 'meal-image';
//         mealImage.setAttribute('src', meal.image);
//         mealImage.className = 'rounded img-fluid';
//         mealImage.setAttribute('style', 'border-radius: 50%;');  // (does nothing) 
//         cardBody.appendChild(mealImage);

//         // make button box div so that buttons are together
//         const btnBox = document.createElement('div')
//         btnBox.className = 'btn-group'

//         renderDropdown(meal.caption, 'caption');
//         renderDropdown(meal.description, 'description');
//         renderDropdown(meal.allergens, 'allergens');
//         renderDropdown(meal.ingredients, 'ingredients');

//         const deleteBtn = document.createElement('button');
//         deleteBtn.className = 'btn delete-btn';
//         deleteBtn.setAttribute('type', 'button');
//         deleteBtn.innerHTML = 'Delete';
//         deleteBtn.addEventListener("click", function(){
//             deleteBtn.innerHTML = 'Deleted!';
//             // delete image here/send request to server to delete, reload page
//         });
//         btnBox.appendChild(deleteBtn);

//         // render dropdown button
//         function renderDropdown(item, itemName) {
//             const dropdownDiv = document.createElement('div');
//             dropdownDiv.className = 'dropdown col-xs-1';
            
//             const dropdownBtn = document.createElement('button');
//             dropdownBtn.className = 'btn btn-secondary dropdown-toggle';
//             dropdownBtn.setAttribute('type', 'button');
//             dropdownBtn.setAttribute('data-toggle', 'dropdown');
//             dropdownBtn.setAttribute('aria-haspopup', 'true');
//             dropdownBtn.setAttribute('aria-expanded', 'false');
//             dropdownBtn.setAttribute('id', 'dropdownMenuButton');
//             dropdownBtn.innerHTML = itemName;
//             dropdownDiv.appendChild(dropdownBtn);
 
//             // rendering dropdown menu
//             const dropdownMenu = document.createElement('div');
//             dropdownMenu.className = 'dropdown-menu';
//             dropdownBtn.setAttribute('aria-labelledby', 'dropdownMenuButton');
//             dropdownDiv.appendChild(dropdownMenu);

//             // FUTURE: ADD MENU ITEM DATA, ONE FOR EACH OF INFO SECTIONS
//             // i.e. ingredients, allergy warnings
//             const menuItem = document.createElement('a');
//             menuItem.className = 'dropdown-item';
//             menuItem.innerHTML = item;

//             // add blurb
//             dropdownMenu.appendChild(menuItem);

//             btnBox.appendChild(dropdownDiv);
//             // btnBox.setAttribute('id', meal.key + '-btnbox');
//             card.appendChild(btnBox);
//             // card.setAttribute('id', meal.key + '-card');


//         };

//         cookbookCard.appendChild(card);
//         // mealList.appendChild(card);
//     };

//     // cookbookCard.appendChild(mealCards);

}

main();


/* 
notes:
upload new meal button will send all info to server, confirm submission, 
then redirect to edit page

use modal for new meal, have invisible when edit page is first loaded, 
then add meal triggers visibility and lets users submit new meal


*/
