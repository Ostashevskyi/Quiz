import { questions } from "./getData";
import { gameData, notifications, notificationsIcon } from "./data";
import { changeQuestion, mathPercentage, putData, selectAnswer } from "./gameRules";

const main = document.querySelector('main');

function clearUI(cls) {
    main.replaceChildren();
    main.classList.add(cls);
}

export async function createQuestionUI() {
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

    //question answers
    const questionAnswers = appendQusetionAnswers(gameData.currentQuestion);
    main.appendChild(questionAnswers);

    //notification 
    const notification = appendNotification();
    main.appendChild(notification);

    //button
    const checkAnswerBtn = document.createElement('button');
    checkAnswerBtn.classList.add('check-btn');
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

function appendNotification() {
    const notificationDiv = createDiv('notification');

    const notification = document.createElement('p');
    notification.innerHTML = notifications[0];
    notificationDiv.appendChild(notification);

    return notificationDiv;
}

///////////////////////////////////////////////////////

export function createResultUI() {
    clearUI('result');
    main.appendChild(createResNotification());
}


function createResNotification() {
    const percentage = document.createElement('p');
    percentage.innerHTML = `${mathPercentage()}%`;
    return percentage
}
