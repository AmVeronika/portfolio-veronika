//---------------------------------------------------------------------------
//----------------------ОTРИСОВКА СКИЛОВ В БЛОКЕ НАВЫКИ-----------------------
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
// ----------------------АТОМАТИЧЕСКИЙ СЛАЙДЕР СКИЛОВ-------------------------
// ---------------------------------------------------------------------------
// let left = 0;
// let timer;
// autoSliderSkills();
// function autoSliderSkills () {
//    timer = setInterval (()=> {
//       let skillsWrapp = document.getElementById('skills__wrapp');
//       left = left - 186;
//       console.log(left)
//       if (left < -1116) {
//          left = 0;
//       }
//       skillsWrapp.style.left = left + 'px';
//    }, 3000); 
// }

let left = 0;
let skillsWrapp = document.getElementById("skills__wrapp");
let skills = document.getElementById("skills");

if (skills.addEventListener) {
   if ('onwheel' in document) {
      // IE9+, FF17+
      skills.addEventListener("wheel", onWheel);
   } else if ('onmousewheel' in document) {
      // устаревший вариант события
      skills.addEventListener("mousewheel", onWheel);
   } else {
      // Firefox < 17
      skills.addEventListener("MozMousePixelScroll", onWheel);
   }
} else { // IE8-
   skills.attachEvent("onmousewheel", onWheel);
}
// Это решение предусматривает поддержку IE8-
function onWheel(e) {
   e.preventDefault();
   if (e.deltaY >= 100) {
      if (left <= -1116) {
         left = -930;
      }
      left = left - 186;
      skillsWrapp.style.left = left + 'px';
   } else if (e.deltaY <= -100) {
      console.log(left);
      if (left >= 0) {
         console.log(left);
         left = -185;
      }
      left = left + 186;
      skillsWrapp.style.left = left + 'px';
   }
}
