import React, { Component } from 'react';
import {withStyles, withTheme} from '@material-ui/core/styles';
import TilesRender from '../containers/tilesRender'
import Button from "../components/Button";
import MainSceme from '../schemes/MainPanel.scheme';
import GroupForm from '../containers/GroupForm';
import DriverForm from "../containers/DriverForm";
import ProgressChartsForm from "../containers/ProgressChartsForm";
import AnaliticChartsForm from "../containers/AnaliticChartsForm";
import DinChartsForm from "../containers/DinChartsForm";
import DinTableForm from "../containers/DinTableForm";
import CustomTabs from "../components/CustomTabs";
import TabsButton from "../components/TabsButton";

const getKey = (data) => {
  let result = [];

  for(let key in data) {
    if(data.hasOwnProperty(key)) {
      result.push(key)
    }
  }

  function getName(name) {
    switch (name) {
      case "cundo" : return "ЦУНДО";
      case "cib" : return "CIB";
      default : return "КБ";
    }
  }

  return {
    value: result[0],
    name: getName(result[0])
  }
};

class MainPage extends Component {

  constructor(props) {
    super(props);

    this.props.bindAnaliticSelect({
      analitic1Value: getKey(window.bobrData["data_fact_dohod"]).value,
      analitic1Name: getKey(window.bobrData["data_fact_dohod"]).name,
      analitic2Value: getKey(window.bobrData["data_fact_kd"]).value,
      analitic2Name: getKey(window.bobrData["data_fact_kd"]).name,
      analitic3Value: getKey(window.bobrData["data_fact_komp"]).value,
      analitic3Name: getKey(window.bobrData["data_fact_komp"]).name,
    });
  }

  components = (classes) => (item, parentClasses) => {
    return [
      {
        id:"btn",
        view: <Button text={item.title} />
      },
      {
        id:"driverForm",
        index: 2,
        view: (
          <div>
            {
              typeof item.slider !== "undefined" && typeof item.values !== "undefined"
                ? <DriverForm
                  title={item.title}
                  binding={item.binding}
                  values={{
                    base: item.values.base,
                    model: item.values.model,
                    baseLarge: item.values.baseLarge,
                    modelLarge: item.values.modelLarge,
                    arrowPlan: item.values.arrowPlan,
                    arrowModel: item.values.arrowModel,
                    b_prirost: item.values.b_prirost,
                    m_prirost: item.values.m_prirost,
                    info: item.values.info
                  }}
                  settings={{
                    title: "",
                    value: Number(item.slider.base),
                    min: Number(item.slider.min),
                    max: Number(item.slider.max),
                    id: item.slider.key,
                    step: Number(item.slider.step.replace(",", ".")),
                    info: item.slider.text,
                    baseValue: Number(item.slider.base),
                  }}
                /> : null
            }

          </div>
        )
      },
      {
        id:"tileTitle",
        index: 1,
        view: (
          <div className={parentClasses.tileTitle}>
            {item.title}
          </div>
        )
      },
      {
        id:"groupTitle",
        index: 0,
        view: (
          <div className={classes.primaryTitle}>{item.primaryTitle}</div>
        )
      },
      {
        id:"groupForm",
        index: 2,
        view: (
          <GroupForm />
        )
      },
      {
        id:"progressChart",
        index: 2,
        view: (
          <div className={classes.chartWrap}>
            <ProgressChartsForm m={this.props.storeCompensation.compensation.m} p={this.props.storeCompensation.compensation.p} id={item.id} items={item.chart} />
          </div>
        )
      },
      {
        id:"customTabs",
        index: 2,
        view: (
          <CustomTabs
            default={this.props.storekomDohTabs.default}
            bind={this.props.bindkomDohTabs}
            bindName={"default"}
            tabs={[
              item.chartSplit !== null ? <TabsButton text={"Сплит"} /> : null,
              item.chartBB !== null ? <TabsButton text={"ББ Клиента"} /> : null,
              item.chartCanals !== null ? <TabsButton text={"Каналы"} /> : null
            ].filter(item => item !== null)}
            content={[
              item.chartSplit !== null ? <ProgressChartsForm m={this.props.storeKomDoh.komDoh.split.m} p={this.props.storeKomDoh.komDoh.split.p} id={item.id} items={item.chartSplit} /> : null,
              item.chartBB !== null ? <ProgressChartsForm m={this.props.storeKomDoh.komDoh.bb.m} p={this.props.storeKomDoh.komDoh.bb.p} id={item.id} items={item.chartBB} /> : null,
              item.chartCanals !== null ? <ProgressChartsForm m={this.props.storeKomDoh.komDoh.channel.m} p={this.props.storeKomDoh.komDoh.channel.p} id={item.id} items={item.chartCanals} /> : null
            ].filter(item => item !== null)} />
        )
      },
      {
        id:"analiticChart",
        index: 2,
        view: (
          <div>
            <CustomTabs
              default={this.props.storekomDohTabs.analiticDefault}
              bind={this.props.bindkomDohTabs}
              bindName={"analiticDefault"}
              tabs={[
                item.chartSd !== null ? <TabsButton text={"Совокупный доход"} /> : null,
                item.chartKd !== null ? <TabsButton text={"Комиссионный доход"} /> : null,
                item.chartComp !== null ? <TabsButton text={"Компенсация"} /> : null
              ].filter(item => item !== null)}
              content={[
                item.chartSd !== null ? <AnaliticChartsForm id={1} items={item.chartSd} /> : null,
                item.chartKd !== null ? <AnaliticChartsForm id={2} items={item.chartKd} /> : null,
                item.chartComp !== null ? <AnaliticChartsForm id={3} items={item.chartComp} /> : null
              ].filter(item => item !== null)}
            />
          </div>
        )
      },
      {
        id:"dinChart",
        index: 2,
        view: (
          <CustomTabs
            default={this.props.storekomDohTabs.dinTabsDefault}
            bind={this.props.bindkomDohTabs}
            bindName={"dinTabsDefault"}
            tabs={[
              <TabsButton text={"Сбербанк"} />,
              <TabsButton text={"ТБ"} />,
            ]}
            content={[
              <DinChartsForm m={this.props.storeDin.dinChart.m} p={this.props.storeDin.dinChart.p} items={item.dinChart} />,
              <DinTableForm m={this.props.storeDin.dinTable.m} p={this.props.storeDin.dinTable.p} items={item.dinTable} />
            ]}
          />
        )
      },
    ]
  };

