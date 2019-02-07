import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import ArrowBottom from '@material-ui/icons/ExpandMore'

class Collapse extends Component {

  state = {load: false};

  hangleChange = (event,id, item) => {
    if(typeof this.props.onClick !== "undefined") {
      this.props.onClick(event,id, item)
    }
  };

  hangleCollapse = (name) => {
    this.setState({ [name]: !this.state[name] });
  };

  generateChildrens = (arr, classes, id, idn) => {
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
          <div key={i} className={classes.CollapseItem} data-id={idx} style={_THIS.state[elemId] === true ? {background: _THIS.state[elemId + "_bg"]} : {}}>
              <div  className={`${classes.CollapseText} ${this.props.active === idx ? "active" : ""} ${(childrens) ? "childs" : ""}`}>
                  {/*<div style={{position: "absolute", backgroundColor: "#1b2137", zIndex: "999", color: "#A2A6B9",top: 0, left: 0, right: 38,bottom: 7, padding: 8}}>{"Байкальский банк"}</div>*/}
                <div onClick={(e) => this.hangleChange(e,idx, item)}>
                    {item.text}
                </div>
                {
                  (childrens)
                    ? <div onClick={() => this.hangleCollapse(elemId)} className={`${classes.CollapseBtn} ${_THIS.state[elemId] === true ? "active" : ""}`}><ArrowBottom /></div>
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

  render() {
    const props = this.props,
      { classes } = props;

    return (
      <div className={classes.CollapseWrapper}>
        {
          typeof this.props.label !== "undefined"
        }
        {this.generateChildrens(this.props.items, classes, 0 ,0)}
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
    //position: "relative"
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
      color: theme.palette.primary.group
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
  }
});

export default withStyles(styles)(Collapse);

