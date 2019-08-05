window.onload = function () {
  // 模拟数据
  var data = [{
    name: ['第一页数据', '第一页数据', '第一页数据', '第一页数据', '第一页数据', '第一页数据', '第一页数据', '第一页数据', '第一页数据', '第一页数据', '第一页数据', '第一页数据', '第一页数据', '第一页数据', '第一页数据', '第一页数据', '第一页数据'],
  }, {
    name: ['第二页数据', '第二页数据', '第二页数据', '第二页数据', '第二页数据', '第二页数据', '第二页数据',],
  }]
  // 第几页
  var page = 0
  // 点击坐标
  var starttouch
  // 弹性上拉开关
  var touchswitch = false
  // 加载数据方法
  function loadmsg() {
    // 判断数据是否正常，正常则进行正常操作，如果这里介入了接口则需要判断获取的接口数据是否为空，不为空则执行，为空则不知而行也就是 讲判断条件改为！=''
    if (data[page] != undefined) {
      for (let i in data[page].name) {
        var div = "<div class=list>" + data[page].name[i] + "</div>"
        $('.listmsg').append(div)
      }
      page++
    }
  }
  loadmsg()
  window.onscroll = (res) => {
    let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 1
    console.log(bottomOfWindow)
    if (bottomOfWindow) {
      // 到了打开开关可以弹性上拉
      touchswitch = true
    } else {
      // 关闭弹性上拉放之从顶部上拉的时候会出发弹性上拉
      touchswitch = false
    }
  }
  // 获取触碰的第一个点
  $('.listmsg').on('touchstart', function (e) {
    var _touch = e.originalEvent.targetTouches[0];
    starttouch = _touch.pageX;
  });
  // 获取滑动时候的坐标
  $('.listmsg').on('touchmove', function (e) {
    var _touch = e.originalEvent.targetTouches[0];
    var _x = _touch.pageX;
    // 滑动时的坐标减去第一个点的坐标得出滑动的距离
    var num = Math.abs(_x - starttouch) * 2
    // 如果可以弹性上拉
    if (touchswitch) {
      // 加载一次数据完毕后关闭开关防止一下子添加多页数据
      $('.load').text('松开加载数据')
      // 列表容器上拉最大限度
      if (num <= 20) {
        $('.listmsg').css('transform', 'translate(0%,-' + num + '%)')
      }
    }
  });
  // 手指抬起结束上拉回复状态
  $('.listmsg').on('touchend', function (e) {
    $('.load').text('加载完毕')
    $('.listmsg').css('transform', 'translate(0%,0%)')
    touchswitch = false
    setTimeout(function () {
      loadmsg()
      $('.load').text('上拉加载')
    }, 500);
  })
}