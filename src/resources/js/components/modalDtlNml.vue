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
    <form action="./update" method="post" @submit="checkForm">
      <input type="hidden" name="_token" :value="csrf" />

      <div class="inpNmlDate">
        <span>book No.</span>
        <span id="dtlDspBookNo" class="mr-3">{{ pAsItems.book_no }}</span>

        <label for="inpNmlDate" class="">日付：</label>
        <div class="inpNmlinputDate">
          <input
            type="date"
            name="date"
            id="inpNmlDate"
            class="form-control"
            :class="classValidDate"
            v-model="asDate"
            :disabled="dis"
            required
            @blur="blurDate()"
          />
          <div class="invalid-feedback mt-1" v-if="errorDate">
            {{ errorDate }}
          </div>
        </div>
      </div>

      <!-- asset -->
      <div class="inpNa">
        <input type="hidden" name="id[]" :value="pAsItems.id" id="" />
        <input
          type="hidden"
          name="debit_credit[]"
          id="inpNmlDc0"
          :value="pAsItems.debit_credit"
        />

        <div class="inpNaCategory">
          <label for="inpNaCategory">{{ title }}</label>
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
              v-for="(cate, i) in pCateAsset"
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
            <option id="opdnak0" v-if="opTop" :value="pAsItems.kubun_id">
              {{ pAsItems.kubun_name }}
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
        <input type="hidden" name="id[]" :value="pPlItems.id" id="" />
        <input
          type="hidden"
          name="debit_credit[]"
          id="inpNmlDc"
          :value="pPlItems.debit_credit"
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
            <template v-if="pPlItems.account_type === '1'">
              <option
                v-for="(cate, i) in pCateExpense"
                :value="cate.id"
                :key="'cateEx' + i"
              >
                {{ cate.category_name }}
              </option>
            </template>

            <!-- income -->
            <template v-if="pPlItems.account_type === '2'">
              <option
                v-for="(cate, i) in pCateIncome"
                :value="cate.id"
                :key="'cateIn' + i"
              >
                {{ cate.category_name }}
              </option>
            </template>

            <!-- asset -->
            <template v-if="pPlItems.account_type === '0'">
              <option
                v-for="(cate, i) in pCateAsset"
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
            <option id="opdnpk0" v-if="opTop" :value="pPlItems.kubun_id">
              {{ pPlItems.kubun_name }}
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
            name="price[]"
            id="inpNmlPrice"
            class="form-control"
            :class="classValidPrice"
            v-model="asPrice"
            :disabled="dis"
            @blur="blurPrice()"
          />
          <!-- required -->
          <div class="invalid-feedback mt-1" v-if="errorPrice">
            {{ errorPrice }}
          </div>
        </div>

        <div class="priceHidden">
          <input
            type="hidden"
            name="price[]"
            id="inpNmlPrice"
            class="form-control"
            v-model="asPrice"
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
            :class="classValidComment"
            cols="36"
            rows="5"
            v-model="asComment"
            :disabled="dis"
            @blur="blurComment()"
          ></textarea>
          <div class="invalid-feedback mt-1" v-if="errorComment">
            {{ errorComment }}
          </div>
        </div>
      </div>

      <div class="detailBtn col-md-10 mb-3">
        <button
          type="button"
          id="dtlBtnEdit"
          class="btn btn-info btnEdit mr-3"
          @click="dtlEdit()"
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
    "pCateAsset",
    "pCateExpense",
    "pCateIncome",
    // items
    "pAsItems",
    "pPlItems",
  ],
  data: function () {
    return {
      // --- this ---
      title: "",
      asKubun: [],
      plKubun: [],
      opTop: true,

      // form
      // disabledの操作
      dis: true,
      // value：v-modelで入力の度に値が変わるため変数に代入
      asDate: this.pAsItems.date,
      asCateId: this.pAsItems.category_id,
      asKubunId: this.pAsItems.kubun_id,
      plCateId: this.pPlItems.category_id,
      plKubunId: this.pPlItems.kubun_id,
      asPrice: this.pAsItems.price,
      asComment: this.pAsItems.comment,

      // model：fromバリデーション用
      date: this.pDate,
      price: "",
      comment: "",
      // バリデーションエラー
      errorDate: "",
      errorPrice: "",
      errorComment: "",
      // is-invalidのクラス名
      classValidDate: "",
      classValidPrice: "",
      classValidComment: "",

      // ajax：取得した値の一時保存
      keepKubun: [],

      // その他

      // --- child ---
    };
  },
  created: function () {
    // console.log("--- created modal detail nomal ---");

    // 表示の編集
    let asType = this.pAsItems.account_type;
    let plType = this.pPlItems.account_type;
    if (asType == plType) {
      this.title = "振替：";
    } else if (plType === "1") {
      this.title = "支出：";
    } else if (plType === "2") {
      this.title = "収入：";
    } else {
      this.title = "収支：";
    }

    // disable属性：値を取得してからdisabledを設定
    this.dis = true;
  },

  mounted: function () {
    console.log("--- mounted modal detail nomal ---");
  },

  updated: function () {
    console.log("--- updated modal detail nomal ---");
  },

  methods: {
    dtlEdit: function () {
      // disabledの解除
      this.dis = false;
      // 最初のoptionを隠す
      this.opTop = false;

      // category
      let asstCid = this.pAsItems.category_id;
      let plCid = this.pPlItems.category_id;
      // kubun
      this.getKubunDtlNml(asstCid).then(() => {
        this.asKubun = this.keepKubun;
      });
      this.getKubunDtlNml(plCid).then(() => {
        this.plKubun = this.keepKubun;
      });
    },
    chgAsCate: function (ev) {
      // kubunの取得
      this.getKubunDtlNml(ev).then(() => {
        this.asKubun = this.keepKubun;
        this.asKubunId = this.keepKubun[0].id;
      });
    },
    chgPlCate: function (ev) {
      // kubunの取得
      this.getKubunDtlNml(ev).then(() => {
        this.plKubun = this.keepKubun;
        this.plKubunId = this.keepKubun[0].id;
      });
    },

    // --- method ---
    // 複数で使用する（prpsが煩雑になる）ためemitしない
    getKubunDtlNml: function (ev) {
      // 取得する値をチェック（初期値はstringのため）
      let cid = NaN;
      if (typeof ev === "string") {
        cid = ev;
      } else {
        cid = ev.target.value;
      }

      // --- ajax get ---
      return axios
        .get(`../ajax/kubun_by_category`, {
          params: {
            category_id: cid,
          },
        })
        .then(
          function (res) {
            this.keepKubun = [];
            if (!res.data.length) {
              this.keepKubun[0] = { id: 0, kubun_name: "小科目なし" };
            } else {
              this.keepKubun = res.data;
            }
          }.bind(this)
        )
        .catch(function (e) {
          console.error(e);
        });
    },

    // バリデーション
    blurDate: function () {
      let date = this.asDate;
      let y = date.split("-")[0];
      if (!date.match(/^\d{4}\-\d{2}\-\d{2}$/)) {
        // 半角数字
        this.errorDate = "正しい日付を入力してください";
        this.classValidDate = "is-invalid";
      } else if (y < 2000 || y > 3000) {
        // 日付：2000年～3000年
        this.errorDate = "2000年～3000年で入力してください";
        this.classValidDate = "is-invalid";
      } else {
        this.errorDate = "";
        this.classValidDate = "";
      }
    },
    blurPrice: function () {
      let price = this.asPrice;
      // 金額
      if (isNaN(price)) {
        this.errorPrice = "金額は半角数字のみで入力してください";
        this.classValidPrice = "is-invalid";
      } else {
        this.errorPrice = "";
        this.classValidPrice = "";
      }
    },
    blurComment: function () {
      let comment = this.asComment;
      if (comment.length > 2) {
        this.errorComment = "コメントは200文字以内で入力してください";
        this.classValidComment = "is-invalid";
      } else {
        this.errorComment = "";
        this.classValidComment = "";
      }
    },
    checkForm: function (ev) {
      //   if (this.errorDate || this.errorPrice || this.errorComment) {
      let inValid = document.querySelector(".is-invalid");
      if (inValid) {
        alert("不正な入力があります");
        ev.preventDefault();
      }
    },
  },
};
</script>
