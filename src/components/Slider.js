import React, {Component} from 'react';
import {withStyles, withTheme} from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import Info from "./Info";
import {LumiraRequest} from "../halpers/LumiraRequest";


class StepSlider extends Component {

  constructor(props) {
    super(props);
    //console.log(this.props.storeBlocks.gv_drivers_loaded);
    this.thumb = React.createRef();
    // console.log(this.props);
    // console.log(this.props.settings.baseValue);
    // console.log(this.props.storeDriversData[this.props.settings.id] === null);
    // console.log(this.props.storeBlocks.gv_drivers_loaded);
    if(this.props.storeBlocks.gv_drivers_loaded === "0" && this.props.storeDriversData[this.props.settings.id] === null){
      this.props.bindDriversData({[this.props.settings.id] : null, ["isFake"+this.props.settings.id] : true});
    }
    if((this.props.storeDriversData[this.props.settings.id] === null || isNaN(parseFloat(this.props.m_prirost)) || this.props.storeDriversData["isFake"+this.props.settings.id])&&(this.props.storeBlocks.gv_drivers_loaded === "1" || this.props.storeBlocks.gv_drivers_loaded === 1)) {
      //console.log("drivers assign");
      console.log(parseFloat(this.props.m_prirost));
      this.props.bindDriversData({[this.props.settings.id] :  isNaN(parseFloat(this.props.m_prirost)) ? 0 : parseFloat(this.props.m_prirost).toFixed(this.props.digits), ["isFake"+this.props.settings.id]: isNaN(parseFloat(this.props.m_prirost))});
    }
  }

  state = {
    //value: this.props.storeDriversData[this.props.settings.id],
    //value: this.props.settings.baseValue.toFixed(this.props.digits),
    value: this.props.storeDriversData[this.props.settings.id],
    //currInput: String(this.props.storeDriversData[this.props.settings.id]),
    //currInput: String(this.props.settings.baseValue.toFixed(this.props.digits).replace(".",",")),
    currInput: String(this.props.storeDriversData[this.props.settings.id]).replace(".",","),
    prev: null,
    thumb: 0,
    offset: "",
    base: ""
  };

  componentDidMount() {
    this.setState({
      offset: this.thumb.current.parentNode.parentNode.style.transform
    });

    if(this.props.storeDriversData[this.props.settings.id] === null) {
      this.setState({
        base: this.thumb.current.parentNode.parentNode.style.transform
      });
    }
  }

  /*Функция изменения состояния ползунка и записи измененного массива драйверов в store*/
  handleChange = (event, value) => {
    this.setState({
      value : Number(value).toFixed(this.props.digits),
      currInput: String(Number(value).toFixed(this.props.digits).replace(".",","))
    }, () => {
      this.setState({offset: this.thumb.current.parentNode.parentNode.style.transform});
    });
  };

  handleFocus = (event) =>{
      // if (event.target.value === "0" || event.target.value.length === 0){
      //     event.target.select();
      //     console.log(event.target);
      // }
      event.target.select();
  };

  handleInput = (event) => {

    const offset = () => this.setState({offset: this.thumb.current.parentNode.parentNode.style.transform});

    // if(event.target.value > this.props.settings.min && event.target.value <= 100) {
    //   this.setState({value: event.target.value}, offset);
    // }else if (event.target.value <= this.props.settings.min){
    //   this.setState({value: this.props.settings.min}, offset);
    // }
    //console.log(`value: ${event.target.value}; event.target.value.search(/[^0-9]*/): ${event.target.value.search(/[^0-9]*/)}; search("-"): ${event.target.value.search("-")}, state_value: ${this.state.value}`);
    //if(event.target.value.search(/[^-,.0-9]/) === -1 && event.target.value.search("-") <= 0 && event.target.value !== "-") {
    if(event.target.value.search(/[^-,.0-9]/) === -1) {
      if (event.target.value.match(/-{0,1}\d+[,.]{0,1}\d*/) !== null && event.target.value.match(/-{0,1}\d+[,.]{0,1}\d*/)[0].length === event.target.value.length) {
        this.setState({value: Number(event.target.value.replace(",", "."))}, offset);
        // if(event.target.value !== "") {
        //   event.target.value = Number(event.target.value);
        // }
      }
      this.setState({currInput: event.target.value.replace(".", ",")})
    }
  };

