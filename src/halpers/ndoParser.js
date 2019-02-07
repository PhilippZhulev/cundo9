let ndoParse = function(data, cat) {


    //console.log(data);
    //return constructStructure(data);
    return constructObj(data, cat)
};

let constructObj = (data, cat) => {
    let children = [];
    children.push({text: "Все категории НДО",
        key: "#",
        group: "gv_ndo"});
    // let obj = {
    //   text: "Все категории НДО",
    //   key: "#",
    //   group: "gv_ndo"
    // };

    //<--- older then outer comments
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
    // --->

  // data.forEach(item =>{
  //   if(!obj.hasOwnProperty("children")){
  //                 obj.children = [];
  //             }
  //   obj.children.push({
  //     text:item.text_ndo,
  //     key: item.key_ndo,
  //     group: "gv_ndo"
  //   });
  // });

    data.forEach(item =>{
      children.push({
        text:item.text_ndo,
        key: item.key_ndo,
        group: "gv_ndo"
      });
    });

  let res = {text: "Текущий выбор", key: cat,  group: "gv_ndo", children: children};
  if(cat === "#"){
      res.text = "Все категории НДО";
  }
  else {
      for (let i = 0; i < data.length; i++) {
          if (data[i].key === cat) {
              res.text = data[i].text;
          }
      }
  }
    return [res]
};

export { ndoParse };