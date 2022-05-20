// playlist/track/all?id=24381616&limit=10&offset=1
import service from "../axios";

//获取歌单详情
function playList(id) {
  return service({
    method: "GET",
    url: `playlist/detail?id=${id}`,
  });
}
//获取歌单所有歌曲
function musicList(id) {
  return service({
    method: "GET",
    url: `playlist/track/all?id=${id}&limit=20&offset=1`,
  });
}
//获取歌词
function lyric(id) {
  return service({
    method: "GET",
    url: `lyric?id=${id}`,
  });
}

export { playList, musicList, lyric };
