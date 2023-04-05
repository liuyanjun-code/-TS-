
class ScorePanel {
  // 用来记录分数和等级
  score = 0
  level = 1
  // 分数和等级所在的元素进行初始化
  scoreELe: HTMLElement
  levelELe: HTMLElement
  // 设置一个变量限制等级
  maxlevel: number
  // 设置一个变量多少分升级
  upScore: number
  constructor(maxlevel: number = 10, upScore: number = 10) {
    this.scoreELe = document.getElementById('score')!
    this.levelELe = document.getElementById('level')!
    this.maxlevel = maxlevel
    this.upScore = upScore
  }
  // 设置一个加分的方法
  addScore() {
    this.scoreELe.innerHTML = ++this.score + ''
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }
  levelUp() {
    if (this.level < this.maxlevel) {
      this.levelELe.innerHTML = ++this.level + ''
    }
  }
}
export default ScorePanel