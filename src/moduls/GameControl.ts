import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'
// 游戏控制器
class GameControl{
  snake:Snake
  food:Food
  scorePanel:ScorePanel
  direction:string='ArrowRight'
  // 控制游戏是否开始还是结束
  isLive=true
  constructor(){
    this.snake=new Snake()
    this.food=new Food()
    this.scorePanel=new ScorePanel()
    this.init()
  }
  init(){
    // 绑定按键事件
    document.addEventListener('keydown',this.keydownHandler.bind(this))
  }
  // 响应函数
  keydownHandler(event:KeyboardEvent){
    // console.log(event.key)
    // bind对事件的this进行重定向
    this.direction=event.key
    // console.log(this.direction)
    if(this.isLive) this.run()
  }
  // 创建一个控制蛇移动的方法
  run(){
    // 获取蛇的坐标
    let X=this.snake.X
    let Y=this.snake.Y
    switch(this.direction){
      case"ArrowUp":
        Y-=10
        break
      case"ArrowDown":
        Y+=10
        break
      case"ArrowLeft":
        X-=10
        break
      case"ArrowRight":
        X+=10
        break
    }
    // 检查迟到了食物
    this.checkEat(X,Y)
    try {
      // 设置蛇的坐标
      this.snake.X=X
      this.snake.Y=Y
    }catch(e){
      // alert(e+'---游戏结束')
      this.isLive=false
    }
    // 设置蛇的坐标
    // 开启定时器
    this.isLive && setTimeout(this.run.bind(this),300-(this.scorePanel.level-1)*30)
  }
  // 定义一个方法检测蛇是否吃到食物
  checkEat(X:number,Y:number){
    if(this.food.X===X && this.food.Y===Y){
      this.food.change()
      this.scorePanel.addScore()
      this.snake.addBody()
    }
  }

}
export default GameControl