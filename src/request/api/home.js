import service from "../axios";

//获取轮播图数据
function getBanner() {
  return service({
    method: "GET",
    url: "banner?type=2",
  });
}
// export const getBanner = () => {
//   return service({
//     method: "GET",
//     url: "banner?type=2",
//   });
// };
// export const getMusicList = () => {
//   return service({
//     method: "GET",
//     url: "personalized?limit=10",
//   });
// };
// 歌单;
function getMusicList() {
  return service({
    method: "GET",
    url: "personalized?limit=20",
  });
}

//搜索
function searchMusic(value) {
  return service({
    method: "GET",
    url: `search?keywords=${value}`,
  });
}

//获取歌手详情artist/detail?id=11972054
function getSinger(id) {
  return service({
    method: "GET",
    url: `artist/detail?id=${id}`,
  });
}
//获取登录信息
function getLoginData(data) {
  return service({
    method: "GET",
    url: `login/cellphone?phone=${data.phone}&password=${data.password}`,
  });
}
//获取用户详情user/detail?uid=32953014
function getUserDetail(id) {
  return service({
    method: "GET",
    url: `user/detail?uid=${id}`,
  });
}

export {
  getBanner,
  getMusicList,
  searchMusic,
  getSinger,
  getLoginData,
  getUserDetail,
};
