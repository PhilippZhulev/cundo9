import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {thousandsSeparator, indent} from "../halpers/formHalper";

class ProgressChart extends Component {

  state = {
    hover: false
  };

  valueLimit = (string, limit) => {
    if(typeof string !== "undefined") {
      if(string.length > limit) {
        return String(Number(string.slice(0, limit)).toFixed(0));
      }else {
        return String(Number(string).toFixed(0));
      }
    }
  };

  // insertValue = (value) => {
  //   switch (value.length) {
  //     case 12 : return this.valueLimit(value, 5).replace(/(\d)(?=(\d\d)+([^\d]|$))/g, '$1.') + " млрд.";
  //     case 11 : return this.valueLimit(value, 5).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.') + " млрд.";
  //     case 10 : return this.valueLimit(value, 5).replace(/(\d)(?=(\d\d\d\d)+([^\d]|$))/g, '$1.') + " млрд.";
  //     case 9 : return this.valueLimit(value, 5).replace(/(\d\d)(?=(\d\d)+([^\d]|$))/g, '$1.') + " млн.";
  //     case 8 : return this.valueLimit(value, 5).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.') + " млн.";
  //     case 7 : return this.valueLimit(value, 5).replace(/(\d)(?=(\d\d\d\d)+([^\d]|$))/g, '$1.') + " млн.";
  //     case 6 : return this.valueLimit(value, 4).replace(/(\d)(?=(\d)+([^\d]|$))/g, '$1.') + " тыс.";
  //     case 5 : return this.valueLimit(value, 4).replace(/(\d)(?=(\d\d)+([^\d]|$))/g, '$1.') + " тыс.";
  //     case 4 : return this.valueLimit(value, 4).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1.') + " тыс.";
  //     default : return "0"
  //   }
  // };

  insertValue = (value) => {
    switch (value.length) {
      case 12 : return value;
      case 11 : return value;
      case 10 : return value;
      case 9 : return value;
      case 8 : return value;
      case 7 : return value;
      case 6 : return value;
      case 5 : return value;
      case 4 : return value;
      default : return "0"
    }
  };


  // chartCalcWidth = (item) => {
  //   if(item < 0) {
  //     if(item < -45) {
  //       return "45%"
  //     }else {
  //       return String(item).replace("-", "") + "%";
  //     }
  //   }else if(item > 100) {
  //     return "100%"
  //   }else {
  //     return item
  //   }
  // };

  chartCalcWidth = (item) => {
    let res = Math.abs(item);
    if (res > 100) {
      res = 100
    }
    //return res + "%"
    return 100*res/100
  };

  chartCalcTranslate = (item) => {
    if(item < 0) {
      return "-" + (100) + "%"
    }
  };

  findMax = (items) => {
    let max = Number(items[0].value);
    for(let i = 1; i < items.length; i++){
      if (max < Number(items[i].value)){
        max = Number(items[i].value);
      }
    }
    return Math.abs(max)
  };

  onHover = (ind) => {
    this.setState({[`hover${ind}`]: false});
  };

  offHover = (ind) => {
    this.setState({[`hover${ind}`]: true});
  };

  renderElement = (classes) => {//
    const colors = ["#5BBFAC","#F5CC97","#EC9DA1","#6EA7FF","#A6D376"];
    //const max = this.findMax(this.props.items);
    return this.props.items.map((item, i) => {
      const val = (this.props.trueMain === 0) ? 0 : Number(item.value) / this.props.trueMain * 100;
      return (
        <div key={i} className={classes.item} onMouseOver={() => this.offHover(i)} onMouseLeave={() => this.onHover(i)} >
          <div className={classes.title} style={(this.state[`hover${i}`]) ? {color: (item.level !== "") ? colors[Number(item.level)] :  colors[0]} : {}}>{indent(item.title, item.level)}</div>
          <div className={classes.chart}>
            <div
              style={{
                //width: this.chartCalcWidth(Number(item.an_din.split("%")[0])),
                width: this.chartCalcWidth(val),
              }}
              className={classes.chartOffset}>
              <div
                className={`${classes.chartInner} ${item.value < 0 ? classes.chartInnerMinus : ""}`}
                style={{
                  background: (item.level !== "") ? colors[Number(item.level)] : colors[0],
                  width: "100%",
                  //transform: `translateX(${this.chartCalcTranslate(Number(item.an_din.split("%")[0]))})`,
                  transform: `translateX(${this.chartCalcTranslate(val)})`,
                }}
              />
            </div>
          </div>
          <div className={classes.value} style={(this.state[`hover${i}`]) ? {color: (item.level !== "") ? colors[Number(item.level)] :  colors[0]} : {}}>{thousandsSeparator(String(this.insertValue(String(item.value))), 2)}</div>
          <div className={classes.din} style={(this.state[`hover${i}`]) ? {color: (item.level !== "") ? colors[Number(item.level)] :  colors[0]} : {}}>
            {thousandsSeparator(String(item.an_din), 1)}
          </div>
        </div>
        )
    })
  };

  render() {
    const props = this.props,
      {classes} = props;
    console.log("Analitic Chart Props!");
    console.log(props);

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
  },
  chartOffset: {
    display: "flex",
    height: 12,
  },
  title: {
    margin: "4px 0",
    height: 12,
    width: "50%",
    color: theme.palette.primary.titles,
    fontSize: 12,
    textAlign: "left",
    paddingRight: 10,
      whiteSpace: "pre"
  },
  chart: {
    //width: "25%",
    width: "15%",
    height: 12,
    //paddingRight: "10%",
    margin: "4px 0"
  },
  chartInnerMinus: {
    opacity: 1.0//0.3
  },
  chartInner: {
    height: "100%",
    borderRadius: "2px"
  },
  value: {
    width: "22%",
    color: theme.palette.primary.titles,
    fontSize: 12,
    textAlign: "right",
    //paddingLeft: 10
    paddingLeft: 5
  },
  arrow: {
    fontSize: 18,
    position: "absolute",
    right: -1,
    top: 1
  },
  din: {
    width: "13%",
    position: "relative",
    color: theme.palette.primary.titles,
    fontSize: 12,
    textAlign: "right"
  }
});

export default withStyles(styles)(ProgressChart);