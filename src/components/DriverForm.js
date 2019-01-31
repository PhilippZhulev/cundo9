import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import StepSlider from "../containers/Slider";
import Input from "./Input";
import Arrow from "@material-ui/icons/ArrowDownward"
import Info from './Info'

class DriverForm extends Component {

  state = {
    ves: "0"
  };

  valueLimit = (string, limit) => {
    // if(typeof string !== "undefined") {
    //   if(string.length > limit) {
    //
    //     let res = (Math.trunc(Number(string) * 100) / 10000).toFixed(0);
    //     if(String(res).length < 3) {
    //       return (Math.trunc(Number(string) * 100) / 1000).toFixed(0);
    //     }else {
    //       return res
    //     }
    //   }else if(string.indexOf(".") !== -1) {
    //     return Number(string).toFixed(2);
    //   }else {
    //     return Number(string).toFixed(0);
    //   }
    // }
      //string = "30000000";
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

  handleBinding = (value) => {
    if(typeof value === "string") {
      return this.props.storeGroup[value]
    }else {
      const result = [];
      value.forEach((item) => {
        if(this.props.storeGroup[item] === true) {
          result.push(this.props.storeGroup[item])
        }
      });

      if(result[0] === true && result[1] === true) {
        return true;
      }
    }
  };

  arrowController = (param) => {
    if(param === "1") {
      return {fill: "#7ED321", transform: `rotate(${180}deg)`}
    }else if(param=== "-1"){
      return {fill: "#EE2E2E", transform: `rotate(${0}deg)`}
    }else {
      return {display: "none"}
    }
  };

  handleVes = (event) => {
    this.setState({ves: event.target.value}, () => {
      this.props.bindDriversData({[`ves${this.props.settings.id}`] : this.state.ves})
    })
  };

  render() {
    const props = this.props,
      {classes} = props;

    const info = props.values.info;

    return (
      <div  className={classes.root}>
        <div
          className={classes.fade}
          style={this.handleBinding(props.binding) === true
            ? {opacity: 1, visibility: "visible"}
            : {opacity: 0, visibility: "hidden"}
          }
      />
        <div className={classes.tileTitle}>
          {props.title}
        </div>
        <div className={classes.rightBlock}>
          <Info classes={typeof info !== "string" ? {popup: classes.infoPos} : {}} position={"left"} text={
            typeof info === "string"
              ? info
              : info.map((item, i) => {
                return (
                  <div key={i}>
                    {item}
                    <br/>
                    <br/>
                    <span>План: </span>
                    <span>{this.valueLimit(props.values.base[i], 4)}</span><br/>
                    <span>Модель: </span>
                    <span>{this.valueLimit(props.values.model[i], 4)}</span><br/>
                    <br/>
                    <br/>
                  </div>
                )
              })
            }
          />
          {
            typeof props.values.baseLarge === "string"
              ? <div className={classes.rightValue}>
                  <div className={classes.rightValueItem}>
                      <section><span style={{background: "#3498DB"}} /><div>{this.valueLimit(props.values.model, 4)}</div><Arrow style={this.arrowController(this.props.values.arrowModel)} className={classes.arrow} /></section>
                    <section>{String(this.valueLimit(props.values.modelLarge, 4))}</section>
                  </div>
                  <div className={classes.rightValueItem}>
                      <section><span style={{background: "#EB5763"}} /><div>{this.valueLimit(props.values.base, 4)}</div><Arrow style={this.arrowController(this.props.values.arrowPlan)} className={classes.arrow} /></section>
                    <section>{String(this.valueLimit(props.values.baseLarge, 4))}</section>
                  </div>
                </div>
              : null
          }
          {
            typeof props.values.baseLarge === "object"
              ? <div className={classes.rightValue}>
                {
                  props.values.baseLarge.map((item, i) => {
                    if(i < 1) {
                      return (
                        <div key={i}>
                          <div className={classes.rightValueItem}>
                              <section><span style={{background: "#3498DB"}} /><div>{this.valueLimit(props.values.model[i], 4)}</div><Arrow style={this.arrowController(this.props.values.arrowModel[i])} className={classes.arrow} /></section>
                            <section>{String(this.valueLimit(props.values.modelLarge[i], 4))}</section>
                          </div>
                          <div className={classes.rightValueItem}>
                              <section><span style={{background: "#EB5763"}} /><div>{this.valueLimit(props.values.base[i], 4)}</div><Arrow style={this.arrowController(this.props.values.arrowPlan[i])} className={classes.arrow} /></section>
                            <section>{String(this.valueLimit(props.values.baseLarge[i], 4))}</section>
                          </div>
                        </div>
                      )
                    }else {
                      return null
                    }
                  })
                }
                </div>
              : null
          }
        </div>
        <div className={classes.SlderWrapper}>
          {
            typeof props.values.baseLarge === "object"
              ? <StepSlider settings={props.settings} b_prirost={props.values.b_prirost[0]} m_prirost={props.values.m_prirost[0]} />
              : <StepSlider settings={props.settings} b_prirost={props.values.b_prirost} m_prirost={props.values.m_prirost} />
          }
        </div>
        <div className={classes.bottomInput}>
          <Input label={""} type={"text"} classes={{input: classes.input}} onKeyUp={(e) => console.log(e)} onChange={this.handleVes} value={this.state.ves}/>
          <span className={classes.label}>Вес влияния драйвера (расчёт от КПЭ %)</span>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    width: "calc(100% - 122px)"
  },
  infoPos: {
    marginTop: -350,
    marginLeft: "-140px!important"
  },
  arrow: {
    fontSize: 18,
    position: "absolute",
    right: -20,
    top: 8
  },
  rightValue: {
    margin: "auto"
  },
  rightValueItem: {
    fontStyle: "normal",
    margin: "15px 0",
    fontWeight: "normal",
    lineHeight: "normal",
    fontSize: 14,
    color:" #8797C0",
    textAlign: "right",
    "& section:first-child": {
      fontSize: 22,
      position: "relative",
      color:" #fff",
        display: "flex",
      "& span": {
        width: 8,
        height: 8,
        marginTop: 14,
        marginRight: 5,
        marginLeft: -13,
        display: "block",
        borderRadius: "50%"
      },
        "& div": {
          textAlign: "right",
            width: "100%"
        }
    }
  },
  rightBlock: {
    width: 122,
    display: "flex",
    position: "absolute",
    height: "100%",
    top: 0,
    right: 0,
    background: "#273856"
  },
  SlderWrapper: {
    marginTop: "17%"
  },
  SlderWrapperLarge: {
    marginTop: "30%"
  },
  bottomInput: {
    marginTop: -15,
    display: "flex",
    position: "absolute",
    bottom: 15
  },
  label: {
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: "16px",
    width: 150,
    paddingLeft: 10,
    paddingTop: 2,
    fontSize: 12,
    color: "#8797C0"
},
  input: {
    width: 68,
    height: 38,
    background: "#b4bbd8",
    border: "1px solid #b4bbd8"
  },
  tileTitle: {
    color: theme.palette.primary.titles,
    fontSize: 14,

    fontWeight: 400,
    marginBottom: 15,
  },
  fade: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    background: "rgba(27, 33, 55, 0.62)",
    zIndex: 999,
    transition: "all 200ms ease-in-out",
    "&:hover": {
      boxShadow: "0 0 0 1px #8797C0"
    }
  }
});

export default withStyles(styles)(DriverForm);