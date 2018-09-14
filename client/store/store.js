import AppStateClass from './app-state'

export const AppState = AppStateClass

export default {
  AppState,
}

// 这个函数为服务端渲染的组件提供store对象 {appState: storeObj}
export const createStoreMap = () => {
  return {
    appState: new AppState(),
  }
}
