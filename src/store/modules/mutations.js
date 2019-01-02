import * as types from './types'

const mutations = {
    [types.TITLE_COVER](state) {
        state.cover = !state.cover
    },
    [types.MENU](state) {
        console.log(state.menu);
        state.menu = !state.menu;
        if (state.menu == false) {
            state.font = false
        }
    },
    [types.CURRENT_CPT](state, num) {
        state.currentCpt = num
    },
    [types.PRE_CPT](state) {
        if (state.currentCpt <= 1) {
            return false;
        } else {
            state.currentCpt--;
        }
    },
    [types.NEXT_CPT](state, max) {
        if (state.currentCpt > max) {
            return false;
        } else {
            state.currentCpt++;
        }
    },
    [types.TITLE_COVER](state) {
        state.cover = !state.cover
    },
    [types.SWITCH_STYLE](state) {
        state.night = !state.night
        if (state.night) {
            state.nightText = '日间'
        } else {
            state.nightText = '夜间'
        }
    },
    [types.FONT](state, bool) {
        state.font = bool
    },
    [types.BIG_SIZE](state) {
        if (state.fontSize >= 20) {
            return false
        } else {
            state.fontSize++;
        }
    },
    [types.SMALL_SIZE](state) {
        if (state.fontSize <= 12) {
            return false
        } else {
            state.fontSize--;
        }
    },
    [types.DAY_STYLE](state, index) {
        state.currentStyle = state.styles[index];
    },
    [types.PERSON_INFO](state, info) {
        state.userInfo = info
    },
};

export default mutations;
