import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, off } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDWMfUinGcVenX73QTkue6ck2A6Ni4IToY",
    authDomain: "skillclock-b4b41.firebaseapp.com",
    databaseURL: "https://skillclock-b4b41-default-rtdb.firebaseio.com",
    projectId: "skillclock-b4b41",
    storageBucket: "skillclock-b4b41.appspot.com",
    messagingSenderId: "179768779495",
    appId: "1:179768779495:web:c26ecb74dbdb390d22f842",
    measurementId: "G-WP2N24HPPW"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const list = document.querySelector('ul');
const skillAdd = document.getElementById("skillAdded");
const checkBoxes = document.getElementsByClassName('checkboxes');
const form = document.getElementById('typedWords');
let master_data_arr = [];

let revamp = window.addEventListener('load', function getData() {
    const timeAndActivity = ref(db, 'appinfo/');
    onValue(timeAndActivity, (snapshot) => {
        off(timeAndActivity);
        const data = snapshot.val();
        master_data_arr = data.masterData;
        for (let i = 0; i < master_data_arr.length; i++) {
            console.log(master_data_arr);
            let aSink = async function () {
                const newSkill_li = document.createElement('li');
                const res = await axios.get(`https://pixabay.com/api/?key=30040769-6ee627b58a0448d5e4295dfbd&q=${master_data_arr[i][0]}`);
                const skill_picture = res.data.hits[0].largeImageURL;
                newSkill_li.innerHTML = `<label class="labels" style="color: lime; font-size: 3em; vertical-align: middle; margin-right: 20px;"><input type="checkbox" class="checkboxes">${master_data_arr[i][0]}<img class="images" style="height: 200px; width: 350px display: inline-block; margin-right: 20px; margin-left: 20px;" src=${skill_picture}></img><div style="text-align: center; background-color: darkblue; color: white; height: 150px; width: 250px; display: inline-block;">${master_data_arr[i][1].toFixed(2)} HRS</div></label>`;
                list.appendChild(newSkill_li);
            }
            aSink();
        }
    })
});

form.addEventListener('submit', async function (e) {
    try {
        e.preventDefault()
        let time_skill_arr = [];
        const newSkill_li = document.createElement('li');
        const res = await axios.get(`https://pixabay.com/api/?key=30040769-6ee627b58a0448d5e4295dfbd&q=${skillAdd.value}`)
        const skill_picture = res.data.hits[0].largeImageURL;
        const starting_time = 0;
        newSkill_li.innerHTML = `<label class="labels" style="color: lime; font-size: 3em; vertical-align: middle; margin-right: 20px;"><input type="checkbox" class="checkboxes">${skillAdd.value}<img class="images" style="height: 200px; width: 350px display: inline-block; margin-right: 20px; margin-left: 20px;" src=${skill_picture}></img><div style="text-align: center; background-color: darkblue; color: white; height: 150px; width: 250px; display: inline-block;">0.00 HRS</div></label>`;
        list.appendChild(newSkill_li);
        time_skill_arr.push(skillAdd.value);
        time_skill_arr.push(starting_time);
        master_data_arr.push(time_skill_arr);
        console.log(master_data_arr);
        skillAdd.value = "";
    }
    catch {
        e.preventDefault();
        const newSkill = document.createElement('li');
        newSkill.innerHTML = `<input type="checkbox" class="checkboxes"><div style="height: 100px; width: 100px; background-color: white; color: black;">Try again!</div>`;
        list.appendChild(newSkill);
        skillAdd.value = "";
    }
})


const remove_btn = document.getElementById('remove');
remove_btn.addEventListener('click', function deleteSkill() {
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            checkBoxes[i].parentElement.remove();
            master_data_arr.splice(i, 1);
        }
    }
});

const start_btn = document.getElementById('start');
const stop_btn = document.getElementById('stop');
const save_btn = document.getElementById('save');
const reset_btn = document.getElementById('reset');
const time = document.getElementById('time');

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let secs = 0;
let minutes = 0;
let hours = 0;

start_btn.addEventListener('click', () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000)
    }
})
stop_btn.addEventListener('click', () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});
reset_btn.addEventListener('click', () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    secs = 0;
    minutes = 0;
    hours = 0;
    time.textContent = "Let's Go!!!";
});

save_btn.addEventListener('click', function save() {
    let practiceTime = (parseInt(hours, 10) + (parseInt(minutes, 10) / 60) + (parseInt(secs, 10) / 3600));
    console.log(practiceTime);
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            master_data_arr[i][1] += practiceTime;
            let savedTime = checkBoxes[i].nextSibling.nextSibling.nextSibling;
            savedTime.innerHTML = `${master_data_arr[i][1].toFixed(2)} HRS`;
        }
    }
    (set(ref(db, 'appinfo/'), {
        masterData: master_data_arr
    }
    ))
});

function updateTime() {

    elapsedTime = Date.now() - startTime;

    secs = Math.floor((elapsedTime / 1000) % 60);
    minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);

    secs = display(secs);
    minutes = display(minutes);
    hours = display(hours);

    time.textContent = `${hours}:${minutes}:${secs}`;

    function display(num) {
        return (('0') + num).length > 2 ? num : "0" + num;
    }

};









