let thousandsSeparator = function(string, digits = -1){
    if(typeof string === "undefined"){
        return undefined
    }
    if(typeof string !== "string"){
        string = String(string);
    }
    let res = string;
    let end = "";
    let sign = "";
    let perc = "";

    if(res.indexOf(".") !== -1){
        res = string.split(".")[0];
        end = string.split(".")[1];
    }
    if(res.indexOf("-") !== -1){
        sign = "-";
        res = res.substr(1);
    }
    if(res.indexOf("%") !== -1){
        perc = "%";
        res = res.substr(0, res.length - 1);
    }
    let len = res.length;
    while(true){
        if(len <= 3){
            break
        }
        res = res.substr(0, len - 3) + " " + res.substr(len - 3);
        len = len - 3;

    }
    if(end.length < digits && digits !== -1){
        while(end.length !== digits){
            end = end + "0";
        }
    }
    if(end.length > digits && digits !== -1){
        end = end.substr(0, digits);
    }
    if(end !== ""){
        res = [res,end].join(".");
    }
    // if(digits !== -1){
    //     String(Number(res).toFixed(digits));
    // }
    if(sign !== ""){
        res = sign + res;
    }
    if(perc !== ""){
        res = res + perc;
    }

    return res//Number(string)
};

let indent = function(string, level, indent = "   ", firstLevel = 0){
    let res = "";
   for(let i = firstLevel; i <= level; i++) {
       res = res + indent;
   }
   res = res + string;
   return res
};

export { thousandsSeparator, indent };