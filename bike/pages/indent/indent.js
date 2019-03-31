// pages/indent/indent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  

  reg: function (e) {

    
    var that = this;
    console.log( "dskjdks"+getApp().globalData.city);
    var rztype = that.data.rztype;
    console.log(e.detail.value);
    var fdata = e.detail.value;
    var gender = getApp().globalData.gender;
    if (gender==1)
    {
      var genders = "男"

    }else{
      var genders = "女"
    }
    console.log(genders);

    wx.request({
      url: "http://localhost:8080/user/save/charge/InfoSave",
      method: 'post',
      data: {
        name: fdata.linkman,
        idc_id: fdata.idc_id,
        phone: fdata.tel,
        nickname: getApp().globalData.nickName,
        city: getApp().globalData.city,
        gender: genders,
      },
      success: function (res) {
        
        if (res.data) {
          wx.setStorageSync('status', 3);//将状态存入内存中
          wx.redirectTo({
            url:"../index/index",
            test: "认证成功",
      
          })
        }
        else{
     wx.showToast({
       title: '认证失败',
     })
        }
      },
      error: function (e) {
      console.log(e)
      },
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