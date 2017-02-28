angular.module("controllers",["ngCordova",'ionic'])
  // 资讯页面的控制器
  .controller("zixunC",function ($scope,$http,$state) {
      // 列表的点击事件
      $scope.itemClick = function (index) {
        $state.go("tab.xxx",{
            name:$scope.dataArr[index]
        });
      };
    // 接口链接转码
      $scope.url=encodeURIComponent("http://c.m.163.com/nc/article/headline/T1348647853363/30-20.html?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=20&version=5.5.3&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore");
    // 请求数据
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl="+$scope.url,
        method:"GET"
      })
       .then(function (res) {
         $scope.dataArr = res.data.T1348647853363;
         // console.log($scope.dataArr)
       })
       .then(function (error) {
         if(error){
           console.log("error");
         }
       });

     // 下拉刷新
      $scope.doRefresh = function() {
          $http({
            url:"http://59.110.139.104:3000/wy?myUrl="+$scope.url,
            method:"GET"
          })
          .success(function(res) {
            $scope.dataArr = res.T1348647853363;
            $scope.$broadcast('scroll.refreshComplete');
          })
      };
    // 上拉加载
    $scope.loadMore = function() {
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl="+$scope.url,
        method:"GET"
      })
        .success(function(res) {
          for(var i = 0; i < res.T1348647853363.length;i++){
            $scope.dataArr.push(res.T1348647853363[i]);
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    };
  })
  //视频界面的控制器
  .controller("shipinC",function ($scope,$http,$state) {
      //把地址转码,防止在地址拼接时出现错误(?的问题)
      $scope.url = encodeURIComponent("http://dailyapi.ibaozou.com/api/v31/documents/videos/latest");
      // 请求数据
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl="+$scope.url,
        method:"GET"
      })
      //成功的回调函数 成功的话会返回地址里的数据
        .then(function (res) {
          $scope.video = res.data.data;
          console.log( $scope.video);
        })
        .then(function (error) {
          if(error){
            console.log(error);
          }
        });

    //    下拉刷新
    $scope.doRefresh = function() {
      $http({
        url: "http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method: "GET"
      })
      //成功的回调函数 成功的话会返回地址里的数据
        .then(function (res) {
          $scope.video = res.data.data;
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          if (error) {
            console.log(error);
          }
        });
    };
      // 上拉加载
      $scope.loadMore = function() {
        $http({
          url:"http://59.110.139.104:3000/wy?myUrl="+$scope.url,
          method:"GET"
        })
        //成功的回调函数 成功的话会返回地址里的数据
          .then(function (res) {
            for(var i = 0; i < res.data.data.length;i++){
              $scope.video.push(res.data.data[i]);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          })
          .then(function (error) {
            if(error){
              console.log(error);
            }
          });
      };
      //点击视频列表跳转到阅读图书的点击事件
      $scope.videoC = function (index) {
        //跳转到另一个界面,并且传过去一个数据
        $state.go("tab.chat-detail",{
          bookDataChuan:$scope.video[index]
        });
      }
    })
  //娱乐页面的控制器
  .controller("zhengzhouC",function ($scope,$http,$ionicSlideBoxDelegate,$state) {
    $scope.qiehuan = function (id) {
      $scope.daima = id;
      $scope.url = encodeURIComponent('http://mobapp.chinaso.com/1/category/main?version=version%3D2.67.5&cid='+$scope.daima+'&page=1&location=xxxxxx');
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"get"
      })
        .then(function (res) {
          $scope.mine.dataArr = res.data.slide;
          $scope.mine.data = res.data.list;

          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          if (error){
            console.log(error);
          }
        });
      switch ($scope.daima){
        case 1004:
          $scope.biaoti = "国际新闻";
          break;
        case 1006:
          $scope.biaoti = "健康新闻";
          break;
        case 1009:
          $scope.biaoti = "军事新闻";
          break;
        case 1010:
          $scope.biaoti = "财经新闻";
          break;
        case 1012:
          $scope.biaoti = "体育新闻";
          break;
        case 1014:
          $scope.biaoti = "科技新闻";
          break;
        case 1015:
          $scope.biaoti = "互联网";
          break;
        default:
          $scope.biaoti = "娱乐新闻";
      }
    };
    $scope.mine = {
      jinru:function (index) {
        $state.go("tab.xiangqingZ" , {
          url : $scope.mine.data[index].nid,
          name:$scope.mine.data[index].title
        })
      },
      lunboFn:function (index) {
        $state.go("tab.xiangqingZ" , {
          url : $scope.mine.dataArr[index].nid,
          name:$scope.mine.dataArr[index].title
        })
      }
    };
    if($scope.daima){
      $scope.url = encodeURIComponent('http://mobapp.chinaso.com/1/category/main?version=version%3D2.67.5&cid='+$scope.daima+'&page=1&location=xxxxxx');
      switch ($scope.daima){
        case 1004:
          $scope.biaoti = "国际新闻";
          break;
        case 1006:
          $scope.biaoti = "健康新闻";
          break;
        case 1009:
          $scope.biaoti = "军事新闻";
          break;
        case 1010:
          $scope.biaoti = "财经新闻";
          break;
        case 1012:
          $scope.biaoti = "体育新闻";
          break;
        case 1014:
          $scope.biaoti = "科技新闻";
          break;
        case 1015:
          $scope.biaoti = "互联网";
          break;
        default:
          $scope.biaoti = "娱乐新闻";
      }
    }else{
      $scope.daima = 1003;
      $scope.url = encodeURIComponent('http://mobapp.chinaso.com/1/category/main?version=version%3D2.67.5&cid='+$scope.daima+'&page=1&location=xxxxxx');
      $scope.biaoti = "娱乐新闻";
    }
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"get"
    })
      .then(function (res) {
        console.log(res.data);
        $scope.mine.dataArr = res.data.slide;
        $scope.mine.data = res.data.list;
      })
      .then(function (error) {
        if (error){
          console.log(error);
        }
      });
    //轮播图
    $scope.$watch("mine.dataArr" , function (newValue , oldValue) {
      if(newValue && newValue.length > 1){
        $ionicSlideBoxDelegate.update();
        $ionicSlideBoxDelegate.loop(true);
      }
    });
    // 刷新
    $scope.doRefresh = function() {
      console.log("开始刷新");
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"get"
      })
        .then(function (res) {
          $scope.mine.dataArr = res.data.slide;
          $scope.mine.data = res.data.list;
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          if (error){
            console.log(error);
          }
        });
    };
    // 加载
    $scope.loadMore = function() {
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"get"
      })
        .then(function (res) {
          for(var i = 0; i < res.data.list.length; i++){
            $scope.mine.data.push(res.data.list[i]);
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
        .then(function (error) {
          if (error){
            console.log(error);
          }
        });
    };
  })
  //精选页面的控制器
  .controller("jingxuanC",function ($scope,$http,$ionicSlideBoxDelegate,$state) {
    $scope.mine = {
      jinru:function (index) {
        $state.go("tab.jingxuanxiangqing" , {
          url : $scope.mine.data[index].nid,
          name:$scope.mine.data[index].title
        })
      },
      lunboFn:function (index) {
        $state.go("tab.jingxuanxiangqing" , {
          url : $scope.mine.dataArr[index].nid,
          name:$scope.mine.dataArr[index].title
        })
      }
    };
    // 请求数据
    // 1.转码 拼接,通过PHP请求,解决跨域问题
    // $scope.url1 = encodeURIComponent("http://iphone.myzaker.com/zaker/local_tab.php?_appid=");
    // $scope.url =$scope.url1 + 'AndroidPhone&_bsize=1080_1920&_city=%E9%83%91%E5%B7%9E&_dev=62&_lat=34.824994&_lbs_city=%E9%83%91%E5%B7%9E&_lbs_province=%E6%B2%B3%E5%8D%97%E7%9C%81&_lng=113.571011&_mac=38%3Abc%3A1a%3A1b%3A5c%3Aa1&_mcode=0B4639DC&_net=wifi&_nudid=97d969a0d858f04d&_os=5.1_MX4&_os_name=MX4&_province=%E6%B2%B3%E5%8D%97%E7%9C%81&_udid=865479022880017&_v=7.4.1&_version=7.4&city=zhengzhou&clean_local_cache=Y';
    $scope.url = encodeURIComponent('http://mobapp.chinaso.com/1/category/main?version=version%3D2.67.5&cid=1001&page=1&location=xxxxxx');


    // $scope.url = encodeURIComponent("http://iphone.myzaker.com/zaker/local_tab.php?_appid=AndroidPhone&_bsize=1080_1920&_city=%E9%83%91%E5%B7%9E&_dev=62&_lat=34.824994&_lbs_city=%E9%83%91%E5%B7%9E&_lbs_province=%E6%B2%B3%E5%8D%97%E7%9C%81&_lng=113.571011&_mac=38%3Abc%3A1a%3A1b%3A5c%3Aa1&_mcode=0B4639DC&_net=wifi&_nudid=97d969a0d858f04d&_os=5.1_MX4&_os_name=MX4&_province=%E6%B2%B3%E5%8D%97%E7%9C%81&_udid=865479022880017&_v=7.4.1&_version=7.4&city=zhengzhou&clean_local_cache=Y");
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"get"
    })
      .then(function (res) {
        // console.log(res.data);
        $scope.mine.dataArr = res.data.slide;
        $scope.mine.data = res.data.list;
      })
      .then(function (error) {
        if (error){
          console.log(error);
        }
      });
    $scope.$watch("mine.dataArr" , function (newValue , oldValue) {
      if(newValue && newValue.length > 1){
        $ionicSlideBoxDelegate.update();
        $ionicSlideBoxDelegate.loop(true);
      }
    });
    // 刷新
    $scope.doRefresh = function() {
      console.log("开始刷新");
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"get"
      })
        .then(function (res) {
          $scope.mine.dataArr = res.data.slide;
          $scope.mine.data = res.data.list;
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          if (error){
            console.log(error);
          }
        });
    };
    // 加载
    $scope.loadMore = function() {
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method:"get"
      })
        .then(function (res) {
          for(var i = 0; i < res.data.list.length; i++){
            $scope.mine.data.push(res.data.list[i]);
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
        .then(function (error) {
          if (error){
            console.log(error);
          }
        });
    };
  })
  // 我的页面的控制器
  .controller("wodeC",function ($scope,$http,$ionicPopup) {
    $scope.user = {
      name:"未登录",
      url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487846468106&di=67bcd69abfc576f7b080696c5c4bfbd0&imgtype=0&src=http%3A%2F%2Fwww.asiafinance.cn%2Fr%2Fcms%2Fwww%2Faf%2Fimg%2Fuserimg.png"
    };
    // 登录QQ
    $scope.QQloginFn = function () {
      QQSDK.checkClientInstalled(function () {
        QQSDK.ssoLogin(function (res) {
          $scope.url = encodeURIComponent('https://graph.qq.com/user/get_user_info?access_token=' + res.access_token + '&oauth_consumer_key=1105995744&openid=' + res.userid);
          $http({
            url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
            method:"get"
          })
            .then(function (res) {
              $scope.user.name = res.data.nickname;
              $scope.user.url = res.data.figureurl_2;
            })
            .then(function (error) {
              if (error){
                var alertPopup = $ionicPopup.alert({
                  title: '错误',
                  template: '登录失败'
                });
              }
            });
        } , function (error) {
          var alertPopup = $ionicPopup.alert({
            title: '错误',
            template: '出错了,请再试一次'
          });
        });
      },function () {
        var alertPopup = $ionicPopup.alert({
          title: '错误',
          template: 'qq客户端未安装'
        });
      });
    };
    // 退出QQ
    $scope.QQlogoutFn = function () {
      QQSDK.logout(function () {
        $scope.user.name="未登录";
        $scope.user.url="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487846468106&di=67bcd69abfc576f7b080696c5c4bfbd0&imgtype=0&src=http%3A%2F%2Fwww.asiafinance.cn%2Fr%2Fcms%2Fwww%2Faf%2Fimg%2Fuserimg.png";
      }, function (failReason) {
        var alertPopup = $ionicPopup.alert({
          title: '错误',
          template: '退出失败'
        });
      });
    };
    //关于
    $scope.guanyu = function () {
        var alertPopup = $ionicPopup.alert({
          title: '关于',
          template: '这是一款没有广告的新闻类app,希望大家喜欢!'
        });
    };
    //版本
    $scope.banben = function () {
      var alertPopup = $ionicPopup.alert({
        title: '版本',
        template: '当前版本3.0 , 已是最新版'
      });
    };
  })
  // 咨询详情页面的控制器
  .controller("xiangqingC",function ($scope,$stateParams,$http,$state) {
      $scope.goBackFn = function () {
        // window.history.go(-1);
        $state.go("tab.zixun");
      };

      $scope.data = $stateParams.name;
      $scope.title = $stateParams.name.recSource;
      $scope.url = 'http://c.m.163.com/nc/article/' + $stateParams.name.docid + '/full.html';
      $http({
          url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
          method:"GET"
      })
        .then(function (res) {
            $scope.aa = res.data;

        })
        .then(function (error) {
          if (error){
            console.log(error);
          }
        });
  })
  //娱乐界面详情页的控制器
  .controller('xiangqingZ', function($scope , $stateParams , $http , $state , $ionicActionSheet) {

    $scope.goBackFn = function () {
      // window.history.go(-1);
      $state.go("tab.zhengzhou");
    };
    $scope.mine={};
    $scope.url = encodeURIComponent('http://mobapp.chinaso.com/1/category/newsDetailHtml?version=version%3D2.67.5&cid=1003&tid=&devid=ffffffff-9881-95f1-6b02-1d364643e939&nid='+$stateParams.url+'&extra=norecmd');
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"get"
    })
      .then(function (res) {
        console.log(res.data);
        $scope.mine.xxx = res.data.mname;
        $scope.mine.data = res.data;
      })
      .then(function (error) {
        if (error){
          console.log(error);
        }
      });
    // 分享
    $scope.fenxiang = function () {
        // 显示操作表
        $ionicActionSheet.show({
          buttons: [
            { text: '<b>QQ</b>' },
            { text:'<b>QQ空间</b>'},
            { text:'<b>收藏</b>'},
          ],
          titleText: '分享此内容到',
          cancelText: '取消',
          buttonClicked: function(index) {
            console.log(index);
            if(index == 0){
              var args = {};
              args.scene = QQSDK.Scene.QQ;
              args.url = $scope.mine.data.url;
              args.title = $scope.mine.data.title;
              args.description = $scope.mine.data.summary;
              QQSDK.shareNews(function () {

              }, function (failReason) {

              },args);
            }
            if(index==1){
              var args = {};
              args.scene = QQSDK.Scene.QQZone;
              args.url = $scope.mine.data.url;
              args.title = $scope.mine.data.title;
              args.description = $scope.mine.data.summary;
              args.image = 'http://1.yuanxiang.applinzi.com/%E5%B0%8F%E8%AE%AF%E6%96%B0%E9%97%BB.jpg';
              QQSDK.shareNews(function () {

              }, function (failReason) {

              },args);
            }
            if(index == 2){
              var args = {};
              args.scene = QQSDK.Scene.Favorite;
              args.url = $scope.mine.data.url;
              args.title = $scope.mine.data.title;
              args.description = $scope.mine.data.summary;
              args.image = 'http://1.yuanxiang.applinzi.com/%E5%B0%8F%E8%AE%AF%E6%96%B0%E9%97%BB.jpg';
              QQSDK.shareNews(function () {

              }, function (failReason) {

              },args);
            }
            return true;
          }
        })
    };
  })
  //精选详情页的控制器
  .controller('jingxuanxiangqingC', function($scope , $stateParams , $http , $state , $ionicActionSheet) {
    $scope.goBackFn = function () {
      // window.history.go(-1);
      $state.go("tab.jingxuan");
    };
    $scope.mine={};
    $scope.url = encodeURIComponent('http://mobapp.chinaso.com/1/category/newsDetailHtml?version=version%3D2.67.5&cid=1001&tid=&devid=ffffffff-9881-95f1-6b02-1d364643e939&nid='+$stateParams.url+'&extra=norecmd');
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"get"
    })
      .then(function (res) {
        console.log(res.data);
        $scope.mine.xxx = res.data.mname;
        $scope.mine.data = res.data;
      })
      .then(function (error) {
        if (error){
          console.log(error);
        }
      });
    // 分享
    $scope.fenxiang = function () {

      // 显示操作表
      $ionicActionSheet.show({
        buttons: [
          { text: '<b>QQ</b>' },
          { text:'<b>QQ空间</b>'},
          { text:'<b>收藏</b>'},
        ],
        titleText: '分享此内容到',
        cancelText: '取消',
        buttonClicked: function(index) {
          console.log(index);
          if(index == 0){
            var args = {};
            args.scene = QQSDK.Scene.QQ;
            args.url = $scope.mine.data.url;
            args.title = $scope.mine.data.title;
            args.description = $scope.mine.data.summary;
            QQSDK.shareNews(function () {

            }, function (failReason) {

            },args);
          }
          if(index==1){
            var args = {};
            args.scene = QQSDK.Scene.QQZone;
            args.url = $scope.mine.data.url;
            args.title = $scope.mine.data.title;
            args.description = $scope.mine.data.summary;
            args.image = 'http://1.yuanxiang.applinzi.com/%E5%B0%8F%E8%AE%AF%E6%96%B0%E9%97%BB.jpg';
            QQSDK.shareNews(function () {

            }, function (failReason) {

            },args);
          }
          if(index == 2){
            var args = {};
            args.scene = QQSDK.Scene.Favorite;
            args.url = $scope.mine.data.url;
            args.title = $scope.mine.data.title;
            args.description = $scope.mine.data.summary;
            args.image = 'http://1.yuanxiang.applinzi.com/%E5%B0%8F%E8%AE%AF%E6%96%B0%E9%97%BB.jpg';
            QQSDK.shareNews(function () {

            }, function (failReason) {

            },args);
          }
          return true;
        }
      })
    };
  })
  // 视频播放页的控制器
  .controller('chat-detailC',function ($scope , $stateParams , $state) {
    $scope.data = $stateParams.bookDataChuan;
    // 视频地址data.file_url
    $scope.height = window.innerHeight;
    document.getElementById("myIframe").src = $scope.data.file_url;
    $scope.goBackFn = function () {
      // window.history.go(-1);
      $state.go("tab.shipin");
    };
  });

