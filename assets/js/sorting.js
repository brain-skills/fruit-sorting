// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('#fruitsList'); // список карточек

const resetButton = document.querySelector('#resetButton'); // кнопка сброса
const mixButton = document.querySelector('#mixButton'); // кнопка перемешивания

const filterButton = document.querySelector('#filterButton'); // кнопка фильтрации
const minWeight = document.querySelector('#minWeight'); // кнопка фильтрации
const maxWeight = document.querySelector('#maxWeight'); // кнопка фильтрации

const sortType = document.querySelector('#sortType'); // список возможных сортировок
const sortTimeLabel = document.querySelector('#sortTime'); // поле с временем сортировки
const sortButton = document.querySelector('#sortButton'); // кнопка сортировки

const fruitName = document.querySelector('#fruitName'); // поле с названием вида
const colorsList = document.querySelector("input[list=color-test]"); // поле с названием цвета
const fruitWeight = document.querySelector('#fruitWeight'); // поле с весом
const fruitAdd = document.querySelector('#fruitAdd'); // кнопка добавления

const rainbowColors = ['красный','оранжевый','желтый','зеленый','голубой','синий','фиолетовый']; // цвета радуги
// ===============================================================













// Преобразуем список фруктов с JSON формата в объект JavaScript
// ===============================================================
let fruitsJSON = `[
  {"id": 0, "kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"id": 1, "kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"id": 2, "kind": "Личи", "color": "красный", "weight": 17},
  {"id": 3, "kind": "Карамбола", "color": "желтый", "weight": 28},
  {"id": 4, "kind": "Тамаринд", "color": "оранжевый", "weight": 22}
]`;
// {"id": 5, "kind": "Квандонг", "color": "голубой", "weight": 69},
// {"id": 6, "kind": "Блуберри", "color": "синий", "weight": 69}

let fruits = JSON.parse(fruitsJSON);
// ===============================================================













/*** ОТОБРАЖЕНИЕ карточек ***/
// ===============================================================
let fruitColor = ''; // создаём переменную для хранения уникальных цветов карточек.
const display = () => {
  fruitsList.innerHTML = '';
  for (let i = 0; i < fruits.length; i++) {

    if(fruits[i].color == 'красный'){fruitColor = 'border-red'}
    if(fruits[i].color == 'оранжевый'){fruitColor = 'border-orange'}
    if(fruits[i].color == 'желтый'){fruitColor = 'border-yellow'}
    if(fruits[i].color == 'зеленый'){fruitColor = 'border-green'}
    if(fruits[i].color == 'голубой'){fruitColor = 'border-skyblue'}
    if(fruits[i].color == 'синий'){fruitColor = 'border-blue'}
    if(fruits[i].color == 'фиолетовый'){fruitColor = 'border-violet'}

    let fruitModel = document.createElement('div');
    fruitModel.className = `col-3 pr-2 pl-2`;
    fruitModel.innerHTML = `
    <div class="card ${fruitColor} mb-3">
        <div class="card-body">
            <h6 class="border-bottom pb-1 border-dark mb-1">Index: <span>${fruits[i].id}</span></h6>
            <p class="mb-0">kind: <span>${fruits[i].kind}</span></p>
            <p class="mb-0">color: <span>${fruits[i].color}</span></p>
            <p class="mb-0">weight (кг): <span>${fruits[i].weight}</span></p>
        </div>
    </div>
    `;
    fruitsList.appendChild(fruitModel);
  }
};
// первая отрисовка карточек
display();
// ===============================================================













/*** Сбросить все параметры ***/
// ===============================================================
resetButton.addEventListener('click', () => {
  let originFruits = JSON.parse(fruitsJSON);
  fruits = originFruits;
  display();
});
// ===============================================================













/*** Перемешивание ***/
// ===============================================================
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Формирование перемешанного массива
const shuffleFruits = () => {
  let i = 0;
  let temp;
  var result = [];
  let originFruits = JSON.parse(fruitsJSON);
  
  while(fruits.length > 0) {
    temp = getRandomInt(i, fruits.length-1);
    let cutFruits = fruits.splice(temp-1,1);
    result.push(cutFruits);
  }

  if(JSON.stringify(originFruits) == JSON.stringify(result.flat())){
    alert('Внимание! Перемешивание дало исходный результат!');
  }
  
  fruits = result.flat();
  return fruits;
};

mixButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});
// ===============================================================













