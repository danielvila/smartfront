import { createApp } from "vue";
import App from "./App.vue";
import axios from 'axios';
import vueAxios from 'vue-axios';
import router from "./router";
import './assets/tailwind.css'

axios.defaults.baseURL = 'http://smartbussines.test:90/api/';
axios.defaults.responseType="json";
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Autorization'] = 'Bearer kfYrBLzREdIMaMU8O9GxXBquaqYUwryBUqMXPqEU';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const app = createApp(App);

app.use(router);

app.use(vueAxios, axios);

app.mount("#app");