  render() {
    const props = this.props,
          {classes} = props;

    return (
      <TilesRender
        scheme={
          MainSceme(props, {
            income: props.storeIncomeData.income,
            compensation: {
              m: props.storeCompensation.compensation.m.filter(item => item.block === props.storeAnaliticChart.kompName),
              p: props.storeCompensation.compensation.p.filter(item => item.block === props.storeAnaliticChart.kompName),
            },
            komDohSplit: props.storeKomDoh.komDoh.split,
            komDohBb: {
              m: props.storeKomDoh.komDoh.bb.m.filter(item => item.block === props.storeAnaliticChart.kdName),
              p: props.storeKomDoh.komDoh.bb.p.filter(item => item.block === props.storeAnaliticChart.kdName),
            },
            komDohChannel: {
              m: props.storeKomDoh.komDoh.channel.m.filter(item => item.block === props.storeAnaliticChart.kdName),
              p: props.storeKomDoh.komDoh.channel.p.filter(item => item.block === props.storeAnaliticChart.kdName),
            },
            dataFactDohod1: typeof props.storeFactDohod.factDohod1 !== "undefined" ? props.storeFactDohod.factDohod1[props.storeAnaliticChart.analitic1Value] : null,
            dataFactDohod2: typeof props.storeFactDohod.factDohod2 !== "undefined" ? props.storeFactDohod.factDohod2[props.storeAnaliticChart.analitic2Value] : null,
            dataFactDohod3: typeof props.storeFactDohod.factDohod3 !== "undefined" ? props.storeFactDohod.factDohod3[props.storeAnaliticChart.analitic3Value] : null,
            dinChart: {
              m: props.storeDin.dinChart.m.filter(item => item.block === props.storeAnaliticChart.dinName),
              p: props.storeDin.dinChart.p.filter(item => item.block === props.storeAnaliticChart.dinName),
            },
            dinTable: {
              m: props.storeDin.dinTable.m.filter(item => item.block === props.storeAnaliticChart.dinTableName),
              p: props.storeDin.dinTable.p.filter(item => item.block === props.storeAnaliticChart.dinTableName),
            },
            drivers: props.storeDrivers.drivers,
            driversData: props.storeDrivers.driversData,
          })
        }
        components={this.components(classes)}
      />
    )
  }
}

const styles = theme => ({
  primaryTitle: {
    padding: "5px 0 15px 0",

    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    fontSize: 20,
    color:  theme.palette.primary.group,
  },
  chartWrap: {
    marginTop: 40
  }
});

export default withStyles(styles)(withTheme()(MainPage));
