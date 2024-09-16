let count = document.querySelector(".count span");
let question = document.querySelector(".question");
let choose = document.querySelector(".choose");
let bubbles = document.querySelector(".bubbles");
let submit = document.querySelector(".submit");
let state = document.querySelector(".state");
let trueCount = document.querySelector(".trueCount");
let total = document.querySelector(".total");
let results = document.querySelector(".results");
let timeInfo = document.querySelector(".timeInfo");
let timeAllowedEl = document.querySelector(".timeAllowedEl");
let time = document.querySelector(".time span");

let timeAllowed = 30;
timeAllowedEl.textContent = timeAllowed;

let userAns = {};
let answers = {};
let arr = ["A", "B", "C", "D"];
let trueAns = 0;
let totalQues = 0;
let currentQues = 1;

fetch("./question.json")
  .then((result) => result.json())
  .then((result) => {
    totalQues = result.length;
    for (let i = 0; i < result.length; i++) {
      answers[i + 1] = result[i].answer;
      userAns[i + 1] = "";
      createBullets();
    }

    ques(result);
    coundDown(result);
  });

function coundDown(object) {
  submit.onclick = function () {
    let indexEnabled;
    choose.querySelectorAll("input").forEach((e, index) => {
      e.checked ? (indexEnabled = index) : indexEnabled;
    });
    userAns[currentQues] = arr[indexEnabled];
    clearInterval(countDown);
    currentQues++;
    if (currentQues == totalQues + 1) {
      getResult();
    } else {
      coundDown(object);
      time.textContent = timeAllowed;
      ques(object);
    }
  };
  let countDown = setInterval(function () {
    if (time.textContent != 0) {
      time.textContent--;
    } else {
      let indexEnabled;
      choose.querySelectorAll("input").forEach((e, index) => {
        e.checked ? (indexEnabled = index) : indexEnabled;
      });
      userAns[currentQues] = arr[indexEnabled];
      clearInterval(countDown);
      time.textContent = timeAllowed;
      currentQues++;

      if (currentQues == totalQues + 1) {
        getResult();
      } else {
        coundDown(object);
        ques(object);
      }
    }
  }, 1000);
}

function getResult() {
  results.classList.remove("disabled");
  question.classList.add("disabled");
  timeInfo.classList.add("disabled");
  submit.classList.add("disabled");
  choose.classList.add("disabled");

  for (number in answers) {
    if (answers[number] == userAns[number]) {
      trueAns++;
    }
  }
  if (trueAns > totalQues / 2 && trueAns != totalQues) {
    state.textContent = `Good`;
    state.classList.add("good");
  } else if (trueAns == totalQues) {
    state.textContent = `Perfect`;
    state.classList.add("perfect");
  } else {
    state.textContent = "Bad";
    state.classList.add("bad");
  }
  total.textContent = totalQues;
  trueCount.textContent = trueAns;
}

function ques(object) {
  for (let i = 0; i < arr.length; i++) {
    choose.querySelectorAll("li")[i].querySelector("label").textContent =
      object[currentQues - 1][arr[i]];
  }
  count.textContent = totalQues;
  bubbles.querySelectorAll("span")[currentQues - 1].classList.add("active");
  question.textContent = object[currentQues - 1].question;
}

function createBullets() {
  let span = document.createElement("span");
  bubbles.append(span);
}
