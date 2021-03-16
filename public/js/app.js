console.log('Client side javascript file is loaded');

// Use the 'fetch' browser API for client side fetching of information
// This will call an async I/O operation, very similiar to a Request in Node.js
/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});
*/

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From JavaScript';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();    

    const location = search.value;

    // While loading, render 'loading message' for '#message-1' and empty for '#message-2'
    messageOne.textContent = 'Data is loading';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {            

            if (data.error){
                // console.log("error");
                messageOne.textContent = 'error';
            } else {
                // console.log(data.location);
                // console.log(data.forecast);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }        
        });
    });

    // console.log(location);
});