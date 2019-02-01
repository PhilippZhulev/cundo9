import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Arrow from "@material-ui/icons/ArrowDownward";


class ProgressChart extends Component {

  // chartCalc = (item) => {
  //   const result = Math.abs(Number(item.value) / this.props.mainValue * 100);
  //   return  result >= 30 ? 30 : result;
  // };
  //
  // chartWidth = (item) => {
  //   return Math.abs(Number(item.value) / this.props.mainValue * 100) > 100 ? 100 : Math.abs(item.value / this.props.mainValue * 100)
  // };

    chartCalc = (item) => {
        console.log(item.value);
        console.log(this.props.trueMain);
        alert("Вопрос про базовое значение в графике");
        const result = Math.abs(Number(item.value) / this.props.trueMain * 100); //<--- Здесь какое базовое значение? почему бралось this.props.mainValue?
        if (Number(item.value) < 0){
            return result > 30 ? 30 : result
        }
        else{
            return result > 100 ? 100 : result
        }
    };

    thousandsSeparator = (string) => {
        let res = string;
        let end = "";
        let sign = "";
        let perc = "";

        if(string.indexOf(".") !== -1){
            res = string.split(".")[0];
            end = string.split(".")[1];
        }
        if(string.indexOf("-") !== -1){
            sign = "-";
            res = res.substr(1);
        }
        if(string.indexOf("%") !== -1){
            sign = "%";
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

  renderElement = (classes) => {
    return this.props.items.map((item, i) => {
      return (
        <div key={i} className={classes.item}>
          <div className={classes.title}>{item.title}</div>
          <div className={classes.chart}>
            <div
              className={`${classes.chartInner} ${item.value < 0 ? classes.chartInnerMinus : ""}`}
              style={{
                background: item.color,
                width: this.chartCalc(item),
                transform: item.value < 0 ? `translateX(-${this.chartCalc(item)}px)` : "",
              }}
            />

          </div>
          <div className={classes.value}>{this.thousandsSeparator(String(item.value))}</div>
          <div className={classes.din}>
            {item.din}
            {typeof item.din !== "undefined" ? "%" : ""}
            {
              typeof item.din !== "undefined"
              ? String(item.din) === "0"
                ? null
                : <Arrow style={{fill: item.arrow < 0 ? "rgb(238, 46, 46)" : "#7ED321", transform: `rotate(${item.arrow < 0 ? 0 : 180}deg)`}} className={classes.arrow} />
              : null
            }
          </div>
        </div>
        )
    })
  };

  render() {
    const props = this.props,
      {classes} = props;

    return (
      <div className={classes.root}>
        {
          this.renderElement(classes)
        }
      </div>
    )
  }
}

const styles = theme => ({
  root: {

  },
  item: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap"
  },
  title: {
    width: "25%",
    color: theme.palette.primary.titles,
    fontSize: 14,
    textAlign: "right",
    paddingRight: 10,
    boxSizing: "border-box"
  },
  chart: {
    width: "28%",
    height: 12,
    paddingRight: "6%",
    paddingLeft: "15%",
    margin: "4px 0",
    boxSizing: "border-box"
  },
  chartInnerMinus: {
    opacity: 0.3
  },
  chartInner: {
    height: "100%",
    borderRadius: "2px"
  },
  value: {
    width: "25%",
    color: theme.palette.primary.titles,
    fontSize: 14,
    textAlign: "right",
    paddingLeft: 10,
    boxSizing: "border-box"
  },
  arrow: {
    fontSize: 18,
    position: "absolute",
    right: -1,
    top: 1
  },
  din: {
    width: "22%",
    paddingRight: 20,
    position: "relative",
    color: theme.palette.primary.titles,
    fontSize: 14,
    textAlign: "right",
    boxSizing: "border-box"
  }
});

export default withStyles(styles)(ProgressChart);