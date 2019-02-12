import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {thousandsSeparator, indent} from "../halpers/formHalper";

class ProgressChart extends Component {

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


  chartCalcWidth = (item) => {
    if(item < 0) {
      if(item < -30) {
        return "30%"
      }else {
        return String(item).replace("-", "") + "%";
      }
    }else if(item > 100) {
      return "100%"
    }else {
      return item
    }
  };

  chartCalcTranslate = (item) => {
    if(item < 0) {
      return "-" + (100) + "%"
    }
  };

  renderElement = (classes) => {//
    return this.props.items.map((item, i) => {
      return (
        <div key={i} className={classes.item}>
          <div className={classes.title}>{indent(item.title, item.level)}</div>
          <div className={classes.chart}>
            <div
              style={{
                width: this.chartCalcWidth(Number(item.an_din.split("%")[0])),
              }}
              className={classes.chartOffset}>
              <div
                className={`${classes.chartInner} ${item.value < 0 ? classes.chartInnerMinus : ""}`}
                style={{
                  background: item.color,
                  width: "100%",
                  transform: `translateX(${this.chartCalcTranslate(Number(item.an_din.split("%")[0]))})`,
                }}
              />
            </div>
          </div>
          <div className={classes.value}>{thousandsSeparator(String(this.insertValue(String(item.value))), 2)}</div>
          <div className={classes.din}>
            {thousandsSeparator(String(item.an_din), 1)}
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
  },
  chartOffset: {
    display: "flex",
    height: 12,
  },
  title: {
    width: "45%",
    color: theme.palette.primary.titles,
    fontSize: 14,
    textAlign: "left",
    paddingRight: 10,
      whiteSpace: "pre"
  },
  chart: {
    width: "25%",
    height: 12,
    paddingRight: "10%",
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
    fontSize: 14,
    textAlign: "right",
    paddingLeft: 10
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
    fontSize: 14,
    textAlign: "right"
  }
});

export default withStyles(styles)(ProgressChart);