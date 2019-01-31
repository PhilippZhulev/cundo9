let dateParse = function(data, cat, group) {
    //const data = `[{"key":"20181","text":"1 Квартал 2018"},{"key":"20191","text":"1 Квартал 2019"},{"key":"20201","text":"1 Квартал 2020"},{"key":"20211","text":"1 Квартал 2021"},{"key":"20182","text":"2 Квартал 2018"},{"key":"20192","text":"2 Квартал 2019"},{"key":"20202","text":"2 Квартал 2020"},{"key":"20212","text":"2 Квартал 2021"},{"key":"2019","text":"2019 год"},{"key":"2020","text":"2020 год"},{"key":"2021","text":"2021 год"},{"key":"20183","text":"3 Квартал 2018"},{"key":"20193","text":"3 Квартал 2019"},{"key":"20203","text":"3 Квартал 2020"},{"key":"20213","text":"3 Квартал 2021"},{"key":"20184","text":"4 Квартал 2018"},{"key":"20194","text":"4 Квартал 2019"},{"key":"20204","text":"4 Квартал 2020"},{"key":"20214","text":"4 Квартал 2021"},{"key":"201808","text":"Август 2018"},{"key":"201908","text":"Август 2019"},{"key":"201804","text":"Апрель 2018"},{"key":"201904","text":"Апрель 2019"},{"key":"201812","text":"Декабрь 2018"},{"key":"201912","text":"Декабрь 2019"},{"key":"201807","text":"Июль 2018"},{"key":"201907","text":"Июль 2019"},{"key":"201806","text":"Июнь 2018"},{"key":"201906","text":"Июнь 2019"},{"key":"201805","text":"Май 2018"},{"key":"201905","text":"Май 2019"},{"key":"201803","text":"Март 2018"},{"key":"201903","text":"Март 2019"},{"key":"201811","text":"Ноябрь 2018"},{"key":"201911","text":"Ноябрь 2019"},{"key":"201810","text":"Октябрь 2018"},{"key":"201910","text":"Октябрь 2019"},{"key":"201809","text":"Сентябрь 2018"},{"key":"201909","text":"Сентябрь 2019"},{"key":"201802","text":"Февраль 2018"},{"key":"201902","text":"Февраль 2019"},{"key":"201801","text":"Январь 2018"},{"key":"201901","text":"Январь 2019"}]`;
    //const data = `[{"key":"20181","text":"1 Квартал 2018"}]`;
    //console.log(constructStructure(data, cat, group));
    return constructStructure(data, cat, group);
};

let constructStructure = function(odata, cat, group){
    //console.log(odata);
    let years = [];
    odata.forEach(date => {
        const year = date.key.slice(0,4);
        if(!years.includes(year)){
            years.push(year);
        }
    });
    //console.log(years);
    let res = [];
    odata.forEach(date => {
        includesDate(res, date.key, date.text, group);
    });
    let obj = {text:"", key:"", children:res, group:group};
    odata.forEach(item => {
        if (item.key === cat){
            obj.text = item.text;
            obj.key = item.key;
        }
    });
    return [obj]
};

let includesDate = function(res, key, text, group){
    //console.log(">>> IN");
    //console.log(key);
    switch(key.length){
        case 4:
            let returnFlagY = false;
            res.forEach(date => {
                if(!returnFlagY){
                    if (date.key === key){
                        if(text !== undefined){
                            date.text = text;
                        }
                        returnFlagY = true;
                    }
                }
            });
            if (returnFlagY) {
                return
            }
            res.push({key: key, text:text, group:group});
            res = sort(res);
            break;
        case 5:
            includesDate(res, key.slice(0, 4), undefined, group);
            let returnFlagQ = false;
            res.forEach(year => {
                if (!returnFlagQ) {
                    if (year.hasOwnProperty("key")) {
                        if (year.key === key.slice(0, 4)) {
                            if (!year.hasOwnProperty("children")) {
                                year.children = [];
                            }
                            year.children.forEach(quart => {
                                if (quart.hasOwnProperty("key")) {
                                    if (quart.key === key) {
                                        if (text !== undefined) {
                                            quart.text = text;
                                            quart.group = group;
                                        }
                                        returnFlagQ = true;
                                    }
                                }
                            });
                            if(returnFlagQ){
                                return
                            }
                            year.children.push({key: key, text: text, group:group});
                            year.children = sort(year.children);
                        }
                    }
                }
            });
            break;
        case 6:
            //console.log(key);
            includesDate(res, mapMonthToQuartal(key), undefined, group);
            let returnFlagM = false;
            res.forEach(year => {
                if (!returnFlagM){
                    if (year.hasOwnProperty("key")){
                        if (year.key === key.slice(0, 4)) {
                            if (year.hasOwnProperty("children")) {
                                year.children.forEach(quart => {
                                    if (quart.hasOwnProperty("key")) {
                                        if (quart.key === mapMonthToQuartal(key)) {
                                            if(!quart.hasOwnProperty("children")){
                                                quart.children = [];
                                            }
                                            quart.children.forEach(month => {
                                                if(month.hasOwnProperty(key)){
                                                    if(month.key === key){
                                                        returnFlagM = true;
                                                    }
                                                }
                                            });
                                            if(returnFlagM){
                                                return
                                            }
                                            quart.children.push({key:key, text:text, group:group});
                                            quart.children = sort(quart.children);
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            });
            break;
    }
    //console.log(res);
    //console.log("<<<OUT");

};

let mapMonthToQuartal = function(key){
    const month = Number(key.slice(4,6));
    if(month < 4){
        return key.slice(0,4)+"1"
    }
    else if(month < 7){
        return key.slice(0,4)+"2"
    }
    else if(month < 10){
        return key.slice(0,4)+"3"
    }
    else{
        return key.slice(0,4)+"4"
    }
};

let sort = function(arr) {
    let res = arr.slice(0);
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = i + 1; j < arr.length; j++){
            //console.log(res);
            if (Number(res[i].key) > Number(res[j].key)){
                //console.log("swap");
                let tmp = res[i];
                res[i] = res[j];
                res[j] = tmp;
            }
        }
    }
    return res
};

export { dateParse };