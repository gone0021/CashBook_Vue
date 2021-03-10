<template>
  <!-- <modal
    name="account"
    classes="accountModal"
    :resizable="true"
    :reset="true"
    :scrollable="true"
    :width="720"
    :height="480"
    :minWidth="720"
    :maxWidth="720"
    :minHeight="480"
  > -->
  <div class="template">
    <div id="modalAccount" class="ui-widget-content ui-resizable">
      <form action="./items/store" method="post">
        <input type="hidden" name="_token" :value="csrf" />

        <div class="inpAccountDate">
          <label for="inpAccountDate" class="">日付：</label>
          <div class="inpAccountinputDate">
            <input
              type="date"
              name="date"
              id="inpAccountDate"
              class="form-control"
              :value="mDate"
              required
            />
          </div>
          <div class="addBtn">
            <div class="addDebit btn" @click="addDebit">借方＋</div>
            <div class="delDebit btn" @click="delDebit">借方－</div>
            <div class="addCredit btn" @click="addCredit">貸方＋</div>
            <div class="delCredit btn" @click="delCredit">貸方－</div>
          </div>
        </div>

        <table id="inpAccountTabale">
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
                <span id="inputDebitTotalPrice"></span>
              </td>
              <td class="inputCreditTotalPrice" id="">
                <span>借方合計：</span>
                <span id="inputCreditTotalPrice"></span>
              </td>
            </tr>

            <!-- default -->
            <tr class="accounTop">
              <td class="inpAd">
                <m-acct-debit
                  :add-btn="'debit'"
                  :cnt-deb="0"
                  :m-cate="mCate"
                  @m-chg-deb-cate-top="chgDebCateTop(0)"
                ></m-acct-debit>
              </td>

              <td class="inpAc">
                <m-acct-credit
                  :add-btn="'credit'"
                  :cnt-cre="0"
                  :m-cate="mCate"
                  @m-chg-cre-cate-top="chgCreCateTop(0)"
                ></m-acct-credit>
              </td>
            </tr>

            <!-- add -->
            <tr v-for="(val, i) in addTr" :key="`cntTr${i + 1}`">
              <td class="inpAd">
                <m-acct-debit
                  :add-btn="val"
                  :cnt-deb="i + 1"
                  :m-cate="mCate"
                  @m-chg-deb-cate-top="chgDebCateTop(i + 1)"
                ></m-acct-debit>
              </td>

              <td class="inpAc">
                <m-acct-credit
                  :add-btn="val"
                  :cnt-cre="i + 1"
                  :m-cate="mCate"
                  @m-chg-cre-cate-top="chgCreCateTop(i + 1)"
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
                      cols="36"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <new-btn
          v-if="mAction == 'new'"
          :new-btn-name="'inputAccount'"
        ></new-btn>
        <detail-btn v-if="mAction == 'detail'"></detail-btn>
      </form>
    </div>
  </div>
  <!-- </modal> -->
</template>

<script>
import mAcctDebit from "./mAcctDebit.vue";
import mAcctCredit from "./mAcctCredit.vue";
import NewBtn from "./newBtn.vue";
import DetailBtn from "./detailBtn.vue";
export default {
  components: { mAcctDebit, mAcctCredit, NewBtn, DetailBtn },
  props: ["mDate", "mCate", "csrf", "mAction"],
  data: function () {
    return {
      addTr: [],
      debKubun: [],
      creKubun: [],
    };
  },
  mounted: function () {
    // console.log("modal account");
    // console.log("date = " + this.mDate);
    console.log("action : " + this.mAction);
  },
  beforDestroy: function () {
    console.log("action : " + this.mAction);
  },
  methods: {
    addDebit: function () {
      this.addTr.push("debit");
      console.log(this.addTr);
    },
    delDebit: function () {
      var rev = this.addTr.reverse();
      var index = rev.indexOf("debit");
      if (index > -1) {
        rev.splice(index, 1);
      }
      this.addtr = rev.reverse();

      console.log(this.addTr);
    },
    addCredit: function () {
      this.addTr.push("credit");
      console.log(this.addTr);
    },
    delCredit: function () {
      var rev = this.addTr.reverse();
      var index = rev.indexOf("credit");
      if (index > -1) {
        rev.splice(index, 1);
      }
      this.addtr = rev.reverse();
      console.log(this.addTr);
    },
    chgDebCateTop: function (i) {
      let chgCategory = document.querySelector(`#inpAdCategory${i}`);
      let child = document.querySelector(`#opCateDebit${i}`);
      chgCategory.removeChild(child);
    },
    chgCreCateTop: function (i) {
      let bCategory = document.querySelector(`#inpAcCategory${i}`);
      let child = document.querySelector(`#opCateCredit${i}`);
      bCategory.removeChild(child);
    },

    // parentで処理してchildへ値を渡す場合：値が渡せなかっため保留
    // getKubunAcct: function (cid, i, args) {
    //   //   let cid = ev.target.value;
    //   //   console.log("id = " + cid);
    //   console.log("args = " + args);
    //   //   this.$emit("m-get-kubun", cid);
    //   Number(i);
    //   axios
    //     .get("./ajax/kubun_by_category", {
    //       params: {
    //         category_id: cid,
    //       },
    //     })
    //     .then(
    //       function (res) {
    //         console.log("getkubun-acct-parent");
    //         // console.log(res.data);
    //         // this.mKubun = res.data;
    //         if (args == "debit") {
    //           this.debKubun[i] = res.data;
    //           console.log("debit : " + i);
    //           console.log(this.debKubun[i]);
    //         } else {
    //           this.creKubun[i] = res.data;
    //           console.log("credit : " + i);
    //           console.log(this.creKubun[i]);
    //         }
    //         // console.log(title);
    //       }.bind(this)
    //     )
    //     .catch(function (e) {
    //       console.error(e);
    //     });
    // },
  },
};
</script>
