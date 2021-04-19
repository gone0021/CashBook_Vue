<template>
  <div id="modalAccount" class="ui-widget-content">
    <form action="./update" method="POST">
      <input type="hidden" name="_token" :value="csrf" />
      <div class="mb-3">
        <!-- <input type="text" name="" id="bookNo" value="" disabled /> -->
        <span>book No.</span>
        <span class="detailAccountBookNo mr-3"></span>

        <label for="detailAccountDate" class="">日付：</label>
        <div class="detailAccountinputDate">
          <input
            type="date"
            name="date"
            id="detailAccountDate"
            class="form-control"
            :class="classValidDate"
            v-model="date"
            :disabled="dis"
            required
            @blur="blurDate()"
          />
          <div class="invalid-feedback mt-1" v-if="errorDate">
            {{ errorDate }}
          </div>
        </div>
      </div>

      <table class="accountTabale">
        <!-- 表示タイトル -->
        <thead>
          <tr>
            <th class="text-center">
              <span class="debit">借方</span>
            </th>

            <th class="text-center">
              <span class="credit">貸方</span>
            </th>
          </tr>
        </thead>

        <!-- 表示内容 -->
        <tbody class="detailAccount">
          <tr class="totalPrice">
            <td class="detailDebitTotalPrice" id="">
              <span>借方合計：</span>
              <span id="detailDebitTotalPrice" :class="clrRed">{{
                debPriceTotal
              }}</span>
            </td>
            <td class="detailCreditTotalPrice" id="">
              <span>借方合計：</span>
              <span id="detailCreditTotalPrice" :class="clrRed">{{
                crePriceTotal
              }}</span>
            </td>
          </tr>

          <!-- default -->
          <tr class="detailTop">
            <!-- 借方 -->
            <td class="inpAd">
              <mda-debit
                :add-name="'debit'"
                :cnt-deb="0"
                :p-cate="pCate"
                :p-items="debItems[0]"
                :p-dis="dis"
                @p-blur-price="blurPrice"
              ></mda-debit>
            </td>

            <!-- 貸方 -->
            <td class="inpAc">
              <mda-credit
                :add-name="'credit'"
                :cnt-cre="0"
                :p-cate="pCate"
                :p-items="creItems[0]"
                :p-dis="dis"
                @p-blur-price="blurPrice"
              ></mda-credit>
            </td>
          </tr>

          <!-- add -->
          <tr v-for="(val, i) in cntTr" :key="`cntTr${i + 1}`">
            <td class="inpAd">
              <mda-debit
                v-if="val === 'debit'"
                :cnt-deb="i + 1"
                :p-cate="pCate"
                :p-items="debItems[i + 1]"
                :p-dis="dis"
                @p-blur-price="blurPrice"
              ></mda-debit>
            </td>

            <td class="inpAc">
              <mda-credit
                :add-name="'credit'"
                :cnt-cre="i + 1"
                :p-cate="pCate"
                :p-items="creItems[i + 1]"
                :p-dis="dis"
                @p-blur-price="blurPrice"
              ></mda-credit>
            </td>
          </tr>

          <!-- comment -->
          <tr class="detailEnd">
            <td colspan="2" id="">
              <div class="inpAccountComment">
                <div class="inpAccountCommentLebel my-aout">
                  <label for="inpAccountComment" class="inpAccountCommentLabel"
                    >コメント：</label
                  >
                </div>
                <div class="inpAccountCommentErea my-aout">
                  <textarea
                    name="comment"
                    id="inpAccountComment"
                    class="form-control"
                    :class="classValidComment"
                    cols="36"
                    rows="3"
                    v-model="comment"
                    :disabled="dis"
                    @blur="blurComment()"
                  ></textarea>

                  <div class="invalid-feedback mt-1" v-if="errorComment">
                    {{ errorComment }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="detailAccountBtn col-md-10 mb-3">
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
          id="detailAccountUpdate"
          class="btn btn-info btnUpdate mr-3"
          :disabled="dis"
          @click="checkForm($event)"
        />
        <input
          type="submit"
          name="submit"
          value="delete"
          id="detailAcountDel"
          class="btn btn-outline-danger btnDel mr-3"
          @click="onDel($event)"
        />
      </div>
    </form>
  </div>
</template>

<script>
import mdaDebit from "./mdaDebit.vue";
import mdaCredit from "./mdaCredit.vue";

export default {
  components: { mdaDebit, mdaCredit },
  props: ["csrf", "pCate", "pItems"],
  data: function () {
    return {
      // --- this ---
      cntTr: [],
      debPriceTotal: 0,
      crePriceTotal: 0,

      // form
      // 属性の操作
      dis: true,
      // textareaはv-model

      // バリデーション用
      // model
      date: this.pItems[0].date,
      comment: this.pItems[0].comment,
      // バリデーションエラー
      errorDate: "",
      errorComment: "",
      // is-invalidのクラス名
      classValidDate: "",
      classValidComment: "",
      // style
      clrRed: "",

      // --- child ---
      debKubun: [],
      creKubun: [],
      //   debCateId: {},
      debKubunId: [],
      creKubunId: [],

      debItems: [],
      creItems: [],

      //   --- その他 ---
      // addの配列：forで回す用
      addType: [],
      // 代入
    };
  },
  created() {
    console.log("--- created modal detail account ---");

    // itmesの数をカウント
    // console.log("items legth");
    let items = this.pItems;
    // console.log(items.length);

    // --- childの初期値 ---
    // items
    let dItems = [];
    let citems = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].debit_credit === "1") {
        this.cntTr.push("debit");
        dItems[i] = items[i];
      } else {
        this.cntTr.push("credit");
        citems[i] = items[i];
      }
    }
    // 最初の2つ（deb,cre）は不要のため削除
    this.cntTr.shift();
    this.cntTr.shift();

    this.debItems = dItems.filter(Boolean);
    this.creItems = citems.filter((v) => v);

    // form属性：値を取得してからdisabledを設定
    this.dis = true;
  },
  mounted() {
    console.log("--- mounted modal detail account ---");
    // 合計金額の表示
    this.getPrice();
  },
  methods: {
    dtlEdit: function () {
      // disabled
      this.dis = false;
    },

    // --- バリデーション用 ---
    blurPrice() {
      console.log("blur price");
      //   console.log(this.addTr);
      this.checkPrice();
    },
    blurDate() {
      let date = this.date;
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
    blurComment() {
      let comment = this.comment;
      if (comment.length > 200) {
        this.errorComment = "コメントは200文字以内で入力してください";
        this.classValidComment = "is-invalid";
      } else {
        this.errorComment = "";
        this.classValidComment = "";
      }
    },

    checkForm: function (ev) {
      //   if (this.errorDate || this.errorPrice || this.errorComment) {
      if (this.crePriceTotal !== this.debPriceTotal) {
        alert("貸借が一致しません");
        ev.preventDefault();
      }
      let inValid = document.querySelector(".is-invalid");
      if (inValid) {
        alert("不正な入力があります");
        ev.preventDefault();
      }
    },
    onDel: function (ev) {
      var msg = ["削除してもよろしいですか？"].join("\n");
      if (!window.confirm(msg)) {
        ev.preventDefault();
      }
    },
    // --- method ---
    /**
     * 貸借の金額のチェック
     */
    checkPrice: function () {
      this.getPrice();
      this.setColor("clrRed");
    },
    /**
     * 金額の取得
     */
    getPrice: function () {
      // 最初の金額
      let crePrice0 = document.querySelector(`#dtlAcPrice0`);
      let creVal0 = crePrice0.value;
      let debPrice0 = document.querySelector(`#dtlAdPrice0`);
      let debVal0 = debPrice0.value;

      this.crePriceTotal = Number(creVal0);
      this.debPriceTotal = Number(debVal0);

      // 二番目以降の金額
      for (var i = 0; i < this.cntTr.length; i++) {
        if (this.cntTr[i] === "credit") {
          var crePrice = document.querySelector(`#dtlAcPrice${i + 1}`);
          var creVal = crePrice.value;
          this.crePriceTotal += Number(creVal);
        } else if (this.cntTr[i] === "debit") {
          var debPrice = document.querySelector(`#dtlAdPrice${i + 1}`);
          var debVal = debPrice.value;
          this.debPriceTotal += Number(debVal);
        }
      }
    },
    /**
     * 貸借が一致しない時の文字色
     * @param {string} name
     */
    setColor: function (name) {
      if (this.crePriceTotal !== this.debPriceTotal) {
        this.clrRed = name;
      } else {
        this.clrRed = "";
      }
    },
  },
};
</script>
