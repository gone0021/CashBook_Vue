<template>
  <div class="template">
    <div id="modalAccount" class="ui-widget-content ui-resizable">
      <form action="./items/store" method="post" @submit="checkForm">
        <!-- <form action="" method="" @submit="checkForm"> -->
        <input type="hidden" name="_token" :value="csrf" />
        <input type="hidden" name="submit" value="inputAccount" />

        <div class="inpAccountDate">
          <!-- 日付 -->
          <label for="inpAccountDate" class="inpAccountDate align-top mt-2"
            >日付：</label
          >
          <div class="inpAccountinputDate">
            <input
              type="date"
              name="date"
              id="inpAccountDate"
              class="form-control"
              :class="classValidDate"
              v-model="date"
              required
              @blur="blurDate()"
            />

            <div class="invalid-feedback mt-1" v-if="errorDate">
              {{ errorDate }}
            </div>
          </div>

          <!-- ボタン：追加・削除 -->
          <div class="addBtn align-top">
            <div class="addDebit btn" @click="addDebit()">借方＋</div>
            <div class="delDebit btn" @click="delDebit()">借方－</div>
            <div class="addCredit btn" @click="addCredit()">貸方＋</div>
            <div class="delCredit btn" @click="delCredit()">貸方－</div>
          </div>
        </div>

        <table class="accountTabale">
          <thead>
            <tr class="accountTitle">
              <th id="tittleDebit">借方</th>
              <th id="titleCredit">貸方</th>
            </tr>
          </thead>

          <tbody>
            <tr class="totalPrice">
              <td class="inputDebitTotalPrice" id="">
                <span>借方合計：</span>
                <span id="inputDebitTotalPrice" :class="clrRed">{{
                  debPriceTotal
                }}</span>
              </td>
              <td class="inputCreditTotalPrice" id="">
                <span>貸方合計：</span>
                <span id="inputCreditTotalPrice" :class="clrRed">{{
                  crePriceTotal
                }}</span>
              </td>
            </tr>

            <!-- default -->
            <tr class="accounTop">
              <td class="inpAd">
                <m-acct-debit
                  :add-btn="'debit'"
                  :cnt-deb="0"
                  :p-cate="pCate"
                  @p-blur-price="blurPrice"
                ></m-acct-debit>
              </td>

              <td class="inpAc">
                <m-acct-credit
                  :add-btn="'credit'"
                  :cnt-cre="0"
                  :p-cate="pCate"
                  @p-blur-price="blurPrice"
                ></m-acct-credit>
              </td>
            </tr>

            <!-- add -->
            <tr v-for="(val, i) in addTr" :key="`cntTr${i + 1}`">
              <td class="inpAd">
                <m-acct-debit
                  :add-btn="val"
                  :cnt-deb="i + 1"
                  :p-cate="pCate"
                  @p-blur-price="blurPrice"
                ></m-acct-debit>
              </td>

              <td class="inpAc">
                <m-acct-credit
                  :add-btn="val"
                  :cnt-cre="i + 1"
                  :p-cate="pCate"
                  @p-blur-price="blurPrice"
                ></m-acct-credit>
              </td>
            </tr>

            <!-- comment -->
            <tr class="detailEnd">
              <td colspan="2" id="">
                <div class="inpAccountComment">
                  <div class="inpAccountCommentLebel my-aout">
                    <label
                      for="inpAccountComment"
                      class="inpAccountCommentLabel"
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

        <div class="newBtn">
          <input
            type="submit"
            name="inputAccount"
            id="newBtn"
            value="new"
            class="btn btn-info"
          />
        </div>
      </form>
    </div>
  </div>
  <!-- </modal> -->
</template>

<script>
import mAcctDebit from "./mAcctDebit.vue";
import mAcctCredit from "./mAcctCredit.vue";

export default {
  components: { mAcctDebit, mAcctCredit },
  props: ["pDate", "pCate", "csrf"],
  data: function () {
    return {
      // --- this ---
      addTr: [],
      debPriceTotal: 0,
      crePriceTotal: 0,
      // バリデーション用
      errorDate: "",
      errorComment: "",
      // model
      date: this.pDate,
      comment: "",
      // バリデーションエラー
      errorDate: "",
      errorComment: "",
      // is-invalidのクラス名
      classValidDate: "",
      classValidComment: "",
      // style
      clrRed: "",
      // --- child ---
      cPriceCre: "",
      cPriceDeb: "",
    };
  },
  mounted: function () {
    // console.log("--- mouted modal account ---");
    // console.log("date = " + this.pDate);
  },
  updated: function () {
    // console.log("--- updated modal account ---");
  },
  methods: {
    // --- this-page ---
    addDebit: function () {
      this.addTr.push("debit");
      //   console.log(this.addTr);
    },
    delDebit: function () {
      var rev = this.addTr.reverse();
      var index = rev.indexOf("debit");
      if (index > -1) {
        rev.splice(index, 1);
      }
      this.addtr = rev.reverse();
      this.checkPrice();

      //   console.log(this.addTr);
    },
    addCredit: function () {
      this.addTr.push("credit");
      //   console.log(this.addTr);
    },
    delCredit: function () {
      var rev = this.addTr.reverse();
      var index = rev.indexOf("credit");
      if (index > -1) {
        rev.splice(index, 1);
      }
      this.addtr = rev.reverse();
      this.checkPrice();
      //   console.log(this.addTr);
    },

    // --- バリデーション用 ---
    blurPrice(val) {
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
      let crePrice0 = document.querySelector(`#inpAcPrice0`);
      let creVal0 = crePrice0.value;
      let debPrice0 = document.querySelector(`#inpAdPrice0`);
      let debVal0 = debPrice0.value;

      this.crePriceTotal = Number(creVal0);
      this.debPriceTotal = Number(debVal0);

      // 二番目以降の金額
      for (var i = 0; i < this.addTr.length; i++) {
        if (this.addTr[i] === "credit") {
          var crePrice = document.querySelector(`#inpAcPrice${i + 1}`);
          var creVal = crePrice.value;
          this.crePriceTotal += Number(creVal);
        } else if (this.addTr[i] === "debit") {
          var debPrice = document.querySelector(`#inpAdPrice${i + 1}`);
          var debVal = debPrice.value;
          this.debPriceTotal += Number(debVal);
        }
      }
    },
    /**
     * 貸借が一致しない時の文字色
     * @param {string} name
     */
    setColor: function(name) {
      if (this.crePriceTotal !== this.debPriceTotal) {
        this.clrRed = name;
      } else {
        this.clrRed = "";
      }
    },
  },
};
</script>
