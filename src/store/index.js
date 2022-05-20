import { getLoginData } from "@/request/api/home";
import { lyric } from "@/request/api/item";
import { createStore } from "vuex";

export default createStore({
  state: {
    playList: [
      {
        al: {
          //播放列表
          id: 78570420,
          name: "晚安",
          pic: 109951164007377170,
          picUrl:
            "https://p2.music.126.net/8N1fsMRm2L5HyZccc6I3ew==/109951164007377169.jpg",
          pic_str: "109951164007377169",
        },
        ar: [
          {
            name: "颜人中",
          },
        ],
        name: "晚安",
        id: 1359356908,
      },
    ],
    playListIndex: 0, //默认下标为0
    //播放暂停按钮是否显示
    isBtnShow: true,
    isMusicDetailShow: false, //歌曲播放页

    currentTime: 0, //音乐播放的当前时间
    lyrics: "", //歌词
    duration: 0, //歌曲总时长
    isLogin: false, //是否登录
    isBottomShow: true, //底部两个组件
    isFooterMusicShow: true, //底部播放音乐组件
    isBottomNavShow: true, //底部导航组件
    loginCode: 0,
    //登录的token
    token: "",
    user: {}, //用户信息
  },
  getters: {},
  mutations: {
    changeBtnShow(state, value) {
      state.isBtnShow = value;
    },

    addPlayList(state, value) {
      state.playList = value;
    },

    changePlayListIndex(state, value) {
      state.playListIndex = value;
    },
    changeMusicDetailShow(state, value) {
      state.isMusicDetailShow = value;
    },
    //底部两个组件
    changeBottomShow(state, value) {
      state.isBottomShow = value;
    },
    //底部导航组件
    changeBottomNavShow(state, value) {
      state.isBottomNavShow = value;
    },
    changeCurrentTime(state, value) {
      // console.log(value);
      state.currentTime = value;
    },
    getLyric(state, value) {
      state.lyrics = value.data.lrc.lyric;
    },
    //获取歌曲总时长
    getMusicTime(state, value) {
      // console.log(value);
      state.duration = value;
    },
    //在搜索列表点击播放歌曲
    updatePlayList(state, value) {
      state.playList.push(value);
    },

    //用户登录
    updateLoginCode(state, value) {
      state.loginCode = value.data.code;
    },
    updateisLogin(state, value) {
      state.isLogin = true;
    },
    updateToken(state, value) {
      state.token = value;
      localStorage.setItem("token", value);
    },
    //更新用户信息
    updateUserDetail(state, value) {
      state.user = value;
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
  },
  actions: {
    //获取歌词
    getLyric: async function (context, value) {
      let l = await lyric(value);
      // console.log(l);
      context.commit("getLyric", l);
    },
    getLogin: async function (context, value) {
      let loginRes = await getLoginData(value);
      // console.log(LoginRes.data.code);
      context.commit("updateLoginCode", loginRes);
      return loginRes;
    },
  },
  modules: {},
});
