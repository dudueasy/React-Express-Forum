import {TopicStore} from './topic-store'

export {TopicStore}

// 这个函数为服务端渲染的组件提供store对象 {storeObj}
export const createStoreMap = (count, name) => {
  return {
    TopicStore: new TopicStore()
  }
}
