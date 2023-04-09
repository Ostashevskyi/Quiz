import { getData } from "./getData";
import { gameData, notifications } from "./data";
import { accordion, amountCorrectFromAll, animatedAccordion, changeQuestion, mathPercentage, putData, selectAnswer, getRandomInt, shuffle } from "./gameRules";
import { onClick } from "../index";

const main = document.querySelector('main');

function clearUI(cls) {
    main.replaceChildren();
    main.classList.remove('result');
    main.classList.add(cls);
}

export function createQuestionUI() {
    clearUI('question');

    //title
    const title = createTitle('Quiz Game');
    main.appendChild(title);

    //quesitons counter 
    const count = createCount(gameData.currentQuestion);
    main.appendChild(count);

    //question title & category
    const questionInfo = appendQuestionInfo(gameData.currentQuestion);
    main.appendChild(questionInfo);

    //notification 
    const notification = appendNotification(gameData.currentQuestion);
    main.appendChild(notification);

    //question answers
    const questionAnswers = appendQusetionAnswers(gameData.currentQuestion);
    main.appendChild(questionAnswers);

    //button
    const checkAnswerBtn = document.createElement('button');
    checkAnswerBtn.classList.add('check-btn', 'btn');
    checkAnswerBtn.innerHTML = 'Check Answer';
    checkAnswerBtn.addEventListener('click', () => {
        if (document.querySelector('.selected')) {
            putData(gameData.currentQuestion);
            changeQuestion()
        } else {            
            createPopup('Please choose an option');
        }

        });
    main.appendChild(checkAnswerBtn);

    selectAnswer();
}

function createDiv(cls) {
    const div = document.createElement('div');
    div.classList.add(cls);
    return div
}

function createCount(currentQuestion) {
    const questionsLength = Object.keys(gameData.questions).length;
    const countDiv = createDiv('count-div');
    const count = document.createElement('p');
    count.innerHTML = `${currentQuestion + 1} / ${questionsLength}`;
    countDiv.appendChild(count);
    return countDiv;
}

function createTitle(content) {
    const titleDiv = createDiv('title-div');
    const title = document.createElement('h2');
    title.classList.add('title');
    title.innerHTML = content;
    titleDiv.appendChild(title)
    return titleDiv
}

function appendQuestionInfo(currentQuestion) {
    const questionInfoDiv = createDiv('question-div');
    const gameCurrentQuestion = gameData.questions[currentQuestion];

    const questionTitle = document.createElement('h2');
    questionTitle.innerHTML = gameCurrentQuestion.question;
    questionInfoDiv.appendChild(questionTitle);

    const categoryTitle = document.createElement('p');
    categoryTitle.innerHTML = gameCurrentQuestion.category;
    questionInfoDiv.appendChild(categoryTitle);

    return questionInfoDiv;
}

function appendQusetionAnswers(currentQuestion) {
    const questionAnswersDiv = createDiv('answers-div');
    const gameCurrentQuestion = gameData.questions[currentQuestion];

    const incorrectAnswers = gameCurrentQuestion.incorrect_answers;
    const correctAnswer = gameCurrentQuestion.correct_answer;
    const answers = incorrectAnswers.concat(correctAnswer);

    const shuffledAnswers = shuffle(answers);

    shuffledAnswers.forEach(answer => {
        const btn = document.createElement('button');

        btn.innerHTML = answer;

        questionAnswersDiv.appendChild(btn);
    });

    return questionAnswersDiv
}

function appendNotification(currentQuestion) {
    const notificationDiv = createDiv('notification');

    const notification = document.createElement('p');
    notification.innerHTML = `Difficult: ${gameData.questions[currentQuestion].difficulty}`;
    notificationDiv.appendChild(notification);

    return notificationDiv;
}

///////////////////////////////////////////////////////

export function createResultUI() {
    clearUI('result');
    main.appendChild(createResNotification());
    main.appendChild(createAccordion());


    const btnsDiv = createDiv('btns-div');
    btnsDiv.appendChild(createButton('btn-again', 'Try again')).addEventListener('click', () => onClick(getData));
    btnsDiv.appendChild(createButton('btn-change', 'To main menu')).addEventListener('click', () => location.reload());
    main.appendChild(btnsDiv);

}

function createResNotification() {
    const percentage = Math.ceil(mathPercentage());

    const resNotifyDiv = createDiv('res-div');
    
    const notify = document.createElement('p');
    
    checkPercentage(percentage, notify);
    resNotifyDiv.appendChild(notify);

    const resAmount = document.createElement('p');
    resAmount.innerHTML = amountCorrectFromAll();
    resNotifyDiv.appendChild(resAmount);

    const percentageParagraph = document.createElement('p');
    percentageParagraph.innerHTML = `It's a ${percentage}% correct answers`;
    resNotifyDiv.appendChild(percentageParagraph);

    return resNotifyDiv
}

function checkPercentage(percentage, notify) {
    const notificationLength = Object.keys(notifications).length;
    if (percentage < 40) notify.innerHTML = notifications.bad[getRandomInt(notificationLength - 1)];
    else if (percentage > 80) notify.innerHTML = notifications.great[getRandomInt(notificationLength - 1)];
    else notify.innerHTML = notifications.good[getRandomInt(notificationLength - 1)];
}

function createButton(cls, value) {
    const btn = document.createElement('button');
    btn.classList.add(cls, 'btn');
    btn.innerHTML = value;
    return btn;
}


function createAccordion() {
    const accordionDiv = createDiv('accordion-div');
    
    const accordionBtn = document.createElement('button');
    accordionBtn.classList.add('accordion-btn');
    accordionBtn.innerHTML = 'See more';

    accordionDiv.appendChild(accordionBtn);

    const panelDiv = createDiv('panel');

    accordion(panelDiv);

    accordionBtn.addEventListener('click', () => {
        accordionBtn.classList.toggle('active');
        animatedAccordion(panelDiv);

    });

    accordionDiv.appendChild(panelDiv);


    return accordionDiv
}

export function createPopup(content) {
    if (document.body.querySelector('.popup-div')) {
        document.body.removeChild(document.querySelector('.popup-div'));
    }
    const popupDiv = createDiv('popup-div');
    popupDiv.classList.add('show');

    const popupText = document.createElement('span');
    popupText.innerHTML = content
    popupDiv.appendChild(popupText);

    const popupBtn = document.createElement('span');
    popupBtn.innerHTML = '×';
    popupBtn.addEventListener('click', () => {
        popupDiv.classList.toggle('show');
    })
    popupDiv.appendChild(popupBtn);


    document.body.appendChild(popupDiv);
}

