<template>
  <div class="crateCategory mb-3">
    <div class="createAccountType mr-3">
      <label for="createAccountType">科目区分</label>
      <select
        name="account_type"
        id="createAccountType"
        class="form-control"
        @change.once="chgTypeOne()"
        :disabled="mDis"
        required
      >
        <option id="opAdmCc0" value="">---</option>

        <option v-for="(type, i) in accountType" :value="i" :key="'type' + i">
          {{ type }}
        </option>
      </select>

      <div class="invalid-feedback">
        <!-- @error('account_type')
        <span id="createErrorAccountType">
          {{ $message }}
        </span>
        @enderror -->
      </div>
    </div>

    <div class="createCategory">
      <label for="createCategory">科目名</label>
      <input
        type="text"
        name="category_name"
        id="createCategory"
        class="form-control"
        value=""
        :disabled="mDis"
        required
      />

      <div class="invalid-feedback">
        <!-- @error('category_name')
        <span id="createErrorCategoryName">
          {{ $message }}
        </span>
        @enderror -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["mDis", "", "", "", "", ""],
  data: function () {
    return {
      accountType: ["資産", "費用", "収益"],
      cataId: "",
      mKubun: "",
      asKubun: "",
      plKubun: "",

      // 置き換え用
      rep: {},
    };
  },
  mounted: function () {
    console.log("--- mount admin create cate ---");
  },
  updated: function () {
    console.log("--- update admin create cate ---");
  },
  methods: {
    chgTypeOne: function () {
      let chgKubun = document.querySelector("#createAccountType");
      let kchild = document.querySelector("#opAdmCc0");
      chgKubun.removeChild(kchild);
    },
  },
};
</script>
