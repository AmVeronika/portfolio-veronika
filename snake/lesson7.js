// Глобальные переменные:                            
var FIELD_SIZE_X = 20;//строки
var FIELD_SIZE_Y = 20;//столбцы
var SNAKE_SPEED = 200; // Интервал между перемещениями змейки
var snake = []; // Сама змейка
var direction = 'y+'; // Направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var score = 0; // Результат
var textSpan;//Выводит кол-во очков в DOM

function init() {
   prepareGameField(); // Генерация поля

   var wrap = document.querySelector('.wrap');
   // Подгоняем размер контейнера под игровое поле
   wrap.style.width = '400px';
   // События кнопок Старт и Новая игра
   document.getElementById('snake-start').addEventListener('click', startGame);
   document.getElementById('snake-renew').addEventListener('click', refreshGame);

   // Отслеживание клавиш клавиатуры
   addEventListener('keydown', changeDirection);
}
/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
   // Создаём таблицу
   var game_table = document.createElement('table');
   game_table.classList.add('game-table');

   // Генерация ячеек игровой таблицы
   for (var i = 0; i < FIELD_SIZE_X; i++) {
      // Создание строки
      var row = document.createElement('tr');
      row.className = 'game-table-row row-' + i;

      for (var j = 0; j < FIELD_SIZE_Y; j++) {
         // Создание ячейки
         var cell = document.createElement('td');
         cell.className = 'game-table-cell cell-' + i + '-' + j;

         row.append(cell); // Добавление ячейки
      }
      game_table.append(row); // Добавление строки
   }
   document.getElementById('snake-field').append(game_table); // Добавление таблицы
}
/**
 * Старт игры
 */
function startGame() {
   gameIsRunning = true;
   respawn();//создали змейку

   snake_timer = setInterval(move, SNAKE_SPEED);//каждые 200мс запускаем функцию move
   setTimeout(createFood, 5000);
   setInterval(barier, 6500);//Барьер
}

/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
   // Змейка - массив td
   // Стартовая длина змейки = 2

   // Respawn змейки из центра
   var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
   var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

   // Хвост змейки
   var snake_tail = document.querySelector('.cell-' + start_coord_y + '-' + start_coord_x); // <td class="game-table-cell cell-10-10"></td>
   snake_tail.classList.add('snake-unit');// <td class="game-table-cell cell-10-10 snake-unit"></td>
   // Голова змейки
   var snake_head = document.querySelector('.cell-' + (start_coord_y - 1) + '-' + start_coord_x);// <td class="game-table-cell cell-9-10"></td>
   snake_head.classList.add('snake-unit');// <td class="game-table-cell cell-9-10 snake-unit"></td>

   snake.push(snake_tail);
   snake.push(snake_head);// snake = ['<td class="game-table-cell cell-10-10 snake-unit"></td>','<td class="game-table-cell cell-9-10 snake-unit"></td>'];
}
/**
 * Движение змейки
 */
