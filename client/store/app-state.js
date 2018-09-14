// 定义一个 Mobx store 的构造函数 AppStateClass.
import {
  observable,
  computed,
  action,
}
  from 'mobx'

// AppStateClass receive count, name as params
export default class AppStateClass {
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

// update counter
// setInterval(
//   () => {
//     appState.add()
//   },
//   1000,
// )
