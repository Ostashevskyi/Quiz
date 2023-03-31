import { createQuestionUI } from "./createUI";
import { gameData } from "./data";
import { questions } from "./getData";

export function putData(currentIndex) {
    gameData.questionsData[gameData.currentQuestion]= {
        correct: questions[currentIndex].correct_answer,
        selected: document.querySelector('.selected').innerHTML,
        isCorrect: questions[currentIndex].correct_answer === document.querySelector('.selected').innerHTML ? true : false,
    } 

    console.log(gameData);
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

    gameData.currentQuestion < 9 ? gameData.currentQuestion += 1 : '';
    createQuestionUI();
}
