// pages/pay/payRMB.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    overage: 0,
    ticket: 0
  },
  // 页面加载
 


  charge :function(){
    wx.showModal({
      title: '提示',
      content: '确认充值押金吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showLoading({
            title: '押金充值中',
            mask: true
          })

          setTimeout(function () {
            wx.hideLoading()
          }, 2000)

          var myutils = require("../../utils/util.js")
          wx.request({
            url: 'http://localhost:8080/user/save/charge',
            data:{
              phone:myutils.get("phone"),
              despit:99

            },
       
            method: "POST",
            success: function (res) {
              console.log(res.data)
              wx.hideLoading()
              if (res.data) {
                wx.setStorageSync('status', 2);//将状态存入内存中
                wx.redirectTo({
                  url: '../indent/indent',
                  test: "支付成功",
                })
              }


            }

          })
          
      
        } else if (res.cancel) {
          console.log('用户点击取消')
          console.log( new Date())
        }
      }
    })

 


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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