import {
  observable,
  computed,
  action,
  toJS,
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

  // push a new data to topicDatalist
  @action
  addTopicDataList(topicData) {
    this.topicDataList.push(topicData)
  }

  @action
  updateTopicDataList(newTopicDataList) {
    this.topicDataList.replace(newTopicDataList)
  }

// get topicListData and update topicStoreList
  @action
  fetchTopicListData() {
    return new Promise((resolve, reject) => {
      this.syncing = true

      get('/topics', {mdrender: false})
        .then((response) => {
          if (response.success) {
            console.log('get /topics get response successfully')

            // response.data.forEach((topicData) => {
            //   this.topicDataList.push(topicData)
            // })

            this.updateTopicDataList(response.data)

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
}


export {Topic, TopicStore}
