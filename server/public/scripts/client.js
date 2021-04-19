console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
}

//get joke history from server
function getJokes(){
    $ajax.({
        method: 'GET',
        url: '/jokeList'
    })
    .then(function(response){
        //and append to client/browser
        //renderJokes(response);
    })
    .catch(function(error){
        console.log('in get', error);
        alert('error in GET');
    });
}//end getJokes