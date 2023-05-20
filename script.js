"use strict"
let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear();
document.querySelector('.dateBox').innerHTML = output;

setInterval(() => {
    let dd = new Date();
    let hh = dd.getHours();
    let mm = dd.getMinutes();
    let ss = dd.getSeconds();
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;
    document.querySelector('.digital-clock').innerHTML = `${hh} : ${mm} : ${ss}`
})



let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let cron;

document.formMain.start.onclick = () => start();
document.formMain.pause.onclick = () => pause();
document.formMain.reset.onclick = () => reset();
document.formMain.loop.onclick = () => loop();

function loop() {
    document.getElementById('boxStopWatch').innerHTML += document.querySelector('.watcher').textContent
}

function start() {
    pause();
    cron = setInterval(() => {
        timer();
    }, 10);
}

function pause() {
    clearInterval(cron);
}

function reset() {
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;
    document.getElementById('hour').innerText = '00';
    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';
    document.getElementById('millisecond').innerText = '000';
    document.getElementById('boxStopWatch').innerHTML='';
}

function timer() {
    if ((millisecond += 10) === 1000) {
        millisecond = 0;
        second++;
    }
    if (second === 60) {
        second = 0;
        minute++;
    }
    if (minute === 60) {
        minute = 0;
        hour++;
    }
    document.getElementById('hour').innerText = returnData(hour);
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
    document.getElementById('millisecond').innerText = returnData(millisecond);
}
function returnData(input) {
    return input > 10 ? input : `0${input}`
}

let numberTimer = document.querySelector('.setTimerBox')
let buttUp = document.querySelector('.buttPlus')
let buttDown = document.querySelector('.buttMinus')
let time = numberTimer.innerHTML * 60;

buttUp.onclick = () => setTimerUp();
buttDown.onclick = () => setTimerDown();


function setTimerUp() {
    numberTimer.innerHTML = +numberTimer.innerHTML + 1;
    time = numberTimer.innerHTML * 60;

}
function setTimerDown() {
    numberTimer.innerHTML -= 1;
    time = numberTimer.innerHTML * 60;
}

document.watchBoxMain.startTimer.onclick = () => startTimer();
document.watchBoxMain.stopTimer.onclick = () => stopTimer();
document.watchBoxMain.resetTimer.onclick = () => resetTimer();

let stop;
let countdownEl = document.getElementById('countdown');

function startTimer(){
    document.watchBoxMain.startTimer.disabled = true;
    document.watchBoxMain.stopTimer.disabled = false;
    document.watchBoxMain.resetTimer.disabled = false;
    stop = setInterval(updateCountdown, 1000);

    function updateCountdown() {
        let minutes = Math.floor(time / 60);
        let second = time % 60;
        second = second < 10 ? '0' + second : second;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        countdownEl.innerHTML = `${minutes}:${second}`;
        time--;
        if (minutes === '00' && second === '00') {
            time = 0;
        }
    }
}
function stopTimer(){
    clearInterval(stop);
    document.watchBoxMain.startTimer.disabled = false;
    document.watchBoxMain.stopTimer.disabled = true;
    document.watchBoxMain.resetTimer.disabled = false;
}
function resetTimer(){
    document.watchBoxMain.startTimer.disabled = false;
    document.watchBoxMain.stopTimer.disabled = false;
    document.watchBoxMain.resetTimer.disabled = true;
    time = numberTimer.innerHTML * 60;
    clearInterval(stop);
    countdownEl.innerHTML = '00:00'
}

