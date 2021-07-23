//---------------------------------------------------------------------------
//----------------------ВЫВОД ХОББИ В БЛОКЕ ОБО МНЕ--------------------------
//---------------------------------------------------------------------------
let arrRandom = [0];
setInterval(() => {
   let aboutImg = document.getElementsByClassName('about__wrapp-img');
   let numRandomImg = Math.floor(Math.random() * 24);//рандомный номер для картинки (от 0 до 23)
   let numRandom = Math.floor(Math.random() * aboutImg.length);//рандомный номер для блока с картинкой (от 0 до 5)
   arrRandom.unshift(numRandomImg)

   let imgRandom = aboutImg[numRandom].src.split('-')[length].split('.')[0];//рандомный номер существующей картинки

   // if () {
   //    if (numRandomImg != imgRandom) { //Если существующая картинка не равна будущей картинке (в блоке, который подвергнется изменению)
   //       aboutImg[numRandom].src = `img/about/about-img-${numRandomImg}.png`;
   //       // console.log(arrRandom);
   //    }
   // }
   // console.log(numRandom + ' номер блока');
   // console.log(numRandomImg + ' Номер картинки будущей');
   // console.log(numRandom + ' - блок, ' + imgRandom + ' номер картинки на данный момент');


   // for (let item of arrRandom) {
      if (aboutImg[numRandom].dataset.num != arrRandom[1]) {
         aboutImg[numRandom].src = `img/about/about-img-${numRandomImg}.png`;
         aboutImg[numRandom].setAttribute("data-num",numRandomImg);
      } else {
         
      }
      arrRandom.pop();
   // }

   //    console.log(img.src);
   // console.log(aboutImg[numRandom].src);




}, 2500);


//---------------------------------------------------------------------------
//----------------------ОTРИСОВКА СКИЛОВ В БЛОКЕ НАВЫКИ----------------------
//---------------------------------------------------------------------------
class SkillsItem { //Отрисовка Скила в контейнере
   constructor(id, effect, name) {
      this.id = id;
      this.effect = effect;
      this.name = name;
   }
   renderSkillItem() {
      return `
               <div class="skills__wrapp-item skills__wrapp-item-${this.effect}">
                  <img class="skills__wrapp-img" src="img/skill/skill-${this.id}.svg" alt="">
                  <h4 class="textbig skills__wrapp-textbig">${this.name}</h4>
               </div>`
   }
}
class SkillsWrapp {
   constructor() { //Массив объектов (скилов)
      this.itemsSkill = [
         {
            "id": 1,
            "effect": 1,
            "name": "HTML"
         },
         {
            "id": 2,
            "effect": 2,
            "name": "CSS"
         },
         {
            "id": 3,
            "effect": 3,
            "name": "Java Script"
         },
         {
            "id": 4,
            "effect": 4,
            "name": "SASS"
         },
         {
            "id": 5,
            "effect": 5,
            "name": "GIT"
         },
         {
            "id": 6,
            "effect": 1,
            "name": "VUE"
         },
         {
            "id": 7,
            "effect": 2,
            "name": "GULP"
         },
         {
            "id": 8,
            "effect": 3,
            "name": "BOOTSTRAP"
         },
         {
            "id": 9,
            "effect": 4,
            "name": "FIGMA"
         },
         {
            "id": 10,
            "effect": 5,
            "name": "AVOCODE"
         },
         {
            "id": 11,
            "effect": 1,
            "name": "PHOTOSHOP"
         },
         {
            "id": 12,
            "effect": 2,
            "name": "Responsive"
         }
      ];
   }
   renderSkillsWrapp() { //Добавление скилов на страницу 
      let listSkillsWrappHtml = '';
      this.itemsSkill.forEach(itemSkill => {
         const skillItem = new SkillsItem(itemSkill.id, itemSkill.effect, itemSkill.name);
         listSkillsWrappHtml += skillItem.renderSkillItem();
      });
      document.querySelector('.skills__wrapp').innerHTML = listSkillsWrappHtml;
   }
}
const listSkillsItem = new SkillsWrapp(); // Присвоивание класса константе 
listSkillsItem.renderSkillsWrapp(); //Запуск метода по созданию элементов 
// ---------------------------------------------------------------------------
// -------------(1)---------СКРОЛЛ СЛАЙДЕР СКИЛОВ-----------------------------
// ---------------------------------------------------------------------------

// let left = 0;
// let skillsWrapp = document.getElementById("skills__wrapp");
// let skills = document.getElementById("skills");

// if (skills.addEventListener) {
//    if ('onwheel' in document) {
//       // IE9+, FF17+
//       skills.addEventListener("wheel", onWheel);
//    } else if ('onmousewheel' in document) {
//       // устаревший вариант события
//       skills.addEventListener("mousewheel", onWheel);
//    } else {
//       // Firefox < 17
//       skills.addEventListener("MozMousePixelScroll", onWheel);
//    }
// } else { // IE8-
//    skills.attachEvent("onmousewheel", onWheel);
// }
// // Это решение предусматривает поддержку IE8-
// function onWheel(e) {
//    e.preventDefault();
//    if (e.deltaY >= 100) {
//       if (left <= -1116) {
//          left = -930;
//       }
//       left = left - 186;
//       skillsWrapp.style.left = left + 'px';
//    } else if (e.deltaY <= -100) {
//       if (left >= 0) {
//          left = -185;
//       }
//       left = left + 186;
//       skillsWrapp.style.left = left + 'px';
//    }
// }
// ---------------------------------------------------------------------------
// -------------(2)-----ЗАЖАТИЕ МЫШИ СЛАЙДЕР СКИЛОВ---------------------------
// ---------------------------------------------------------------------------

let skillsBlock = document.querySelector(".skills__block");
let skillsWrapp = skillsBlock.querySelector(".skills__wrapp");
let skillsItem = document.querySelector('.skills__wrapp-item');
let left;
skillsWrapp.onmousedown = function (event) {
   event.preventDefault(); // предотвратить запуск выделения (действие браузера)
   let shiftX = event.clientX - skillsWrapp.getBoundingClientRect().left;//Значение х в блоке врапп
   document.addEventListener('mousemove', onMouseMove);
   document.addEventListener('mouseup', onMouseUp);

   function onMouseMove(event) {
      let newLeft = event.clientX - shiftX - skillsBlock.getBoundingClientRect().left;
      let rightEdge = skillsBlock.offsetWidth - skillsWrapp.offsetWidth;
      // курсор вышел из слайдера => оставить бегунок в его границах.
      if (newLeft > 0) {
         newLeft = 0;
      }
      if (newLeft < rightEdge) {
         newLeft = -1113;
      }
      skillsWrapp.style.left = newLeft + 'px';
   }

   function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
   }
}
skillsWrapp.ondragstart = function () {
   return false;
};
// ---------------------------------------------------------------------------