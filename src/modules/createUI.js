import { getData, questions } from "./getData";
import { gameData, notifications, notificationsIcon } from "./data";
import { accordion, amountCorrectFromAll, animatedAccordion, changeQuestion, mathPercentage, putData, selectAnswer } from "./gameRules";
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
        document.querySelector('.selected') ? (
            putData(gameData.currentQuestion),
            changeQuestion()
        ) : alert('option');
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
    const countDiv = createDiv('count-div');
    const count = document.createElement('p');
    count.innerHTML = `${currentQuestion + 1} / ${questions.length}`;
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

    const questionTitle = document.createElement('h2');
    questionTitle.innerHTML = questions[currentQuestion].question;
    questionInfoDiv.appendChild(questionTitle);

    const categoryTitle = document.createElement('p');
    categoryTitle.innerHTML = questions[currentQuestion].category;
    questionInfoDiv.appendChild(categoryTitle);

    return questionInfoDiv;
}

function appendQusetionAnswers(currentQuestion) {
    const questionAnswersDiv = createDiv('answers-div');

    const incorrectAnswers = questions[currentQuestion].incorrect_answers;
    const correctAnswer = questions[currentQuestion].correct_answer;
    const answers = incorrectAnswers.concat(correctAnswer);

    const shuffledAnswers = shuffle(answers);


    shuffledAnswers.forEach(answer => {
        const btn = document.createElement('button');

        btn.innerHTML = answer;

        questionAnswersDiv.appendChild(btn);
    });

    return questionAnswersDiv
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function appendNotification(currentQuestion) {
    const notificationDiv = createDiv('notification');

    const notification = document.createElement('p');
    notification.innerHTML = `Difficult: ${questions[currentQuestion].difficulty}`;
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
    if (percentage < 40) notify.innerHTML = notifications[2][getRandomInt(notifications.length - 1)];
    else if (percentage > 80) notify.innerHTML = notifications[0][getRandomInt(notifications.length - 1)];
    else notify.innerHTML = notifications[1][getRandomInt(notifications.length - 1)];
}

function createButton(cls, value) {
    const btn = document.createElement('button');
    btn.classList.add(cls, 'btn');
    btn.innerHTML = value;
    return btn;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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