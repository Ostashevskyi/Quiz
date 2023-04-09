import { createQuestionUI, createResultUI } from "./createUI";
import { gameData, requestHeadings } from "./data";


export function putData() {
    const selected = document.querySelector('.selected')
    const {questions} = gameData;
    const question = questions[gameData.currentQuestion];
    gameData.questionsData[gameData.currentQuestion]= {
        correctAnswer: question.correct_answer,
        userAnswer: selected.innerHTML,
        result: question.correct_answer === selected.innerHTML 
    }

    return gameData;
}

export function selectAnswer() {
    const btnDiv = document.querySelector('.answers-div');
    btnDiv.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(btnDiv.querySelector('.selected')) {
                const activeOption = btnDiv.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            btn.classList.add('selected');
        })
    })
}

export function setData() {
    const select = document.querySelectorAll('.select');
    select.forEach(el => {
        el.addEventListener('change', (e) => {
            const id = e.target.id
            requestHeadings[id] = e.target.value;
        })
    })
}

export function changeQuestion() {
    const questionsLength = Object.keys(gameData.questions).length;
    if (gameData.currentQuestion + 1 < questionsLength) {
        gameData.currentQuestion +=1 
        createQuestionUI();
    } else {
        createResultUI();
    }
}

function getTrueElems() {{
    const {questionsData} = gameData;
    const results = questionsData.map(el => el.result);
    const trueElems = results.filter(el => el === true).length;
    return {
        results: results,
        trueElems: trueElems,
    }
}}

export function mathPercentage() {
    const dataObj = getTrueElems();
    const percentage = (100 * dataObj.trueElems) / dataObj.results.length;
    return percentage
}

export function amountCorrectFromAll() {
    const questionsLength = Object.keys(gameData.questions).length;
    const dataObj = getTrueElems(); 
    return `You answered ${dataObj.trueElems} / ${questionsLength} correctly`;
}

export function animatedAccordion(panelDiv) {
    if (panelDiv.style.maxHeight) {
        panelDiv.style.maxHeight = null;
    } else {
        panelDiv.style.maxHeight = "200px";
    }
}

export function accordion(panelDiv) {
    const dataQuestion = gameData.questionsData
    for (let i = 0; i < dataQuestion.length; i++) {
        const p = document.createElement('p');
        p.innerHTML = `Question №${i + 1}
            Your answer: "${dataQuestion[i].userAnswer}", 
            Correct answer: "${dataQuestion[i].correctAnswer}"`
        p.classList.add(`${dataQuestion[i].result}`);
        panelDiv.appendChild(p);
    }
}

export function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}