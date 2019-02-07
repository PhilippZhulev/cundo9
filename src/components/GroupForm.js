import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Input from "./Input";
import Button from "./Button";
import {LumiraRequest} from "../halpers/LumiraRequest";

class GroupForm extends Component {

  state = {
    value1: "",
    value2: ""
  };

  keyUpInput = (e, target) => {
    if(e.target.value.length > 0) {
      this.props.bindGroup({[target]: true});
    }else {
      this.props.bindGroup({[target]: false});
    }
  };

  handleFilters = () => {
    this.props.bindPreloader({longPreloader: true});
    const REQ = LumiraRequest("DATA_UPDATE");

    REQ.set("tech6", () => {
      console.log("ОТПРАВЛЕН ЗАПРОС В ЛЮМИРУ...");
      if(this.state.value2.length !== 0) {
        return `obr,komp,${this.state.value2},${this.props.storeDriversData["vesCOM04"]},${this.props.storeDriversData["vesCMP01"]}`
      }else if(this.state.value1.length !== 0) {
        return `obr,kd,${this.state.value1},${this.props.storeDriversData["vesCOM04"]},${this.props.storeDriversData["vesCOM05"]},${this.props.storeDriversData["vesCOM06"]}`
      }else {
        return "pr"
      }
    });

    this.props.bindDriversData({
        COM05: null,
        COM06: null,
        COM04: null,
        CMP01: null,
    });
  };

  render() {
    const props = this.props,
          classes = props.classes;

    return(
      <div className={classes.root}>
        <div className={classes.inputWrapperFirst}>
          <Input
            onChange={(e) => this.setState({value1 : e.target.value})}
            onKeyUp={(e) => this.keyUpInput(e, "inputKomp")}
            disabled={this.props.storeGroup.inputKd}
            label={"КД"}
            type={"number"}
            value={this.state.value1}/>
        </div>
        <div className={classes.inputWrapperLast}>
            <Input
              onChange={(e) =>
              this.setState({value2 : e.target.value})}
              onKeyUp={(e) => this.keyUpInput(e, "inputKd")}
              disabled={this.props.storeGroup.inputKomp}
              label={"Компенсация"}
              type={"number"}
              value={this.state.value2}/>
        </div>
        <div className={classes.btnWrapper}>
          <Button onClick={this.handleFilters} text={"Рассчитать"} classes={{root: classes.btn, wrapper: classes.wrapper}} />
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  inputWrapperFirst: {
    paddingRight: "20px"
  },
  inputWrapperLast: {
    paddingRight: "30px"
  },
  btn: {
    width: 128,
    height: 40
  },
  btnWrapper: {
    marginTop: 14
  },
  wrapper: {
    padding: "0 0"
  }
});

export default withStyles(styles)(GroupForm);