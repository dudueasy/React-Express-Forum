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
    console.log(topicData)
    extendObservable(this, topicData)
  }

  @observable syncing = false
}


// TopicStore 对象提供了 topicStoreList 属性, 作为 Topic 的容器
class TopicStore {
  @observable topicStoreList

  @observable syncing

  // initialize topicStore with empty [] as topicListData
  constructor(syncing = false, topicStoreList = []) {
    this.syncing = syncing

    // convert topics data into Mobx Topic observable object
    this.topicStoreList = topicStoreList.map(
      topicData => new Topic(createTopicData(topicData))
    )
  }

  // a method to push new Topic into this.topicStoreList
  addTopicStore(topicData) {
    this.topicStoreList.push(new Topic(createTopicData(topicData)))
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

            response.data.forEach((topicData) => {
              this.addTopicStore(topicData)
            })
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
