<template>
  <div v-if="addBtn == 'debit'">
    <div class="inpAdCategory">
      <input type="hidden" name="debit_credit[]" id="" value="1" />
      <label :for="`inpAdCategory${cntDeb}`">科目：</label>
      <select
        name="category_id[]"
        :id="`inpAdCategory${cntDeb}`"
        class="form-control"
        required
        @change.once="mChgDebCateTop(cntDeb)"
        @change="mGetKubunAdeb($event, cntDeb)"
      >
        <option value="" class="opCatDebite" :id="`opCateDebit${cntDeb}`">
          選択してください
        </option>
        <option
          v-for="cate in mCate"
          :value="cate.id"
          :key="`categoryDebit${cate.id}`"
        >
          {{ cate.category_name }}
        </option>
      </select>
    </div>

    <div class="inpAdKubun">
      <label :for="`inpAdKubun${cntDeb}`">小科目：</label>
      <select
        name="kubun_id[]"
        :id="`inpAdKubun${cntDeb}`"
        class="form-control"
      >
        <option
          v-for="kubun in mDebkubun"
          :value="kubun.id"
          :key="`categoryDebit${kubun.id}`"
        >
          {{ kubun.kubun_name }}
        </option>
      </select>
    </div>

    <div class="inpAdPrice">
      <label :for="`inpAdPrice${cntDeb}`">金額：</label>
      <div class="inpAdPriceInput" :id="`inpAdPriceInput${cntDeb}`">
        <input
          type="text"
          name="price[]"
          :id="`inpAdPrice${cntDeb}`"
          class="form-control"
          value=""
          required
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    addBtn: {
      type: String,
      default: "",
    },
    cntDeb: { type: Number, default: 0 },
    // ObjectでもArrayでもtypeのエラーがでるため指定なしにしている
    mCate: { default: () => [] },
  },
  data: function () {
    return {
      mDebkubun: [],
      //
    };
  },
  created: function () {
    if (this.addBtn == "debit") {
      console.log("add : " + this.addBtn);
      console.log("props : " + this.cntDeb);
    }
  },
  updated: function () {},
  methods: {
    mChgDebCateTop: function (i) {
      //   console.log("mdeb:i = " + i);
      this.$emit("m-chg-deb-cate-top", i);
    },

    // parentのメソッドを使用する場合：値が受け取れなかったため保留
    // mGetKubunAcct: function (ev, i) {
    //   let cid = ev.target.value;
    //   console.log("mdeb:i = " + i);
    //   console.log("id = " + cid);
    //   this.$emit("m-get-kubun-acct", cid, i);
    //   console.log("mkubun ↓ ");
    //   console.log(this.mDebKubun);
    // },

    mGetKubunAdeb: function (ev, i) {
      let cid = ev.target.value;
      //   console.log("id = " + cid);
      //   this.$emit("m-get-kubun", cid);
      console.log("cntDeb : " + this.cntDeb);
      Number(i);
      axios
        .get("./ajax/kubun_by_category", {
          params: {
            category_id: cid,
          },
        })
        .then(
          function (res) {
            // console.log(res.data);
            this.mDebkubun = res.data;
            console.log("args i : " + i);
            console.log(this.mDebkubun);
            // console.log(title);
          }.bind(this)
        )
        .catch(function (e) {
          console.error(e);
        });
    },
  },
};
</script>
