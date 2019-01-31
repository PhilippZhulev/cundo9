import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

class TabsButton extends Component {

  render() {
    const props = this.props,
      {classes} = props;

    return (
      <div className={classes.tabBtn}>
        {props.text}
      </div>
    )
  }
}

const styles = theme => ({
  tabBtn: {
    height: 18,
    border: "0.5px solid #8797C0",
    boxSizing: "border-box",
    borderRadius: "9.5px",
    padding: "0 10px",
    fontWeight: 300,
    lineHeight: "normal",
    fontSize: 12,
    position: "relative",
    marginRight: 5,
    textAlign: "center",
    color: "#8797C0",
    marginBottom: 15,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "block"
    }
  }
});

export default withStyles(styles)(TabsButton);