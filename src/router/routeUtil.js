class routeUtil {
  constructor() {
    this.history = null;
    this.path = '';
    this.search = '';
  }

  initHistory(history) {
    this.history = history;
    // console.log(this.history, 'history init');
  }

  jump(path) {
    console.log(this);
    if (!this.history) {
      // throw new Error('history 未初始化');
      console.log(this.history);
      return;
    }
    this.history.push(path);
  }

  blankOpen(url = '', search = { id: 123456 }) {
    if (typeof url !== 'string')
      throw new Error('传入第一个参数必须为string类型');
    switch (typeof search) {
      case 'string':
        this.search = search;
        break;
      case 'object':
        let res = '';
        let first = true;
        for (let key in search) {
          res += (first ? '' : '&') + `${key}=${search[key]}`;
          first = false;
        }
        this.search = res;
        break;
      default:
        break;
    }
    this.path = url;
    localStorage.setItem('transitInfo',JSON.stringify({ path: url, search: this.search }));
    const w = window.open('about:blank');
    const host = 3000;
    // 要打开的新页面的url
    w.location.href = `http://localhost:${host}/transit`;
  }

  getSearchParams(str = '') {
    const res = {}
    if(!str) return res;
    str = str.substring(1);
    let arr = str.split('&');
    arr.forEach(item => {
      let singleParam = item.split('=');
      if(singleParam.length === 2) {
        res[singleParam[0]] = singleParam[1];
      }
    });
    return res;
  }
}

export default new routeUtil();
