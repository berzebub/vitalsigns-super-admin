import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import VueAxios from "vue-axios";
import axios from "axios";

Vue.use(VueRouter)
Vue.use(VueAxios, axios);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
var firebaseConfig = {
  apiKey: "AIzaSyDa1vNAW34yTHB4ykdoNv_syjAJO8Ql_9w",
  authDomain: "vitalsigns-426ee.firebaseapp.com",
  databaseURL: "https://vitalsigns-426ee.firebaseio.com",
  projectId: "vitalsigns-426ee",
  storageBucket: "vitalsigns-426ee.appspot.com",
  messagingSenderId: "380026340708",
  appId: "1:380026340708:web:da67279ce36a86a2636671",
  measurementId: "G-CEJH31GYMM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();

Vue.mixin({
  data() {
    return {
      version: "1.0.002"
    }
  },
  methods: {
    async getDate() {
      let apiLink = "https://api.winner-english.com/data/api/gettime.php";
      const res = await axios.get(apiLink);
      return res.data[0];
    },
  },
})

export default function ( /* { store, ssrContext } */ ) {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
