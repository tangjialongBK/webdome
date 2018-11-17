  let Data = require('../../data/index.js')
  // pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas:[],
    currentNum:0,
    total:0,
    arr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let datas = Data.dataPost.goods
    datas.forEach(function(item,index){
      item.foods.forEach(function(key){
        key.num = 0;
      })
    })
    this.setData({
      datas:datas
    })
    console.log(datas)
  },
  currentVal:function(e){
    this.setData({
      currentNum: e.target.dataset.index
    })
  },
  reduceF:function(e){
    this.sumFn(e, false)
  },
  addF:function(e){
   // console.log(e.target.dataset.index)
    this.sumFn(e,true)
  },
  sumFn:function(e,isboolean){
    let childNum = e.target.dataset.index;
    let fatherNum = this.data.currentNum;
    let datalist = this.data.datas
    let item = datalist[fatherNum].foods[childNum]
    let price = item.price * 1;
    let total = this.data.total
    let num = item.num;
    let arr = []
    if (isboolean) {
      num++
      total += price
    } else {
      if (num <= 0) return
      num--
      total -= price
    }
    datalist[fatherNum].foods[childNum].num = num
    datalist.forEach(function (item) {
      item.foods.forEach(function (item) {
        if (item.num > 0) {
          arr.push(item)
        }
      })
    })
    this.setData({
      datas: datalist,
      total: total,
      arr: arr
    })
  },
  console:function(){
    console.log(this.data.arr)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})