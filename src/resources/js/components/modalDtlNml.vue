<template>
  <!-- <modal
    name="nomal"
    classes="nomalModal"
    :draggable="true"
    :reset="true"
    :width="600"
    :minWidth="600"
    :maxWidth="600"
    :height="480"
    :minHeight="480"
  > -->
  <div id="modalNomal" class="nomalModalInner">
    <form action="./update" method="post">
      <input type="hidden" name="_token" :value="csrf" />

      <div class="inpNmlDate">
        <span>book No.</span>
        <span id="dtlDspBookNo" class="mr-3">{{ mdnAsItems.book_no }}</span>

        <label for="inpNmlDate" class="">日付：</label>
        <div class="inpNmlinputDate">
          <input
            type="date"
            name="date"
            id="inpNmlDate"
            class="form-control"
            :value="mdnAsItems.date"
            :disabled="dis"
            required
          />
        </div>
      </div>

      <!-- asset -->
      <div class="inpNa">
        <input type="hidden" name="id[]" :value="mdnAsItems.id" id="" />
        <input
          type="hidden"
          name="debit_credit[]"
          id="inpNmlDc0"
          :value="mdnAsItems.debit_credit"
        />

        <div class="inpNaCategory">
          <label for="inpNaCategory">収支：</label>
          <select
            name="category_id[]"
            id="dtlNaCategory"
            class="form-control"
            v-model="asCateId"
            :disabled="dis"
            required
            @change="chgAsCate($event)"
          >
            <option
              v-for="(cate, i) in mCateAsset"
              :value="cate.id"
              :key="'cateAs' + i"
            >
              {{ cate.category_name }}
            </option>
          </select>
        </div>

        <div class="inpNaKubun">
          <label for="inpNaKubun">小科目：</label>
          <select
            name="kubun_id[]"
            id="dtlNaKubun"
            class="form-control"
            :disabled="dis"
            v-model="asKubunId"
            required
          >
            <option id="opdnak0" :value="mdnAsItems.kubun_id">
              {{ mdnAsItems.kubun_name }}
            </option>
            <option
              v-for="(ask, i) in asKubun"
              :value="ask.id"
              :key="'asset-kubun' + i"
            >
              {{ ask.kubun_name }}
            </option>
          </select>
        </div>
      </div>

      <!-- pl : income or expense -->
      <div class="inpNp">
        <input type="hidden" name="id[]" :value="mdnPlItems.id" id="" />
        <input
          type="hidden"
          name="debit_credit[]"
          id="inpNmlDc"
          :value="mdnPlItems.debit_credit"
        />
        <div class="inpNpCategory">
          <label for="inpNpCategory">内容：</label>
          <select
            name="category_id[]"
            id="dtlNpCategory"
            class="form-control"
            v-model="plCateId"
            :disabled="dis"
            required
            @change="chgPlCate($event)"
          >
            <!-- expense -->
            <template v-if="mdnPlItems.account_type === '1'">
              <option
                v-for="(cate, i) in mCateExpense"
                :value="cate.id"
                :key="'cateEx' + i"
              >
                {{ cate.category_name }}
              </option>
            </template>

            <!-- income -->
            <template v-if="mdnPlItems.account_type === '2'">
              <option
                v-for="(cate, i) in mCateIncome"
                :value="cate.id"
                :key="'cateIn' + i"
              >
                {{ cate.category_name }}
              </option>
            </template>

            <!-- asset -->
            <template v-if="mdnPlItems.account_type === '0'">
              <option
                v-for="(cate, i) in mCateAsset"
                :value="cate.id"
                :key="'cateAs2' + i"
              >
                {{ cate.category_name }}
              </option>
            </template>
          </select>
        </div>

        <div class="inpNpKubun">
          <label for="inpNpKubun">小科目：</label>
          <select
            name="kubun_id[]"
            id="dtlNpKubun"
            class="form-control"
            v-model="plKubunId"
            :disabled="dis"
            required
          >
            <option id="opdnpk0" :value="mdnPlItems.kubun_id">
              {{ mdnPlItems.kubun_name }}
            </option>
            <option
              v-for="(plk, i) in plKubun"
              :value="plk.id"
              :key="'pl-kubun' + i"
            >
              {{ plk.kubun_name }}
            </option>
          </select>
        </div>
      </div>

      <div class="inpNmlPrice">
        <label for="inpNmlPrice" class="">金額：</label>
        <div class="inpNmlinputPrice">
          <input
            type="text"
            name="price"
            id="inpNmlPrice"
            class="form-control"
            :value="mdnAsItems.price"
            :disabled="dis"
            required
          />
        </div>
      </div>

      <div class="inpNmlCommentSubmit">
        <label for="inpNmlComment" class="inpNmlCommentLabel">コメント：</label>
        <div class="inpNmlComment">
          <textarea
            name="comment"
            id="inpNmlComment"
            class="form-control"
            cols="36"
            rows="5"
            :disabled="dis"
          ></textarea>
        </div>
      </div>

      <div class="detailBtn col-md-10 mb-3">
        <button
          type="button"
          id="dtlBtnEdit"
          class="btn btn-info btnEdit mr-3"
          @click="dtlEdit"
          @click.once="delKateTop"
        >
          edit
        </button>
        <input
          type="submit"
          name="submit"
          value="update"
          id="dtlBtnUpd"
          class="btn btn-info btnUpdate mr-3"
          :disabled="dis"
        />
        <input
          type="submit"
          name="submit"
          value="delete"
          id="dtlBtnDel"
          class="btn btn-outline-danger btnDel mr-3"
        />
      </div>
    </form>
  </div>
  <!-- </modal> -->
