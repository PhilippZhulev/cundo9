let versionParse = function(data, cat) {

    return constructObj(data, cat)
};

let constructObj = (data, cat) => {
    let obj = {text:"", children:[]};
    data.forEach(item => {
        if(item.text === cat){
            obj.text = "Вариант расчёта "+item.text;
            obj.key = "#";
            obj.group = "X_var1";
        }
        obj.children.push({
          text: "Вариант расчёта "+item.text,
          key: item.key,
          group: "X_var1"
        });
    });
    return [obj]
};

export { versionParse };