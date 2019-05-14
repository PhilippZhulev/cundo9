import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {LumiraRequest} from "../halpers/LumiraRequest";

class TabsButton extends Component {

  render() {
    const props = this.props,
      {classes} = props;
    const REQ = LumiraRequest("DATA_UPDATE");

    return (
      <div className={classes.tabBtn} onClick={()=>{
        if(this.props.title !== undefined){
          REQ.set("tech8", () => {
            this.props.bindPreloader({preloader: true});
            console.log("ОТПРАВЛЕН ЗАПРОС В ЛЮМИРУ...");
            return `${this.props.title}$$_$$${this.props.anChart["analitic"+this.props.id+"Value"]}`
          });
          //console.log(`${this.props.title}$$_$$${this.props.anChart["analitic"+this.props.id+"Value"]}`);
          //console.log(this.props.anChart);
        }
      }}>
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