import './index.html'
import './index.scss'

import { setData } from './modules/gameRules';
import { getData } from './modules/getData';

document.querySelector('#submit').addEventListener('click', () => onClick(getData));

setData()

export async function onClick (asyncFunc) {
    await asyncFunc()
}
