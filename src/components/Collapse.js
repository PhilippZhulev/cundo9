import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import ArrowBottom from '@material-ui/icons/ExpandMore'

class Collapse extends Component {

  state = {load: false};

  handleChange = (event,id, item) => {
    if(typeof this.props.onClick !== "undefined") {
      this.props.onClick(event, id, item)
    }
  };

  handleCollapse = (name) => {
    this.setState({ [name]: !this.state[name] });
    this.props.closeCollapses({[this.props.name]: true});
    console.log(this.state);
    console.log(name);
  };

  handleCloseCollapses = (nextProps) => {
    let obj = {};
    for(let key in this.state){
      if(key !== "load"){
        if(key.indexOf("_bg") === -1) {
          obj[key] = false;
        }
      }
    }
    this.setState(obj);
    let flag = false;
    for(let key in nextProps.storeCloseCollapses) {
      if (nextProps.storeCloseCollapses.hasOwnProperty(key)) {
        if (nextProps.storeCloseCollapses[key] && key !== "flag" && key !== this.props.name) {
          flag = true;
        }
      }
    }

    this.props.closeCollapses({[this.props.name]: false, flag: flag});
  };

  generateChildrens = (arr, classes, id, idn, isFirst) => {
    const _THIS = this;

    if(typeof arr !== "undefined") {
      return arr.map((item, i) => {

        const idx = (String(id) + idn + i++),
              elemId = `collapseElement${idx}`,
              childrens = typeof item.children !== "undefined";

        if(typeof _THIS.state[elemId] === "undefined") {
          _THIS.state[elemId] = false;
        }

        function getRandomColor() {
          function ranColor() {

            let letters = '0123456789ABCDEF';
            let color = '#';

            for (let i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }

            return color;
          }

          return ranColor();
        }

        if(typeof _THIS.state[elemId + "_bg"] === "undefined") {
          _THIS.state[elemId + "_bg"] = getRandomColor();
        }

        return (
          <div key={i} className={`${classes.CollapseItem} ${this.props.active === idx ? "active" : ""}`} data-id={idx} style={_THIS.state[elemId] === true ? {background: _THIS.state[elemId + "_bg"]} : {}}>
              <div  className={`${classes.CollapseText} ${this.props.active === idx ? "active" : ""} ${(childrens) ? "childs" : ""}`}>
                  {/*<div style={{position: "absolute", backgroundColor: "#1b2137", zIndex: "999", color: "#A2A6B9",top: 0, left: 0, right: 38,bottom: 7, padding: 8}}>{"Байкальский банк"}</div>*/}
                <div onClick={(e) => this.handleChange(e,idx, item)} style={(isFirst) ? {whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"} : {}}>
                    {item.text}
                </div>
                {
                  (childrens)
                    ? <div onClick={() => this.handleCollapse(elemId)} className={`${classes.CollapseBtn} ${_THIS.state[elemId] === true ? "active" : ""}`}><ArrowBottom /></div>
                    : null
                }
              </div>
              <div className={classes.separator} />
              {
                (_THIS.state[elemId] === true)
                  ? <div>
                      {
                        (childrens)
                          ? this.generateChildrens(item.children, classes, i, idx)
                          : null
                      }
                    </div>
                  : null
              }
          </div>
        )
      })
    }
  };

  componentWillUpdate(nextProps, nextState, nextContext) {
    if(this.props.isFirst) {
      if (nextProps.storeCloseCollapses.flag && nextProps.storeCloseCollapses[this.props.name]) {
        this.handleCloseCollapses(nextProps);
      }
    }
  }

  componentWillMount() {
    if(this.props.storeCloseCollapses[this.props.name] === undefined){
      this.props.closeCollapses({[this.props.name]: false});
    }
  }

  render() {
    const props = this.props,
      { classes } = props;

    return (
      <div className={classes.CollapseWrapper}>
        {
          typeof this.props.label !== "undefined"
        }
        {this.generateChildrens(this.props.items, classes, 0 ,0, props.isFirst)}
      </div>
    );
  }
}

const styles = theme => ({
  CollapseWrapper: {
    padding: " 0 15px 0 15px",
    position: "relative"
  },
  CollapseItem: {
    background: theme.palette.primary.main,
    paddingLeft: 5,
    transition: "all 300ms ease-in-out",
    overflow: "hidden",
    //position: "relative",
    "&.active": {
      background: "#24262d"
    }
  },
  CollapseText: {
    color: theme.palette.primary.separator,
    background: theme.palette.primary.main,
    fontSize: 14,
    padding: "10px 10px",
    marginBottom: 6,
    position: "relative",
    "&.childs": {
      paddingRight: 36
    },
    "&.active": {
      color: theme.palette.primary.group,
      background: "#24262d"
    }
  },
  separator: {
    height: 6,
    marginTop: -6,
    width: "100%",
    background: theme.palette.primary.blocks,
    left: 0,
    position: "absolute",
    zIndex: 90
  },
  CollapseBtn: {
    fill: theme.palette.primary.separator,
    position: "absolute",
    height: "100%",
    width: 36,
    //background: theme.palette.primary.main,
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
  }
});

export default withStyles(styles)(Collapse);

