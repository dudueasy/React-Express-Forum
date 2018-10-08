// 定义一个 Mobx store 的构造函数 AppState
import {
  observable,
  computed,
  action,
}
  from 'mobx'

// AppState receive count, name as params
export default class AppState {
  constructor(count = 0, name = 'apolo') {
    this.count = count
    this.name = name
  }

  @observable count

  @observable name

  @computed
  get msg() {
    return `${this.name} : ${this.count}`
  }

  @action
  add() {
    this.count += 1
  }

  toJson() {
    return {
      count: this.count,
      name: this.name,
    }
  }
}
