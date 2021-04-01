<template>
  <div class="crateCategory">
    <div class="createAccountType align-top mr-3">
      <label for="createAccountType">科目区分</label>
      <select
        name="account_type"
        id="createAccountType"
        class="form-control"
        @change.once="chgTypeOne0()"
        @change="chgType($event)"
        required
      >
        <option id="opAdmCk0" value="">---</option>
        <option v-for="(type, i) in mType" :value="i" :key="'type' + i">
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
    <div class="createSelectCategory mr-3">
      <label for="createSelectCategory">科目名</label>
      <select name="category_id" id="createSelectCategory" class="form-control">
        <option value="" id="opAdmCk1" selected>---</option>

        <option v-for="(cate, i) in mCate" :value="cate.id" :key="'cate' + i">
          {{ cate.category_name }}
        </option>
      </select>

      <div class="invalid-feedback">
        <!-- @error('category_id')
        <span id="createErrorCategoryId">
          {{ $message }}
        </span>
        @enderror -->
      </div>
    </div>

    <div class="crateCategory">
      <div class="createKubunName mb-3">
        <label for="createKubunName">小科目名</label>
        <input
          type="text"
          name="kubun_name"
          id="createKubunName"
          class="form-control mr-1"
          value=""
        />

        <div class="invalid-feedback">
          <!-- @error('kubun_name')? -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["mDis", "mCate", "mType", "", "", ""],
  data: function () {
    return {
      // this
      // 置き換え用
    };
  },
  mounted: function () {
    console.log("--- mount admin create cate ---");
  },
  updated: function () {
    console.log("--- update admin create cate ---");
  },
  methods: {
    chgTypeOne0: function () {
      let chgKubun0 = document.querySelector("#createAccountType");
      let kchild0 = document.querySelector("#opAdmCk0");
      chgKubun0.removeChild(kchild0);

      let chgKubun1 = document.querySelector("#createSelectCategory");
      let kchild1 = document.querySelector("#opAdmCk1");
      chgKubun1.removeChild(kchild1);
    },
    chgType: function (ev) {
      let type = ev.target.value;
      console.log(type);
      this.$emit("m-chg-type", type);
    },
  },
};
</script>
