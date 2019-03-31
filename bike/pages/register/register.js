// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabs: ["绑定", "充值押金", "实名认证","完成"],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      countryCodes: ["+86", "+80", "+84", "+87"],
      countryCodeIndex: 2,
      phone:0,
      disabled:false,
      iscode: null,
      code:null,
      codename:"获取验证码",
      color: "#fff",
      codeCheck:false
    
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //手机号接收
  inputPhone : function(e){
    var that = this
    if (e.detail.value.length>10){
      console.log(e.detail.value)
      that.setData({
        phone:e.detail.value
      })
    }
  },
  //输入验证码获取
  inputcode: function (e) {
    var that = this
    if (e.detail.value.length>=4){
      console.log(e.detail.value),
      that.setData({
        code:e.detail.value
      })
    }
    
  },


  getCode: function () {
    var a = this.data.phone;
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      console.log(this.data.countryCodes[this.data.countryCodeIndex])
      wx.request({
        url: "http://localhost:8080/user/genCode",
        data: {
          contrycode:this.data.countryCodes[this.data.countryCodeIndex],
          phone:this.data.phone
        },
        
        success(res) {
          wx.showToast({
            title: '发送成功'
          }),
          console.log(res.data)
          _this.setData({
            iscode: res.data,
            disabled: true,
            })
        }

          })
          var num = 61;
          var timer = setInterval(function () {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              _this.setData({
                codename: '重新发送',
                disabled: false
              })

            } else {
              _this.setData({
                codename: num + "s"
              })
            }
          }, 1000)
        }
  },
      

    

    


//提交表单
  submit: function () {
    var that = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.code == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (this.data.code != this.data.iscode) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      wx.request({
        url: "http://localhost:8080/user/check",
        data: {
        phone: this.data.phone
        },

        success(res) {
          console.log(res.data==that.data.code)
          if (res.data == that.data.code){
            console.log("验证码完全正确时")
            
            wx.setStorageSync('phone', that.data.phone);
            //注册成功，将用户信息保存到数据库
            wx.request({
              url: 'http://localhost:8080/user/save',
              data:{
                phone:that.data.phone,
                date:new Date()
              },
              method :"POST",
              success(res){
                if(res.data){
                  wx.setStorageSync('status', 1);//将状态存入内存中
                  wx.redirectTo({
                    url: '../pay/payRMB',
                    test: "注册成功",

                  })
                

                }
                else{
                  wx.showToast({
                    title: '注册失败，请再次尝试',
                    icon: 'none',
                    duration: 1000
                  })

                }
              }

            })


          }else {
            wx.showToast({
              title: '验证超时',
              icon: 'none',
              duration: 1000
            })
            return false;
          }
        }
        });
     

    }
    },
    
  
    

//点击获取验证码
  genVerifycode: function(){
    this.getCode();
    var that = this
    that.setData({
      disabled: false,
      color: '#ccc',
      
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var sliderWidth = 96; 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });


  },


  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
//区号函数  +87
  bindCountryCodeChange: function (e) {

    this.setData({
      countryCodeIndex: e.detail.value
    })
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