import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { richEditor } from "../..";

richEditor("https://cdn.jsdelivr.net/npm/tinymce/tinymce.min.js").then(
  (res) => {
    tinymce.init({
      selector: "#editor",
      promotion: false,
    });
  }
);

createApp(App).mount("#app");
