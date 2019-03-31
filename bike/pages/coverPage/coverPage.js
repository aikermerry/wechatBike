// pages/coverPage/coverPage.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
   

  },
  //获取用户信息
  onGotUserInfo(e) {
   
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    if (e.detail.errMsg == 'getUserInfo:ok') {

      getApp().globalData.gender = e.detail.userInfo.gender,
        getApp().globalData.nickName = e.detail.userInfo.nickName
      getApp().globalData.city = e.detail.userInfo.city


      console.log(e.detail.userInfo.gender)

    
      wx.navigateTo({
        url: '../index/index',
        test:"成功获取到用户信息"
      })
    }



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