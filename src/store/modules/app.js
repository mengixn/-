const state = {
  userName: '',
  // 修改性别
  gender: localStorage.getItem(`gender`) || {},
  // 修改生日
  date: localStorage.getItem(`date`) || {}

}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  change_gender(state, gender) {
    state.gender = gender
    localStorage.setItem(`gender`, gender)
  },
  change_date(state, date) {
    state.date = date
    localStorage.setItem(`date`, date)
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  }
}
export default {
  state,
  mutations,
  actions
}
