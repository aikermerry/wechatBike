//index.js
//流程控制
//导包
var myutils = require("../../utils/util.js")
Page({
    data: {
        longitude: 0,
        latitude: 0,
        controls: [],
        markers: [],
        ids:0,
    },
        //首次加载页面调用
    onLoad: function () {
        var that = this
        wx.getLocation({
            success: function (res) {
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
    success: function (res) {
        var windowWidth = res.windowWidth
        var windowheight = res.windowHeight
        that.setData(
            {
                //设置控件
                controls: [{
                    id: 1,
                    iconPath: '/image/th (2).jpg',
                    position: {
                        left: windowWidth / 2 - 50,
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
                            left: windowWidth - 40,
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
                    {
                        id: 4,
                        iconPath: '/image/1.png',
                        position: {
                            left: windowWidth / 2 - 15,
                            top: windowheight / 2 - 35,
                            width: 30,
                            height: 35
                        },
                        clickable: true

                    },
                    {
                        id: 5,
                        iconPath: '/image/2.png',
                        position: {
                            left: 0,
                            top: 0,
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


},


//点击事件
    controltap: function (e) {
        var that = this;
        console.log(e.controlId)
        var controlID = e.controlId;
        //判断点击事
        switch (controlID) {
            case 3: {
                this.mapCtx.moveToLocation();
                break
            };
            //扫码按钮
            case 1:{
            var status = myutils.get("status");
              console.log(status)
              //判断状态跳转到某个页面 函数为wx.navigateTo
              if (status == 0){
                wx.navigateTo({
                  url: '../register/register',
                })
              }
              else if(status==1){
                wx.navigateTo({
                  url: '../pay/payRMB',
                })
              }
              else if (status == 2) {
                wx.navigateTo({
                  url: '../indent/indent',
                })
              }
              else if (status == 3) {
               console.log("注册完毕了的。请放心使用开锁吧")
              }

              break


            };
            case 5: {
                var biks = that.data.markers;

                this.mapCtx.getCenterLocation({
                    success: function (res) {
                        biks.push({
                            iconPath: '/image/3.png',
                            latitude: res.latitude,
                            longitude: res.longitude,
                            width: 40,
                            height: 40,
                        }),

                        that.setData({
                            markers: biks

                        }),
                

                    wx.request({
                          url: 'http://localhost:8080/bikes',
                      data:{
                        longitude:res.longitude,
                        latitude:res.latitude,
                        status:1,
                      },
                      
                      method :"POST",
                      success: function(res){
                        console.log(res.data)
                      }
                        })
                         console.log(that.data.ids),
                      that.setData({
                        ids:that.data.ids +1,
                        
                      })
                    }
                })
          
            }


        }


    },

    //获取移动后的地图信息
    regionchange: function (e) {
        var that = this;

        if (e.type == "end") {
            this.mapCtx.getCenterLocation({
                success: function (res) {
            
                    console.log("经度：",res.longitude),
                     console.log("纬度：",res.latitude),
                    findBike(res.latitude, res.longitude, that)

                  
                },


            })


        }

    },
//渲染完成
    onReady: function () {

        this.mapCtx = wx.createMapContext('myMap')

    }


}
);

function findBike( latitude, longitude,that){
  
  wx.request({
    url: 'http://localhost:8080/bikes/getBikes',
    data: {
      longitude:longitude,
      latitude: latitude,
    },
    
    method: "GET",
    success: function (res) {
      console.log(res.data)
      var bikes = res.data.map((bike) =>{
        return {
          longitude:bike.longitude,
          latitude:bike.latitude,
          id:bike.id,
          iconPath: '/image/3.png',
          width: 40,
          height: 40,
        }
      })
      that.setData({
        markers:bikes
      })

    }
  })


}
    