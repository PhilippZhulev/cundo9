import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Input from "./Input";
import Button from "./Button";
import {LumiraRequest} from "../halpers/LumiraRequest";

class GroupForm extends Component {

  state = {
    value1: this.props.storeValues.value1,
    value2: this.props.storeValues.value2,
    currInput1: this.props.storeValues.currInput1,
    currInput2: this.props.storeValues.currInput2
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
      if(this.props.storeValues.value2.length !== 0) {
        return `obr,komp,${this.props.storeValues.value2},${this.props.storeDriversData["vesCOM04"]},${this.props.storeDriversData["vesCMP01"]}`
      }else if(this.props.storeValues.value1.length !== 0) {
        return `obr,kd,${this.props.storeValues.value1},${this.props.storeDriversData["vesCOM04"]},${this.props.storeDriversData["vesCOM05"]},${this.props.storeDriversData["vesCOM06"]}`
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

  handleInput1 = (event, target) => {
    if(event.target.value.match(/\d+[,.]{0,1}\d*/) !== null && event.target.value.match(/\d+[,.]{0,1}\d*/)[0].length === event.target.value.length) {
      console.log("case 1");
      this.setState({currInput1: event.target.value.replace(".", ","), value1: event.target.value.replace(",", ".")}, () => {
        this.props.bindValues({value1: this.state.value1, currInput1: this.state.currInput1})
      })
    }
    else if(event.target.value === ""){
      console.log("case 2");
      this.setState({currInput1: "", value1: ""}, () => {
        this.props.bindValues({value1: this.state.value1, currInput1: this.state.currInput1})
      })
    }
    else{
      console.log("case 3");
      event.target.value = "";
    }
    console.log(`${event.target.value}; ${this.state.currInput1}; ${this.state.value1}`);
    console.log(target);
    // if(event.target.value.length > 0) {
    //   this.props.bindGroup({[target]: true});
    // }else {
    //   this.props.bindGroup({[target]: false});
    // }

  };

  handleInput2 = (event, target) => {
    if(event.target.value.match(/\d+[,.]{0,1}\d*/) !== null && event.target.value.match(/\d+[,.]{0,1}\d*/)[0].length === event.target.value.length) {
      this.setState({currInput2: event.target.value.replace(".", ","), value2: event.target.value.replace(",", ".")}, () => {
        this.props.bindValues({value2: this.state.value2, currInput2: this.state.currInput2})
      })
    }
    if(event.target.value === ""){
      this.setState({currInput2: "", value2: ""}, () => {
        this.props.bindValues({value2: this.state.value2, currInput2: this.state.currInput2})
      })
    }
    else{
      console.log("case 3");
      event.target.value = "";
    }
    console.log(`${event.target.value}; ${this.state.currInput2}; ${this.state.value2}`);
    console.log(target);
    // if(event.target.value.length > 0) {
    //   this.props.bindGroup({[target]: true});
    // }else {
    //   this.props.bindGroup({[target]: false});
    // }
  };

  render() {
    const props = this.props,
          classes = props.classes;

    return(
      <div className={classes.root}>
        <div className={classes.inputWrapperFirst}>
          <Input
            onChange={(e) => this.handleInput1(e, "inputKomp")}
            onKeyUp={(e) => this.keyUpInput(e, "inputKomp")}
            //disabled={this.props.storeGroup.inputKd}
            disabled={this.props.storeValues.currInput2.length > 0}
            label={"КД"}
            type={"text"}
            value={this.state.currInput1}/>
        </div>
        <div className={classes.inputWrapperLast}>
            <Input
              onChange={(e) => this.handleInput2(e, "inputKd")}
              onKeyUp={(e) => this.keyUpInput(e, "inputKd")}
              //disabled={this.props.storeGroup.inputKomp}
              disabled={this.props.storeValues.currInput1.length > 0}
              label={"Компенсация"}
              type={"text"}
              value={this.state.currInput2}/>
        </div>
        {/*<div className={classes.btnWrapper}>*/}
          {/*<Button onClick={this.handleFilters} text={"Рассчитать"} classes={{root: classes.btn, wrapper: classes.wrapper}} />*/}
        {/*</div>*/}
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