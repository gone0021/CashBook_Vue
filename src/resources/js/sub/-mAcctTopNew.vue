<template>
  <div class="inpAccountDate">
    <label for="inpAccountDate" class="inpAccountDate">日付：</label>
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
      <div class="addDebit btn" @click="addDebit()">借方＋</div>
      <div class="delDebit btn" @click="delDebit()">借方－</div>
      <div class="addCredit btn" @click="addCredit()">貸方＋</div>
      <div class="delCredit btn" @click="delCredit()">貸方－</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["mDate", "mCate", "csrf", "mAction"],
  data: function () {
    return {
      //
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
      console.log("add deb");
      this.$emit("m-add-deb");
    },
    delDebit: function () {
      console.log("del deb");
      this.$emit("m-del-deb");
    },
    addCredit: function () {
      console.log("add cre");
      this.$emit("m-add-cre");
    },
    delCredit: function () {
      console.log("del cre");
      this.$emit("m-del-cre");
    },
  },
};
</script>
