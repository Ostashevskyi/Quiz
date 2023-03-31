import { questions } from "./getData";
import { gameData, notifications, notificationsIcon } from "./data";
import { changeQuestion, putData, selectAnswer } from "./gameRules";

const main = document.querySelector('main');

function clearUI() {
    main.replaceChildren();
    main.classList.add('question');
}

export async function createQuestionUI() {
    clearUI();

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
        putData(gameData.currentQuestion);
        changeQuestion();
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
    console.log(questions)

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

    const icon = document.createElement('img');
    icon.src = notificationsIcon[0];
    notificationDiv.appendChild(icon);

    const notification = document.createElement('p');
    notification.innerHTML = notifications[0];
    notificationDiv.appendChild(notification);

    return notificationDiv;
}

///////////////////////////////////////////////////////