/*** Фильтрация фруктов***/
// ===============================================================
const filterFruits = () => {
  let sourceFruits = JSON.parse(fruitsJSON);
  let filteredAll = fruits.filter(item => item.weight >= minWeight.value && item.weight <= maxWeight.value);
  let filteredMin = fruits.filter(item => item.weight >= minWeight.value);
  let filteredMax = fruits.filter(item => item.weight <= maxWeight.value);
  
  // fruits = filteredAll;
  if(minWeight.value !== '' && maxWeight.value !== ''){
     fruits = filteredAll;
  }else if(minWeight.value !== '' && maxWeight.value == ''){
    fruits = filteredMin;
  }else if(minWeight.value == '' && maxWeight.value !== ''){
    fruits = filteredMax;
  }else if(minWeight.value == '' && maxWeight.value == ''){
    fruits = sourceFruits;
  }
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});
// ===============================================================













/*** Сортировка ***/
// ===============================================================

// Функция сравнения двух элементов по цвету
const comparationColor = (a, b) => {
  return a == b ? true : false;
};

// Получаем индексы фруктов в хаотичной последовательности (как они есть)
let incorrectMass = [];
let firstFruits = JSON.parse(fruitsJSON);
for(i=0; i<firstFruits.length; i++){
  for(j=0; j<rainbowColors.length; j++){
    if(firstFruits[i].color == rainbowColors[j]){
      incorrectMass.push(j);
    }
  }
}

const sortAPI = {
  // Пузырьковая сортировка
  bubbleSort(arr1, arr2, comparationColor) {
    var sortArr = [];
    let temp = 0;
    for(i = 0; i < arr1.length; i++){
      for(j = 0; j < arr2.length; j++){
          if(comparationColor(arr1[i],arr2[j].color)){
              temp = arr2[j];
              sortArr.push(temp);
          }
      }
      for (let j = 0; j < 1000; j++) {
        j++;
      }
    }
    fruits = sortArr;
  },
  // Быстрая сортировка
  quickSort(array) {
    if(array.length == 1){return array};
    const pivot = array[array.length-1];
    const leftArr = [];
    const rightArr = [];
    for(i = 0; i < array.length-1; i++){
      if(array[i] < pivot){
        leftArr.push(array[i]);
      }else{
        rightArr.push(array[i]);
      }
    }
    if(leftArr.length > 0 && rightArr.length > 0){
      return [...this.quickSort(leftArr), pivot, ...this.quickSort(rightArr)];
    }else if(leftArr.length > 0){
      return [...this.quickSort(leftArr), pivot];
    }else {
      return [pivot, ...this.quickSort(rightArr)];
    }
  },

  // выполняет сортировку и производит замер времени
  startSort() {
    const start = new Date().getTime(); // время в начале выполнения (в миллисекундах)
    if(sortType.options.selectedIndex == 0){
      sortAPI.bubbleSort(rainbowColors,fruits, comparationColor);
    } else if (sortType.options.selectedIndex == 1){
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      let correctMass = sortAPI.quickSort(incorrectMass);
      let sortmas = [];
      for(i = 0; i < correctMass.length; i++){
        for(j = 0; j < fruits.length; j++){
          if(rainbowColors[correctMass[i]] == fruits[j].color){
            sortmas.push(fruits[j]);
          }
        }
      }
      fruits = sortmas;
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    }
    const end = new Date().getTime(); // время в конце выполнения (в миллисекундах)
    sortTime.textContent = `${end - start}`; // отнимаем от начального времени - конечное и получаем разницу.
  }
};

sortButton.addEventListener('click', () => {
  sortAPI.startSort();
  display();
});
// ===============================================================













/*** Добавление фруктов ***/
// ===============================================================
fruitAdd.addEventListener('click', () => {
    let newFruit = [];
    let newFruitColor = '';
    if(colorsList.value == '#ff0000'){newFruitColor = 'красный'};
    if(colorsList.value == '#ffa500'){newFruitColor = 'оранжевый'};
    if(colorsList.value == '#ffff00'){newFruitColor = 'желтый'};
    if(colorsList.value == '#008000'){newFruitColor = 'зеленый'};
    if(colorsList.value == '#87ceeb'){newFruitColor = 'голубой'};
    if(colorsList.value == '#0000ff'){newFruitColor = 'синий'};
    if(colorsList.value == '#9400d3'){newFruitColor = 'фиолетовый'};
    if(fruitName.value != "" && colorsList.value != "" && fruitWeight.value != "") {
      for(i=5; i <= fruits.length; i++){
        newFruit = {"id": i, "kind": fruitName.value, "color": newFruitColor, "weight": fruitWeight.value};
      }
      fruits.push(newFruit);
    } else {
      alert('Warning');
    }
    display();
  });
// ===============================================================