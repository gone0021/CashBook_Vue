/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

Vue.component('modal-nml', require('./components/modalNml.vue').default);
Vue.component('modal-acct', require('./components/modalAcct.vue').default);

Vue.component('m-acct-debit', require('./components/mAcctDebit.vue').default);
Vue.component('m-acct-credit', require('./components/mAcctCredit.vue').default);

Vue.component('modal-dtl-nml', require('./components/modalDtlNml.vue').default);
Vue.component('modal-dtl-acct', require('./components/modalDtlAcct.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(window["vue-js-modal"].default);
const app = new Vue({
    el: '#app',
    data: {
        //  --- if ---
        // modal
        glay: false,
        modalAccount: false,
        modalNomal: false,
        modalDtlNml: false,
        modalDtlAcct: false,

        // --- ajax ---
        // urlの取得・保存
        rootUrl: "",
        // 取得した値の一時保存
        keepKubun: [],
        cataAll: [],

        // --- child ---
        // home : 共通
        date: "",
        // home : nomal
        cateAsset: {},
        cateIncome: {},
        cateExpense: {},
        maVal: {},
        mnVal: {},
        // home : account
        category: {},
        kubun: {},

        // items/index : nomal
        itemsAll: [],
        asItems: {},
        plItems: {},
        dnType: "",
        // items/index : account

    },
    created: function () {
        // console.log("--- create app ---");

        // date
        let dt = new Date();
        console.log("date");
        var y = dt.getFullYear();
        var m = ("00" + (dt.getMonth() + 1)).slice(-2);
        var d = ("00" + dt.getDate()).slice(-2);
        this.date = y + "-" + m + "-" + d;
        // console.log("date : " + this.date);

        // get url : use in axios
        let root = "";
        let url = location.href;
        let indeHome = url.indexOf('/home');
        let indexItem = url.indexOf('/item');
        let indexAdmin = url.indexOf('/admin');
        if (indeHome > 0) {
            root = url.substr(0, indeHome)
            console.log("home" + indeHome);
        } else if (indexItem > 0) {
            root = url.substr(0, indexItem)
            console.log("imtes" + indexItem);
        } else if (indexAdmin > 0) {
            root = url.substr(0, indexAdmin)
            console.log("admin" + indexAdmin);
        }
        this.rootUrl = root;
        // console.log("root url : " + rootUrl);

        console.log("-- get category --");
        // modal - home : account
        this.getCategory().then(() => {
            this.category = this.cataAll;
        });


        // items/index : nomal
        // modal - home $ items : nomal
        this.getCateDetail(0).then(() => {
            this.cateAsset = this.cataAll;
            // console.log(this.cataAll);
        });
        this.getCateDetail(1).then(() => {
            this.cateExpense = this.cataAll;
            // console.log(this.cataAll);
        });
        this.getCateDetail(2).then(() => {
            this.cateIncome = this.cataAll;
            // console.log(this.cataAll);
        });

    },
    mounted: function () {
        console.log("--- mounted app.js ---");
    },
    updated: function () {
        // console.log("--- updated app.js ---");
    },
    methods: {
        // 共通処理
        glayLayer: function () {
            this.glay = false;
            this.modalAccount = false;
            this.modalNomal = false;
            this.modalDtlNml = false;
            this.modalDtlAcct = false;
        },

        // --- ここからhome ---
        newAccount: function () {
            // console.log('newAccount');
            console.log();
            this.glay = true;
            this.modalAccount = true;
            // this.$modal.show('accout');
            this.maVal = {
                dis: false,
            }
        },
        newExpense: function () {
            // console.log('newExpense');
            this.glay = true;
            this.modalNomal = true;
            // this.$modal.show('nomal');
            this.mnVal = {
                name: "expense",
                title: "支出：",
                dc0: 2,
                dc1: 1,
            };
        },
        newIncome: function () {
            // console.log('newIncome');
            this.glay = true;
            this.modalNomal = true;
            // this.$modal.show('nomal');
            this.mnVal = {
                name: "income",
                title: '収入：',
                dc0: 1,
                dc1: 2,
            };
        },

        // --- ここからitems/index ---
        detailAccount: function (bookNo) {
            this.glay = true;
            this.modalDtlAcct = true;
        },

        detailNomal: async function (bookNo) {
            console.log("--- click detsil nomal ---");

            this.bookNo = bookNo
            // console.log("book no : " + bookNo);

            this.getItems(bookNo).then(() => {
                // getKubunの値を資産・損益に区別して保存
                let keepAll = this.itemsAll;

                // console.log("items-all ::: ");
                // console.log(this.itemsAll);

                // childへ渡す値の振り分け
                if (keepAll[0].account_type === "0") {
                    this.asItems = keepAll[0];
                    this.plItems = keepAll[1];
                } else {
                    this.plItems = keepAll[0];
                    this.asItems = keepAll[1];
                }
                // console.log("itemsAll ::: ");
                // console.log(keepAll);
                // console.log("asItems ::: ");
                // console.log(this.asItems);
                // console.log("plItems ::: ");
                // console.log(this.plItems);

                // 値を代入してからモーダルを表示
                this.glay = true;
                this.modalDtlNml = true;
            });
        },
        getItems: function (bookNo) {
            return axios.get("../items/show/a", {
                params: {
                    book_no: bookNo,
                },
            }).then(function (res) {
                console.log("get items all ::: "); // ここまでok
                console.log(res.data);
                this.itemsAll = res.data;
            }.bind(this)
            ).catch(function (e) {
                console.error(e);
            });
        },

        // --- method ---
        getCategory: function () {
            let root = this.rootUrl;
            return axios.get(`${root}/ajax/category`
            ).then(function (res) {
                // 取得完了したらlistリストに代入
                this.cataAll = res.data;
                // console.log("get category detail ::: ");
                // console.log(res.data);
            }.bind(this)
            ).catch(function (e) {
                console.error(e);
            });
        },
        getCateDetail: function (type) {
            let root = this.rootUrl;
            return axios.get(`${root}/ajax/category_by_account`, {
                params: {
                    account_type: type,
                },
            }).then(function (res) {
                // console.log("get items detail ::: ");
                // console.log(res.data);
                this.cataAll = res.data;
            }.bind(this)
            ).catch(function (e) {
                console.error(e);
            });
        },
    }
});
