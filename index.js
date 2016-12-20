'use strict';

let usedMethodInfo = document.querySelector('.method-name');
let resultsWrapper = document.querySelector('.results-wrapper');
let requestURLJSON = 'https://jsonplaceholder.typicode.com/users';
let requestURLJSONPost = 'http://jsonplaceholder.typicode.com/posts';
let requestURLJSONP = 'http://run.plnkr.co/plunks/v8xyYN64V4nqCshgjKms/data-2.json';

document.getElementById('control').addEventListener('click', (event) => {

    if (event.target.tagName !== 'BUTTON') return;
    switch (event.target.id) {
        case ('XHR'):
            getDataWithXMLHTTPRequest();
            break;
        case ('fetch'):
            getDataWithFetch();
            break;
        case ('JSONP'):
            getDataWithJSONP();
            break;
        case ('$.ajax'):
            getDataWithJqueryAjax();
            break;
        case ('$.get'):
            getDataWithJqueryGet();
            break;
        case ('$.post'):
            postDataWithJqueryPost();
            break;
    }
});

function displayUsersData(users) {
    resultsWrapper.innerHTML = '';
    let resultsContainer = document.createElement('ul');
    users.forEach((user) => {
        let userContainer = document.createElement('li');
        let nameContainer = document.createElement('p');
        let usernameContainer = document.createElement('p');

        nameContainer.innerHTML = `Name: ${user.name}`;
        usernameContainer.innerHTML = `Username: ${user.username}`;

        userContainer.appendChild(nameContainer);
        userContainer.appendChild(usernameContainer);
        resultsContainer.appendChild(userContainer);
    });
    resultsWrapper.appendChild(resultsContainer);
}

function displaySitesData(websites) {
    resultsWrapper.innerHTML = '';
    let resultsContainer = document.createElement('ul');
    websites.forEach((website) => {
        let websiteContainer = document.createElement('li');
        let domainNameContainer = document.createElement('a');
        let websiteDescriptionContainer = document.createElement('p');

        domainNameContainer.innerHTML = website.domainName;
        domainNameContainer.href = website.domainName;
        websiteDescriptionContainer.innerHTML = website.description;

        websiteContainer.appendChild(domainNameContainer);
        websiteContainer.appendChild(websiteDescriptionContainer);
        resultsContainer.appendChild(websiteContainer);
    });
    resultsWrapper.appendChild(resultsContainer);
}


//Используя нативный XMLHttpRequest
function getDataWithXMLHTTPRequest() {
    let XHR = new XMLHttpRequest();

    XHR.open('GET', requestURLJSON);
    XHR.send();

    XHR.onreadystatechange = () => {
        if (XHR.readyState === XHR.DONE) {
            usedMethodInfo.innerHTML = 'Loaded with native XMLHttpRequest';
            displayUsersData(JSON.parse(XHR.responseText));
        }
    }
}

//Используя нативный fetch
function getDataWithFetch() {
    fetch(requestURLJSON)
        .then((response) => {
            return response.json();
        })
        .then((users) => {
            usedMethodInfo.innerHTML = 'Loaded with native fetch';
            displayUsersData(users);
        });
}

//Обязательно попробовать любой способ с протоколом JSONP
function getDataWithJSONP() {
    window.jsonCallback = (data) => {
        usedMethodInfo.innerHTML = 'Loaded with JSONP';
        displaySitesData(data.sites);
    }
    let script = document.createElement('script');
    script.src = requestURLJSONP;
    document.head.appendChild(script);
}

//Подключите через NPM Jquery и сделайте обращение через $.ajax
function getDataWithJqueryAjax() {
    $.ajax({
        method: 'GET',
        url: requestURLJSON
    })
    .done((users) => {
        usedMethodInfo.innerHTML = 'Loaded with $.ajax';
        displayUsersData(users);
    });
}

//Сделать обращение через $.get $.post
function getDataWithJqueryGet() {
    $.get(requestURLJSON)
    .done((users) => {
        usedMethodInfo.innerHTML = 'Loaded with $.get';
        displayUsersData(users);
    });
}

function postDataWithJqueryPost() {
    let users = [
            {
                name: 'Mergatroid Skittle',
                username: 'Skittles'
            },
            {
                name: 'D\'Jasper Probincrux III',
                username: 'Casper'
            },
            {
                name: 'Vagonius Thicket-Suede',
                username: 'Ticketmaster'
            },
            {
                name: 'Shakiraquan T.G.I.F. Carter',
                username: 'ShakeIt'
            },
            {
                name: 'Takittothu\' Limit',
                username: 'Razor'
            },
            {
                name: 'A.A. Ron Balakey',
                username: 'THE RON'
            }
        ];

    let stringifiedUsers = users.map((user) => JSON.stringify(user));

    $.post( requestURLJSONPost, { 'users': stringifiedUsers } )
    .done((response) => {
        let parsedUsers = response['users[]'].map((user) => JSON.parse(user));
        usedMethodInfo.innerHTML = 'Posted with $.post';
        displayUsersData(parsedUsers);
    });
}
