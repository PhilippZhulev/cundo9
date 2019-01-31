## BOBR v1.2

### npm Команды
- npm run git ------ Залить в реп.
- npm run c -------- Сделать commit в реп.
- npm run p -------- Сделать push в реп.
- npm run f -------- Сделать fetch в реп.
- npm run ftp ------ Залить на ftps.
- npm start -------- Запустить режим отладки интерфейса.
- npm run build ---- Создать продуктивную сборку.
- npm run test ----- Тестировать сборку.
- npm run docs ----- Генерация документации.
- npm run docsDev -- Сервер документации.

### api

#### updateState()
```javascript
window.updateState(["change_name", data], () => {
    return null;
});
```
Отправляет в BO данные и генирирует событие.

**updateState([change, data], func)**

**change** - имя события для индефикации в BO;

**data** - данные для отправки в BO;

**func** - каллбек

### Инициализация в BO GLOBAL.init();
**GLOBAL.init("ACTION_NEW")**;
```javascript
var payload = "";
var data = "";

if(change === "ACTION_START") {
	payload = "START";	
	data = "Привет мир!";
}

if(change === "ACTION_NEW") {
	payload = "CHANGE";
	data = "Привет обновленный мир!";
}

var initial_data ='{' +
	'	"payload": "'+ payload +'"' +
	'}';

		
START_REACTOR.ioAttr(actionType.SET, "event$$_$$include$$_$$initial_data$$_$$data","run$$_$$Reactor$$_$$" + initial_data + "$$_$$" + data);
```

#### change ACTION_START

Старт приложения (инициализация) - Обязательно при запуске приложения.

#### change ACTION_NEW

Любое обновление данных.

### Инициализация в BO при updateState

```javascript
gv_action = this.ioAttr(actionType.GET, "actionType");

if(gv_action === "SLIDERS") {
	gv_calc = this.ioAttr(actionType.GET, "actionContent");
}

GLOBAL.init("ACTION_NEW");
```

#### createNewEvent()
```javascript
createNewEvent("React.run");
```
Создать событие.

**createNewEvent(eventName)**

**eventName** - имя события.

#### initIENewEvent()
```javascript
initIENewEvent(reactRun, "React.run");
```
Инициализация события.

**initIENewEvent(event, "eventName")**

**event** - событие, переменная с событием;

**eventName** - имя событияю.

### События

```javascript
document.addEventListener("React.update", func);
```

- React.run - Запуск react
- React.update - для обновления каких либо данных в react (используется в updateState)

#### Стандартный index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';


let dump;

document.addEventListener("React.run", function() {

    dump = (typeof(window.obj) !== "undefined" && window.obj !== null) ? window.obj : {};

    ReactDOM.render(
        <App data={dump}/>,
        document.getElementById('APP_panel1')
    );

    console.log("Change: React run....");
});
```

### Строение
```jade
|--api                  //api для синхронизации с BO
|----include.js         //Reactor - class для обработкой BO
|----main-min.js        //Функции
|--build                //Готовая сборка
|----dist
|------bungle-min.js    //js сборки
|--public               //Стили, шрифты, index
|----font
|----img
|----local_api          //Локальное api для отладки
|------data.json        //Модель сруктуры данных
|------include.js      
|------main-min.js
|----index.html         //index для режима разработчика
|----main.css           //сборка css
|--src                  //папка разработки
|----component          //react компоненты
|----router             //роутинг
|------router.js
|----views              //шаблоны
|------modules          //модули для шаблонов
|--------moduleName.js
|------viewName.js
|----index.js           //файл входа react
|----reduser.js         //редакс редюсеры
|--GruntFile.js         //настройки grunt
|--package.json         //настройки npm и перечень модулей
```
