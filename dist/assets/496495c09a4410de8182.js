import './index.html'
import './index.scss'

import { createQuestionUI } from './modules/createUI';
import { getHeadings } from './modules/getData';

document.querySelector('#submit').addEventListener('click', () => onClick(getHeadings));

export async function onClick (asyncFunc) {
    await asyncFunc()
    createQuestionUI()
}