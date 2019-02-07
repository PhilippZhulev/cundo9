let thousandsSeparator = function(string){
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
    if(end !== ""){
        res = [res,end].join(".");
    }
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
       console.log("+ indent");
   }
   res = res + string;
   console.log(res);
   console.log(level);
   return res
};

export { thousandsSeparator, indent };