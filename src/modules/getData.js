export const questions = [];

export async function getData() {
    const requestHeadings = {
        numbers: document.querySelector('#number').value,
        category: document.querySelector('#categories').value,
        difficult: document.querySelector('#difficulty').value,
        type: document.querySelector('#type').value,
    }

    const data = requestHeadings.numbers <= 50 ? await fetch(`https://opentdb.com/api.php?amount=${requestHeadings.numbers}&category=${requestHeadings.category}&difficulty=${requestHeadings.difficult}&type=${requestHeadings.type}`) : alert('Amount should be lower or equal 50');
    const dataJSON = await data.json();

    dataJSON.results.forEach(element => {
        questions.push(element);
    });

    return dataJSON.results;
}

// export const arr = async () => await getData();



