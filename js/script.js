//---------------------------------------------------------------------------
//----------------------ВЫВОД ХОББИ В БЛОКЕ ОБО МНЕ--------------------------
//---------------------------------------------------------------------------
class AboutImgsSection {
   constructor() {
      this.aboutImgsOnPage = [0, 22, 15, 3, 8];
      this.totalAboutImgs = 23;//Количество картинок
      this.aboutImgs = '';
      this.abouImgsBlock = document.querySelector('.about__wrapp-pics');
      this.previousIndex;//Предыдущий индекс
   }
   render() {//Вывод первых 5ти картинок
      this.aboutImgsOnPage.forEach((img, indx) => {
         this.aboutImgs += `<img class="about__wrapp-pic about__wrapp-img about${indx}" src="img/about/about-img-${img}.png" alt="">`;
      })
      this.abouImgsBlock.insertAdjacentHTML('beforeend', this.aboutImgs);
   }
   changeImgs() {
      setInterval(() => {
         let randomIndex;
         let randomNumberSrcImg;
         for (; ;) {
            randomIndex = this.getRandomNumber(this.aboutImgsOnPage.length);//Номер блока рандомный (получили индекс)
            randomNumberSrcImg = this.getRandomNumber(this.totalAboutImgs);//Номер ссылки на картинку
            if (!this.aboutImgsOnPage.includes(randomNumberSrcImg) && this.previousIndex != randomIndex) {//Проверка наличия ссылки на странице
               break
            }
         }
         this.previousIndex = randomIndex;//Перезаписывание индекса на новый
         let aboutImgOnChange = document.querySelector(`.about${randomIndex}`);//На замену блок фотки
         this.aboutImgsOnPage[randomIndex] = randomNumberSrcImg;
         aboutImgOnChange.src = `img/about/about-img-${randomNumberSrcImg}.png`;//Добавление новой картинки 
      }, 2500);
   }

   getRandomNumber(num) {//Рандомное число
      return +Math.floor(Math.random() * num);
   }
}
const aboutImgsSection = new AboutImgsSection;
aboutImgsSection.render();
aboutImgsSection.changeImgs();

// const aboutImgsOnPage = [0, 22, 15, 3, 8];
// const totalAboutImgs = 23;//Количество картинок
// let aboutImgs = '';
// let abouImgsBlock = document.querySelector('.about__wrapp-pics');
// let previousIndex;//Предыдущий индекс

// aboutImgsOnPage.forEach((img, indx) => {
//    aboutImgs += `<img class="about__wrapp-pic about__wrapp-img about${indx}" src="img/about/about-img-${img}.png" alt="">`;
// })
// abouImgsBlock.insertAdjacentHTML('beforeend', aboutImgs);
// setInterval(() => {
//    let randomIndex;
//    let randomNumberSrcImg;
//    for (; ;) {
//       randomIndex = getRandomNumber(aboutImgsOnPage.length);//Номер блока рандомный (получили индекс)
//       randomNumberSrcImg = getRandomNumber(totalAboutImgs);//Номер ссылки на картинку
//       if (!aboutImgsOnPage.includes(randomNumberSrcImg) && previousIndex != randomIndex) {//Проверка наличия ссылки на странице
//          break
//       }
//    }
//    previousIndex = randomIndex;//Перезаписывание индекса на новый
//    let aboutImgOnChange = document.querySelector(`.about${randomIndex}`);//На замену блок фотки
//    aboutImgsOnPage[randomIndex] = randomNumberSrcImg;
//    aboutImgOnChange.src = `img/about/about-img-${randomNumberSrcImg}.png`;//Добавление новой картинки 
// }, 1000);

// function getRandomNumber(num) {//Рандомное число
//    return +Math.floor(Math.random() * num);
// }


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
// --------------Подсказка (движение мышки) передвигать скилы-----------------
// ---------------------------------------------------------------------------
let skillsGif = document.querySelector('.skills__block-gif'); // Gif анимация, подсказка
skillsGif.ondragstart = function () {
   return false;
};
window.onscroll = () => {
   let scrollPageSkill = window.pageYOffset;
   if (scrollPageSkill >= 1750 && scrollPageSkill <= 2000) {
      skillsGif.style.display = "block";
      setTimeout(() => {
         skillsGif.style.display = "none";
      }, 3000)
   }
}
// ---------------------------------------------------------------------------
// ---------------Замена одинарных кавычек на двойные-------------------------
// ---------------------------------------------------------------------------

let quoteOriginal =
   document.querySelector('.quote-original');
let quoteCorrected =
   document.querySelector('.quote-corrected');


quoteOriginal.oninput = () => {
   let regexp = /\B'|'\B/g;
   console.log(quoteOriginal.value)
   quoteCorrected.innerText = quoteOriginal.value.replace(regexp, '"');
}

