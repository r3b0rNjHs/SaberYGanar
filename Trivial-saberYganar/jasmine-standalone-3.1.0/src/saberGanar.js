function start() {
    'use strict';

    const questionsWithAnswers = [{
        id: 1,
        question: "¿Cuál es la capital de Portugal?",
        answers: [
            { id: 0, answer: "Faro", isCorrect: false, idQuestion: 1 },
            { id: 1, answer: "Oporto", isCorrect: false, idQuestion: 1 },
            { id: 2, answer: "Lisboa", isCorrect: true, idQuestion: 1 }
        ]
    },
    {
        id: 2,
        question: "¿Cuál es la capital de Egipto?",
        answers: [
            { id: 0, answer: "Faro", isCorrect: false, idQuestion: 2 },
            { id: 1, answer: "El Cairo", isCorrect: true, idQuestion: 2 },
            { id: 2, answer: "Lisboa", isCorrect: false, idQuestion: 2 }
        ]
    },
    {
        id: 3,
        question: "¿Cuál es la capital de España?",
        answers: [
            { id: 0, answer: "Madrid", isCorrect: true, idQuestion: 3 },
            { id: 1, answer: "Oporto", isCorrect: false, idQuestion: 3 },
            { id: 2, answer: "Lisboa", isCorrect: false, idQuestion: 3 }
        ]
    },
    {
        id: 4,
        question: "¿Cuál es la capital de Zambia?",
        answers: [
            { id: 0, answer: "Lusaka", isCorrect: true, idQuestion: 4 },
            { id: 1, answer: "Oporto", isCorrect: false, idQuestion: 4 },
            { id: 2, answer: "Lisboa", isCorrect: false, idQuestion: 4 }
        ]
    },
    {
        id: 5,
        question: "¿Cuál es la capital de Jordania?",
        answers: [
            { id: 0, answer: "Madrid", isCorrect: false, idQuestion: 5 },
            { id: 1, answer: "Amán", isCorrect: true, idQuestion: 5 },
            { id: 2, answer: "Lisboa", isCorrect: false, idQuestion: 5 }
        ]
    },
    {
        id: 6,
        question: "¿Cuál es la capital de Panama?",
        answers: [
            { id: 0, answer: "Madrid", isCorrect: false, idQuestion: 6 },
            { id: 1, answer: "Oporto", isCorrect: false, idQuestion: 6 },
            { id: 2, answer: "Ciudad de Panamá", isCorrect: true, idQuestion: 6 }
        ]
    }];







const boxQuestions = document.querySelector('.questions');
const btnSend      = document.querySelector('.btn');
const btnNext      = document.querySelector('.btnNext');
const btnStart     = document.querySelector('.btnStart')
let msg            = document.querySelector('.message');
let timer          = document.querySelector('.seconds');
let totalPoints    = 0;
let sumPoints;       
let seconds        = 0;

 goingQuestions();
btnSend.disabled   = true;




//SUCESIÓN DE PREGUNTAS cada 20 segundos o cada vez que das al botón.
//La función goingQuestion pinta las preguntas y las respuestas
let i = 0;
function goingQuestions() {
    if (i < questionsWithAnswers.length) {
        boxQuestions.innerHTML = 
        `<div class="questionBox" id="${questionsWithAnswers[i].id}">${questionsWithAnswers[i].question}</div>`;
        for (let x = 0; x < questionsWithAnswers[i].answers.length; x++) {
            boxQuestions.innerHTML +=
                `<div class="checkboxBox">
         <input type="radio" id="${questionsWithAnswers[i].answers[x].id}" name="options" class="answer" value="${questionsWithAnswers[i].answers[x].answer}"/>
        <label for="${questionsWithAnswers[i].answers[x].id}">${questionsWithAnswers[i].answers[x].answer}</label>
        </div>`;
        }
        i++;
    msg.innerHTML = '';    
    }    
}
 //Set interval con la función startTimer para que cada segundo compruebe que los segundos no han llegado a 20. 
 //Si llega a 20 ejecuta la función de pintar las preguntas, es decir, pasa a la siguiente.
 //También comprueba acada segundo si hay algún check seleccionado para habilitar el botón.
setInterval(startTimer,1000)
function startTimer() {
    btnSend.disabled = true;
    seconds++;
    timer.innerHTML= seconds
    if (seconds == 20) {
        seconds = 0;
        goingQuestions();
    }
    const arrayRadioAnswers = document.querySelectorAll('.answer');
    for (let i = 0; i < arrayRadioAnswers.length; i++) {
        if (arrayRadioAnswers[i].checked) {    
            btnSend.disabled = false;
        }
    }

} 


//SELECCIONAR RESPUESTA Y PUNTOS
function readUserAnswer() { 
    const arrayRadioAnswers = document.querySelectorAll('.answer');
    const actualPoints = document.querySelector('.actualPoints')
    
    for (let i = 0; i < arrayRadioAnswers.length; i++) {
        if (arrayRadioAnswers[i].checked) {    
            var optionChecked = arrayRadioAnswers[i];
        }
    }
    let found = questionsWithAnswers.find(function(question) {
        const questionBox = document.querySelector('.questionBox');
        if (question.id == questionBox.id){
            return question
        }
    });     

    if (found.answers[optionChecked.id].isCorrect == true){
        console.log('BIEN')
        msg.innerHTML = `<h3> ¡Correcta! </h3>`;
        if (seconds <= 2) {
            totalPoints += 2;
        }
        else if  (seconds >= 3 && seconds <= 10){
            totalPoints += 1;
        }
        else {
            totalPoints;
        }
        console.log(totalPoints)
    }
    else if (found.answers[optionChecked.id].isCorrect !== true) {
        console.log('MAL')
        msg.innerHTML = `<h3> ¡Incorrecta! </h3>`;
        if (seconds >= 11) {
            totalPoints -= 2;
        }
        else if  (seconds <= 10){
            totalPoints -= 1;
        }
        console.log(totalPoints)
    }
    else if (optionChecked = false) {
        totalPoints -=3; 
        console.log(totalPoints) 
    }
    // actualPoints.innerHTML = ` ${totalPoints} puntos`
    // console.log(totalPoints)
    seconds = 0;
}

btnSend.addEventListener('click', readUserAnswer);
btnSend.addEventListener('click',goingQuestions);



// MARCADOR Se guardan los nombres y las puntuaciones de cada jugador
let score = {
    	names:
    	[],
    	points:
    	[]
};


const btnSave = document.querySelector('.btnSave');
let scoreList = document.querySelector('.list');


	function scoreAndName () {

		let name = document.querySelector('#inputNameId').value;

		score.names.push(name);
		// console.log(score);
		let listNames = score.names;
		// console.log(listNames);
		score.points.push(totalPoints);
		//console.log(score);
		sumPoints = score.points;
		console.log(sumPoints);
		//Para que se guarden uno después de otro, se acumulen.
		let add = '';
		for (let i = 0;i < listNames.length; i++){
            add += 
            `<li class="eachBoxPlayer">
                ${listNames[i]} - <div class="actualPoints"> ${sumPoints[i]} puntos </div> 
            </li>`;
		};
        scoreList.innerHTML= add;
        totalPoints=0;
    }

btnSave.addEventListener('click', scoreAndName);



// function reset (){
//     //Los inputs
//     // document.querySelector('#box_number').value = "";
//     let name = document.querySelector('#inputNameId').value= '';
// ;
//     //El marcador a 0 otra vez y las pistas
//     totalPoints=0;

//     // goingQuestions()
// }
// reset();


} start();