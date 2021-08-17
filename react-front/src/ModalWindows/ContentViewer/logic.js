export class Logic {
  constructor (obj) {
    this.obj = obj;
    return this._getHtml();
  }
  _getHtml() {
    if (this.obj.type === 'image') {
      return <img src={this.obj.url} />
    }
  }
}