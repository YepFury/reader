import * as types from './types'
import state from './state'

const actions = {
    getType({commit}, type) {
        return new Promise((resolve, reject) => {
            state.types.map(item => {
                if (item.type == type) {
                    resolve(item.title)
                }
            })
        })
    },
    toggleCover({commit}) {
        commit(types.TITLE_COVER)
    },
    currentCpt({commit}, num) {
        commit(types.CURRENT_CPT, num)
    },
    preCpt({commit}) {
        return new Promise((resolve, reject) => {
            resolve(true);
            commit(types.PRE_CPT)
        })
    },
    nextCpt({commit}, max) {
        return new Promise((resolve, reject) => {
            resolve(true);
            commit(types.NEXT_CPT, max)
        })
    },
    switchNight({commit}) {
        commit(types.SWITCH_STYLE);
    },
    bigSize({commit}) {
        commit(types.BIG_SIZE);
    },
    smallSize({commit}) {
        commit(types.SMALL_SIZE);
    },
    font({commit}, bool) {
        commit('FONT', bool)
    },
    menus({commit}) {
        commit(types.MENU);
    },
    currentStyle({commit}, index) {
        commit(types.DAY_STYLE, index);
    },
    getInfo({commit}, info) {
        commit(types.PERSON_INFO, info);
    }
}
export default actions;
