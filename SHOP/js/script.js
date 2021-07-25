var menu = document.querySelector("#menu");
var dropMenu = document.querySelector("#dropMenu");
var closeMenu = document.querySelector("#close");
var filter = document.querySelector("#filter");
var dropFilter = document.querySelector("#dropFilter");
var shadow = document.querySelector("#shadow");
let cartButtonOpen = document.querySelector('.header-right__cart'); // Открытие корзины в шапке (кнопка корзина)
let cartBlockOpen = document.querySelector('.cart');

menu.addEventListener("click", () => {
   dropMenu.style.display = "block";
});

closeMenu.addEventListener("click", () => {
   dropMenu.style.display = "none";
});

filter.addEventListener("click", () => {
   // if (dropFilter.classList.contains("openFilter")) {
   //    dropFilter.classList.remove("openFilter");
   // } else {
   //    dropFilter.classList.add("openFilter");
   // }
   dropFilter.classList.toggle("openfilter");
   shadow.classList.toggle("activefilter");
   filter.classList.toggle("filterActive")
});



// закрытие модального окна при нажатии на ESC
window.onkeydown = (evt) => {
   if (evt.keyCode == 27) {
      document.querySelector('.cart').classList.remove('cart-active');
   }
}
// закрытие модального окна при нажатии на серое поле
cartBlockOpen.addEventListener('click', (event) => {
   // if(event.target.classList.contains("cart cart-active"))
   if (event.toElement.className == 'cart cart-active') {
      document.querySelector('.cart').classList.remove('cart-active');
   }
})