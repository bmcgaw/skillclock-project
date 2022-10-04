
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

const timeKeeper = document.getElementsByClassName('trackedTime');
timeKeeper.innerText = "Festivus";

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

//Time tracker
// const timeElapsed = document.querySelector('#skillClockTimer #time');
// const start_btn = document.getElementById("start");
// const stop_btn = document.getElementById("stop");
// const reset_btn = document.getElementById("reset");

// let seconds = 0;
// let interval = null;

// start_btn.addEventListener('click', function start() {
//     if (interval) {
//         return
//     } interval = setInterval(timer, 1000);
// });

// stop_btn.addEventListener("click", function stop() {
//     clearInterval(interval);
//     interval = null;
// });

// reset_btn.addEventListener("click", function reset() {
//     stop();
//     seconds = 0;
//     timeElapsed.innerText = "00:00:00";
// });

// function timer() {
//     seconds++;

//     let hrs = Math.floor(seconds / 3600);
//     let mins = Math.floor((seconds - (hrs * 3600)) / 60);
//     let secs = seconds % 60;

//     if (secs < 10) { secs = "0" + secs; }
//     if (mins < 10) { mins = "0" + mins; }
//     if (hrs < 10) { hrs = "0" + hrs; }

//     timeElapsed.innerText = `${hrs}:${mins}:${secs}`;
// }

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