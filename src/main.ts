import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// vant 懒加载
import { Lazyload } from "vant";

// 导入 pinia
import pinia from "./stores";

// vite-plugin-svg-icons
import "virtual:svg-icons-register";

import 'vant/lib/index.css';
import "./styles/main.scss";

const app = createApp(App);

app.use(Lazyload);
app.use(pinia);
app.use(router);

app.mount("#app");
