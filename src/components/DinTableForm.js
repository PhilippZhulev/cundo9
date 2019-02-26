import React, {Component} from 'react';
import {withStyles, withTheme} from '@material-ui/core/styles';
import ArrowBottom from "@material-ui/icons/ExpandMore";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import iScroll from "iscroll/build/iscroll-probe";
import ReactIScroll from "react-iscroll";
import Arrow from "@material-ui/icons/ArrowDownward";

class DinTableForm extends Component {

  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleBlock = (name, val) => {
    this.props.bindAnaliticSelect({dinTableValue: val, dinTableName: name});
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  dropFilter = (name, m, p, el) => {
    switch (m.filter(item => item.block === name).length !== 0 && p.filter(item => item.block === name).length !== 0) {
      case true : return el;
      default : return null;
    }
  };

  arrowController = (classes, type) => {
    switch (type) {
      case "-1" : return (
        <Arrow
          style={{fill:"rgb(238, 46, 46)",  width: 13, height: 12,  transform: `rotate(0deg)`}}
          className={classes.arrowBottom}
        />
      );
      case "1" : return (
        <Arrow
          style={{fill:"rgb(126, 211, 33)",  width: 13, height: 12, transform: `rotate(180deg)`}}
          className={classes.arrowBottom}
        />
      );
      default: return null
    }
  };

  getTable = (data, classes) => {
    return data.map((item, i) => {
      return (
        <div key={i} className={classes.tableRow}>
          <div className={classes.tableCol}>
            {item["text"]}
          </div>
          <div className={classes.tableCol}>
            {typeof (item["2018"] || item["dohod18"]) === "string" ? (item["2018"] || item["dohod18"]).replace(" RUB", "").split(",")[0] : "n/d"}
          </div>
          <div className={classes.tableCol}>
            {typeof (item["2019"] || item["dohod19"]) === "string" ? (item["2019"] || item["dohod19"]).replace(" RUB", "").split(",")[0] : "n/d"} &nbsp;&nbsp;&nbsp;
            {item["prirost19"].replace(",", ".").replace(" ", "")}
            {this.arrowController(classes, item["dyn_flag_19"])}
          </div>
          <div className={classes.tableCol}>
            {typeof (item["2020"] || item["dohod18"]) === "string" ? (item["2020"] || item["dohod20"]).replace(" RUB", "").split(",")[0] : "n/d"} &nbsp;&nbsp;&nbsp;
            {item["prirost20"].replace(",", ".").replace(" ", "")}
            {this.arrowController(classes, item["dyn_flag_20"])}
          </div>
          <div className={classes.tableCol}>
            {typeof (item["2021"] || item["dohod18"]) === "string" ? (item["2021"] || item["dohod21"]).replace(" RUB", "").split(",")[0] : "n/d"} &nbsp;&nbsp;&nbsp;
            {item["prirost21"].replace(",", ".").replace(" ", "")}
            {this.arrowController(classes, item["dyn_flag_21"])}
          </div>
        </div>
      )
    });
  };

  render() {
    const props = this.props,
      {classes} = props,
      { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        <div onClick={() => this.props.bindAnaliticSelect({tableDinTrigger : !props.storeAnaliticChart.tableDinTrigger})} className={classes.modWrap}>
          <div className={classes.mod}>
            <div className={classes.modBtn}>
              <div
                style={props.storeAnaliticChart.tableDinTrigger  === false
                  ? {background: "rgb(52, 152, 219)", transform: "translateX(0px)"}
                  : {background: "rgb(235, 87, 99)", transform: "translateX(15px)"}}
                className={classes.modInner}
              />
            </div>
            {
              props.storeAnaliticChart.tableDinTrigger  === false
                ? <span>Моделируемый вариант</span>
                : <span>Плановый вариант</span>
            }
          </div>
        </div>
        <div className={classes.CollapseWrap}>
          <div className={classes.CollapseText}  onClick={this.handleClick}>
              <span>
                {props.storeAnaliticChart.dinTableName === "Корпоративный бизнес" ? "КБ" : props.storeAnaliticChart.dinTableName}
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
            this.dropFilter("ЦУНДО", props.m, props.p, <MenuItem onClick={() => this.handleBlock("ЦУНДО", "cundo")}>ЦУНДО</MenuItem>)
          }
          {
            this.dropFilter("CIB", props.m, props.p, <MenuItem onClick={() => this.handleBlock("CIB", "cib")}>CIB</MenuItem>)
          }
          {
            this.dropFilter("Корпоративный бизнес", props.m, props.p, <MenuItem onClick={() => this.handleBlock("Корпоративный бизнес", "cb")}>КБ</MenuItem>)
          }
        </Menu>
        <div className={classes.table}>
          <ReactIScroll iScroll={iScroll} options={{
            mouseWheel: true,
            scrollbars: true,
            freeScroll: true,
            scrollX: true,
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
            <div style={{minWidth: 560, overflow: "hidden"}}>
              <div className={classes.tableRow}>
                <div className={classes.tableCol} />
                <div className={classes.tableCol}>
                  <b>2018</b>
                </div>
                <div className={classes.tableCol}>
                  <b>2019</b>
                </div>
                <div className={classes.tableCol}>
                  <b>2020</b>
                </div>
                <div className={classes.tableCol}>
                  <b>2021</b>
                </div>
              </div>
              {
                props.storeAnaliticChart.tableDinTrigger  === false
                  ? this.getTable(props.items.m, classes)
                  : this.getTable(props.items.p, classes)
              }
            </div>
          </ReactIScroll>
        </div>
      </div>
    )
  }
}

const styles = theme => ({//
  root: {
    width: "100%",
    maxHeight: "100%"
  },
  table : {
    marginTop: -20,
    overflow: "hidden",
    height: 300
  },
  tableRow: {
    display: "flex",
  },
  tableCol: {
    width: "22.66666666666667%",
    textAlign: "right",
    padding: "4px 2px 4px 8px",
    color: "#8797C0",
    fontSize: 12,
    //borderLeft: "1px solid rgba(111, 132, 155, 0.3)",
    "&:first-child": {
      width: "24%",
      borderLeft: "0",
      textAlign: "left"
    },
    "&:nth-child(2)": {
      width: "8%",
        borderLeft: "0",
    }
  },
  ItemsLine1: {
    padding: "5px 0",
    display: "flex",
    width: "100%",
    color: theme.palette.primary.titles,
    fontSize: 14,

    fontWeight: 400,
  },
  row0: {
    width: "2%",
  },
  row1: {
    width: "18%",
    textAlign: "center"
  },
  row2: {
    width: "9%",
    textAlign: "left"
  },
  row3: {
    width: "18%",
    textAlign: "left",
    display: "flex"
  },
  row4: {
    width: "9%",
    textAlign: "left"
  },
  row5: {
    width: "18%",
    textAlign: "left",
    display: "flex"
  },
  bullet: {
    width: 8,
    height: 8,
    marginTop: 4,
    marginRight: 5,
    display: "block",
    borderRadius: "50%"
  },
  modWrap: {
    display: "flex",
  },
  bottomBlockItemsLine: {
    width: "100%",
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
    //marginTop: -44,
      position: "absolute",
      top: 20,
      right: 10
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

    fontWeight: 400,
    marginBottom: 6,
  },
  chartItem: {
    marginBottom: 20,
    overflow: "hidden"
  },
  bottomBlock: {
    bottom: 0,
    background: "#273856",
    padding: "10px 20px",
    height: 100,
    boxSizing: "border-box",
    width: "100%",
    left: 0,
    borderRadius: "0 0 4px 4px",
    position: "absolute",
  },
  arrowBottom: {
    fontSize: 18,
    right: -20,
    marginTop: -2
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

export default withStyles(styles)(withTheme()(DinTableForm));