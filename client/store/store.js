// 作为 store 的统一入口
import {TopicStore} from './topic-store'

export {TopicStore}

// 这个函数为服务端渲染的组件提供store对象 {storeObj}
// 接收的默认参数为:
//   syncing = false,
//   topicDataList = [],
//   currentTab = '',
//   topicDetail = {},
//   topicReply = []
export const createStoreMap = () => {
  return {
    TopicStore: new TopicStore()
  }
}
