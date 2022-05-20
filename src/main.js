import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入plugins中vant插件
import getVant from "./plugins";
const app = createApp(App);
//调用plugins中函数
getVant(app);
app.use(store).use(router).mount("#app");
