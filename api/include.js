function Reactor() {
  this.run = function() {

    //Функция кроссбраузерных генерации кастомных событий
    function createNewEvent(eventName) {
      if(typeof(Event) === 'function') {
        return new Event(eventName);
      }else{
        return document.createEvent('Event');
      }
    }
    function initIENewEvent(event, eventName) {
      if(typeof(Event) !== 'function') {
        return event.initEvent(eventName, false, true);
      }
    }
    var reactRun = createNewEvent("React.run");
    var reactUpdate = createNewEvent("React.update");
    var reactError = createNewEvent("React.error");
    initIENewEvent(reactRun, "React.run");
    initIENewEvent(reactUpdate, "React.update");
    initIENewEvent(reactError, "React.error");

    window["bobr"] = JSON.parse(this.globalSettings.Settings.initial_data);
    window["bobrSettings"] = this.globalSettings;

    try {
      window["bobrData"] = JSON.parse(window.bobrSettings.Settings.data);
      console.log("ВСЕ ПРИШЛЫЕ ДАННЫЕ:");
      console.log(window.bobrData);
    }catch (e) {
      console.log("BOBJ: Ошибка получения данных.");
      console.warn(e);
      window["bobrData"] = null;
    }

    if(window["bobr"].payload === "START") {

      // var getRootPath = function () {
      //   var rootStylePath = document.querySelector("head").lastElementChild.attributes[2].textContent.split("/");
      //
      //   var i = 0,
      //     result = "";
      //
      //   while(i < rootStylePath.length - 2) {
      //     if(rootStylePath[i] !== "") result += (rootStylePath[i] + "/");
      //     i++;
      //   }
      //
      //   return result
      // };

      function getUrls(content){
          var script = content.split('<script type="text/javascript" src="')[1].split('"')[0];
          var result = script.split("/")[script.split("/").length - 1];

          return {
            content: content
                    .replace(script, window.bobrPath + "static/js/" + result)
                    .replace("normalize.css" , window.bobrPath + "normalize.css")
                    .replace("main.css" , window.bobrPath + "main.css")
                    .replace('type="text/javascript"', ""),
            script: window.bobrPath + "static/js/" + result
          }
      }

      window["bobrPath"] = "zen/mimes/global/Root+Folder/_fin/db_cundo/tech0/build/";

      console.log([document.querySelector("head")]);

      var xmlHttp = new XMLHttpRequest();

      xmlHttp.open("GET", window.bobrPath + "index.html", false);
      xmlHttp.send();

        console.log(window);

        if (xmlHttp.status === 200) {
          document.querySelector("html").innerHTML = getUrls(xmlHttp.responseText).content;

          try {
            xmlHttp.open("GET", getUrls(xmlHttp.responseText).script, false);
            xmlHttp.send();

            if (xmlHttp.status === 200) {
              eval(xmlHttp.responseText);
              document.dispatchEvent(reactRun);
              console.log("BOBJ: frontend запущен...");
            }
          }catch (e) {
            console.log("Чихнул!!!");
          }

        }else {
          console.warn("Да я очень убогий и печальный...");
        }
    }

    if(window["bobr"].payload === "CHANGE") {
      document.dispatchEvent(reactUpdate);
    }
  }
}

