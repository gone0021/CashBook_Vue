<template>
  <div class="mAcctTopNew">
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
  </div>
</template>

<script>
export default {
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
