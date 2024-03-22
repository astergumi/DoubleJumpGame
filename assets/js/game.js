var canvasg = document.getElementById("game_zone");
var context = canvasg.getContext("2d");

// Перемеменные
var Name_player = ""; // Имя игрока


var BackgroundGameHeight = 950; // Высота фона
var BackgroundGameMidleHeight = BackgroundGameHeight/2; // Плдлвига высоты фона

canvasg.width = 900; // Ширина игрового поля
canvasg.height = 700; // Высота игрового поля

var xHeroPosition = 0; // Начало по x
var yHeroPosition = 570;  // Начало по y

var HeroWidth = 100; // Ширина героя
var HeroHeight = 130; // Высота героя

var Line = 570; // Граница земли
var Step = 50; // Шаг
var Gravity = 1.9; // Гравитация
var JumpHeight = 150; // Высота прыжка
var CountJump = 2; // Количество прыжкой
var ArrayPlatform = []; // Массив Платформ
var PlatformWidth = 180; // Ширина платформы
var PlatformHeight = 40; // Высота платформы
var MinHeightBetweenPlatform = 80; // min растояние
var MaxHeightBetweenPlatform = 90; // max расстояние

var line = new Image()
	line.src = "assets/img/bckg/game.png"
	line.X = 0
	line.Y = 0
	
	var line2 = new Image()
	line2.src = "assets/img/bckg/game.png"
	line2.X = 0
	line2.Y = 0



var CountPointLevel = 0; // Удачные падения
var CheckHeroPlatform = false; // Проверка что герой встал на 2 платформу


var milsec = 0; // Мил.секунды
var sec = 0; // Секунды
var min = 0; // Мин


var Pause = false; // Статус паузы выкл

// Объекты
var Hero = new Image(); // Персонаж
var Platform = new Image(); // Платформа
var Apple = new Image(); // Яблоко
var BackgroundGame = new Image(); // Задний фон

// Путь к изображениям
Platform.src = "assets/img/platform/platform.png";

function drawLines(){ //Отрисовка дороги
		context.drawImage(line, line.X, line.Y)
		line.Y +=20 // Ускорение дороги
		if (line.Y > 0){ // Если больше 0
			line.Y = -700 // Смещать 
		}
		
		context.drawImage(line2, line2.X, line2.Y)
		line2.Y +=20
		if (line2.Y > 700){
			line2.Y = 0
		}
	}

	function render(){ // Рендер
	drawLines()	

		if (Pause != true) {
			myReq = requestAnimationFrame(render)
		}
     
		
	}	
	render()	


// Функции
// Выбор героя
function Select_hero_name(alt_hero,name) { // Выбор героя и запись имени
	Name_player = name;
	if (alt_hero == "Djodji") {
		Hero.src = "assets/img/hero/djodji/slide_5.png"; // Герой 1

	}
	else{
     Hero.src = "assets/img/hero/ricardo/slide_5.png"; // Герой 2
	}
}


