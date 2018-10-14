import {
  observable,
  computed,
  action,
  reaction,
  extendObservable
} from 'mobx'

import {topicSchema} from '../util/variable-difine'

import {get} from '../util/http'

// 根据 topicSchema 中的初始化数据来生成一个 topic 数据对象
const createTopicData = topicData => (
  Object.assign({}, topicSchema, topicData)
)

// 创建一个 Topic对象 这个对象中的属性都是 observable
class Topic {
  constructor(topicData) {
    extendObservable(this, topicData)
  }

  @observable syncing = false
}


// TopicStore 对象提供了 topicStoreList 属性, 作为 Topic 的容器
class TopicStore {
  @observable syncing

  @observable topicDataList


  constructor(syncing = false, topicDataList = []) {
    this.syncing = syncing

    // convert topics data into Mobx Topic observable object
    this.topicDataList = topicDataList
  }

  // topicStoreList is a container for Topic instances
  @computed
  get topicStoreList() {
    return this.topicDataList.map(
      topicData => new Topic(createTopicData(topicData))
    )
  }

  // push a new data item to topicDataList
  @action
  addTopicDataList(topicData) {
    this.topicDataList.push(topicData)
  }

  // replace all topicDataList with new TopicDataList
  @action
  updateTopicDataList(newTopicDataList) {
    this.topicDataList.replace(newTopicDataList)
  }

  // toggle syncing
  @action
  toggleSyncing() {
    this.syncing = !this.syncing
    console.log('syncing: ', this.syncing)
  }


  // get topicListData and update topicStoreList
  @action
  fetchTopicListData(currentTab) {
    return new Promise((resolve, reject) => {
      this.toggleSyncing()

      currentTab = currentTab || 'all'
      console.log('currentTab', currentTab)

      get('/topics', {mdrender: false, tab: currentTab})
        .then((response) => {
          if (response.success) {
            this.updateTopicDataList(response.data)
            console.log('topicDataList:', this.topicDataList)
            resolve()
          } else {
            reject(new Error('something wrong during request'))
          }

          this.toggleSyncing()
        })
    }).catch((err) => {
      this.syncing = false
      console.log(err)
    })
  }

  // xxx = reaction(
  //   () => (
  //     this.currentTab
  //   ), (tab) => {
  //     this.fetchTopicListData()
  //   }
  // )
}


export {Topic, TopicStore}