</template>

<script>
export default {
  // keep：categoryのaccount_rypeに使用：CashBookのitem.jsを参照
  // 処理が終わったらコメントを削除すること
  props: [
    // csrf
    "csrf",
    // category
    "mCateAsset",
    "mCateExpense",
    "mCateIncome",
    // items
    "mdnAsItems",
    "mdnPlItems",
  ],
  data: function () {
    return {
      // --- form ---
      // 属性の操作
      dis: true,
      // value：kubunはcreatedとchangeで値が変わる
      asCateId: this.mdnAsItems.category_id,
      asKubunId: [],
      plCateId:  this.mdnPlItems.category_id,
      plKubunId: [],

      // --- ajax ---
      // urlの取得・保存
      root: "",
      // 取得した値の一時保存
      keepKubun: [],

      // --- その他 ---
      // 代入
      asKubun: [],
      plKubun: [],
      // propsの編集
    };
  },
  created: function () {
    console.log("--- created modal detail nomal ---");
    console.log("mdn-asItems ::: ");
    console.log(this.mdnAsItems);
    console.log("mdn-plItems ::: ");
    console.log(this.mdnPlItems);


    console.log("mdn-cate-set ::: ");
    console.log(this.mCateAsset);
    console.log(this.mCateExpense);
    console.log(this.mCateIncome);

// urlの取得
    let url = location.href;
    let indexItem = url.indexOf("/item");
    this.root = url.substr(0, indexItem);

    // form属性
    this.dis = true;

    // 値の振替
    this.asKubunId = this.mdnAsItems.kubun_id;
    this.plKubunId = this.mdnPlItems.kubun_id;
  },

  mounted: function () {
    console.log("--- mounted modal detail nomal ---");
  },

  updated: function () {
    console.log("--- updated modal detail nomal ---");
  },

  methods: {
    dtlEdit: function () {
      this.dis = false;

      // category
      let asstCid = this.mdnAsItems.category_id;
      let plCid = this.mdnPlItems.category_id;
      // kubun
      this.getKubunDtlNml(asstCid).then(() => {
        this.asKubun = this.keepKubun;
      });
      console.log("--- as kubun ---");
      console.log(this.asKubun);
      this.getKubunDtlNml(plCid).then(() => {
        this.plKubun = this.keepKubun;
      });
      console.log("--- pl kubun ---");
      console.log(this.plKubun);
    },
    chgAsCate: function (ev) {
      this.getKubunDtlNml(ev).then(() => {
        this.asKubun = this.keepKubun;
        this.asKubunId = this.keepKubun[0].id;
      });
    },
    chgPlCate: function (ev) {
      this.getKubunDtlNml(ev).then(() => {
        this.plKubun = this.keepKubun;
        this.plKubunId = this.keepKubun[0].id;
      });
    },
    delKateTop: function () {
      this.delKateTop0();
      this.delKateTop1();
    },

    // method
    delKateTop0: function () {
      let chgKubun = document.querySelector("#dtlNaKubun");
      let kchild = document.querySelector("#opdnak0");
      chgKubun.removeChild(kchild);
    },
    delKateTop1: function () {
      let chgKubun = document.querySelector("#dtlNpKubun");
      let kchild = document.querySelector("#opdnpk0");
      chgKubun.removeChild(kchild);
    },

    getCateDtlNml: function (ev, args = null) {},
    getKubunDtlNml: function (ev, args = null) {
      //   console.log("ev ↓ ");
      //   console.log(ev);
      // --- 取得する値をチェック（eventまたはstring）---
      let cid = NaN;
      if (typeof ev == "string") {
        cid = Number(ev);
      } else {
        cid = ev.target.value;
      }

      // --- ajax get ---
      return axios
        .get(`${this.root}/ajax/kubun_by_category`, {
          params: {
            category_id: cid,
          },
        })
        .then(
          function (res) {
            this.keepKubun = res.data;
          }.bind(this)
        )
        .catch(function (e) {
          console.error(e);
        });
    },
  },
};
</script>
