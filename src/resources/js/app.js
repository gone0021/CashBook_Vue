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

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('modal-account', require('./components/modalAccount.vue').default);
Vue.component('modal-nomal', require('./components/modalNomal.vue').default);
Vue.component('modal-detail-acct', require('./components/modalDetailAcct.vue').default);
Vue.component('add-account-tr', require('./components/addAccountTr.vue').default);
Vue.component('m-account-debit', require('./components/mAccountDebit.vue').default);
Vue.component('m-account-credit', require('./components/mAccountCredit.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(window["vue-js-modal"].default);
const app = new Vue({
    el: '#app',
    data: {
        // modal
        glay: false,
        modalAccount: false,
        modalNomal: false,
        modalDetailAcct: false,
        // for child
        category: {},
        kubun: {},
        nmObj: {},
        date: "",
    },
    mounted: function () {
        // console.log("modal accout");

        // date
        let dt = new Date();
        console.log("date");
        var y = dt.getFullYear();
        var m = ("00" + (dt.getMonth() + 1)).slice(-2);
        var d = ("00" + dt.getDate()).slice(-2);
        this.date = y + "-" + m + "-" + d;
        console.log(this.date);

        // category
        axios.get("./ajax/category")
            .then(function (res) {
                // 取得完了したらlistリストに代入
                this.category = res.data;
                // console.log("catgory");
                // console.log(res.data);
            }.bind(this))
            .catch(function (e) {
                console.error(e);
            });
    },
    methods: {
        glayLayer: function () {
            this.glay = false;
            this.modalAccount = false;
            this.modalNomal = false;
            this.modalDetailAcct = false;
        },
        newAccount: function () {
            // console.log('newAccount');
            console.log();
            this.glay = true;
            this.modalAccount = true;
            // this.$modal.show('accout');
        },
        newExpense: function () {
            // console.log('newExpense');
            console.log(this.modalNomal);
            this.glay = true;
            this.modalNomal = true;
            // this.$modal.show('nomal');
            this.nmObj = {
                post: "./items/store",
                name: "expence",
                title: "支出：",
                dc0: 2,
                dc1: 1,
            };
        },
        newIncome: function () {
            // console.log('newIncome');
            console.log(this.modalNomal);
            this.glay = true;
            this.modalNomal = true;
            // this.$modal.show('nomal');
            this.nmObj = {
                post: "./items/store",
                name: "income",
                title: '収入：',
                dc0: 1,
                dc1: 2,
            };
        },
        detailAccount: function () {
            this.glay = true;
            this.modalDetailAcct = true;
            // this.$modal.show('nomal');
        },
        detailNomal: function () {
            this.glay = true;
            this.modalNomal = true;
            // this.$modal.show('nomal');
            this.nmObj = {
                name: "",
                title: '収入：',
                post: "./items/update",
                dc0: 1,
                dc1: 2,
            };
        },

    }
});
