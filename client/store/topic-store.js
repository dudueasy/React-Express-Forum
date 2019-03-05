import {
  observable,
  computed,
  action,
  reaction,
  extendObservable,
  autorun,
} from 'mobx';

import {topicSchema} from '../util/variable-difine';

import {get} from '../util/http';


// (未启用)声明一个事件处理用于冻结页面滚动. 在 @action onSyncing 中绑定给 window 对象.
let scrollFreezer;

// 根据 topicSchema 中的初始化数据来生成一个 topic 数据对象
const createTopicData = topicData => (
  Object.assign({}, topicSchema, topicData)
);

// 创建一个 Topic对象 这个对象中的属性都是 observable
class Topic {
  constructor(topicData) {
    extendObservable(this, topicData);
  }

  @observable syncing = false;
}


// TopicStore 对象提供了 topicStoreList 属性, 作为 Topic 的容器
class TopicStore {
  @observable syncing;

  @observable topicDataList;

  @observable currentTopicTab;

  @observable topicDetail;

  @observable topicReply;


  constructor({
                syncing = false,
                topicDataList = [],
                currentTab = '',
                topicDetail = {},
                topicReply = [],

              }) {

    this.syncing = syncing;

    // convert topics data into Mobx Topic observable object
    this.topicDataList = topicDataList;
    this.currentTopicTab = currentTab;
    this.topicDetail = topicDetail;
    this.topicReply = topicReply;

  }

  // topicStoreList is a container for Topic instances
  @computed
  get topicStoreList() {
    return this.topicDataList.map(
      topicData => new Topic(createTopicData(topicData)),
    );
  }

  tellTab = autorun(() => {
  });

  // push a new data item to topicDataList
  @action
  addTopicDataList(topicData) {
    this.topicDataList.push(topicData);
  }

  // replace all topicDataList with new TopicDataList
  @action
  updateTopicDataList(newTopicDataList) {
    this.topicDataList.replace(newTopicDataList);
  }

  @action
  updateTopicTab(newTab) { //eslint-disable-line
    this.currentTopicTab = newTab;
  }

  @action
  updateTopicDetail(topicDetail) {
    this.topicDetail = topicDetail;
    this.updateTopicReply(topicDetail.replies);
  }

  @action
  updateTopicReply(topicReply) {
    this.topicReply = topicReply;
  }

  // toggle syncing
  @action
  onSyncing() {
    this.syncing = true;
    scrollFreezer = (e) => {
      e.stopImmediatePropagation();
      window.scrollTo(0, 0);
    };

    window.addEventListener('scroll', scrollFreezer, true);
  }

  @action
  offSyncing() {
    this.syncing = false;
    window.removeEventListener('scroll', scrollFreezer, true);
  }

  // get topicListData and update topicStoreList
  fetchTopicListData(currentTab) {
    if (currentTab) {
      this.onSyncing();

      get('/topics', {mdrender: false, tab: currentTab})
        .then((response) => {
          if (response.success) {
            this.updateTopicDataList(response.data);
            Promise.resolve();
          } else {
            Promise.reject(new Error('something wrong during request'));
          }
          this.offSyncing();
        })
        .catch((err) => {
          this.offSyncing();
        });

    }
  }

  fetchTopicDetail(topicId) {
    if (topicId) {
      this.onSyncing();
      get(`/topic/${topicId}`, {mdrender: false})
        .then(
          (response) => {
            if (response.success) {
              this.updateTopicDetail(response.data);
              Promise.resolve();
            } else {
              Promise.reject();
            }

            this.offSyncing();
          },
        )
        .catch((err) => {
          this.offSyncing();
        });
    }
  }

  reactToTab = reaction(
    () => this.currentTopicTab,
    (currentTopicTab) => {
      this.fetchTopicListData(currentTopicTab);
    },
  );

}


export {
  Topic, TopicStore,
};