  dragStart = () => {

  };

  lumiraEvent = (value) => {
    this.props.bindDriversData({[this.props.settings.id] : value});
    console.log(value);

    setTimeout(() => {
      const REQ = LumiraRequest("DATA_UPDATE");
      console.log(this.props.settings.id);
      REQ.set("tech1", () => {
        this.props.bindPreloader({preloader: true});
        console.log("ОТПРАВЛЕН ЗАПРОС В ЛЮМИРУ...");
        return `${this.props.settings.id},gv_period,gv_sale_channel,gv_gosb,gv_dd_direction,gv_ndo,gv_biz_block,X_var1|${this.props.storeDriversData[this.props.settings.id]},${this.props.storeBlocks.gv_period},${this.props.storeBlocks.gv_sale_channel},${this.props.storeBlocks.gv_gosb},${this.props.storeBlocks.gv_dd_direction},${this.props.storeBlocks.gv_ndo},${this.props.storeBlocks.gv_biz_block},${this.props.storeBlocks.gv_var_rasch}`;
      });
    }, 100)
  };

  dragEnd = (value) => {
    this.lumiraEvent(Number(value.replace(",", ".")))
  };

  bindEnter = (e, key, value) => {
    if(e.keyCode === key) {
      this.lumiraEvent(e.target.value)
    }
  };

