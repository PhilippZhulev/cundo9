let ndoParse = function(data, cat) {


    //console.log(data);
    //return constructStructure(data);
    return constructObj(data, cat)
};

let constructObj = (data, cat) => {
    let obj = {
      text: "Все категории НДО",
      key: "#",
      group: "gv_ndo"
    };
    // data.forEach(item =>{
    //     if(item.key_ndo === cat||cat === "#"){
    //         if(!obj.hasOwnProperty("children")){
    //             obj.children = [];
    //         }
    //         obj.children.push({
    //           text: item.text_ndo,
    //           key: item.key_ndo,
    //           group: "gv_ndo"
    //         })
    //     }
    // });
  data.forEach(item =>{
    if(!obj.hasOwnProperty("children")){
                  obj.children = [];
              }
    obj.children.push({
      text:item.text_ndo,
      key: item.key_ndo,
      group: "gv_ndo"
    });
  });
    return [obj]
};

export { ndoParse };