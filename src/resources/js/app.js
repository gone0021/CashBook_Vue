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

// --- 共通 ---
Vue.component('modal-msg', require('./components/modalMsg.vue').default);
// --- home ---
Vue.component('modal-nml', require('./components/modalNml.vue').default);
Vue.component('modal-acct', require('./components/modalAcct.vue').default);
// account's componet
Vue.component('m-acct-debit', require('./components/mAcctDebit.vue').default);
Vue.component('m-acct-credit', require('./components/mAcctCredit.vue').default);

// --- items/index ---
Vue.component('modal-dtl-nml', require('./components/modalDtlNml.vue').default);
Vue.component('modal-dtl-acct', require('./components/modalDtlAcct.vue').default);
Vue.component('mda-debit', require('./components/mdaDebit.vue').default);
Vue.component('mda-credit', require('./components/mdaCredit.vue').default);

// --- admin ---
// create
Vue.component('admin-create-kubun', require('./components/adminCreate.vue').default);
// edit,delete
Vue.component('admin-edit', require('./components/adminEdit.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(window["vue-js-modal"].default);
const app = new Vue({
    el: '#app',
    data: {
        // メモ：sessionはapp.bladeでjsonへ変換してjsへ渡している
        // --- this ---
        sesMsg: sesMsg, // デバッグ用
        //  --- if ---
        // modal
        glay: false,
        modalAccount: false,
        modalNomal: false,
        modalDtlNml: false,
        modalDtlAcct: false,
        // バリデーションエラー：home,items
        modalMsg: false,
        // admin

        // === ajax ===
        // urlの取得・保存
        rootUrl: "",
        // 取得した値の一時保存
        keepCate: [],
        keepItems: [],
        keepKubun: {},

        // === child ===
        // all共通
        cateAll: {},
        cAcctType: ["資産", "費用", "収益"],
        cCate: [],
        cKubun: [],
        cKubun1: [],
        cKubun2: [],
        // バリデーション用
        errorMsg: {},
        validClass: {},

        // --- home ---
        // 共通
        date: "",
        // nomal
        cateAsset: {},
        cateIncome: {},
        cateExpense: {},
        mnVal: {},
        // account

        // --- items ---
        // nomal
        asItems: {},
        plItems: {},
        dnType: "",
        // account
        daItems: {},

        // --- admin ---

    },
    created: function () {
        // console.log("--- create app ---");
        // --- 共通 ---
        // get url : use in axios
        let root = "";
        let url = location.href;
        let indeHome = url.indexOf('/home');
        let indexItem = url.indexOf('/item');
        let indexAdmin = url.indexOf('/admin');
        if (indeHome > 0) {
            root = url.substr(0, indeHome)
            // console.log("home" + indeHome);
        } else if (indexItem > 0) {
            root = url.substr(0, indexItem)
            // console.log("imtes" + indexItem);
        } else if (indexAdmin > 0) {
            root = url.substr(0, indexAdmin)
            // console.log("admin" + indexAdmin);
        }
        this.rootUrl = root;
        // console.log("root url : " + rootUrl);

        if (!root) {
            return;
        } else {
            console.log("-- get category --");
            // modal - home : account
            this.getCategory().then(() => {
                this.cateAll = this.keepCate;
            });

            // items/index : nomal
            // modal - home & items : nomal
            this.getCateByAcct(0).then(() => {
                this.cateAsset = this.keepCate;
                // console.log(this.keepCate);
            });
            this.getCateByAcct(1).then(() => {
                this.cateExpense = this.keepCate;
                // console.log(this.keepCate);
            });
            this.getCateByAcct(2).then(() => {
                this.cateIncome = this.keepCate;
                // console.log(this.keepCate);
            });
        }

        // home,items：バリデーションエラー
        if (sesMsg) {
            this.modalMsg = true;
            this.glay = true;
        }

        // --- home ---
        // date
        let dt = new Date();
        var y = dt.getFullYear();
        var m = ("00" + (dt.getMonth() + 1)).slice(-2);
        var d = ("00" + dt.getDate()).slice(-2);
        this.date = y + "-" + m + "-" + d;
        // console.log("date : " + this.date);

    },
    mounted: function () {
        // console.log("--- mounted app.js ---");
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
            this.modalMsg = false;
        },

        // --- ここからhome ---
        newAccount: function () {
            // console.log('newAccount');
            console.log();
            this.glay = true;
            this.modalAccount = true;
            // this.$modal.show('accout');
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
        homeChgCate1: function (ev) {
            console.log("get kubun id : " + ev);
            this.getKubun(ev).then(() => {
                this.cKubun1 = this.keepKubun;
            });
        },
        homeChgCate2: function (ev) {
            console.log("get kubun id : " + ev);
            this.getKubun(ev).then(() => {
                this.cKubun2 = this.keepKubun;
            });
        },

        // --- ここからitems/index ---
        detailAccount: function (bookNo) {
            this.getItems(bookNo).then(() => {
                // getKubunの値を資産・損益に区別して保存
                this.daItems = this.keepItems;

                // 値を代入してからモーダルを表示
                this.glay = true;
                this.modalDtlAcct = true;
            });
        },

        detailNomal: async function (bookNo) {
            // console.clog("--- click detsil nomal ---");

            this.bookNo = bookNo

            this.getItems(bookNo).then(() => {
                // getKubunの値を資産・損益に区別して保存
                let keepAll = this.keepItems;

                // childへ渡す値の振り分け
                if (keepAll[0].account_type === "0") {
                    this.asItems = keepAll[0];
                    this.plItems = keepAll[1];
                } else {
                    this.plItems = keepAll[0];
                    this.asItems = keepAll[1];
                }

                // 値を代入してからモーダルを表示
                this.glay = true;
                this.modalDtlNml = true;
            });
        },

        // --- ここからadmin ---
        adminValid: function (param) {

        },
        // 共通:kubun, edit, delete
        adminChgType: function (ev) {
            this.getCateByAcct(ev).then(() => {
                this.cCate = this.keepCate;
            });
        },
        // 共通:edit, delete
        adminChgCate: function (ev) {
            this.getKubun(ev).then(() => {
                this.cKubun = this.keepKubun;
            });
        },

        // --- ここからmethod ---
        getItems: function (bookNo) {
            return axios.get("../items/show/a", {
                params: {
                    book_no: bookNo,
                },
            }).then(function (res) {
                this.keepItems = res.data;
            }.bind(this)
            ).catch(function (e) {
                console.error(e);
            });
        },
        getCategory: function () {
            let root = this.rootUrl;
            return axios.get(`${root}/ajax/category`
            ).then(function (res) {
                // 取得完了したらlistリストに代入
                this.keepCate = res.data;
            }.bind(this)
            ).catch(function (e) {
                console.error(e);
            });
        },
        getCateByAcct: function (type) {
            let root = this.rootUrl;
            return axios.get(`${root}/ajax/category_by_account`, {
                params: {
                    account_type: type,
                },
            }).then(function (res) {
                this.keepCate = res.data;
            }.bind(this)
            ).catch(function (e) {
                console.error(e);
            });
        },
        getKubun: function (cid) {
            let root = this.rootUrl;
            return axios.get(`${root}/ajax/kubun_by_category`, {
                params: {
                    category_id: cid,
                },
            }).then(function (res) {
                this.keepKubun = res.data;
            }.bind(this)
            ).catch(function (e) {
                console.error(e);
            });
        },

        // --- ここからバリデーション ---
        validDate: function (ev) {
            // 日付
            if (!ev.match(/^\d{4}\-\d{2}\-\d{2}$/)) {
                $(element).addClass("is-invalid");
                this.errorMsg.date = "正しい日付を入力してください";
                this.classValid.date = "is-invalid";
                ev.preventDefault();
            }
            var y = ev.split("-")[0];
            if (ev < 2010) {
                $(element).addClass("is-invalid");
                this.errorMsg.date = "2010年以降で入力してください";
                this.classValid.date = "is-invalid";
                ev.preventDefault();
            }
        },
        validName: function (ev) {
            // 日付
            if (!ev.match(/^\d{4}\-\d{2}\-\d{2}$/)) {
                $(element).addClass("is-invalid");
                this.errorMsg.date = "正しい日付を入力してください";
                this.classValid.date = "is-invalid";
                ev.preventDefault();
            }
            var y = ev.split("-")[0];
            if (ev < 2010) {
                $(element).addClass("is-invalid");
                this.errorMsg.date = "2010年以降で入力してください";
                this.classValid.date = "is-invalid";
                ev.preventDefault();
            }
        }

    }
});
