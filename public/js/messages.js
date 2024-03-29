// client side javascript for messages page

// Global variables
var socket;
var button_id;
var namespacesInitialized = [];

function main() {
    const profileId = window.location.search.substring(1); // returns url query w/o "?"
    // get all profile info needed to render user profile
    // add user string later from profileId
    // make below work once server routes work
    get('api/matches', {userId : profileId}, function(matchObj) {
        get('api/profile', {userId: profileId}, function(profile) {
            renderMatches(matchObj, profile.name);
        }, function() {
            console.log("Couldn't access profile :(");
        });
    }, function() {
        console.log("Couldn't access matches :(");
    });

    get('/api/whoami', {}, function(user) {
        renderNavbar(user);
    });

}

function updateSocket(current_user_name, namespace_id, match) {
    // join the correct namespace
    socket = io(namespace_id);

    // set send button id to namespace id so the message goes to the correct match
    var button = document.getElementsByClassName("send-button");
    button_id = namespace_id.substr(1); // remove '/' character at the beginning of namespace_id
    button[0].setAttribute("id", button_id);
    button[0].setAttribute("style", "cursor: pointer;");

    const profileId = window.location.search.substring(1);

    // Only call socket.on() once for each namespace
    var isNamespaceInitialized = false;
    for (var i = 0; i < namespacesInitialized.length; i++) {
        if (namespacesInitialized[i] === namespace_id) {
            isNamespaceInitialized = true;
        }
    }
    if (isNamespaceInitialized === false) {
        socket.on('chat message', function(msg){
            var newMsg = document.createElement('li');
            // newMsg.setAttribute("user", );
            // newMsg.setAttribute("text", );
            console.log("userId: " + msg.userId);
            console.log("profileId: " + profileId);
            newMsg.innerHTML = '<span style="font-weight: 700;">' + msg.userName + ":  " + "</span>" + msg.message;
            if (msg.userId === profileId) {
                console.log(msg.userName);
                newMsg.className = 'user-me';  // marks msg as my msg, css will float right, color, etc.
                newMsg.setAttribute('style','background-color: #81cbea6e;');
            } else {
                newMsg.className = 'user-other';  // same as user-me but for other user
                newMsg.setAttribute('style','background-color: #ced5e0;');
            }
            $('#messages').append(newMsg);  // ($('<li>').text(msg.userName + ": " + msg.message));
            match.messages.push({userName: msg.userName, message: msg.message, userId: msg.userId});
        });
        namespacesInitialized.push(namespace_id);
    }
}

function renderMatches(matchObj, current_user_name){
    const profileId = window.location.search.substring(1); // returns url query w/o "?"
    const matches = matchObj.matches;

    matches.forEach(function(match) {

        const matchBar = document.getElementById("match-bar");
        const matchCard = document.createElement("div");
        const matchBtn = document.createElement("btn");
        // const matchImg = ;  // add match profile later

        const namespace_id = match.namespace;
        // set button ID to socket room id
        matchBtn.setAttribute("id", namespace_id);

        console.log("button id: " + matchBtn.id);
        //console.log("match name = " + match.name);
        matchCard.className = 'm-1 card match-card';
        
        matchBtn.className = 'match-btn'
        matchBtn.setAttribute("type", "button");

        matchBtn.value = match.name;
        matchBtn.innerHTML = '<span class="match-name-span">' + match.name + '</span>';  // put name into span


        //make match btn clickable and render match's meals
        matchBtn.addEventListener("click", function(){
            // render chat prompt
            var chatPrompt = document.getElementById("form");
            if (!chatPrompt) {
                // chat prompt hasn't been rendered
                // render it now
                chatPrompt = document.createElement("form");
                chatPrompt.setAttribute("id", "form");
                chatPrompt.setAttribute("action", "");

                // create input box
                const inputBox = document.createElement("input");
                inputBox.className = "send-button";
                inputBox.setAttribute("id", "id") // The id will be changed later upon calling updateSocket()
                inputBox.setAttribute("autocomplete", "off");

                // create send button
                const sendButton = document.createElement("button");
                sendButton.innerHTML = "Send";

                // Add inputBox and snedButton as children of chatPrompt
                chatPrompt.appendChild(inputBox);
                chatPrompt.appendChild(sendButton);

                // render chatPrompt
                const messagesBar = document.getElementById("messages-bar");
                messagesBar.appendChild(chatPrompt);

                // Create event listener for form once
                $('form').submit(function(){
                    socket.emit('chat message', {
                        userName    : current_user_name,
                        userId      : profileId,
                        message     : $('#' + button_id).val()
                    });
                    $('#' + button_id).val('');
                    return false;
                });
            }

            // on click: Change Column titles: Chat with X, X's Meals
            document.getElementById("chat-title").innerHTML= "Chat with "+ match.name;
            


            // GET meals for that user
            renderMatchMeals(match);

            const namespace_id = this.id;

            renderMessageHistory(namespace_id, match);

            //call updateSocket function to switch the namespace
            updateSocket(current_user_name, namespace_id, match);

        });

        matchCard.appendChild(matchBtn);
        matchBar.appendChild(matchCard);

    });



        function renderMatchMeals(match){
            // FIX THIS!! IMPLEMENT RENDER MEALS STUFF!! to show on meal render bar!!
            // add get request to pull meals from db
            // render meals in rightmost col ("meals-bar")
            const mealsBar = document.getElementById('meals-bar-meal-div');
            mealsBar.innerHTML = "";  // clear HTML before loading new user's meals
            document.getElementById("meal-title").innerHTML= match.name + "'s Meals";
            console.log("in render meals function: match ID = " + match.userId);

            get('api/profile', {userId : match.userId}, function(user) {

                user.meals.forEach(renderMeals);  // render all meals for the match
                }, function() {
                console.log("Couldn't access user data :(");
            });


            function renderMeals(meal, index, arr) {
                // let li = document.createElement('li');
                const card = document.createElement('div');
                card.setAttribute('id', meal.key);
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

                // render dropdwn buttons: they don;t resize well so sonj is taking it out
                // renderDropdown(meal.tagline, 'tagline');
                // renderDropdown(meal.description, 'description');
                // renderDropdown(meal.allergens, 'allergens');
                // renderDropdown(meal.ingredients, 'ingredients');


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
                mealsBar.appendChild(card);
            };
    }
}

function renderMessageHistory(namespace_id, match) {
    const profileId = window.location.search.substring(1);

    // Delete all messages on page
    var messages = document.getElementById("messages");
    while (messages.firstChild) {
        messages.removeChild(messages.firstChild);
    }

    // Add messages for new namespace
    match.messages.forEach(function(msg) {
        var newMsg = document.createElement('li');
        console.log("userId: " + msg.userId);
        console.log("profileId: " + profileId);
        newMsg.innerHTML = '<span style="font-weight: 700;">' + msg.userName + ":  " + "</span>" + msg.message;
        if (msg.userId === profileId) {
            console.log(msg.userName);
            newMsg.className = 'user-me';  // marks msg as my msg, css will float right, color, etc.
            newMsg.setAttribute('style','background-color: #81cbea6e;');
        } else {
            newMsg.className = 'user-other';  // same as user-me but for other user
            newMsg.setAttribute('style','background-color: #ced5e0;');
        }
        $('#messages').append(newMsg);
        // $('#messages').append($('<li>').text(msg.userName + ": " + msg.message));
    });
}

main();
