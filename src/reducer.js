import { handleActions } from 'redux-actions';
import * as actions from './actions';

//дефолтные значения storage
const app = {
  title: "Планирование доходов по кассово-инкассаторскому обслуживанию сторонних объектов НДО",
  plan: "Плановая компания 2019+",
  template: "dark",
  menu: true,
  update: 0,
  scrollOff: false,
};

const close_collapses = {
  flag: false
};

const data = {
  income : null,
  compensation: null,
  komDoh: null,
  factDohod1: null,
  factDohod2: null,
  factDohod3: null,
  dinChart: null,
  dinTable: null
};

const selets = {
  analitic1Value: "cundo",
  analitic1Name: "ЦУНДО",
  analitic2Value: "cundo",
  analitic2Name: "ЦУНДО",
  analitic3Value: "cundo",
  analitic3Name: "ЦУНДО",
  compValue: "cundo",
  compName: "ЦУНДО",
  kdValue: "cundo",
  kdName: "ЦУНДО",
  kompValue: "cundo",
  kompName: "ЦУНДО",
  dinValue: "cundo",
  dinName: "ЦУНДО",
  dinTableValue: "cundo",
  dinTableName: "ЦУНДО",
  trigger: false,
  tableDinTrigger: false
};

const tabs = {
  default: 0,
  analiticDefault: 0,
  dinTabsDefault: 0
};

const blocks = {
  period: null,
  version: null,
  gosb: null,
  biz: null,
  direction: null,
  channel: null,
  ndo: null,
  gv_var_rasch: null,
  gv_gosb: null,
  gv_biz_block: null,
  gv_period: null,
  gv_dd_direction: null,
  gv_sale_channel: null,
  gv_ndo: null,
};

const group = {
  inputKd: false,
  inputKomp: false,
};

const drivers = {
  drivers: null,
  driversData: null,
};

const driversData = {
  COM05: null,
  COM06: null,
  COM04: null,
  CMP01: null,
  vesCOM05: 0,
  vesCOM06: 0,
  vesCOM04: 0,
  vesCMP01: 0,
};

const preloader = {
  preloader: false,
  longPreloader: false
};

const ActiveBlock = {
  target: null
};

const values = {
  value1: "",
  value2: ""
};

export const handleCloseCollapses = handleActions({
  [actions.closeCollapses](state, { payload }) {
    return {...state, ...payload };
  }
}, close_collapses);

export const handleApp = handleActions({
  [actions.bindApp](state, { payload }) {
    return { ...state, ...payload };
  },
}, app);


export const handleDataIncomeData = handleActions({
  [actions.bindIncomeData](state, { payload }) {
    return { ...state, ...payload };
  },
}, data);


export const handleCompensation = handleActions({
  [actions.bindCompensation](state, { payload }) {
    return { ...state, ...payload };
  },
}, data);


export const handleKomDoh = handleActions({
  [actions.bindKomDoh](state, { payload }) {
    return { ...state, ...payload };
  },
}, data);


export const handleDataFactDohod = handleActions({
  [actions.bindDataFactDohod](state, { payload }) {
    return { ...state, ...payload };
  },
}, data);

export const handleDin = handleActions({
  [actions.bindDin](state, { payload }) {
    return { ...state, ...payload };
  },
}, data);

export const handleSelect = handleActions({
  [actions.bindAnaliticSelect](state, { payload }) {
    return { ...state, ...payload };
  },
}, selets);

export const handleDohTabs = handleActions({
  [actions.bindkomDohTabs](state, { payload }) {
    return { ...state, ...payload };
  },
}, tabs);

export const handleBlocks = handleActions({
  [actions.bindBlocks](state, { payload }) {
    return { ...state, ...payload };
  },
}, blocks);

export const handleGroup = handleActions({
  [actions.bindGroup](state, { payload }) {
    return { ...state, ...payload };
  },
}, group);

export const handleDrivers = handleActions({
  [actions.bindDrivers](state, { payload }) {
    return { ...state, ...payload };
  },
}, drivers);

export const handleDriversData = handleActions({
  [actions.bindDriversData](state, { payload }) {
    return { ...state, ...payload };
  },
}, driversData);

export const handleActiveBlock = handleActions({
  [actions.bindActiveBlock](state, { payload }) {
    return { ...state, ...payload };
  },
}, ActiveBlock);

export const handlePreloader = handleActions({
  [actions.bindPreloader](state, { payload }) {
    return { ...state, ...payload };
  },
}, preloader);

export const handleValues = handleActions({
  [actions.bindValues](state, { payload }) {
    return  { ...state, ...payload }
  }
}, values);



