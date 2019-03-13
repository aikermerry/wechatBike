//index.js
//流程控制
Page({
  data: {
    longitude:0,
    latitude:0,
    controls:[]

  },
  //首次加载页面调用
  onLoad: function () {
    var that = this
    wx.getLocation({
      success: function(res) {
        var lon = res.longitude
        var lat = res.latitude
        that.setData(
          {
            longitude: lon,
            latitude: lat

          })
      } 
    })
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth
        var windowheight = res.windowHeight
        that.setData(
          {
            //设置控件
            controls: [{
              id: 1,
              iconPath: '/image/th (2).jpg',
              position: {
                left: windowWidth / 2-50,
                top: windowheight - 60,
                width: 100,
                height: 50
              },
              clickable: true

            },
              {
                id: 2,
                iconPath: '/image/th3.jpg',
                position: {
                  left: windowWidth -40,
                  top: windowheight - 200,
                  width: 40,
                  height: 45
                },
                clickable: true

              },
              {
                id: 3,
                iconPath: '/image/th1.jpg',
                position: {
                  left: 5,
                  top: windowheight - 50,
                  width: 30,
                  height: 35
                },
                clickable: true

              },



            ]
          }
        )
      },
    })
    

 
      }

      
})

    