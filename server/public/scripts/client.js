console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    //will load joke history on page load
    getJokes();
    //hey jQ, on click of the button with the id of addJokeButton run postJoke
    $('#addJokeButton').on('click', postJoke);
}

//captures input values, bundles them into an object...
function postJoke(){
    //console.log('in post, button clicked');
    let jokeObject = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val()
    }
    //and sends them to the sever via POST request...
    $.ajax({
        method: 'POST',
        url: '/jokeBook',
        data: jokeObject
    })
    //and calls getJokes functions to get the joke history back from the server
    .then(function(response){
        console.log('response', response);
        getJokes();
    })
    .catch(function(error){
        console.log('in post', error);
        alert('error in POST');
    });

    //resets input fields to empty strings
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}//end postJoke 

//get joke history from server
function getJokes(){
    $.ajax({
        method: 'GET',
        url: '/jokeBook'
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