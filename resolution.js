'use strict';

document.addEventListener('DOMContentLoaded', function(){
  //Запускаем отрисовку при загрузке страницы
  resolutionStart();
});


function resolutionStart() {
  //Получаем обертку
  const wrapper = document.querySelector('.resolution-wrapper');
  
  //Если она есть на странице, то начнаем отрисовку формы
  if (wrapper != null) {
    const dataStorage = JSON.parse(localStorage.getItem('resolution'));

    //Если данные в харнилище есть, то отрисовуем форму с ними, если их нет, то создаем пустую
    if (dataStorage != null) {
      const {customer, general, name, location, type, code, url} = dataStorage;
      wrapper.innerHTML = `
      <form class="resolution-form">
          <div class="resolution-form__row">
              <label for="customer">Замовник:</label>
              <input id="customer" type="text" name="customer" placeholder="Замовник" required value="${customer}">
          </div>
          <div class="resolution-form__row">
              <label for="general">Генеральний підрядник:</label>
              <input id="general" type="text" name="general" placeholder="Генеральний підрядник" required value="${general}">
          </div>
          <div class="resolution-form__row">
              <label for="name">Найменування об'єкту будівництва:</label>
              <input id="name" type="text" name="name" placeholder="Найменування об'єкту будівництва" required value="${name}">
          </div>
          <div class="resolution-form__row">
              <label for="location">Місце розташування об'єкта будівництва:</label>
              <input id="location" type="text" name="location" placeholder="Місце розташування об'єкта будівництва" required value="${location}">
          </div>
          <div class="resolution-form__row">
              <label for="type">Вид будівництва:</label>
              <input id="type" type="text" name="type" placeholder="Вид будівництва" required value="${type}">
          </div>
          <div class="resolution-form__row">
              <label for="code">Код об'єкта:</label>
              <input id="code" type="text" name="code" placeholder="Код об'єкта" required value="${code}">
          </div>
          <div class="resolution-form__row-btn">
              <button onclick="createBtnDownload()">Відправити дані</button>
              <a id="theDownloadBtn" href="${url}" download="resolution.jpg">Завантажити файл</a>
          </div>
      </form>
      `;
    } else {
      wrapper.innerHTML = `
      <form class="resolution-form">
          <div class="resolution-form__row">
              <label for="customer">Замовник:</label>
              <input id="customer" type="text" name="customer" placeholder="Замовник" required>
          </div>
          <div class="resolution-form__row">
              <label for="general">Генеральний підрядник:</label>
              <input id="general" type="text" name="general" placeholder="Генеральний підрядник" required>
          </div>
          <div class="resolution-form__row">
              <label for="name">Найменування об'єкту будівництва:</label>
              <input id="name" type="text" name="name" placeholder="Найменування об'єкту будівництва" required>
          </div>
          <div class="resolution-form__row">
              <label for="location">Місце розташування об'єкта будівництва:</label>
              <input id="location" type="text" name="location" placeholder="Місце розташування об'єкта будівництва" required>
          </div>
          <div class="resolution-form__row">
              <label for="type">Вид будівництва:</label>
              <input id="type" type="text" name="type" placeholder="Вид будівництва" required>
          </div>
          <div class="resolution-form__row">
              <label for="code">Код об'єкта:</label>
              <input id="code" type="text" name="code" placeholder="Код об'єкта" required>
          </div>
          <div class="resolution-form__row-btn">
              <button onclick="createBtnDownload()">Відправити дані</button>
          </div>
      </form>
      `;
    }

    //Если изменили данные в форме, то убираем кнопку загрузки
    checkingDataChanges();
  }
}


 function createBtnDownload() {
  //Получаем форму
  const form = document.querySelector('.resolution-form');

  if (form != null) {
    form.addEventListener('submit', (e) => {

      //Отменяем стандартное поведение на событие браузера
      e.preventDefault();

      //form.reset();
    });

    //Отрисовываем изображение
    draw(JSON.parse(formToJSON(form)));
  }
}


