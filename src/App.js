import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import ReactIScroll from "react-iscroll";
import iScroll from "iscroll/build/iscroll-probe";
import MainPage from "./containers/MainPage";
import Collapse from "./containers/Collapse";
import MenuIcon from '@material-ui/icons/ArrowBack';
import UnfoldLess from '@material-ui/icons/UnfoldLess';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Button from './components/Button';
import {ierarchyParse} from './halpers/ierarchyParser';
import {dateParse} from './halpers/dateParser';
import {ndoParse} from './halpers/ndoParser';
import {directionParse} from './halpers/directionParser';
import {channelParse} from "./halpers/channelParser";
import {versionParse} from "./halpers/versionParser";
import {bizParse} from "./halpers/bizParser";
import {LumiraRequest} from "./halpers/LumiraRequest"
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from "@material-ui/core/Slide/Slide";
import SnackbarContentWrapper from "./components/Snackbar";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBottom from '@material-ui/icons/ExpandMore';
import InfoButton from "./containers/InfoButton";

class App extends Component {//
    constructor(props) {
        super(props);

        this.REQ = LumiraRequest("DATA_UPDATE");

        this.state = {
          updateScroll: 0,
          collapse: false,
          blocksGosp: undefined,
          rasch: undefined,
          period: undefined,
          ndo: undefined,
          direction: undefined,
          channel: undefined,
            menu: true,
          open: false,
          sum: 0,
          info: false,
          spaceHover: false
        };

        //Отключить дотошный скролл на ipad
        document.querySelector('body').addEventListener('touchmove', function(e) {
          e.preventDefault();
        }, { passive: false });

        //Пробрасываем дефолтные данные
        this.getStoreData = () => {
          this.props.bindIncomeData({
            income: window.bobrData["data_dohod"],
          });

          this.props.bindCompensation({
            compensation: window.bobrData["data_komp"],
          });

          this.props.bindKomDoh({
            komDoh: window.bobrData["data_kom_dohod"],
          });

          this.props.bindDin({
            dinChart: window.bobrData["data_dyn_dohod_graph"],
            dinTable: window.bobrData["data_dyn_dohod"]
          });

          this.props.bindDataFactDohod({
            factDohod1: window.bobrData["data_fact_dohod"],
            factDohod2: window.bobrData["data_fact_kd"],
            factDohod3: window.bobrData["data_fact_komp"],
          });

          this.props.bindDrivers({
            drivers: window.bobrData["drivers"],
            driversData: window.bobrData["drivers_data"],
            vesKd: window.bobrData["data_ves_factor_kd"],
            vesKomp: window.bobrData["data_ves_factor_komp"]
          });

          this.props.bindBlocks({
            period: window.bobrData["dd_period"],
            version: window.bobrData["dd_version"],
            gosb: window.bobrData["dd_gosb"],
            biz: window.bobrData["dd_biz_block"],
            direction: window.bobrData["dd_direction"],
            channel: window.bobrData["dd_sale_channel"],
            ndo: window.bobrData["dd_ndo"],
            gv_drivers_loaded: window.bobrData["gv_drivers_loaded"],
            gv_var_rasch: window.bobrData["X_var1"],
            gv_gosb: window.bobrData["gv_gosb"],
            gv_biz_block: window.bobrData["gv_biz_block"],
            gv_period: window.bobrData["gv_period"],
            gv_dd_direction: window.bobrData["gv_dd_direction"],
            gv_sale_channel: window.bobrData["gv_sale_channel"],
            gv_ndo: window.bobrData["gv_ndo"],
            gv_var_x_var_2: window.bobrData["X_var2"],
            planning_version: window.bobrData["X_pl_vers"],
            planning_version_text: window.bobrData["planning_version"]
          });
        };

        this.getStoreData();

        this.REQ.get((action, data) => {
          this.props.bindPreloader({preloader: false, longPreloader : false});
          console.log("СРАБОТАЛ REACT.UPDATE");
          console.log("ОБНОВЛЕННЫЙ ОБЪЕКТ:");
          console.log(data);
          this.getStoreData();
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
      if(this.props.storeBlocks !== prevProps.storeBlocks) {
        this.setState({collapse: true});
      }
    }

    handleBlock = (event, id, item, group, name) => {
      const block = event.target.parentNode,
            groupState = `collapseGroup_${group}`;

      if(typeof this.state[groupState] !== "undefined") {
        this.setState({[groupState]: 0});
      }

      this.setState({[name]: id});

      if(typeof this.state[groupState] !== "undefined" && this.state[groupState] !== 0) {
        this.state[groupState].classList.remove("active");
      }

      block.classList.add("active");
      this.setState({[groupState]: block});

      this.REQ.set("tech2", () => {
        this.props.bindPreloader({preloader: true});
        console.log("ОТПРАВЛЕН ЗАПРОС В ЛЮМИРУ...");
        return `${item.group},${item.key_block || item.key}`
      });
    };

    handleButtons = (type) => {
      this.props.bindPreloader({preloader: true});
      switch (type) {
        case "save":
          this.REQ.set("tech3", () => {
            console.log("ОТПРАВЛЕН ЗАПРОС НА СОХРАНЕНИЕ...");
          });
        break;
        case "load":
          this.REQ.set("tech5", () => {
            console.log("ОТПРАВЛЕН ЗАПРОС НА ЗАГРУЗКУ ПОСЛЕДНЕГО СОХРАНЕНИЯ...");
          });
        break;
        default :
          this.REQ.set("tech4", () => {
            console.log("ОТПРАВЛЕН ЗАПРОС НА ВОЗВРАТ К ПОСЛ. СОХРАНЕНИЮ...");
          });
      }
    };

    handleCloseCollapses = () => {
      this.props.closeCollapses({flag: true});
      //console.log(this.props.storeCloseCollapses);
    };

  handleFilters = () => {

    if(this.props.storeValues.value1 !== ""){
      const drivers = ["COM04","COM05","COM06"];
      const weights = this.props.storeDriversData;
      const cur_weight = drivers.reduce((sum, currVal) => sum + Number(weights["ves"+currVal]),0);
      if(Math.abs(cur_weight - 100) >= 0.0001){
        this.setState({open: true, sum: cur_weight});
        return
      }
    }
    if (this.props.storeValues.value2 !== ""){
      const drivers = ["COM04","CMP01"];
      const weights = this.props.storeDriversData;
      const cur_weight = drivers.reduce((sum, currVal) => sum + Number(weights["ves"+currVal]),0);
      if(Math.abs(cur_weight - 100) >= 0.0001){
        this.setState({open: true, sum: cur_weight});
        return
      }
    }

    this.props.bindPreloader({longPreloader: true});
    const REQ = LumiraRequest("DATA_UPDATE");

    REQ.set("tech6", () => {
      console.log("ОТПРАВЛЕН ЗАПРОС В ЛЮМИРУ...");
      if(this.props.storeValues.value2.length !== 0) {
        console.log(`obr,komp,${this.props.storeValues.value2},${this.props.storeDriversData["vesCOM04"]},${this.props.storeDriversData["vesCMP01"]}`);
        return `obr,komp,${this.props.storeValues.value2},${this.props.storeDriversData["vesCOM04"]},${this.props.storeDriversData["vesCMP01"]}`
      }else if(this.props.storeValues.value1.length !== 0) {
        console.log(`obr,kd,${this.props.storeValues.value1},${this.props.storeDriversData["vesCOM04"]},${this.props.storeDriversData["vesCOM05"]},${this.props.storeDriversData["vesCOM06"]}`);
        return `obr,kd,${this.props.storeValues.value1},${this.props.storeDriversData["vesCOM04"]},${this.props.storeDriversData["vesCOM05"]},${this.props.storeDriversData["vesCOM06"]}`
      }else {
        return "pr"
      }
    });


    // this.props.bindDriversData({
    //   COM05: null,
    //   COM06: null,
    //   COM04: null,
    //   CMP01: null,
    // });
    // this.props.bindValues({
    //   value1: "",
    //   value2: ""
    // });
    // this.props.bindGroup({
    //   inputKd: false,
    //   inputKomp: false
    // });
  };

  triggerSnackbar = () => {
    this.setState({open: !this.state.open});
    console.log("hover!");
};

  anyCollapseOpen = () => {
    let flag = false;
    const collapses = this.props.storeCloseCollapses;
    for(let key in collapses){
      if(collapses.hasOwnProperty(key)) {
        if (collapses[key] && key !== "flag") {
          flag = true;
        }
      }
    }
    return flag
};
  handleInfo = () => {
    this.setState({info: !this.state.info});
  };

    render() {
      console.log(this.state);
      const props = this.props,
        { classes } = props;
      console.log("Store:");
      console.log(props);
      console.log("LumiraData:");
      console.log(window.bobrData);
      // let path = "";
      // if(typeof window.bobrPath !== "undefined"){
      //   path = window.bobrPath+"/img/"+this.props.storeInfoId.infoId+".png";
      // }
      // else{
      //   path = "../public/img/"+this.props.storeInfoId.infoId+".png";
      // }
      const path = (typeof window.bobrPath !== "undefined") ? (window.bobrPath+"/img/"+this.props.storeInfoId.infoId+".png") : ("/img/"+this.props.storeInfoId.infoId+".png");

      // console.log(typeof path);
      // console.log(typeof ("../public/img/"+this.props.storeInfoId.infoId+".png"));
      //
      //const img = require(("../public/img/"+this.props.storeInfoId.infoId+".png"));

      console.log(require(("../public/img/"+this.props.storeInfoId.infoId+".png")));

      const data = {
        filtr_panel:{
          title:"Панель фильтрации",
          text:"По выбранным фильтрам отображается вся информация в WEB-интерфейсе планирования, кроме динамики доходов. Динамика доходов всегда отображается одинаково."},
        hide_filters:{
          title:"Скрыть все фильтры",
          text:"Сворачивает все иерархии фильтрации."
        },
        target_kpe:{
          title:"Целевой КПЭ",
          text: "Указание целевого КПЭ, который необходимо достичь. Система рассчитает необходимые значения приростов драйверов для достижения целевого КПЭ. Вводится отдельно для комиссионного дохода и компенсации. При вводе подсвечивает драйверы, влияющие на вводимый КПЭ и их предрассчитанные веса влияния (%). При необходимости веса влияния можно ввести вручную. Сумма весов влияния драйверов должна быть равна 100%."
        },
        income:{
          title:"Доход",
          text:"Отображает совокупный доход (Комиссионный доход и Компенсацию) в разрезе бизнес-блоков по кассово-инкассаторскому обслуживанию сторонних объектов, в соответствии с заданной фильтрацией."
        },
        komm_income:{
          title:"Комисионный доход",
          text:"Отображает комиссионный доход по конкретному бизнес-блоку в разрезе аналитик в соответствии с заданной фильтрацией."
        },
        compensation:{
          title:"Компенсация",
          text:"Отображает компенсацию за кассово-инкассаторское обслуживание сторонних объектов по нерыночным тарифам в соответствии с заданной фильтрацией."
        },
        fact_an:{
          title:"Факторный анализ",
          text:"Отображает изменение доходов от базового уровня за счет изменения показателей разного уровня. Для каждого уровня показателей применяется своя расцветка."
        },
        start:{
          title:"Запустить расчёт",
          text:"Запуск расчета по заданным моделируемым значениям драйверов и/или значений целевого КПЭ. Занимает около 10 минут. После завершения расчета отобразятся значения финансового результата в соответствии с заданными значениями драйверов и/или значений целевого КПЭ."
        },
        save:{
          title:"Сохранить",
          text:"Сохранить моделируемый вариант в системе. При сохранении моделируемого варианта он будет перезаписан, включая значения драйверов, их приросты и финансовые показатели."
        },
        last_saved:{
          title:"К последнему сохранению",
          text:"Вернуться к последнему сохраненному варианту моделируемого варианта расчета. Будут отображены сохраненные значения приростов драйверов и финансовых показателей."
        },
        plan_var:{
          title:"Плановый вариант",
          text:"Вернуться к плановому варианту расчета. Моделируемый вариант расчета будет равен плановому – значения приростов драйверов и финансовых показателей."
        },
      };

      let infoDisplay = [<div key={0} className={classes.infoScreenWrapper} onClick={()=>{this.handleInfo()}} />,
        <div className={classes.infoScreenMenu} key={1} onMouseEnter={()=>{this.setState({spaceHover: false}); console.log("ENTER")}} onMouseLeave={()=>{this.setState({spaceHover: true})}}>
          <div className={classes.infoScreenMenuWrapper}>
            <div className={classes.crossWrapperWrapper}>
              <div className = {classes.crossWrapper} onClick={()=>{this.handleInfo()}} >
                <div style={(this.state.spaceHover) ? {background: "white"} : {}}/>
                <div style={(this.state.spaceHover) ? {background: "white"} : {}}/>
              </div>
            </div>
          <div className={classes.infoMenuTitle}>
            {"Руководство пользователя"}
          </div>
            <div className={classes.hline} style={{marginTop: 15}}/>
            <div className={classes.infoMenuButtonColumnsWrapper}>
              <div className={classes.infoMenuButtonColumn}>
                <InfoButton id={"filtr_panel"} data={data} />
                <InfoButton id={"hide_filters"} data={data} />
              </div>
              <div className={classes.infoMenuButtonColumn}>
                <InfoButton id={"target_kpe"} data={data} />
              </div>
              <div className={classes.infoMenuButtonColumn}>
                <InfoButton id={"income"} data={data} />
                <InfoButton id={"komm_income"} data={data} />
                <InfoButton id={"compensation"} data={data} />
              </div>
              <div className={classes.infoMenuButtonColumn}>
                <InfoButton id={"fact_an"} data={data} />
              </div>
              <div className={classes.infoMenuButtonColumn}>
                <InfoButton id={"start"} data={data} />
                <InfoButton id={"save"} data={data} />
                <InfoButton id={"last_saved"} data={data} />
                <InfoButton id={"plan_var"} data={data} />
              </div>
            </div>
            <div className={classes.hline} />
            <div className={classes.infoMenuDataWrapper}>
              <div className={classes.infoMenuImgBorder}>
                <div className={classes.infoMenuImgWrapper}>
                  <img src={path} style={{display: "block"}}/>
                </div>
              </div>
              <div className={classes.infoMenuDataTextWrapper}>
                <div className={classes.infoMenuDataTitle}>{data[this.props.storeInfoId.infoId].title}</div>
                <div className={classes.infoMenuDataText}>{data[this.props.storeInfoId.infoId].text}</div>
              </div>
            </div>
          </div>
          </div>];

      let updateScroll = this.state.updateScroll;

      return (
        <div className={classes.appOutput} >
          <div className={`${classes.longLoad}${props.storePreloader.longPreloader === true ? " active" : ""}`}>
            <div className={classes.longLoadPreloader}>
              <div className={classes.longLoadImg} />
              <div className={classes.longLoadText}>Идет расчет... Ждите!</div>
              <div className={classes.longLoadTime}>{`Это может занять примерно 10 мин.`}</div>
            </div>
          </div>
          {(this.state.info) ? infoDisplay : null}
          <Snackbar
              key={0}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={this.state.open}
              autoHideDuration={5000}
              onClose={this.triggerSnackbar}
              //classes={{ root: classes.snackbarRoot}}
              ContentProps={{
                'aria-describedby': 'message-id',
                className: classes.snackbarRoot,
              }}
              message={<span id="message-id">{`Расчет целевого КПЭ невозможен. Сумма весов влияния драйверов не равна 100%.     Текущая сумма: ${this.state.sum}%`}</span>}
              action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={this.triggerSnackbar}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
          />
          {
            props.storePreloader.preloader === true ?
              <div className={classes.preloader}>
                <Slide direction="left" in={props.storePreloader.preloader} mountOnEnter unmountOnExit>
                  <div className={classes.load}>
                    <CircularProgress className={classes.progress} />
                    <div className={classes.loadText}>Загрузка данных...</div>
                  </div>
                </Slide>
              </div>
            : null
          }
          <header className={classes.appHeader}>
            <div className={classes.titleWrapper}>
              <div className={classes.appTitle}>
              {props.storeApp.title}
              </div>
              <div className={classes.headerAppVersion}>
                <span>{props.storeBlocks.planning_version_text}</span>
              </div>
            </div>
            <div className={classes.appFilters}>
              <div className={`${classes.secondaryFilter} blue`}>Моделируемый вариант расчёта: <span>{props.storeBlocks.gv_var_x_var_2}</span></div>
              <div className={`${classes.secondaryFilter} red`}>Плановый вариант расчёта: <span>{props.storeBlocks.gv_var_rasch}</span></div>
            </div>
          </header>
          <div className={classes.appBody}>
            <aside className={`${classes.appSideBar} ${(this.state.menu === true) ? "active" : ""}`}>
              <div className={classes.smartMenu}>
                {/*<div className={classes.btnMenu} onClick={() => {this.setState({menu: !this.state.menu}); console.log(this.props.storeValues)}}>*/}
                  {/*<MenuIcon className={classes.menuArrow} />*/}
                {/*</div>*/}
                <div className={classes.btnMenu} onClick={() => {console.log("Close collapses!"); this.handleCloseCollapses()}}>
                  <div className={`${classes.CollapseBtn} ${this.anyCollapseOpen() === true ? "active" : ""}`}><ArrowBottom /></div>
                </div>
                {/*<div className={classes.btnMenu}>*/}
                  {/*<SettingsIcon className={classes.menuIcon} />*/}
                {/*</div>*/}
                <div className={classes.btnMenu} onClick={()=>{console.log("Information screen activated"); this.handleInfo();}}>
                  <HelpIcon className={classes.menuIcon} />
                </div>
                {/*<div className={classes.btnMenu}>*/}
                  {/*<FeedbackIcon className={classes.menuIcon} />*/}
                {/*</div>*/}
              </div>
              <div className={classes.appAsideInner}>
                {/*<div className={classes.primaryTitle}>Фильтры</div>*/}
                {
                  updateScroll >= 0
                    ? <div className={classes.collapseWrapper}>
                      <ReactIScroll ref="iScroll" iScroll={iScroll} options={{
                        mouseWheel: true,
                        scrollbars: true,
                        freeScroll: true,
                        scrollX: false,
                        scrollY: true,
                        fadeScrollbars: true,
                        click: false,
                        invertWheelDirection: false,
                      }}>
                        <div className={classes.collapses} onClick={() => this.setState({updateScroll : updateScroll++})}>
                          {
                            this.state.collapse === true  ?
                              <div>
                                  <div className={`${classes.secondaryTitle} ${classes.secondaryTitleLegend} ${classes.hiddenCircle}`}>Плановый вариант</div>
                                  <Collapse
                                      active={this.state.rasch}
                                      onClick={(event, id, item) => this.handleBlock(event, id, item, "1", "rasch")}
                                      items={versionParse(props.storeBlocks.version, props.storeBlocks.gv_var_rasch, "gv_var_rasch")}
                                      isFirst={true}
                                      name={"rasch"}
                                  />
                                  <div className={classes.separatorWrapper}>
                                      <div className={classes.separator} />
                                  </div>
                                  <div className={`${classes.secondaryTitle}`}>Общие фильтры</div>
                                  <Collapse
                                    active={this.state.blocksGosp}
                                    onClick={(event, id, item) => this.handleBlock(event, id, item, "0", "blocksGosp")}
                                    items={ierarchyParse(props.storeBlocks.gosb, props.storeBlocks.gv_gosb, "gv_gosb")}
                                    isFirst={true}
                                    name={"blocksGosp"}
                                  />
                                  <Collapse
                                    active={this.state.period}
                                    onClick={(event, id, item) => this.handleBlock(event, id, item, "2", "period")}
                                    items={dateParse(props.storeBlocks.period, props.storeBlocks.gv_period, "gv_period")}
                                    isFirst={true}
                                    name={"period"}
                                  />
                                  <Collapse
                                    active={this.state.block}
                                    onClick={(event, id, item) => this.handleBlock(event, id, item, "3", "block")}
                                    items={bizParse(props.storeBlocks.biz, props.storeBlocks.gv_biz_block, "gv_biz_block")}
                                    isFirst={true}
                                    name={"block"}
                                  />
                                  <div className={`${classes.secondaryTitle}`}>Дополнительные фильтры КД</div>
                                  <Collapse
                                    active={this.state.ndo}
                                    onClick={(event, id, item) => this.handleBlock(event, id, item, "4", "ndo")}
                                    items={ndoParse(props.storeBlocks.ndo, props.storeBlocks.gv_ndo, "gv_ndo")} //<---------------------- или gv_biz_block?
                                    isFirst={true}
                                    name={"ndo"}
                                  />
                                <Collapse
                                    active={this.state.direction}
                                    onClick={(event, id, item) => this.handleBlock(event, id, item, "5", "direction")}
                                    items={directionParse(props.storeBlocks.direction, props.storeBlocks.gv_dd_direction, "gv_dd_direction")}
                                    isFirst={true}
                                    name={"direction"}
                                />
                                <Collapse
                                    active={this.state.channel}
                                    onClick={(event, id, item) => this.handleBlock(event, id, item, "6", "channel")}
                                    items={channelParse(props.storeBlocks.channel, props.storeBlocks.gv_sale_channel, "gv_sale_channel")}
                                    isFirst={true}
                                    name={"channel"}
                                />
                              </div>
                            : null
                          }
                        </div>
                      </ReactIScroll>
                    </div>
                    : null
                }
                <div className={classes.buttonPanel}>
                  <Button onClick={this.handleFilters} text={"Рассчитать"} />
                  <Button onClick={() => this.handleButtons("save")} text={"Сохранить"}/>
                  <Button onClick={() => this.handleButtons("load")} classes={{wrapper: classes.btnWrapper}} text={"К последнему сохранению"}/>
                  <Button onClick={() => this.handleButtons("last_load")} type={"red"}  text={"Плановый вариант"}/>
                </div>
              </div>
            </aside>
            <section className={`${classes.appContent} ${(this.state.menu === true) ? "full" : ""}`}>
              <div className={classes.appContentInner}>
                <div className={classes.appContentInnerTilePanel}>
                  <MainPage />
                </div>
              </div>
            </section>
          </div>
        </div>
      );
    }
}

const styles = theme => ({
      infoMenuImgWrapper:{
        borderRadius: 8,
        boxShadow: "0px 14px 30px rgba(52, 152, 219, 0.36)",
        maxWidth:"100%",
        "& img":{
          maxHeight: 400
        }
      },
      infoMenuImgBorder:{
        background: "#395377",
        padding: 31,
        borderRadius: 8,
        height: "100%"
      },
      infoMenuDataTitle:{
        fontSize: 36,
        lineHeight: "normal",
        color: "#CACFDD",
        marginBottom: 26
      },
      infoMenuDataTextWrapper:{
        display: "block",
        padding: "0 50px",
        paddingRight: 0
      },
      infoMenuButtonColumnsWrapper:{
        display: "flex",
        height: 120
      },
      infoMenuButtonColumn:{
        display: "block",
        width: "20%"
      },
      infoMenuDataText:{
        fontSize: 18,
        lineHeight: "32px",
        color: "#CACFDD",
        fontStyle: "normal",
        fontWeight: "300"

},
      infoMenuDataWrapper:{
        display: "flex",
        transition: "all 300ms ease-in-out",
      },
    hline:{
      height: 1,
      width: "100%",
      backgroundColor: "#536086",
      marginTop: 60,
      marginBottom: 60
    },
      infoScreenMenuWrapper:{
        position: "relative"
      },
      infoMenuTitle:{
        fontSize: 24,
        color: "#CACFDD"
      },
      crossWrapperWrapper:{
        position: "absolute",
        top: 0,
        right: -40
      },
      crossWrapper:{
        //background: "white",
        width: 55,
        height: 55,
        marginLeft: "100%",
        position: "relative",
        "& div:nth-child(2)":{
          background: "#81C8F8",
          width: 27.5,
          height: 1,
          margin: 13.75,
          marginTop: 24,
          transform: "rotate(45deg)",
          position: "absolute"
        },
        "& div:nth-child(1)":{
          background: "#81C8F8",
          width: 27.5,
          height: 1,
          margin: 13.75,
          marginTop: 24,
          transform: "rotate(-45deg)",
          position: "absolute"

        },
        "&:hover":{
          "& div":{
            background: "white"
          }
        }
      },
      infoScreenMenu:{
        position: "absolute",
        top: 0,
        left: "10%",
        width: "80%",
        height: "90%",
        background: "radial-gradient(880.00px at 50% 0%, #212F64 0%, #1B2137 100%)",
        zIndex: 990,
        padding: "20px 40px"
      },
      infoScreenWrapper:{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        //background: "black",
        //opacity: "0.7",
        background: "rgba(39, 56, 86, 0.5)",
        backdropFilter: "blur(20px)",
        zIndex: 900,
        transition: "all 300ms ease-in-out",

      },
  CollapseBtn: {
    alignContent: "center",
    justifyContent: "center",
    "& svg": {
      fill: theme.palette.primary.separator,
      marginTop: 8,
      transition: "all 300ms ease-in-out",
      transform: "rotate(0deg)",
    },
    "&.active svg": {
      transform: "rotate(180deg)",
    },
  },
  snackbarRoot: {
    fontFamily: "Open Sans, serif",
    fontWeight: "400",
    background: "white",
    maxWidth: "none",
    color: theme.palette.primary.main,
    whiteSpace: "pre"
  },
  btn: {
    width: 128,
    height: 40
  },
  wrapper: {
    padding: "0 0"
  },
  close: {
    padding: theme.spacing.unit / 2,
  },
      titleWrapper:{
        //display: "flex",
        borderBottom: `1px solid ${theme.palette.primary.headerSeparator}`,
        position: "relative"
      },
  headerAppVersion:{
    fontSize: 16,
    //marginTop: 12,
    fontWeight: 500,
    color: theme.palette.primary.titles,
    //paddingRight: 35,
    padding: "15px 0 16px 0",
    //marginLeft: "22%",
    position: "absolute",
    right:0,
    top: 2

},
  longLoad: {
    width: "100%",
    height: "100%",
    background: "#1b2137",
    position: "fixed",
    zIndex: 999,
    top: 0,
    left: 0,
    visibility: "hidden",
    opacity: 0,
    transition: "all 800ms linear",
    "&.active": {
      visibility: "visible",
      opacity: 1
    },
    "&.active $longLoadImg": {
      transform: "scale(1)"
    }
  },
  longLoadPreloader: {
    width: 400,
    height: 330,
    position: "absolute",
    top: -30, left: 0, bottom: 0, right: 0,
    margin: "auto",
    textAlign: "center"
  },
  longLoadImg: {
    width: 250,
    height: 250,
    margin: "auto",
    border: "8px solid #a0ffc3",
    background:  typeof window.bobrPath !== "undefined" ? `#234 url(${window.bobrPath}/img/cat.gif) top -22px left 20% no-repeat` : "#234 url(../img/cat.gif) top -22px left 20% no-repeat",
    backgroundSize: "165%",
    borderRadius: "50%",
    transform: "scale(0)",
    transition: "all 500ms ease-in-out",
  },
  longLoadText: {
    position: "absolute",
    fontSize: 34,
    width: "100%",
    color: "#fff",
    bottom: 0,
    animation: "fade 4s ease-in-out infinite",
  },
  "@keyframes fade": {
    "0%": {
      opacity: 1
    },
    "50%": {
      opacity: 0.1
    },
    "100%": {
      opacity: 1
    }
  },
  longLoadTime: {
    color: "#fff",
    fontSize: 18,
    width: "100%",
    position: "absolute",
    bottom: -40
  },
  appOutput: {
    width: "calc(100% - 0px)",
    transition: "all 300ms ease-in-out",
    position: "absolute",
    height: "100%",
    background: theme.palette.primary.main,
  },
  preloader: {
    width: "100%",
    height: "100%",
    background: "rgba(82, 82, 82, 0.21)",
    position: "fixed",
    zIndex: 999
  },
  loadText: {
    //margin: "auto",
    fontWeight: 300,
    margin: "21px 16px"
  },
  progress: {
    margin: "auto",
    "& circle": {
      stroke: theme.palette.primary.redBorder,
    }
  },
  load: {
    width: 220,
    borderRadius: "4px",
    boxShadow: "0 5px 3px 2px rgba(0, 0, 0, 0.19)",
    height: 64,
    position: "absolute",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    background: "rgba(249, 249, 249, 0.96)",
    margin: "auto",
    right: 30,
    top: 30,
  },
  appBody: {
    position: "absolute",
    width: "100%",
    height: "calc(100% - 100px)"
  },
  appSideBar: {
    width: 320,//354,
    background: theme.palette.primary.main,
    height: "100%",
    position: "absolute",
    left: 0,
    paddingLeft: 15,
    paddingBottom: 15,
    //paddingRight: 40,
    boxSizing: "border-box",
    transform: "translateX(-314px)",
    transition: "all 300ms ease-in-out",
    borderRadius: "3px",
    overflow: "hidden",
    "&.active": {
      position: "relative",
      transform: "translateX(0)"
    },
    "&.active $menuArrow": {
      transform: "rotate(0deg)"
    }
  },
  appAsideInner: {
    background: theme.palette.primary.blocks,
    height: "100%",
    borderRadius: "3px 0 0 3px",
    position: "relative",
    width: "calc(100% - 40px)"
  },
  appContent: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    position: "absolute",
    top: -5,
    right: 0,
    overflow: "auto",
    width: "calc(100% - 40px)",
    transition: "all 300ms ease-in-out",
    "&.full": {
      width: "calc(100% - 320px)",
    },
  },
  appHeader: {
    height: 100,
    width: "100%",
    boxSizing: "border-box",
    padding: "0 15px"
  },
  appContentInner: {
    height: "100%",
    minHeight: 859,
    width: "100%",
    boxSizing: "border-box",
    padding: "0 10px 5px 10px"
  },
  appContentInnerTilePanel: {
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    width: "100%",
  },
  appTitle: {
    color: theme.palette.primary.headerTitle,
    fontSize: 18,
    padding: "15px 0 16px 0",
    fontWeight: 400,
    //borderBottom: `1px solid ${theme.palette.primary.headerSeparator}`
  },
  appPlan: {
    color: theme.palette.primary.headerTitle,
    fontSize: 12,
    fontWeight: 300,
  },
  appFilters: {
    display: "flex "
  },
  smartMenu: {
    position: "absolute",
    height: "calc(100% - 15px)",
    background: theme.palette.primary.smart,
    width: 40,
    right: 0,
    borderRadius: "0 0 3px 0"
  },
  btnMenu: {
    width: "100%",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 8
  },
  menuArrow: {
    fill: theme.palette.primary.titles,
    marginTop: 8,
    transition: "all 600ms ease-in-out",
    transform: "rotate(180deg)"
  },
  menuIcon: {
    fill: theme.palette.primary.titles,
    marginTop: 8,
  },
  appLogo: {
    background: "url(../img/sber-en_sbol-icon.svg) center no-repeat",
    backgroundSize: "150%",
    width: 50,
    top: -4,
    height: 90,
    position: "absolute",
    left: 10
  },
  buttonPanel: {
    position: "absolute",
    bottom: 15,
    width: "100%"
  },
  btnWrapper: {
    marginBottom: 25
  },
  primaryTitle: {
    padding: "15px 15px 5px 15px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    fontSize: 20,
    color: theme.palette.primary.group,
  },
  separatorWrapper: {
    padding: "15px 15px 0px 15px"
  },
  separator: {
    width: "100%",
    height: "1px",
    background: theme.palette.primary.headerSeparator
  },
  secondaryTitle: {
    fontWeight: 400,
    fontSize: 16,
    marginTop: 15,
    color: theme.palette.primary.titles,
    padding: "0 15px",
      marginBottom: 15
  },
  secondaryTitleLegend: {
    "&:before": {
      content: '""',
      width: 10,
      height: 10,
      display: "inline-block",
      marginRight: 5,
      borderRadius: "50%",
      background: theme.palette.primary.redBorder
    }
  },
  collapseWrapper: {
    overflow: "hidden",
    height: "calc(100% - 268px)",
    overflowY: "hidden",
    overflowX: "visible"
  },
  collapses: {
    minHeight: 575,
    touchAction: "none"
  },
  secondaryFilter: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: 500,
    color: theme.palette.primary.titles,
    paddingRight: 35,
    "&:before": {
      content: '""',
      width: 10,
      height: 10,
      display: "inline-block",
      marginRight: 5,
      borderRadius: "50%",
      background: theme.palette.primary.redBorder
    },
    "&.red:before": {
      background: theme.palette.primary.redBorder
    },
    "&.blue:before": {
      background: theme.palette.primary.blueBorder
    },
      "&.white:before": {
          background: "#F3CF12"//"#FFFFFF"
      },
    "& span": {

      fontWeight: 300
    }
  },
  hiddenCircle: {
    "&:before":{
      width: 0
    }
  }
});

export default withStyles(styles)(App);

