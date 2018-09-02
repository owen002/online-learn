import {PROJECT_TITLE} from './mutation-type'

const mutations = {
  [PROJECT_TITLE](state, title) {
    state.headerTitle = title
  }
}

export default mutations
