import {getChartData} from '../halpers/BiscuitParser'


const MainScheme = function (props, data) {
  /*
  Схема структуры главного экрана
  */
  return [
    {
      media: [
        {screen: 2000, width: "32%"},
        {screen: 1700, width: "50%"},
        {screen: 1100, width: "100%"}
      ],
      height: "100%",
      tiles: [
        {
          width: "100%",
          title: "Целевой КПЭ, МЛН РУБ.",
          primaryTitle: "Драйверы",
          titleState: false,
          components: ["groupTitle", "tileTitle", "groupForm"]
        },
        {
          width: "100%",
          height: "calc(100% - 180px)",
          childrens: [
            {
              width: "100%",
              height: 255,
              titleState: false,
              slider: data.drivers[1],
              binding: ["inputKd","inputKomp"],
              title: data.driversData[0].text,
              values: {
                base:  data.driversData[0].plan_raschet,
                model:  data.driversData[0].model_raschet,
                baseLarge: data.driversData[0].plan_baza,
                modelLarge: data.driversData[0].model_baza,
                arrowPlan: data.driversData[0].plan_dinamika,
                arrowModel: data.driversData[0].model_dinamika,
                b_prirost:  data.driversData[0].plan_prirost,
                m_prirost:  data.driversData[0].model_prirost,
                info: data.driversData[0].text,
              },
              components: ["driverForm"]
            },
            {
              width: "100%",
              height: 255,
              titleState: false,
              slider: data.drivers[0],
              binding: "inputKd",
              title: data.driversData[2].text,
              values: {
                base:  data.driversData[2].plan_raschet,
                model:  data.driversData[2].model_raschet,
                baseLarge: data.driversData[2].plan_baza,
                modelLarge: data.driversData[2].model_baza,
                arrowPlan: data.driversData[2].plan_dinamika,
                arrowModel: data.driversData[2].model_dinamika,
                b_prirost:  data.driversData[2].plan_prirost,
                m_prirost:  data.driversData[2].model_prirost,
                info: data.driversData[2].text,
              },
              components: ["driverForm"]
            },
            {
              width: "100%",
              height: 255,
              titleState: false,
              slider: data.drivers[3],
              binding: "inputKomp",
              title: data.driversData[1].text,
              values: {
                base:  data.driversData[1].plan_raschet,
                model:  data.driversData[1].model_raschet,
                baseLarge: data.driversData[1].plan_baza,
                modelLarge: data.driversData[1].model_baza,
                arrowPlan: data.driversData[1].plan_dinamika,
                arrowModel: data.driversData[1].model_dinamika,
                b_prirost:  data.driversData[1].plan_prirost,
                m_prirost:  data.driversData[1].model_prirost,
                info: data.driversData[1].text,
              },
              components: ["driverForm"]
            },
            {
              width: "100%",
              height: 255,
              titleState: false,
              slider: data.drivers[2],
              binding: "inputKd",
              title: data.driversData[3].text,
              values: {
                b_prirost:  data.driversData[3].plan_prirost,
                m_prirost:  data.driversData[3].model_prirost,
                base:  [
                  data.driversData[3].plan_raschet,
                  data.driversData[4].plan_raschet,
                  data.driversData[5].plan_raschet,
                  data.driversData[6].plan_raschet
                ],
                model: [
                  data.driversData[3].model_raschet,
                  data.driversData[4].model_raschet,
                  data.driversData[5].model_raschet,
                  data.driversData[6].model_raschet
                ],
                baseLarge: [
                  data.driversData[3].plan_baza,
                  data.driversData[4].plan_baza,
                  data.driversData[5].plan_baza,
                  data.driversData[6].plan_baza,
                ],
                modelLarge: [
                  data.driversData[3].model_baza,
                  data.driversData[4].model_baza,
                  data.driversData[5].model_baza,
                  data.driversData[6].model_baza,
                ],
                arrowPlan: [
                  data.driversData[3].plan_dinamika,
                  data.driversData[4].plan_dinamika,
                  data.driversData[5].plan_dinamika,
                  data.driversData[6].plan_dinamika,
                ],
                arrowModel: [
                  data.driversData[3].model_dinamika,
                  data.driversData[4].model_dinamika,
                  data.driversData[5].model_dinamika,
                  data.driversData[6].model_dinamika,
                ],
                info: [
                  data.driversData[3].text,
                  data.driversData[4].text,
                  data.driversData[5].text,
                  data.driversData[6].text,
                ]
              },
              components: ["driverForm"]
            }
          ]
        }
      ]
    },
    {
      media: [
        {screen: 2000, width: "28%"},
        {screen: 1700, width: "50%"},
        {screen: 1100, width: "100%"}
      ],
      height: "100%",
      tiles: [
        {
          width: "100%",
          height: "33.333333%",
          id: 1,
          title: "Доход, МЛН РУБ.",
          components: ["progressChart"],
          chart: getChartData(data.income, props)
        },
        {
          width: "100%",
          height: "33.333333%",
          title: "Комиссионный доход, МЛН РУБ.",
          id: 2,
          components: ["customTabs"],
          chartSplit: typeof data.komDohSplit !== "undefined" && data.komDohSplit !== null ?  getChartData(data.komDohSplit, props) : null,
          chartBB: typeof data.komDohBb !== "undefined" && data.komDohBb !== null ?  getChartData(data.komDohBb, props) : null,
          chartCanals: typeof data.komDohChannel !== "undefined" && data.komDohChannel !== null ?  getChartData(data.komDohChannel, props) : null
        },
        {
          width: "100%",
          height: "33.333333%",
          id: 3,
          title: "Компенсация, МЛН РУБ.",
          components: ["progressChart"],
          chart: getChartData(data.compensation, props)
        },
      ]
    },
    {
      media: [
        {screen: 2000, width: "40%"},
        {screen: 1700, width: "100%"},
        {screen: 1100, width: "100%"}
      ],
      height: "100%",
      tiles: [
        {
          width: "100%",
          height: "50%",
          title: "Анализ влияния факторов на изменение доходов, МЛН РУБ.",
          components: ["analiticChart"],
          chartSd: typeof data.dataFactDohod1 !== "undefined" && data.dataFactDohod1 !== null ? getChartData(data.dataFactDohod1, props) : null,
          chartKd: typeof data.dataFactDohod2 !== "undefined" && data.dataFactDohod2 !== null ? getChartData(data.dataFactDohod2, props) : null,
          chartComp: typeof data.dataFactDohod3 !== "undefined" && data.dataFactDohod3 !== null ? getChartData(data.dataFactDohod3, props) : null,
        },
        {
          width: "100%",
          height: "50%",
          title: "Динамика доходов, МЛН РУБ.",
          components: ["dinChart"],
          dinChart: data.dinChart,
          dinTable: data.dinTable,
        },
      ]
    }
  ];
};
export default MainScheme;
