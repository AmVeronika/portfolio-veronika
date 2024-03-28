//---------------------------------------------------------------------------
//----------------------ВЫВОД SVG В ШАПКЕ (ПАРАЛАКС)-------------------------
//---------------------------------------------------------------------------
let parallaxElement = document.querySelectorAll('.parallax');
document.onmousemove = function (event) {
   const x = event.pageX / window.innerWidth;
   const y = event.pageY / window.innerHeight;
   console.log(x * 0);

   parallaxElement[0].style.transform = `translate(${-x * 40}px, ${-y * 40}px)`;
   parallaxElement[1].style.transform = `translate(${x * 40}px, ${y * 40}px)`;
   parallaxElement[2].style.transform = `translate(${-x * 30}px, ${y * 30}px)`;

}

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
         this.aboutImgs += `<img class="about__wrapp-pic about__wrapp-img about${indx}" src="img/about/about-img-${img}.png" alt="My hobbi">`;
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

//---------------------------------------------------------------------------
//----------------------ВЫВОД РАБОТ ПОРТФОЛИО--------------------------
//---------------------------------------------------------------------------

class PortfolioItem {
   constructor() {
      this.numProject = [0, 1];
      this.portfolioItems = '';
      this.portfolioWrapp = document.querySelector('.portfolio__projects');
      this.switchItem = document.querySelectorAll('.portfolio__radio');
      this.arrLink = ['geekbrains-work', 'Templates', 'maket-blitz', 'maket-the_brand'];
   }

   renderPortfolioItem() {
      this.numProject.forEach((num) => {
         this.portfolioItems += `  <a class="portfolio__project portfolio__project-width pojnum-${num}" target="_blank" href="https://amveronika.github.io/${this.arrLink[num]}/">
                              <div class="portfolio__img1">
                                 <img class="portfolio__scrin" src="img/portfolio/pr-${num}-1.PNG" alt="Project promo">
                              </div>
                              <div class="portfolio__img2">
                                 <img class="portfolio__scrin scrin-height" src="img/portfolio/pr-${num}-2.PNG" alt="Project promo">
                              </div>
                            </a>`

      })
      this.portfolioWrapp.insertAdjacentHTML('beforeend', this.portfolioItems)
   }

   switchProjects() {//Переключатель работ
      for (let i = 0; i < this.switchItem.length; i++) {//Перебор радиокнопок
         this.switchItem[i].onchange = () => {
            if (this.switchItem[i].checked) {//Если статус кнопки чекед
               switch (this.switchItem[i].value) {//Если значение кнопки...
                  case 'pos-0':
                     this.portfolioItems = '';
                     this.portfolioWrapp.innerHTML = '';
                     this.numProject.splice(0, 2, 0, 1);
                     this.renderPortfolioItem();
                     break;
                  case 'pos-1':
                     this.portfolioItems = '';
                     this.portfolioWrapp.innerHTML = '';
                     this.numProject.splice(0, 2, 2, 3);
                     this.renderPortfolioItem();
                     break;
               }
            }
         }
      }
   }
}
const portfolioItem = new PortfolioItem;
portfolioItem.renderPortfolioItem();
portfolioItem.switchProjects();

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
                  <img class="skills__wrapp-img" src="img/skill/skill-${this.id}.svg" alt="Skill - ${this.name}">
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
         newLeft = -1118;
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

window.onload = () => {
   fetch(`/data`, {
      method: 'POST',
      headers: {
         "Content-Type": "application/json"
      },
      // body: JSON.stringify(infoStatistics)
   })
}