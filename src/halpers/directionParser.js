let directionParse = function(data, cat) {

    return constructObj(data, cat)
};

let constructObj = (data, cat) => {
    let obj = {text:"", children:[]};
    data.forEach(item => {
        if(item.key === cat){
          obj.text = item.text;
          obj.key = "#";
          obj.group = "gv_direction";
        }
        obj.children.push({
          text: item.text,
          key: item.key,
          group: "gv_direction"
        });
    });
    return [obj]
};

export { directionParse };