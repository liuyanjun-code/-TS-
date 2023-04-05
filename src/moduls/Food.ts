class Food {
  element: HTMLElement;
  constructor() {
    //最后加一个叹号表示不会为空，否则 this.element 有为空警告
    this.element = document.getElementById('food')!
  }
  get X() {
    return this.element.offsetLeft
  }
  get Y() {
    return this.element.offsetTop
  }
  change() {
    // 生成一个随机值，在0~300
    // 蛇一次移动一格，一格大小10px
    // Math.round(Math.random()*30)*10
    this.element.style.left = Math.round(Math.random() * 29) * 10 + 'px'
    this.element.style.top = Math.round(Math.random() * 29) * 10 + 'px'
  }
}
export default Food