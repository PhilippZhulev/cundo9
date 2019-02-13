import React, { Component } from 'react';
import {withStyles, withTheme} from '@material-ui/core/styles';
import {createStyled} from "./createStyled";
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe";

let y = 0;

class TilesRender extends Component {

  state = {
    y: 0
  };

  componentRender = (item, classes) => {
    if(typeof item.components !== "undefined") {
      let findItems = [];

      this.props.components(item, classes).reverse().forEach((element) => {
        if(item.components.indexOf(element.id) >= 0) {
          findItems.push(element);
        }
      });

      const sortComponents = findItems.sort(function (a, b) {
        if (a.index < b.index) {
          return -1;
        }
        if (a.index > b.index) {
          return 1;
        }
        return 0;
      });

      // noinspection JSAnnotator
      function View(props) {
        return (props.include)
      }

      return sortComponents.map((result, ind) => {
        return <View key={ind} include={result.view} />;
      })

    }
  };

  generateInnerTiles = (elems, staticClasses, classesItem, classeInner) => {
    return elems.map((item, i) => {
      return (
        <div key={i} style={{height: item.height, width: item.width}} className={classesItem}>
          <div className={`${classeInner} ${staticClasses.innerBlock}`}>
            {
              (typeof item.title !== "undefined" && item.titleState !== false)
                ? <div className={staticClasses.tileTitle}>
                  {item.title}
                  </div>
                  : null
            }
            {this.componentRender(item, staticClasses)}
          </div>
        </div>
      )
    })
  };

  childrenWrapperHeight = (item) => {
    let result = 0;
    item.childrens.map((el) => {
      return result += typeof el.height !== "number" ? Number(el.height.replace("%", "")) : el.height;
    });

    return result;
  };

  onScroll = (iScrollInstance) => {
    if(this.state.y !== iScrollInstance.y) {
      y = iScrollInstance.y;
    }
  };

  tilesGenerator = (items, rowIndex, props) => {
    const staticClasses = this.props.classes;

    if(typeof items.tiles !== "undefined") {

      const myStyles = {},
            Styled = createStyled(myStyles);

      return items.tiles.map((item, i) => {

        const innerClass = `row${rowIndex}tileInner${i}`,
          itemClass  = `row${rowIndex}tileItem${i}`;

        myStyles[itemClass] = {
          width: "100%",
          height: item.height,
          padding: "5px 5px 5px 5px",
          boxSizing: "border-box",
          position: rowIndex === 2 && i === 1 ? "relative" : "unset",

        };

        myStyles[innerClass] = {
          background: props.theme.palette.primary.blocks,
          width: "100%",
          height: "100%",
          position: "relative",
          boxSizing: "border-box",
          padding: "10px 15px",
          borderRadius: "3px",
        };

        if(typeof item.childrens !== "undefined") {
          myStyles[itemClass + "_child"] = {
            height: item.height,
            boxSizing: "border-box",
            overflow: "hidden"
          };
        }

        return (
          <Styled key={i}>
            {
              ({classes}) =>
              <div className={typeof item.childrens === "undefined" ? classes[itemClass] : classes[itemClass + "_child"]} key={i}>
                <div className={typeof item.childrens === "undefined" ? classes[innerClass] : staticClasses.innerChildrens}>
                  {
                    (typeof item.title !== "undefined" && item.titleState !== false)
                    ? <div className={staticClasses.tileTitle}>
                        {item.title}
                      </div>
                    : null
                  }
                  {
                    (typeof item.childrens !== "undefined")
                    ? <ReactIScroll onScrollEnd = {this.onScroll} iScroll={iScroll} options={{
                        startY: y,
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
                        disableMouse: true,
                        disablePointer: true,
                        disableTouch: true,
                       }}>
                        <div className={staticClasses.innerScroll} style={{height: this.childrenWrapperHeight(item)}}>
                          {this.generateInnerTiles(item.childrens, staticClasses, classes[itemClass], classes[innerClass])}
                        </div>
                      </ReactIScroll>
                    : null
                  }
                  {this.componentRender(item, staticClasses)}
                </div>
              </div>
            }
          </Styled>
        )
      })
    }
  };

  render() {
    const props = this.props,
      myStyles = {},
      StyledRows = createStyled(myStyles);

    return this.props.scheme.map((item, i) => {

      const classRow = `row${i}`;

      item.media.forEach((el) => {
        if(i === 0) {
          myStyles[`@media all and (max-width: ${el.screen}px)`] = {};
        }

        myStyles[`@media all and (max-width: ${el.screen}px)`][classRow] = {
          position: "relative",
          margin: 0,
          width: el.width,
          height: item.height
        }
      });

      return (
        <StyledRows key={i}>
          {
            ({classes}) =>
            <div className={classes[classRow]}>
              {this.tilesGenerator(item, i, props)}
            </div>
          }
        </StyledRows>
      );
    })
  }
}

const styles = theme => ({
  tileTitle: {
    color: theme.palette.primary.titles,
    fontSize: 14,

    fontWeight: 400,
    marginBottom: 15,
  },
  tileTitleInner: {
    width: "75%"
  },
  innerItem: {
    marginBottom: 15,
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.primary.separator}`,
    }
  },
  innerChildrens: {
    height: "100%",
  },
  innerScroll: {
    height: "100%",
    position: "relative",
  },
  innerBlock: {
    transition: "all 200ms ease-in-out",
    "&:hover": {
      boxShadow: "0 0 0 1px " +  theme.palette.primary.group
    }
  }
});


export default withStyles(styles)(withTheme()(TilesRender));

