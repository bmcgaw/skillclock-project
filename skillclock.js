// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyDWMfUinGcVenX73QTkue6ck2A6Ni4IToY",
//     authDomain: "skillclock-b4b41.firebaseapp.com",
//     projectId: "skillclock-b4b41",
//     storageBucket: "skillclock-b4b41.appspot.com",
//     messagingSenderId: "179768779495",
//     appId: "1:179768779495:web:c26ecb74dbdb390d22f842",
//     measurementId: "G-WP2N24HPPW"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const list = document.querySelector('ul');
const skillAdd = document.getElementById("skillAdded");
const listItems = document.querySelector('li');
const checkBoxes = document.getElementsByClassName('checkboxes');
const labels = document.getElementsByClassName('labels');
const form = document.getElementById('typedWords');
const timeTime = document.getElementById('savedTime');


form.addEventListener('submit', async function (e) {
    try {
        e.preventDefault()
        const picHolder = document.getElementById('skillPicture');
        let skillies = form.elements.newskill.value;
        const res = await axios.get(`https://pixabay.com/api/?key=30040769-6ee627b58a0448d5e4295dfbd&q=${skillies}`)
        const picture = res.data.hits[0].largeImageURL;
        const newSkill = document.createElement('li');
        newSkill.innerHTML = `<label class="labels" style="color: lime; font-size: 3em; vertical-align: middle; margin-right: 20px;"><input type="checkbox" class="checkboxes">${skillAdd.value}
        <img style="height: 200px; width: 350px display: inline-block; margin-right: 20px;" src=${picture}></img><div style="text-align: center; background-color: darkblue; color: white; height: 150px;
        width: 250px; display: inline-block;"></div></label>`;
        list.appendChild(newSkill);
        skillAdd.value = "";
    }
    catch {
        e.preventDefault();
        const newSkill = document.createElement('li');
        newSkill.innerHTML = `<div style="height: 100px; width: 100px; background-color: white; color: black;">Try again!</div>`;
        list.appendChild(newSkill);
        skillAdd.value = "";
    }
})


const remove_btn = document.getElementById('remove');
remove_btn.addEventListener('click', function deleteSkill() {
    for (let i = 0; i <= checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            checkBoxes[i].parentElement.remove();
        }
    }
});

const start_btn = document.getElementById('start');
const stop_btn = document.getElementById('stop');
const save_btn = document.getElementById('save');
const reset_btn = document.getElementById('reset');
const time = document.getElementById('time');
const total = document.getElementById('savedTime');

let seconds = 0;
let minutes = 0;
let hours = 0;
let interval = null;
let totalHours = [];

start_btn.addEventListener('click', function start() {
    if (interval) {
        return
    } interval = setInterval(timer, 1000);
});

stop_btn.addEventListener('click', function stop() {
    clearInterval(interval);
    interval = null;
});

save_btn.addEventListener('click', function save() {
    for (let i = 0; i <= checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            let totalHours = [];
            totalHours.push(minutes);
            let toteTime = totalHours.reduce((a, b) => (a + b)) / 60;
            checkBoxes[i].nextSibling.nextSibling.nextSibling.innerText = `${toteTime.toFixed(2)} HRS`;
        }
    }
})

reset_btn.addEventListener('click', function reset() {
    stop();
    minutes = 0;
    seconds = 0;
    time.innerText = "Let's Go!!!";
})

function timer() {
    seconds++;
    if (seconds % 60 === 0) {
        seconds = 0;
        minutes++;
    }
    if (minutes % 60 === 0) {
        minutes = 0;
        hours++;
    }
    time.innerText = `${minutes} MIN`;
}