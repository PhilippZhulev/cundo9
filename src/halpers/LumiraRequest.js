const LumiraRequest = (action) => {
  return {
    set: (event, actionContent) => {
      console.log(actionContent.call(window.bobrSettings));
      if(typeof window.bobrSettings !== "undefined") {
        window.bobrSettings.Settings["actionContent"] = actionContent.call(window.bobrSettings);
        window.bobrSettings.that_c.firePropertiesChangedAndEvent(["SettingsTP"], event);
      }
    },
    get: (callback) => {
      document.addEventListener("React.update", (e) => {
        e.preventDefault();
        if(action) {
          setTimeout(()=> {
            callback(action, window.bobrSettings);
          }, 0);
        }
      });
    }
  }
};

export {LumiraRequest}