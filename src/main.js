import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/globe.css";

import "./utils/flexible";
import "./utils/china";
import utils from "./utils/common";
const app = createApp(App);
app.use(store);
app.use(router);
app.config.globalProperties.$utils = utils;
app.mount("#app");
