import AppState from './app-state'
import {TopicStore} from './topic-store'

export {AppState, TopicStore}

// 这个函数为服务端渲染的组件提供store对象 {appState: storeObj}
export const createStoreMap = (count, name) => {
  return {
    appState: new AppState(count, name),
    TopicStore: new TopicStore()
  }
}
