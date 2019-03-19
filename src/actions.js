import { createAction } from 'redux-actions';

//action общий для приложения
export const bindApp = createAction('ACTION_START');
export const bindIncomeData = createAction('ACTION_INCOME');
export const bindCompensation = createAction('ACTION_COMPENSATION');
export const bindKomDoh = createAction('ACTION_KOMDOH');
export const bindAnaliticSelect = createAction('ACTION_ANALITIC_SELECT');
export const bindDataFactDohod = createAction('ACTION_FACT_DOHOD');
export const bindkomDohTabs = createAction('ACTION_KD_TABS');
export const bindDin = createAction('ACTION_DINCHART');
export const bindBlocks = createAction('ACTION_BLOCKS');
export const bindGroup = createAction('ACTION_GROUP');
export const bindDrivers = createAction('ACTION_DRIVERS');
export const bindActiveBlock = createAction('ACTION_DRIVERS');
export const bindDriversData = createAction('ACTION_DRIVERS_DATA');
export const bindPreloader = createAction('ACTION_PRELOADER');
export const bindValues = createAction("ACTION_VALUES");
export const closeCollapses = createAction("CLOSE_COLLAPSES");
export const bindInfoId = createAction("INFO_ID");