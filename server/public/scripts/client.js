console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    //will load joke history on page load
    getJokes();
    $('#addJokeButton').on('click', postJoke);
}

function postJoke(){
    console.log('in post, button clicked');
    
}//end postJoke 

//get joke history from server
function getJokes(){
    $.ajax({
        method: 'GET',
        url: '/jokeList'
    })
        .then(function(response){
            //and render to client/browser
            renderJokes(response);
        })
        .catch(function(error){
            console.log('in get', error);
            alert('error in GET');
        });
}//end getJokes

function renderJokes(response){
    //empties output list so there isn't any repeating
    $('#outputDiv').empty();
    //loops through joke array and appends joke history to client/browser
    for(let item of response){
        $('#outputDiv').append(`
            <ul>
                <li>${item.whoseJoke} ${item.jokeQuestion} ${item.punchLine}</li>
            </ul>
        `);
    }//end for of loop
}//end renderJokes