  render() {
    //console.log(this.state.value);
    const props = this.props,
      baseClasses = props.classes,
      { value, currInput } = this.state;

    let fixPosRight = value >= props.settings.max - 5,
        fixPosLeft = value <= props.settings.min + 5;

      //let circlePos = Number(props.b_prirost.replace("-", "")) * (props.settings.max - props.settings.min) / 100;
    let circlePos = (Number(props.b_prirost) - Number(props.settings.min)) / (props.settings.max - props.settings.min) * 100;// -50 так как считаем от середины НА СЕРВАКЕ
      if (circlePos < 0) {
        circlePos = 0;
      }
      if (circlePos > 100){
        circlePos = 100;
      }
      let ver = 0;
      try {
        ver = Number(navigator.userAgent.match(/Chrome\/[\d.]{2}/)[0].split("/")[1])
      }
      catch(e){
        console.log("This is IE");
        console.log(e);
      }
      if(ver < 60){
        circlePos = circlePos - 50;
      }

    return (
      <div className={baseClasses.root} ref={this.root}>
        <span className={baseClasses.title}>{props.settings.title}</span>
        <div className={baseClasses.rels} style={{transform: this.state.offset}}>
          <div className={`${baseClasses.input} ${fixPosRight ? baseClasses.maxRight : ""} ${fixPosLeft ? baseClasses.maxLeft : ""}`} >
            <Info
              classes={{position: !fixPosRight ? baseClasses.infoPos : baseClasses.infoLeft}}
              position={!fixPosRight ? "right" : "left"}
              text={props.settings.info}
            />
            <input type={"text"} onKeyUp={(e) => this.bindEnter(e, 13, Number(value))} onChange={(event) => this.handleInput(event)} value={this.state.currInput} onFocus={(event) => this.handleFocus(event)} />
          </div>
        </div>
        <Slider
          classes={{
            container: baseClasses.slider,
            root: baseClasses.wrapper,
            track: baseClasses.track,
            thumbWrapper: baseClasses.thumbWrapper,
            trackBefore: baseClasses.trackBefore,
            activated: baseClasses.activated,
            trackAfter: baseClasses.trackAfter,}}
          value={Number(value)}
          thumb={
            <div ref={this.thumb} className={baseClasses.thumbIcon}>
              <div />
              <div className={baseClasses.thumb} >
                <div>
                </div>
              </div>
            </div>
          }
          min={props.settings.min}
          max={props.settings.max}
          step={props.settings.step}
          onDragStart={this.dragStart}
          onDragEnd={() => this.dragEnd(value)}
          onChange={this.handleChange}
        />
        <div className={baseClasses.values}>
          <span>{props.settings.min}</span>
          <div
              style={{transform: `translateX(${circlePos}%)`}}
              className={baseClasses.defaultCircleWrapper}
          >
            <div className={baseClasses.defaultCircle} />
            <div className={baseClasses.defaultValue}>{props.b_prirost}</div>
          </div>
          <span>{props.settings.max}</span>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: "100%",
    padding: "0 0",
    touchAction: "none",
    position: "relative",
    zIndex: 99
  },
  maxRight: {
    marginLeft: -22,
    "&:before": {
      content: '""',
      left: "44px!important",
    }
  },
  maxLeft: {
    marginLeft: 22,
    "&:before": {
      content: '""',
      left: "-44px!important",
    }
  },
  infoPos: {
    right: -25,
    top: 10
  },
  infoLeft: {
    left: -25,
    right: "auto",
    top: 10
  },
  wrapper: {
    padding: '15px 0px',
  },
  slider: {
    padding: '22px 0px',
  },
  title: {
    color: "#fff",
    fontWeight: 300,
    fontSize: 14,
    marginTop: 30,
    marginBottom: 10
  },
  track: {
    background: "#8797C0",
    opacity: "1.0",
    height: 4
  },
  activated: {},
  trackBefore: {
    background: "#8797C0",
    "& $activated": {
      background: "#f8ac59"
    }
  },
  thumbIcon: {
    width: 32,
    height: 32,
    position: "absolute",
    margin: "auto",
    zIndex: 25,
    top: -2,
    bottom: 0,
    right: 0,
    left: -11,
    "& > div:first-child": {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      zIndex: 4
    },
    "& > div:first-child:hover ~ $thumb": {
      border: "1px solid #3498DB",
    },
  },
  thumb: {
    width: 32,
    height: 32,
    position: "absolute",
    transition: "all 200ms ease-in-out",
    borderRadius: "50%",
    border: "1px solid transparent",
    "& > div": {

      //width: 22,
      //height: 22,
      width: 18,
      height: 18,
      margin: "auto",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      position: "absolute",
      borderRadius: "50%",
      background: "#3498DB",
    },
  },
  trackAfter: {
    background: "#8797C0",
    "& $activated": {
      background: "#f8ac59"
    }
  },
  input : {
    width: 68,
    //height: 39,
    height: 32,
    //top: -26,
    top: -17,
    left: -34,
    right: 0,
    background: "#b4bbd8",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "4px",
    position: "absolute",
    zIndex: 900,
    "&:before": {
      content: '""',
      display: "block",
      width: 1,
      left: -2,
      right: 0,
      margin: "auto",
      bottom: -14,
      border: "8px solid transparent",
      borderTop: "8px solid #b4bbd8",
      position: "absolute",
      zIndex: 300,
    },
    "& > input" : {
      width: 67,
      //height: 35,
      height: 30,
      touchAction: "none",
      position: "absolute",
      border: "none",
      borderRadius: "4px",
      background: "transparent",
      left: 0,
      textAlign: "center",
      "&:focus": {
        outline: "none",
        border: "1px solid #2ECC71"
      }
    },
  },
  values: {
    display: "flex",
    width: "100%",
    color: "#8797C0",
    marginBottom: 16,
    position: "relative",
    marginTop: -14,
    paddingBottom: 15,
    fontSize: 16,
    "& > span:first-child": {
      display: "block",
      margin: "auto auto auto 0"
    },
    "& > span:last-child": {
      display: "block",
      margin: "auto 0 auto auto"
    }
  },
  rels: {
    width: "100%",
    height: 0,
    position: "relative",
    zIndex: 900,
  },
  defaultCircle: {
    background: "#EB5763",
    width: 12,
    height: 12,
    left: -2,
    top: -28,
    borderRadius: "50%",
    position: 'absolute'
  },
  defaultCircleWrapper: {
    width: "100%",
    height: 0,
    position: 'absolute',
    zIndex: 18,
  },
  defaultValue: {
    position: "absolute",
    top: -17,
    left: -46.5,
    width: 100,
    textAlign: "center"
  },
  thumbWrapper: {
    zIndex: 99
  }
});

export default withStyles(styles)(withTheme()(StepSlider));
