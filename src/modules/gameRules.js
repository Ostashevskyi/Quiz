import { createQuestionUI, createResultUI } from "./createUI";
import { gameData } from "./data";
import { questions } from "./getData";

export function putData(currentIndex) {
    gameData.questionsData[gameData.currentQuestion]= [
        questions[currentIndex].correct_answer,
        document.querySelector('.selected').innerHTML,
        questions[currentIndex].correct_answer === document.querySelector('.selected').innerHTML ? true : false
    ]
    return gameData;
}

export function selectAnswer() {
    const btnDiv = document.querySelector('.answers-div');
    btnDiv.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            if(btnDiv.querySelector('.selected')) {
                const activeOption = btnDiv.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            btn.classList.add('selected');
        })
    })
}

export function changeQuestion() {
    if (gameData.currentQuestion + 1 < questions.length) {
        gameData.currentQuestion +=1 
        createQuestionUI();
    } else {
        createResultUI();
    }
}


export function mathPercentage() {
    const results = gameData.questionsData.map(el => el[2]);
    const trueElems = results.filter(el => el === true).length;

    const percentage = (100 * trueElems) / results.length;
    return percentage
}