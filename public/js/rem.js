function reSize() {
  //获取设备宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  if (deviceWidth >= 750) {
    deviceWidth = 750;
  }
  if (deviceWidth < 320) {
    deviceWidth = 320;
  }
  //deviceWidth=750,则fontsize=100px，375=>50px
  document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";

  //设置字体的大小,0.3rem,即屏幕宽度为375时，屏幕内字体大小为15px
  document.querySelector("body").style.fontSize = 0.3 + "rem";
}
//c初始化时调用一次
reSize();
window.onresize = function () {
  //窗口尺寸发生变化时，调用
  reSize();
};
