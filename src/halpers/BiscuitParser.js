function getChartData (data, props) {
  let chart = [], m = [];

  function CreateSelectBlock(target, func) {
    let ind = 0,
        blocks = {},
        m = {},
        p = {};

    while(ind < target.m.length) {

      if(target.m[ind].block) {
        if(typeof blocks[target.m[ind].block] === "undefined") {
          blocks[target.m[ind].block] = [];
        }

        if(typeof m[target.m[ind].block] === "undefined") {
          m[target.m[ind].block] = [];
        }

        if(typeof p[target.p[ind].block] === "undefined") {
          p[target.p[ind].block] = [];
        }

        blocks[target.m[ind].block].push({
          block: target.m[ind].block,
          mainTitle: target.m[ind].text,
          mainValue: Number(target.m[ind].model || target.m[ind].absolut_vl),
          smallValue: Number(target.m[ind].dinamika || target.m[ind].otnosit_vl),
          secondaryValue: Number(target.p[ind].plan || target.p[ind].absolut_vl),
          m: [],
          p: [],
          smallArrow: Number(target.m[ind].dinamika_flag),
          secondaryColor: props.theme.palette.primary.redBorder,
          mainColor:  props.theme.palette.primary.blueBorder
        });

        m[target.m[ind].block].push({
          block: target.m[ind].block,
          title: target.m[ind].text,
          value: Number(target.m[ind].model || target.m[ind].absolut_vl),
          din: target.m[ind].dinamika,
          an_din: target.m[ind].otnosit_vl + "%",
          arrow: target.m[ind].dinamika_flag,
          color: props.theme.palette.primary.blueBorder,
          level: target.m[ind].level
        });

        p[target.p[ind].block].push({
          block: target.p[ind].block,
          title: target.p[ind].text,
          an_din: target.p[ind].otnosit_vl + "%",
          value: Number(target.p[ind].plan || target.p[ind].absolut_vl),
          color: props.theme.palette.primary.redBorder,
          level: target.p[ind].level
        });
      }

      ind++;
    }
    func.call(blocks, m, p);
  }

  function getKeys(group, type) {
    let target = [];

    for(let key in group) {
      if(group.hasOwnProperty(key)) {
        group[key].forEach((item, i) => {
          if(type === "all") {
            if(i === group[key].length - 1) {
              target.push(item);
            }
          }else {
            if(i < group[key].length - 1) {
              target.push(item);
            }
          }
        });
      }
    }

    return target;
  }

  CreateSelectBlock(data, function (model, plan) {
    chart = getKeys(this, "all");
    m = getKeys(model, "group");

    chart.forEach((item) => {
      m.forEach((el, i) => {
        if(item.block === el.block) {
          item["m"].push(el);
          item["p"].push(getKeys(plan, "group")[i]);
        }
      });
    });
  });

  return chart[0]
}

export {getChartData};