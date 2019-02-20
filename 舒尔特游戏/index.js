$(function () {
  $('.startB').click(function () {
    create();
    $('.start').hide();
    $('.m-form').hide();
  });
  $('.agin').click(function () {
    create();
  });

  function create() {
    pause();

    //拿元素
    var sec_tag = document.getElementById('second');
    var minute_tag = document.getElementById('minute');
    var hour_tag = document.getElementById('hour');
    //设置元素值
    sec_tag.innerHTML = '00';
    minute_tag.innerText = '00';
    hour_tag.innerText = '00';

    var clickindex = 1;
    var $ = function (selector) {
      return document.getElementById(selector);
    };
    var $$ = function (selector, value) {
      return +$(selector).value || value;
    };

    $('shuerte').innerHTML = '';
    var count = $$('count', 4);
    var size = $$('size', 5);
    var table_size = $$('table_size', 270);
    var margin_top = $$('margin_top', 60);
    var margin_left = $$('margin_left', 130);
    var font_size = $$('font_size', 21);
    var col = $$('col', 2);
    var matrix = [];
    var sum = size * size;
    for (var i = 1; i <= sum; i++) {
      matrix.push(i);
    }
    for (var i = 0; i < count; i++) {
      var arr = matrix.concat([]);
      var table = document.createElement('table');
      table.style.width = table_size + 'px';
      table.style.height = table_size + 'px';
      // table.style.marginTop = margin_top + "px";
      // table.style.marginLeft = margin_left + "px";
      table.style.position = 'relative';
      table.style.top = '0';
      table.style.left = '50%';
      table.style.transform = 'translate(-50%,0%)';
      table.style.fontSize = font_size + 'px';
      table.onclick = function (el) {
        console.log(el);
        start();
        // $(el).css('background', '#4fb5f7')
        if (clickindex < sum) {
          if (clickindex != el.path[0].innerText) {
            console.log('选择错误');
          } else {
            el.path[0].style.background = '#4fb5f7';
            clickindex++;
          }
        } else {
          el.path[0].style.background = '#4fb5f7';
          pause();
          setTimeout(function () {
            alert('恭喜您通关');
          }, 300);
        }
      };

      for (var r = 0; r < size; r++) {
        var tr = document.createElement('tr');
        for (var d = 0; d < size; d++) {
          var td = document.createElement('td');
          // td.style.width = (table_size / size) + "px";
          // td.style.height = (table_size / size) + "px";
          var rand = Math.floor(Math.random() * 100);
          var index = rand % arr.length;
          var num = arr[index];
          arr.splice(index, 1);
          td.innerText = num.toString();
          tr.appendChild(td);
        }

        table.appendChild(tr);
      }
      if (i % col == 0) {
        table.style.clear = 'both';
      }
      document.getElementById('shuerte').appendChild(table);
    }
  }

  // 全局保存我们的计时器id， sec_count 用来计时，my_start 用来控制计时器运行状态
  var timer_id = -1;
  var sec_count = 0;
  var my_start = 0;

  function start() {
    //如果开始计时了 返回 什么也不做了
    if (my_start == 1) {
      return;
    }
    //	var sec_count = 0;
    //如果没开始 就修改计时器的运行状态
    my_start = 1;
    //创建计时器 计时
    timer_id = setInterval(function () {
      //计数器加加
      sec_count++;
      //计算时分秒
      var sec = sec_count % 60;
      var minute = Math.floor((sec_count % 60) / 60);
      var hour = Math.floor(sec_count / 3600);
      //拿元素
      var sec_tag = document.getElementById('second');
      var minute_tag = document.getElementById('minute');
      var hour_tag = document.getElementById('hour');
      //设置元素值
      sec_tag.innerHTML = sec;
      minute_tag.innerText = minute;
      hour_tag.innerText = hour;
    }, 1000);
  }

  function pause() {
    //清空计时器
    clearInterval(timer_id);
    //重置我们的函数的运行状态
    my_start = 0;
  }

  // create();
});