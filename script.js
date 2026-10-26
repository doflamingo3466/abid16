let questions = [
    { q: "Which HTML tag is used to create an input?", o: ["div", "span", "p", "input"], a: 3 },
    { q: "Which HTML attribute connects a label to an input using its ID?", o: ["class", "name", "for", "value"], a: 2 },
    { q: "Which CSS property changes the background color?", o: ["color", "background-color", "font-color", "style"], a: 1 },
    { q: "Which CSS property adds rounded corners to a card?", o: ["border-style", "border-radius", "corner-size", "box-radius"], a: 1 },
    { q: "Which JavaScript keyword declares a variable that can be reassigned?", o: ["const", "let", "fixed", "static"], a: 1 },
    { q: "Which method selects an HTML element using its ID?", o: ["document.getElementById()", "document.getClass()", "document.selectId()", "document.findElement()"], a: 0 },
    { q: "What does innerHTML allow JavaScript to do?", o: ["Change the page URL", "Add or replace HTML content inside an element", "Save data permanently", "Change the browser settings"], a: 1 },
    { q: "Which event occurs when a form is submitted?", o: ["onclick", "onchange", "onsubmit", "onload"], a: 2 },
    { q: "Which array property tells you how many items it contains?", o: ["size", "count", "length", "total"], a: 2 },
    { q: "Which browser feature can store data between page reloads?", o: ["innerHTML", "localStorage", "getElementById()", "classList"], a: 1 }
];


let i = 0, score = 0;
let student = {}, history = JSON.parse(localStorage.getItem("history")) || [];

let studentForm = document.getElementById("studentForm");
let quiz = document.getElementById("quiz");
let quizForm = document.getElementById("quizForm");
let question = document.getElementById("question");
let number = document.getElementById("number");
let options = document.getElementById("options");
let result = document.getElementById("result");
let historyBox = document.getElementById("history");
let clearHistory = document.getElementById("clearHistory");

function showHistory() {
    historyBox.innerHTML = history.map((h, i) =>
        `<div class="history-item">Name: ${h.name}<br> Roll NO: ${h.roll}<br> Marks: ${h.score}/10
        <button class="btn btn-sm btn-outline-danger float-end" onclick="deleteResult(${i})">Delete</button></div>`
    ).join("") || "<p class='subtitle'>No previous results.</p>";
}

function deleteResult(i) {
    history.splice(i, 1);
    localStorage.setItem("history", JSON.stringify(history));
    showHistory();
}

function showQuestion() {
    question.innerText = questions[i].q;
    number.innerText = `Question ${i + 1} of ${questions.length}`;
    options.innerHTML = questions[i].o.map((o, j) =>
        `<label class="option"><input type="radio" name="answer" value="${j}" required>${o}</label>`
    ).join("");
}

studentForm.onsubmit = e => {
    e.preventDefault();
    student.name = document.getElementById("studentName").value;
    student.roll = document.getElementById("rollNumber").value;

    studentForm.hidden = true;
    quiz.hidden = false;
    showQuestion();
};

quizForm.onsubmit = e => {
    e.preventDefault();

    if (+new FormData(quizForm).get("answer") === questions[i].a) score++;

    if (++i < questions.length) {
        showQuestion();
    } else {
        history.push({ name: student.name, roll: student.roll, score: score });
        localStorage.setItem("history", JSON.stringify(history));

        quiz.hidden = true;
        result.hidden = false;
        result.innerHTML = `
            <h4 class="mt-4">Quiz Completed!</h4>
            <p>Student: ${student.name}</p>
            <p>Roll Number: ${student.roll}</p>
            <h3 class="text-success">Score: ${score}/${questions.length}</h3>
            <p>Percentage: ${score * 100 / questions.length}%</p>
            <button class="btn btn-success w-100" onclick="location.reload()">New Quiz</button>
        `;
        showHistory();
    }
};

document.getElementById("clearHistory").onclick = () => {
    history = [];
    localStorage.removeItem("history");
    showHistory();
};

showHistory();
