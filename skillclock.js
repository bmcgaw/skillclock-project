// // Import the functions you need from the SDKs you need
// type = "module";
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



//API call for a photo of specific skill
form.addEventListener('submit', async function (e) {
    try {
        e.preventDefault()
        const picHolder = document.getElementById('skillPicture');
        const skillies = form.elements.newskill.value;
        const res = await axios.get(`https://pixabay.com/api/?key=30040769-6ee627b58a0448d5e4295dfbd&q=${skillies}`)
        const picture = res.data.hits[0].largeImageURL;
        const img = document.createElement('img');
        img.src = picture;
        img.height = 400;
        img.width = 550;
        picHolder.append(img);
    }
    catch {
        e.preventDefault();
        const error = skillPicture.innerHTML = "Sorry no photo"
    }
})

//Button to add skill to list
const add_btn = document.getElementById('add');
add_btn.addEventListener('click', () => {
    const newSkill = document.createElement('li');
    newSkill.innerHTML = `<label class="labels" style="color: lime; font-size: 2em;"><input type="checkbox" class="checkboxes">${skillAdd.value}
    </label>`
    list.appendChild(newSkill);
    return newSkill;
});


//Button to remove skill from the list
const remove_btn = document.getElementById('remove');
remove_btn.addEventListener('click', function deleteSkill() {
    for (let i = 0; i <= checkBoxes.length; i++) {
        if (checkBoxes[i].checked === true) {
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
    totalHours.push(minutes);
    savedTime.innerText = totalHours.reduce((a, b) => a + b);
    console.log(totalHours);
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
    time.innerText = minutes;
}







//Add CSS to app
//Make API call for pictures and link those pictues to
//the value of the skill typed in
//Add feature to select specific skill to start timer for
//After timer is stopped add feature to add that time to skill total
//Make API call to time and/or weather API
//Add an option to remove a skill 