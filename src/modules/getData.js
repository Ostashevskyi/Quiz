import { createPopup } from "./createUI";
import { createQuestionUI } from "./createUI";
import { MAX_QUESTIONS, MIN_QUESTIONS, gameData, requestHeadings } from "./data";

export async function getData() {
    gameData.currentQuestion = 0;
    if (requestHeadings.questionAmount <= MAX_QUESTIONS && requestHeadings.questionAmount > MIN_QUESTIONS) {
        try {
            const data = await fetch(`https://opentdb.com/api.php?amount=${requestHeadings.questionAmount}&category=${requestHeadings.category}&difficulty=${requestHeadings.difficult}&type=${requestHeadings.type}`) 
            const dataJSON = await data.json();
            gameData.questions = {...dataJSON.results};
            createQuestionUI();
        } 
        catch (e) {
            createPopup(e);
        }
    } else {
            createPopup('Incorrect value');
    }
}



