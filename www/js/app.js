var app = angular.module("starter",['ionic','controllers']);

app.config(function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {


  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');


// 设置小讯的默认显示界面
  $urlRouterProvider.otherwise("/tab/zhengzhou");

//  设置小讯其他界面的路由
  $stateProvider.state("tab",{
    url:"/tab",
    abstract:true,
    templateUrl:"templates/tabs.html"
  });

  $stateProvider.state("tab.zixun",{
    url:"/zixun",
    views:{
      "zixun":{
        templateUrl:"templates/zixun.html",
        controller:"zixunC"
      }
    }
  });
  $stateProvider.state("tab.shipin",{
    url:"/shipin",
    views:{
      "shipin":{
        templateUrl:"templates/shipin.html",
        controller:"shipinC"
      }
    }
  });
  $stateProvider.state("tab.zhengzhou",{
    url:"/zhengzhou",
    views:{
      "zhengzhou":{
        templateUrl:"templates/zhengzhou.html",
        controller:"zhengzhouC"
      }
    }
  });
  $stateProvider.state("tab.jingxuan",{
    url:"/jingxuan",
    views:{
      "jingxuan":{
        templateUrl:"templates/jingxuan.html",
        controller:"jingxuanC"
      }
    }
  });
  $stateProvider.state("tab.wode",{
    url:"/wode",
    views:{
      "wode":{
        templateUrl:"templates/wode.html",
        controller:"wodeC"
      }
    }
  });
  //配置详情页面的路由
  $stateProvider.state("tab.xxx" , {
    url:"/xiangqing",
    views:{
      "zixun":{
        templateUrl:"templates/xiangqing.html",
        controller:"xiangqingC"
      }
    },
    params:{
      name:""
    }
  });
  $stateProvider.state('tab.xiangqingZ', {
    url: '/xiangqingZ',
    views: {
      'zhengzhou': {
        templateUrl: 'templates/xiangqingZ.html',
        controller: 'xiangqingZ'
      }
    },
    params:{
      url:"",
      name:""
    }
  });
  $stateProvider.state('tab.chat-detail', {
    url: '/chat-detail',
    views: {
      'shipin': {
        templateUrl: 'templates/chat-detail.html',
        controller: 'chat-detailC'
      }
    },
    params:{
      bookDataChuan:""
    }
  });
  $stateProvider.state('tab.jingxuanxiangqing', {
    url: '/jingxuanxiangqing',
    views: {
      'jingxuan': {
        templateUrl: 'templates/jingxuanxiangqing.html',
        controller: 'jingxuanxiangqingC'
      }
    },
    params:{
      url:"",
      name:""
    }
  });
});