// Управление
function moveUP(e){ // Функция управления
	var key = e.keyCode; // Получение кода клавиши
	switch (key){ // Условие для клавиш

		case 38: //Вверх стрелка
		if(CountJump > 0){ // Если количество прыжков больше 0
				yHeroPosition -= JumpHeight; // Прыгнуть
				CountJump--; // Отнять 1 прыжок
		}
		break;

		case 87: // W
		if(CountJump > 0){
				yHeroPosition -= JumpHeight;
				CountJump--;
                Hero.src = "assets/img/hero/djodji/jump_7.png"; 
		}
		break;

 case 40: // Вниз стрелка
		if(yHeroPosition <= Line - Step){ // Если герой выше пола
		yHeroPosition += Step; // Опустить вниз
	}
		break;
		
		case 83: // S
				if(yHeroPosition <= Line - Step){
		yHeroPosition += Step;
	}
		break;

		case 37: // Левая стрека
		if (xHeroPosition >= Step){ // Если герой далеко от стены
			xHeroPosition -=Step; // Двигать его
		}
		break;

		case 65: // A
		if (xHeroPosition >= Step){
			xHeroPosition -=Step;
		}
		break;

		case 39: // Права стрелка
		if (xHeroPosition <= canvasg.width-(100+Step)){ // Если герой далеко от стены
			xHeroPosition +=Step; // Двигать его
		}
		break;

		case 68: // D
		if (xHeroPosition <= canvasg.width-(100+Step)){
			xHeroPosition +=Step;
		}
		break;

		case 27: // Escape пауза
               if(Pause == false){ // Вкл паузу
               	Pause = true;
               }
               else { // Выкл паузу
               	Pause = false;
               	Game(); // Запуск игры
               }
		break;
	}

}
//Случайное условие
function getRandomInt(min, max) {
  min = Math.ceil(min); // минимум
  max = Math.floor(max); // максимум
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

//Генерация платформ
function GenPlatform(CountPlatform) {
    for (var i = 0 ; i < CountPlatform; i++) { // Цикл количества платформ 
        var xPlatformPosition = getRandomInt(0,canvasg.width - PlatformWidth); // Рандом по x. ширине
        var yPlatformPosition = Line -getRandomInt(MinHeightBetweenPlatform,MaxHeightBetweenPlatform); // Рандом по y высоте
        if(ArrayPlatform.length == 0){ // Если нет платформ создать
            ArrayPlatform.push({
                x: xPlatformPosition ,
                y: yPlatformPosition // Line-50 отступ от пола
            });
        }
        else{ 
        	// Если есть платформы
 ArrayPlatform.push({
                x: xPlatformPosition ,
                y: yPlatformPosition - 100 // Line-50 отступ от пола
            });
        // Если есть платформы
                // var CheckPositionPlatform=ArrayPlatform.filter(function(e){ // поиск соприкосновений
                // return (xPlatformPosition >= e.x && xPlatformPosition <= e.x+PlatformWidth) ||
                //        (xPlatformPosition+PlatformWidth >= e.x && xPlatformPosition + PlatformWidth <= e.x+PlatformWidth);
                // });
                // console.log(CheckPositionPlatform);
                // if(CheckPositionPlatform < 1){ // Если нет соприкосновений
                //         ArrayPlatform.push({
                //             x: xPlatformPosition ,
                //             y: yPlatformPosition // Line-50 отступ от пола
                //         });

                // }
                // else{ // Если есть соприкосновения
                //     ArrayPlatform.push({
                //         x: CheckPositionPlatform[0].x+PlatformWidth+xPlatformPosition , //CheckPositionPlatform[0].x платформа пересечения 
                //         y: yPlatformPosition // Line-50 отступ от пола
                //     });

               // }
        }
    }
}


//Таймер
function Time(){
milsec ++; // Добавлять мил.секунды
if (milsec == 60) { // Если мил.секунды равно 60
	milsec =0; // Сброс мил.секунды
	sec++; // Добавить секунды
}
if(sec == 60){ // Если сек равно 60
	sec =0; // Сброс секунды
	min++; // Добавить минуты
}
}



// Игра
function Game(){ // Обработка игры
	if (BackgroundGameHeight > BackgroundGameMidleHeight) { // Проверка на размер высоты заднего фона
		context.drawImage(BackgroundGame,0,0,1920,BackgroundGameHeight,0,0,canvasg.width,canvasg.height); 
		// 1:Объект, 2: x Координата начала картинки, 3: y Координата начала картинки, 4: Ширина картинки, 5: Высота картинки, 6: Ее положение по x, 7: Ее положение по y, 8: Размер изображения на Canvas по ширине, 9: Размер изображения на Canvas по высоте
}
else{
	context.drawImage(BackgroundGame,0,0,1920,BackgroundGameMidleHeight,0,0,canvasg.width,canvasg.height); 
     // 1:Объект, 2: x Координата начала картинки, 3: y Координата начала картинки, 4: Ширина картинки, 5: Высота картинки, 6: Ее положение по x, 7: Ее положение по y, 8: Размер изображения на Canvas по ширине, 9: Размер изображения на Canvas по высоте
}

	Time();
	document.addEventListener("keydown",moveUP); // Отслеживание нажатий и вызов функций управления
	if (yHeroPosition < Line) { // Если герой выше пола
		yHeroPosition += Gravity; // Срабатывает гравитация
	}
	else{ // Если на полу
		if(CheckHeroPlatform == false){ // И не был на платформе
			yHeroPosition = Line; // Координата y равна координате пола
		CountJump = 2; // Количество прыжков сбросить до 2
		}
		else{
			yHeroPosition += Gravity;
		}
	}
	if(ArrayPlatform.length == 0){ // Если нет платформ
		GenPlatform(2); // Запустить функцию и создать 2 платформы
	}
for (var i = 0; i < ArrayPlatform.length; i++) { // Отрисовка платформ
context.drawImage(Platform,ArrayPlatform[i].x,ArrayPlatform[i].y,PlatformWidth,PlatformHeight);
}
	for (var i = 0; i < ArrayPlatform.length; i++) { // Цикл для проверки соприкосновения с платформой
		if (xHeroPosition >= ArrayPlatform[i].x - (HeroWidth/2) &&
		 xHeroPosition <= ArrayPlatform[i].x+PlatformWidth - (HeroWidth/2) &&
		  yHeroPosition <= ArrayPlatform[i].y && yHeroPosition >= ArrayPlatform[i].y - HeroHeight) {
		  
		  	ArrayPlatform[i].y= Line;
          yHeroPosition = ArrayPlatform[i].y - HeroHeight; // Установка положение персонажа на уровень платформы
      CountJump = 2; // Сброс количества прыжков на платформе
      if (i != 0) {
      	CheckHeroPlatform = true; // Персонаж встал на платформу
      	BackgroundGameHeight -= 100; // Уменьшить высоту фона на 100
      	CountPointLevel++; // Добавить +1 к счету
		  	ArrayPlatform.splice(i-1,1); // Удалить прошлую платформу
            GenPlatform(1); // Сгенерировать новую
	  }
   
		}
	}
context.drawImage(Hero,xHeroPosition,yHeroPosition,HeroHeight,HeroHeight); // Отрисовка героя 1:Объект, 2:Положение по x, 3:Положение по y, 4:Ширина, 5:Высота

//Вывод текста на Canvas
context.fillStyle = "#000"; // Цвет
context.font = "2em Arial"; // 1: размер шрифта, 2: шрифт
context.fillText('Имя:'+Name_player,0,30); // 1: Сам текст, 2: x координата, 3: y координата

// Вывод таймера на Canvas

if(sec < 10){
	context.fillText("Время: 0" + min+":0"+sec, 0,100);
}
else
{
	if (min < 10) {
	context.fillText("Время: 0" + min+":"+sec, 0,100);
}
else{
	context.fillText("Время: 0" + min+":"+sec, 0,100);
}
}


context.fillText('Очки:'+CountPointLevel,0,60); // Вывод счета


if (Pause == true || yHeroPosition>canvasg.height+100) { // Если статус пазуы вкл
	if(Pause == true){
		context.fillText("Пауза",canvasg.width/2,canvasg.height/2); // Нарисовать паузу
	}
	else {
		location.reload(); // Обновить экран
	}
}
else {
	requestAnimationFrame(Game); // Обновление функции игры каждый фрэйм примерно 60 в секунду
}

}



