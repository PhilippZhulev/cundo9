import React, {Component} from 'react';
import {withStyles, withTheme} from '@material-ui/core/styles';
import AnaliticChart from "./AnaliticChart";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe";
import ArrowBottom from "@material-ui/icons/ExpandMore";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Arrow from "@material-ui/icons/ArrowDownward";

class AnaliticChartsForm extends Component {

  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleBlock = (name, val) => {
    this.props.bindAnaliticSelect({[`analitic${this.props.id}Value`]: val, [`analitic${this.props.id}Name`]: name});
    this.setState({ anchorEl: null });
  };

  handleClose = (name, val) => {
    this.setState({ anchorEl: null });
  };


  render() {
    const props = this.props,
      {classes} = props,
      { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <div onClick={() => this.props.bindAnaliticSelect({trigger : !props.storeAnaliticChart.trigger})} className={classes.modWrap}>
          <div className={classes.mod}>
            <div className={classes.modBtn}>
              <div
                style={props.storeAnaliticChart.trigger === false
                  ? {background: "rgb(52, 152, 219)", transform: "translateX(0px)"}
                  : {background: "rgb(235, 87, 99)", transform: "translateX(15px)"}}
                className={classes.modInner}
              />
            </div>
            {
              props.storeAnaliticChart.trigger === false
                ? <span>Моделируемый вариант</span>
                : <span>Плановый вариант</span>
            }
          </div>
        </div>
        <div className={classes.CollapseWrap}>
          <div className={classes.CollapseText} onClick={this.handleClick}>
                <span>
                  {props.storeAnaliticChart[`analitic${this.props.id}Name`]}
                </span>
              <div className={classes.CollapseBtn}><ArrowBottom /></div>
          </div>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {
            typeof props.storeFactDohod[`factDohod${props.id}`]["cundo"] !== "undefined"
            ? <MenuItem onClick={() => this.handleBlock("ЦУНДО", "cundo")}>ЦУНДО</MenuItem> :null
          }
          {
            typeof props.storeFactDohod[`factDohod${props.id}`]["cib"] !== "undefined"
              ? <MenuItem onClick={() => this.handleBlock("CIB", "cib")}>CIB</MenuItem> :null
          }
          {
            typeof props.storeFactDohod[`factDohod${props.id}`]["cb"] !== "undefined"
              ? <MenuItem onClick={() => this.handleBlock("КБ", "cb")}>КБ</MenuItem> :null
          }
        </Menu>
        <div className={classes.tileTitle}>
          Совокупного дохода за счет:
        </div>
        <div className={classes.chartWrapper}>
          <ReactIScroll ref="iScroll" iScroll={iScroll} options={{
            mouseWheel: true,
            scrollbars: true,
            freeScroll: true,
            scrollX: false,
            scrollY: true,
            click: false,
            momentum: false,
            fadeScrollbars: true,
            invertWheelDirection: false,
            preventDefault: true,
            disableMouse: false,
            disablePointer: false,
            disableTouch: false,
          }}>
            <div className={classes.chartItem}>
              {
                props.storeAnaliticChart.trigger === false
                  ? <AnaliticChart mainValue={props.items.mainValue} secondaryValue={props.items.secondaryValue} items={props.items.m}/>
                  : <AnaliticChart mainValue={props.items.mainValue} secondaryValue={props.items.secondaryValue} items={props.items.p}/>
              }
            </div>
          </ReactIScroll>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    maxHeight: "100%"
  },
  modWrap: {
    display: "flex",
  },
  chartWrapper: {
    height: "calc(100% - 180px)",
    overflow: "hidden",
    minHeight: 100,
    position: "absolute",
    width: "calc(100% - 30px)"
  },
  mod:{
    display: "inline-flex",
    fontWeight: 300,
    lineHeight: "normal",
    fontSize: 14,
    margin: "10px auto 30px 0",
    color: "#8797C0"
  },
  modBtn: {
    width: 30,
    height: 15,
    margin: "auto 10px auto 0",
    borderRadius: "50px",
    background: "#1b2137",
    marginTop: 3
  },
  modInner: {
    height: 15,
    width: 15,
    borderRadius: "50px",
    transition: "all 200ms ease-in-out"
  },
  CollapseWrap: {
    display: "flex",
    marginTop: -44
},
  CollapseText: {
    color: theme.palette.primary.separator,
    background: theme.palette.primary.main,
    maxWidth: 200,
    minWidth: 100,
    fontSize: 14,
    marginTop: 0,
    height: 19,
    padding: "10px 10px",
    margin: "auto 0 10px auto",
    position: "relative"
  },
  CollapseBtn: {
    fill: theme.palette.primary.separator,
    position: "absolute",
    height: "100%",
    width: 36,
    background: theme.palette.primary.main,
    right: 0,
    top: 0,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    "& svg": {
      margin: "auto",
      transition: "all 300ms ease-in-out",
      transform: "rotate(0deg)",
    },
    "&.active svg": {
      transform: "rotate(180deg)",
    },
  },
  tileTitle: {
    color: theme.palette.primary.titles,
    fontSize: 14,
    // fontFamily: "Roboto",
    fontWeight: 400,
    marginBottom: 12,
  },
  chartItem: {
    marginBottom: 20,
    overflow: "hidden"
  },
  bottomBlock: {
    bottom: 0,
    background: "#273856",
    height: 48,
    width: "100%",
    left: 0,
    borderRadius: "0 0 4px 4px",
    position: "absolute",
    display: "flex"
  },
  arrowBottom: {
    fontSize: 18,
    right: -20,
    marginTop: 4
  },
  bottomValueItemFirst: {
    margin: "10px -120px 10px auto!important",
  },
  bottomValueItem: {
    fontStyle: "normal",
    margin: "10px 15px 10px auto",
    fontWeight: "normal",
    lineHeight: "normal",
    fontSize: 14,
    color:" #8797C0",
    "& section:first-child": {
      fontSize: 20,
      position: "relative",
      color:" #fff",
      display: 'flex',
      "& b": {
        fontWeight: 300,
        fontSize: 14,
        color: "#8797C0",
        display: "block",
        lineHeight: "30px",
        paddingLeft: 5
      },
      "& span": {
        width: 8,
        height: 8,
        marginTop: 14,
        marginRight: 5,
        marginLeft: -13,
        display: "block",
        borderRadius: "50%"
      }
    }
  },
});

export default withStyles(styles)(withTheme()(AnaliticChartsForm));