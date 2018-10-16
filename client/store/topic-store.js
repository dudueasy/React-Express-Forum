import {
  observable,
  computed,
  action,
  reaction,
  extendObservable,
  autorun
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

  @observable currentTopicTab


  constructor({syncing = false, topicDataList = [], currentTab = ''}) {
    this.syncing = syncing

    // convert topics data into Mobx Topic observable object
    this.topicDataList = topicDataList
    this.currentTopicTab = currentTab
  }

  // topicStoreList is a container for Topic instances
  @computed
  get topicStoreList() {
    return this.topicDataList.map(
      topicData => new Topic(createTopicData(topicData))
    )
  }

  tellTab = autorun(()=>{console.log(this.currentTopicTab)})

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

  @action
  updateTopicTab(newTab) {
    console.log('topic tab is updated')
    this.currentTopicTab = newTab
  }

  // toggle syncing
  @action
  toggleSyncing() {
    this.syncing = !this.syncing
    console.log('syncing: ', this.syncing)
  }


  // get topicListData and update topicStoreList
  fetchTopicListData(currentTab) {
    return new Promise((resolve, reject) => {
      this.toggleSyncing()

      currentTab = currentTab || 'all'
      get('/topics', {mdrender: false, tab: currentTab})
        .then((response) => {
          if (response.success) {
            this.updateTopicDataList(response.data)
            console.log('topicDataList:', this.topicDataList)
            resolve()
          } else {
            reject(new Error('something wrong during request'))
          }

          this.syncing = false
        })
    }).catch((err) => {
      this.syncing = false
      console.log(err)
    })
  }

  reactToTab = reaction(
    () => this.currentTopicTab,
    (currentTopicTab) => {
      this.fetchTopicListData(currentTopicTab)
    }
  )

}


export {Topic, TopicStore}
