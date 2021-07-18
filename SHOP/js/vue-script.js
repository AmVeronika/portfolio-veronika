//----------------------------------------------------------------------------------------------------
//--------------------Создадие экземпляра класса Vue с привязкойк элементу #app-----------------------
//----------------------------------------------------------------------------------------------------

const app = new Vue({
   el: '#app',
   data: {
      products: [], //Массив объектов JSON (исходный список товаров в каталоге)
      cartProducts: [],// Массив карточек в корзине
      searchLine: '', //содержимое поля поиска
      API_URL: 'https://raw.githubusercontent.com/AmVeronika/JSON-EBT/master/json',//создание адреса сервера, к которому обращается клиент
      showCart: false, //Открытие/скрытие корзины
      counterCart: 0, // Счетчик товаров в корзине в шапке
   },
   computed: {
      CounterCart: function () { // Метод по увеличению значения счетчика при нажатии кнопки - добавить
         return this.counterCart = this.cartProducts.length
      },
      filterProducts: function () { // Поиск карточек по данным введенным пользователем
         return this.products.filter((product) => {// Добавляем в новый массив карточки из основного массива с карточками из json, прошедшие проверку :
            return product.title.toLowerCase().includes(this.searchLine.toLowerCase())   
         })
      }
   },
   methods: {
      makeGETRequest() { //Запрос списка товаров
         fetch(`${this.API_URL}/catalogData.json`) //fetch- функция, которая выполняет ajax запрос
            .then(text => text.json())// .json() - метод, который парсит строку и возвращает объект промис
            .catch(err => console.log(err))
            .then(data => {
               this.products = [...data]
            })
      },
      addListProductCart(product) {//Добавление карточек в корзину 
         if (this.cartProducts.includes(product)) {
            product.currentQuantity++ // Если нажали на кнопку повторно, то в карточке меняется значение value 
         } else {
            this.cartProducts.push(product)// при вызове метода сразу передали нужную карточку
         }
      },
      removeListProductCart(cartProduct) { //Удаление карточки из корзины
         cartProduct.currentQuantity = 1 //Обнуление количества товаров при удалении карточки
         this.cartProducts.splice(this.cartProducts.indexOf(cartProduct), 1)
      },
   },
   mounted() {
      this.makeGETRequest()
   }
});