function move() {
   //console.log('move',direction);
   // Сборка классов
   var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');//<td class="game-table-cell cell-9-10 snake-unit"></td> => snake_head_classes =['game-table-cell', 'cell-9-10', 'snake-unit']

   // Сдвиг головы
   var new_unit;
   var snake_coords = snake_head_classes[1].split('-');//преобразовали строку в массив => ['cell', '9' , '10']
   var coord_y = parseInt(snake_coords[1]); // coord_y = 9,
   var coord_x = parseInt(snake_coords[2]); // coord_x = 10,

   // Определяем новую точку
   if (direction == 'x-') {//влево
      new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
   }
   else if (direction == 'x+') {//вправо
      new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
   }
   else if (direction == 'y+') {//ВВерх
      new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];// ['<td class="game-table-cell cell-8-10"></td>']  => new_unit = <td class="game-table-cell cell-8-10"></td>
      // через 5 сек с едой  ['<td class="game-table-cell cell-8-10 food-unit"></td>']  => new_unit = <td class="game-table-cell cell-8-10 food-unit"></td>
   }
   else if (direction == 'y-') {
      new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];//Почему не работает вариант с .querySelector('.cell-' + (coord_y + 1) + '-' + (coord_x))? Возвращает new_unit = null.
   }
   // Проверки
   // 1) new_unit не часть змейки
   // 2) Змейка не ушла за границу поля
   if (new_unit === undefined) {
      switch (direction) {
         case 'x+':
            new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (0))[0];
            break;
         case 'x-':
            new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (FIELD_SIZE_Y - 1))[0];
            break;
         case 'y+':
            new_unit = document.getElementsByClassName('cell-' + (FIELD_SIZE_X - 1) + '-' + (coord_x))[0];
            break;
         case 'y-':
            new_unit = document.getElementsByClassName('cell-' + (0) + '-' + (coord_x))[0];
            break;
      }

   }

   if (!isSnakeUnit(new_unit) && !new_unit.classList.contains('barier-unit')) {//Если новые координаты головы не на месте змейки и не на месте барьера
      // Добавление новой части змейки
      new_unit.classList.add('snake-unit');//new_unit = <td class="game-table-cell cell-8-10 snake-unit"></td>
      // через 5 сек с едой  ['<td class="game-table-cell cell-8-10 food-unit snake-unit"></td>']  => new_unit = <td class="game-table-cell cell-8-10 food-unit snake-unit"></td>
      snake.push(new_unit);//snake = ['<td class="game-table-cell cell-10-10 snake-unit"></td>','<td class="game-table-cell cell-9-10 snake-unit"></td>','<td class="game-table-cell cell-8-10 snake-unit"></td>'];
      // Проверяем, надо ли убрать хвост
      if (!haveFood(new_unit)) { //Если новые координаты головы не на месте еды
         // Находим хвост
         var removed = snake.splice(0, 1)[0];//snake = ['<td class="game-table-cell cell-9-10 snake-unit"></td>','<td class="game-table-cell cell-8-10 snake-unit"></td>'] => 
         //removed = ['<td class="game-table-cell cell-10-10 snake-unit"></td>']  => removed = <td class="game-table-cell cell-10-10 snake-unit"></td>;

         //Удаляем первый элемент(хвост) из массива и создаём массив с вырезанными элементами,даже если один. [0] элемент из массива добавляем в переменную
         var classes = removed.getAttribute('class').split(' ');//['game-table-cell', 'cell-10-10', 'snake-unit']
         // удаляем хвост
         // removed.classList.remove('snake-unit'); //не работает
         removed.setAttribute('class', classes[0] + ' ' + classes[1]);//removed = <td class="game-table-cell cell-10-10"></td>;
      }
   }
   else {
      finishTheGame();
   }
}
/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */
function isSnakeUnit(unit) { // new_unit = <td class="game-table-cell cell-8-10"></td>
   var check = false;

   if (snake.includes(unit)) { //snake = ['<td class="game-table-cell cell-10-10 snake-unit"></td>','<td class="game-table-cell cell-9-10 snake-unit"></td>'];
      check = true;
   }
   return check; //false
}
/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {//<td class="game-table-cell cell-8-10 snake-unit"></td>
   var check = false;     // Если <td class="game-table-cell cell-8-10 food-unit snake-unit"></td>
   var unit_classes = unit.getAttribute('class').split(' ');// unit_classes = ['game-table-cell', 'cell-8-10', 'snake-unit']
   //unit_classes = ['game-table-cell', 'cell-8-10', 'food-unit', 'snake-unit']
   // Если еда
   if (unit_classes.includes('food-unit')) { //true
      check = true;
      createFood();
      score++;
      // Выводим кол-во очком в реальном времени
      textSpan = document.querySelector('.text-span');
      textSpan.innerText = score;
      //----------------------------------------
   }
   return check;// false
}
/**
 * Создание еды
 */
function createFood() {
   var foodCreated = false;

   while (!foodCreated) { //пока еду не создали
      // рандом
      var food_x = Math.floor(Math.random() * FIELD_SIZE_X);//[0,20) => от 0 до 19, т.к. Math.floor //2
      var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);//                                        8

      var food_cell = document.querySelector('.cell-' + food_y + '-' + food_x); //food_cell = <td class="game-table-cell cell-8-2"></td>
      var food_cell_classes = food_cell.getAttribute('class').split(' '); //food_cell_classes = ['game-table-cell', ' cell-8-2']

      // проверка на змейку
      if (!food_cell_classes.includes('snake-unit')) {// Если это не ячейка со змейкой
         food_cell.classList.add("food-unit"); //food_cell = <td class="game-table-cell cell-8-2 food-unit"></td>
         foodCreated = true;
      }
   }
}
/**
 * Создание барьера
 */
function barier() {
   var barier_x = Math.floor(Math.random() * FIELD_SIZE_X);//[0,20) => от 0 до 19, т.к. Math.floor //2
   var barier_y = Math.floor(Math.random() * FIELD_SIZE_Y);//                                        8

   var barier_cell = document.querySelector('.cell-' + barier_y + '-' + barier_x); //food_cell = <td class="game-table-cell cell-8-2"></td>
   var barier_cell_classes = barier_cell.getAttribute('class').split(' '); //food_cell_classes = ['game-table-cell', ' cell-8-2']

   // проверка на змейку и на еду 
   if (!barier_cell_classes.includes('snake-unit') || !barier_cell_classes.includes('food-unit')) {// Если это не ячейка со змейкой и не с едой
      barier_cell.classList.add('barier-unit'); //food_cell = <td class="game-table-cell cell-8-2 food-unit"></td>
   }

}


/*
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {
   // console.log(e);
   switch (e.keyCode) {
      case 37: // Клавиша влево
         if (direction != 'x+') {
            direction = 'x-'
         }
         break;
      case 38: // Клавиша вверх
         if (direction != 'y-') {
            direction = 'y+'
         }
         break;
      case 39: // Клавиша вправо
         if (direction != 'x-') {
            direction = 'x+'
         }
         break;
      case 40: // Клавиша вниз
         if (direction != 'y+') {
            direction = 'y-'
         }
         break;
   }
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
   gameIsRunning = false;
   clearInterval(snake_timer);//Прекратить метод SetInterval
   alert('Вы проиграли! Ваш результат: ' + score);
}

/**
 * Новая игра
 */
function refreshGame() {
   location.reload();
}

// Инициализация
window.onload = init;