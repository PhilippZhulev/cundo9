import React, {Component} from 'react';
import {withStyles, withTheme} from '@material-ui/core/styles';
import ArrowBottom from "@material-ui/icons/ExpandMore";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Chart from '../components/Chart';
import Arrow from "@material-ui/icons/ArrowDownward";
import {thousandsSeparator, indent} from "../halpers/formHalper";

class DinChartsForm extends Component {

  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleBlock = (name, val) => {
    this.props.bindAnaliticSelect({dinValue: val, dinName: name});
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

  getProvider = (data) => {
    let result = [], elms = [];

    data.m.forEach((item, i) => {
      let index = 1;
      for(let key in item) {
        if(item.hasOwnProperty(key)) {
          if(key.substring(0, key.length - 2) === "dohod") {
            result.push({
              "category": "20" + key.replace("dohod", ""),
              "column-1": Number(item[key].replace(",", ".").replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '')),
              "column-2": Number(data.p[i][key].replace(",", ".").replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '')),
            });

            elms.push({
              year: "20" + key.replace("dohod", ""),
              m: Number(item[key].replace(",", ".").replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '')),
              p: Number(data.p[i][key].replace(",", ".").replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, ''))
            });
          }

          if(key.substring(0, key.length - 2) === "prirost") {
            elms[index]["prirost_m"] = item[key].replace(",", ".");
            elms[index]["prirost_p"] = data.p[i][key].replace(",", ".");
          }

          if(key.substring(0, key.length - 2) === "dyn_flag_") {
            elms[index]["arrow_m"] = item[key];
            elms[index]["arrow_p"] = data.p[i][key];
            index++;
          }

        }
      }
    });

    return {
      chart: result,
      din: elms
    }
  };

  arrowController = (classes, type) => {
    switch (type) {
      case "-1" : return (
        <Arrow
          style={{fill:"rgb(238, 46, 46)", transform: `rotate(0deg)`}}
          className={classes.arrowBottom}
        />
      );
      case "1" : return (
        <Arrow
          style={{fill:"rgb(126, 211, 33)", transform: `rotate(180deg)`}}
          className={classes.arrowBottom}
        />
      );
      default: return null
    }
  };

  render() {
    const props = this.props,
      {classes} = props,
      { anchorEl } = this.state;

    //console.log(props);

    const dinamic = this.getProvider(props.items).din;

    //console.log(this.getProvider(props.items));

    return (
      <div className={classes.root}>
        <div className={classes.CollapseWrap}>
          <div className={classes.CollapseText}  onClick={this.handleClick}>
              <span>
                {props.storeAnaliticChart.dinName === "Корпоративный бизнес" ? "КБ" : props.storeAnaliticChart.dinName}
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
        <Chart getProvider={this.getProvider} data={props.items} />
        <div className={classes.bottomBlock}>
          <div className={classes.tileTitle}>
            Темпы прироста по годам:
          </div>
          <div className={classes.bottomBlockItemsLine}>
              <div className={`${classes.ItemsLine1} ${classes.years}`}>
                <span className={classes.row0}><span className={classes.bullet} style={{background: "rgba(0, 0, 0,0)"}} /></span>
                  <span className={classes.row1}>{2018}</span>
                  {/*<span className = {classes.separator} />*/}
                  <span className={classes.row2}></span>
                <div className={classes.row3}><span>{2019}</span>
                  </div>
                {/*<span className = {classes.separator} />*/}
                  <span className={classes.row4}></span>
                <div className={classes.row5}><span>{2020}</span>
                  </div>
                {/*<span className = {classes.separator} />*/}
                  <span className={classes.row4}></span>
                <div className={classes.row5}><span className={classes.lastRow}>{2021}</span>
                  </div>
              </div>
            <div className={classes.ItemsLine1}>
              <span className={classes.row0}><span className={classes.bullet} style={{background: "#3498DB"}} /></span>
              <span className={classes.row1}>{thousandsSeparator(String(dinamic[0].m), 2)}</span>
              {/*<span className = {classes.separator} />*/}
              <span className={classes.row2}>{thousandsSeparator(String(dinamic[1].m), 2)}</span>
              <div className={classes.row3}>
                <span>{thousandsSeparator(dinamic[1].prirost_m,1)}
                </span>
                  {this.arrowController(classes, dinamic[1].arrow_m)}
              </div>
              {/*<span className = {classes.separator} />*/}
              <span className={classes.row4}>{thousandsSeparator(String(dinamic[2].m),2)}</span>
              <div className={classes.row5}>
                <span>{thousandsSeparator(dinamic[2].prirost_m,1)}
                </span>
                  {this.arrowController(classes, dinamic[2].arrow_m)}
              </div>
              {/*<span className = {classes.separator} />*/}
              <span className={classes.row4}>{thousandsSeparator(String(dinamic[3].m),2)}</span>
              <div className={classes.row5}>
                <span className={classes.lastRow}>{thousandsSeparator(dinamic[3].prirost_m,1)}
                </span>
                  {this.arrowController(classes, dinamic[3].arrow_m)}
              </div>
            </div>
            <div className={classes.ItemsLine1}>
              <span className={classes.row0}><span className={classes.bullet} style={{background: "rgb(235, 87, 99)"}} /></span>
              <span className={classes.row1}>{thousandsSeparator(String(dinamic[0].p),2)}</span>
              {/*<span className = {classes.separator} />*/}
              <span className={classes.row2}>{thousandsSeparator(String(dinamic[1].p),2)}</span>
              <div className={classes.row3}>
                <span>{thousandsSeparator(dinamic[1].prirost_p,1)}
                </span>
                {this.arrowController(classes, dinamic[1].arrow_m)}
              </div>
              {/*<span className = {classes.separator} />*/}
              <span className={classes.row4}>{thousandsSeparator(String(dinamic[2].p),2)}</span>
              <div className={classes.row5}>
                <span>{thousandsSeparator(dinamic[2].prirost_p,1)}
                </span>
                {this.arrowController(classes, dinamic[2].arrow_m)}
              </div>
              {/*<span className = {classes.separator} />*/}
              <span className={classes.row4}>{thousandsSeparator(String(dinamic[3].p),2)}</span>
              <div className={classes.row5}>
                <span className={classes.lastRow}>{thousandsSeparator(dinamic[3].prirost_p,1)}
                </span>
                {this.arrowController(classes, dinamic[3].arrow_m)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  separator:{
    borderLeft: "1px solid rgba(111, 132, 155, 0.3)",
    width: 1,
    marginLeft: "3%",
    marginRight: "1%"
  },
  root: {
    width: "100%",
    maxHeight: "100%"
  },
  ItemsLine1: {
    //padding: "2px 0",
    display: "flex",
    width: "100%",
    color: theme.palette.primary.titles,
    fontSize: 12,
    lineHeight: "24px",
    fontWeight: 400,
  },
  row0: {
    width: "2%",
  },
  row1: {
    width: "12%",//"20%",
    textAlign: "right"
  },
  row2: {
    width: "20%",//"20%",
    textAlign: "right",
    // borderLeft: "1px solid rgba(111, 132, 155, 0.3)",
    // marginLeft: 15
  },
  row3: {
    width: "12%",//"20%",
    display: "flex",
      "& span":{
      width: "100%",
        textAlign: "right"
      }
  },
  row4: {
    width: "20%",//"20%",
    textAlign: "right",
    // borderLeft: "1px solid rgba(111, 132, 155, 0.3)",
    // marginLeft: 15
  },
  row5: {
    width: "12%",//"18%",
    display: "flex",
      "& span":{
          width: "100%",
          textAlign: "right"
      }
  },
  lastRow: {
    display: "unset",
  },
  bullet: {
    width: 8,
    height: 8,
    marginTop: 7,
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
    top: 20,
    right: 10,
    position: "absolute",
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
    height: 120,
    boxSizing: "border-box",
    width: "100%",
    left: 0,
    borderRadius: "0 0 4px 4px",
    position: "absolute",
  },
  arrowBottom: {
    fontSize: 18,
    right: -20,
    marginTop: -2,
      width: 15,
      //height: 20
    height: 25
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
  years: {
    fontWeight: "bolder"
  },
});

export default withStyles(styles)(withTheme()(DinChartsForm));