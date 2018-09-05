import {
  observable,
  computed,
  autorun,
  action,
}
  from 'mobx'


export class AppState {
  @observable counter = 0

  @observable name = 'apolo'

  @computed
  get msg() {
    return `${this.name} : ${this.counter}`
  }

  @action
  add() {
    this.counter += 1
  }
}

const appState = new AppState()
autorun(() => {
  console.log(appState.msg)
})

// update counter
// setInterval(
//   () => {
//     appState.add()
//   },
//   1000,
// )

export default appState
