import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

function View(props) {
  return (props.include);
}

class Input extends Component {

  constructor(props) {
    super(props);
    this.state = props.state || {};
    this.tabsItems = [];
  }

  changeTab = (stateName) => {
    let i = 0;

    while (i < this.tabsItems.length) {
      this.setState({[this.tabsItems[i]] : false});
      i++;
    }

    if(typeof this.props.bind !== "undefined") {
      this.props.bind({[this.props.bindName]: Number(stateName.replace("tab_", ""))});
    }

    this.setState({[stateName] : true});
  };

  render() {
    const props = this.props,
      {classes} = props,
      state = this.state;

    return (
      <div className={classes.tabsWrapper}>
        <div className={classes.tabs}>
            {
              props.tabs.map((item, i) => {
                const stateName = "tab_" + i;

                if(typeof state[stateName] === "undefined") {
                  this.tabsItems.push(stateName);
                  state[stateName] = i === props.default;
                }

                return <div onClick={() => this.changeTab(stateName)} key={i} className={`${classes.tabBtn} ${state[stateName] === true ? classes.active : ""}`} >{item}</div>
              })
            }
        </div>
        {
          props.content.map((item, i) => {
            const stateName = "tab_" + i;
            return state[stateName] === true ? <View key={i} include={item} /> : null
          })
        }
      </div>
    )
  }
}

const styles = theme => ({
  tabs: {
    width: "100%",
    display: "flex"
  },
  tabsWrapper: {
    width: "100%"
  },
  tabBtn: {
    cursor: "pointer",
  },
  active: {
    "& > div": {
      background: "#F3CF12",
      color: "#000",
      borderColor: "#F3CF12",
    }
  }
});

export default withStyles(styles)(Input);