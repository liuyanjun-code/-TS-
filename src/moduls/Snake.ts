class Snake {
  // 蛇头
  head: HTMLElement
  // 蛇的身体（包括蛇头）
  body:HTMLCollection
  // 获取蛇的容器
  element:HTMLElement
  constructor() {
    // as HTMLElement 断言
    this.head = document.querySelector('#snake>div')! as HTMLElement
    this.body=document.getElementById('snake')!.getElementsByTagName('div')
    this.element=document.getElementById('snake')!
  }
  // 获取蛇的坐标
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }
  // 设置蛇的坐标
  set X(value:number){
    // 如果新值和旧值一样则不需要修改
    if(this.X===value) return
    if(value<0||value>290){
      // 蛇撞墙了
      throw new Error('蛇撞墙了')
    }
    // 蛇的移动不能直接左右掉头
    if(this.body[1] && (this.body[1] as HTMLElement).offsetLeft===value){
      if (value > this.X) {
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    this.moveBody()
    this.head.style.left=value+'px'
    this.checkHeadBody()
  }
  set Y(value:number){
    if(this.Y===value) return
    if(value<0||value>290){
      // 蛇撞墙了
      throw new Error('蛇撞墙了')
    }
    // 判断是否发生了调头
    if (this.body[1] && (this.body[1] as HTMLElement).offsetTop === value) {
      // 如果发生调头 让蛇继续向反方向走
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    // 如果新值和旧值一样则不需要修改
    this.moveBody()
    this.head.style.top=value+'px'
    this.checkHeadBody()
  }
  // 蛇增加身体的方法
  addBody(){
    this.element.insertAdjacentHTML("beforeend","<div></div>")
  }
  // 添加一个身体移动的方法
  moveBody(){
    // 身体的位置循环继承
    for(let i=this.body.length-1;i>0;i--){
      // 获取前面身体的位置
      // (this.body[i-1] as HTMLElement) 类型断言
      let X=(this.body[i-1] as HTMLElement).offsetLeft
      let Y=(this.body[i-1] as HTMLElement).offsetTop;
      (this.body[i] as HTMLElement).style.left=X+'px';
      (this.body[i] as HTMLElement).style.top=Y+'px'
    }
  }
  checkHeadBody() {
    //   获取所有身体 检查是否和蛇头坐标重叠
    for (let i = 1; i < this.body.length; i++) {
      let bd = this.body[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error("撞到自己了");
      }
    }
  }
}
export default Snake