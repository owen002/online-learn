import {PROJECT_TITLE} from './mutation-type'

export const setHeaderTitle = ({commit}, title) => {
  return commit({type: PROJECT_TITLE, title})
}
