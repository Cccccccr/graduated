class routeUtil {
  constructor() {
    this.history = null;
  }

  initHistory(history) {
    this.history = history;
    // console.log(this.history, 'history init');
  }

  jump(path) {
    console.log(this);
    if(!this.history) {
      // throw new Error('history 未初始化');
      console.log(this.history);
      return;
    }
    this.history.push(path);
  }
}

export default new routeUtil();
