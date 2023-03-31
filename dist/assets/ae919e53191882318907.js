import './index.html'
import './index.scss'

import { createQuestionUI } from './modules/createUI';
import {getData} from './modules/getData';

document.querySelector('#submit').addEventListener('click', onClick);

async function onClick () {
    await getData()
    createQuestionUI()
}