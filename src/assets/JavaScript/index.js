// 时间对象获取
function data () {
  const data = new Date()
  const yer = data.getFullYear()
  const ren = data.getMonth() + 1
  const fen = data.getDate()
  const rq = data.getDay()
  const shi = data.getHours()
  const tian = data.getMinutes()
  const miao = data.getSeconds()
  const hao = data.getMilliseconds()
  const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const ele = arr[rq]
  console.log(yer + '年' + ren + '月' + fen + '日' + ele + shi + '时' + tian + '分' + miao + '秒' + hao + '毫秒')
}

export default setInterval(() => {
  data()
}, 1000)
