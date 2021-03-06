import React, {Component} from 'react';
import {withStyles, withTheme} from '@material-ui/core/styles';
import ProgressChart from "./ProgressChart";
import Arrow from "@material-ui/icons/ArrowDownward";
import ArrowBottom from "@material-ui/icons/ExpandMore";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class ProgressChartsForm extends Component {

  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleBlock = (name, val) => {
    if(this.props.id === 2) {
      this.props.bindAnaliticSelect({kdValue: val, kdName: name});
    }else if(this.props.id === 3) {
      this.props.bindAnaliticSelect({kompValue: val, kompName: name});
    }

    this.setState({ anchorEl: null });
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

    thousandsSeparator = (string) => {
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

  render() {
    const props = this.props,
      {classes} = props,
      { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        {
          props.items.block !== "BLOCK"
            ? <div>
                <div className={classes.CollapseWrap}>
                  <div className={classes.CollapseText}  onClick={this.handleClick}>
                    <span>
                      {
                        props.id === 2
                          ? props.storeAnaliticChart.kdName === "Корпоративный бизнес" ? "КБ" : props.storeAnaliticChart.kdName
                          : null
                      }
                      {
                        props.id === 3
                          ? props.storeAnaliticChart.kompName === "Корпоративный бизнес" ? "КБ" : props.storeAnaliticChart.kompName
                          : null
                      }
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
              </div>
            : null
        }
        <div className={classes.chartItem}>
          <ProgressChart mainValue={props.items.mainValue} secondaryValue={props.items.secondaryValue} items={props.items.m}/>
        </div>
        <div className={classes.chartItem}>
          <ProgressChart mainValue={props.items.mainValue} secondaryValue={props.items.secondaryValue} items={props.items.p}/>
        </div>
        <div className={classes.bottomBlock}>
          <div className={`${classes.bottomValueItem} ${classes.bottomValueItemFirst}`}>
            <section>
              <span style={{background: props.items.mainColor}} />{this.thousandsSeparator(String(props.items.mainValue))}
              <b>{String(props.items.smallValue)+" %"}</b>
              {
                props.items.smallValue === 0
                  ? null
                  : <Arrow
                      style={{fill: props.items.smallArrow < 0 ? "rgb(238, 46, 46)" : "#7ED321", transform: `rotate(${props.items.smallArrow < 0 ? 0 : 180}deg)`}}
                      className={classes.arrowBottom}
                    />
              }
            </section>
          </div>
          <div className={classes.bottomValueItem}>
            <section><span style={{background: props.items.secondaryColor}} />{this.thousandsSeparator(String(props.items.secondaryValue))}</section>
          </div>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    width: "100%",
  },
  CollapseWrap: {
    display: "flex",
    right: 15,
    top: 10,
    position: "absolute"
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
  chartItem: {
    marginBottom: 20
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
        marginTop: 11,
        marginRight: 5,
        marginLeft: -13,
        display: "block",
        borderRadius: "50%"
      }
    }
  },
});

export default withStyles(styles)(withTheme()(ProgressChartsForm));