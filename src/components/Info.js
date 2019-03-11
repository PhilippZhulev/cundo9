import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/InfoOutlined';


class Info extends Component {

  state = {
    popup: false
  };

  render() {
    const props = this.props,
      {classes} = props;

    return (
      <div className={classes.position} style={{display: (this.props.show_info) ? "unset" : "none"}}>
        <InfoIcon className={classes.icon} onMouseEnter={() => {this.setState({popup: true})}} onMouseLeave={() => {this.setState({popup: false})}} />
        {/*<div className={classes.icon} onMouseEnter={() => {this.setState({popup: true})}} onMouseOut={() => {this.setState({popup: false})}} />*/}
        {
          this.state.popup === true
            ? <div className={classes.popup} style={props.position === "left" ? {marginLeft: "-130px"} : {marginLeft: "15px"}}>
                <span>{props.text}</span>
              </div>
            : null
        }
      </div>
    )
  }
}

const styles = theme => ({
  position: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 900,
  },
  icon: {
    //width: 17,
    //height: 17,
    fill: theme.palette.primary.titles,
    //marginTop: 8,
    //zIndex: 999
    //background:  typeof window.bobrPath !== "undefined" ? `url(${window.bobrPath}/img/que_info.svg) center no-repeat` : `url(img/que_info.svg) center no-repeat`
  },
  popup: {
    padding: 5,
    background: "#fff",
    boxShadow: "0px 0px 10px #3498DB",
    position: "absolute",
    width: 125,
    zIndex: 900,
    borderRadius: 3,
    fontWeight: 300,
    lineHeight: "12px",
    fontSize: 12,

  }
});

export default withStyles(styles)(Info);