function draw(formData) {
  const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        img = new Image(931, 663);

  //Заполняем картинку, когда она загрузилась
  img.onload = function(){

    //Задаем размеры canvas
    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;

    //Добавляем данные в обьект
    formData.time = getNewDate();
    formData.number = getRandomInt(17964, 564789);

    //Вставляем изображение как фон
    ctx.drawImage(img,0,0);

    //Вставляем дату
    ctx.font = "18px serif";

    ctx.fillText(formData.time, 140-ctx.measureText(formData.time).width, 280);

    //Вставляем номер дела
    ctx.font = "18px serif";
    ctx.fillText(formData.number, 500, 280);

    //Вставляем Замовник
    ctx.font = "20px serif";
    ctx.fillText(formData.customer, centerTextImg(formData.customer, ctx), 350);

    //Вставляем підрядник
    ctx.font = "20px serif";
    ctx.fillText(formData.general, centerTextImg(formData.general, ctx), 500);

    //Вставляем Найменування об'єкту будівництва
    ctx.font = "22px serif";
    ctx.fillText(formData.name, centerTextImg(formData.name, ctx), 570);

    //Вставляем адрес
    ctx.font = "20px serif";
    ctx.fillText(formData.location, centerTextImg(formData.location, ctx), 680);

    //Вставляем Вид будівництва
    ctx.font = "20px serif";
    ctx.fillText(formData.type, centerTextImg(formData.type, ctx), 728);

    //Вставляем код обьекта
    ctx.font = "15px serif";
    ctx.fillText(formData.code, centerTextImg(formData.code, ctx), 806);

    //Добавляем данные в обьект
    formData.url = canvas.toDataURL();  

    //Добавляеи или изменяем кнопку загрузки
    checkBtnDownload(formData);
  };
  img.src = 'photo_resol.jpg';
}


async function checkBtnDownload(formData) {

  //Проверяем есть ли уже кнопка
  let btnDownload = document.querySelector('#theDownloadBtn');

  //Если кнопки нет, то создаем ее, если есть, то изменяем href
  if (btnDownload === null) {
    btnDownload = document.createElement('a');
    btnDownload.id = "theDownloadBtn";
    btnDownload.download = "resolution.jpg";
    btnDownload.innerText = "Завантажити файл";
    document.querySelector('.resolution-form__row-btn').append(btnDownload);
  } 

  btnDownload.href = formData.url;
  
  const user = localStorage.getItem('user');
  if (user != null) {
    formData.email = user;
  } else {
    formData.email = 'test@test';
  }

  //Сохраняем данные в localStorage
  localStorage.setItem('resolution', JSON.stringify(formData));

  //Отправляем данные в БД
  console.log( await getDataBD('resolution.php', JSON.stringify(formData)));
}


function formToJSON(elem) {
  //Функция преобразования данныех FormData в json формат
  const formData = new FormData(elem),
        json = JSON.stringify(Object.fromEntries(formData.entries()));

  return json;
}


function centerTextImg(text, ctx) {
  return (663-ctx.measureText(text).width)/2-11;
}


function getNewDate() {
  const date = new Date(),
        options = {
          month: 'long',
          day: 'numeric',
          timezone: 'UTC'
        };

  return date.toLocaleString("ru", options);
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return String(Math.floor(Math.random() * (max - min)) + min);
}


function checkingDataChanges() {
  const inputs = document.querySelectorAll('.resolution-form input');

  inputs.forEach(item => {
    item.addEventListener('input', () => { 
      const btnDownload = document.querySelector('#theDownloadBtn');
      if (btnDownload != null) {
        btnDownload.remove();
      }
    });
  });
}

async function getDataBD(url, data) {
  const res = await fetch(url, {
    method: "POST",
    body: data,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
  return await res.json();
}

