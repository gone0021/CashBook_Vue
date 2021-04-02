<template>
  <div class="edit">
    <div class="editDiv mb-3">
      <div class="createAccountType align-top mr-3">
        <label for="editAccountType">科目区分</label>

        <select
          name="account_type"
          id="editAccountType"
          class="form-control"
          required
          @change.once="chgTypeOne()"
          @change="chgType($event)"
        >
          <option id="opAdmEdt0" value="">---</option>
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
        <label for="editSelectCategory">科目名</label>
        <select
          name="category_id"
          id="editSelectCategory"
          class="form-control"
          required
          @change="chgCate($event)"
        >
          <option value="" id="opAdmEdt1" selected>---</option>

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

      <div
        class="editSelectKubun mr-3"
        v-if="radio == 2 || radio == 4"
        key="kubun"
      >
        <label for="editSelectKubun">小科目名</label>
        <select name="kubun_id" id="editSelectKubun" class="form-control">
          <option value="" id="opAdmEdt2" selected>---</option>

          <option
            v-for="(kubun, i) in mKubun"
            :value="kubun.id"
            :key="'kubun' + i"
          >
            {{ kubun.kubun_name }}
          </option>
        </select>

        <div class="invalid-feedback">
          <!-- @error('kubun_id')
          <span id="editErrorKubunId">{{ $message }}</span>
          @enderror -->
        </div>
      </div>
    </div>

    <div class="crateCategory">
      <div class="editCategoryName mb-4" v-if="radio == 1">
        <label for="editCategoryName">変更（科目名）</label>
        <input
          type="text"
          id="editCategoryName"
          class="form-control mb-1"
          name="category_name"
          value=""
          placeholder="入力してください"
          :disabled="disCate"
          required
        />

        <div class="invalid-feedback">
          <!-- @error('category_name')
          <span id="editErrorCategoryName">{{ $message }}</span>
          @enderror -->
        </div>
      </div>

      <div class="editKubunName mb-4" v-if="radio == 2">
        <label for="editKubunName">変更（小科目名）</label>
        <input
          type="text"
          id="editKubunName"
          class="form-control mb-1"
          name="kubun_name"
          value=""
          placeholder="入力してください"
          :disabled="disKubun"
          required
        />

        <div class="invalid-feedback">
          <!-- @error('kubun_name')
          <span id="editErrorKubunName">{{ $message }}</span>
          @enderror -->
        </div>
      </div>
    </div>

    <div class="editAccountDel mb-4" v-if="radio == 3 || radio == 4">
      <input
        type="submit"
        name="submit"
        id="editAccountDel"
        class="btn-outline-danger form-control btnDel"
        value="delete"
        :disabled="disDel"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["mDis", "mCate", "mType", "mRadio", "mKubun", "mChgFlg", ""],
  data: function () {
    return {
      // this
      disCate: true,
      disKubun: true,
      disDel: true,

      chg_flg: 0,
      // 置き換え用
      radio: this.mRadio,
    };
  },
  watch: {
    mRadio: {
      // 外からプロパティの中身が変更になったら実行される
      immediate: true,
      handler(val) {
        this.radio = val;
        if (val == 1) {
          this.disCate = false;
          this.disKubun = true;
          this.disDel = true;
        } else if (val == 2) {
          this.disCate = false;
          this.disKubun = false;
          this.disDel = true;
        } else {
          this.disCate = true;
          this.disKubun = true;
          this.disDel = false;
        }

        // chg_flg
        if ((val == 2 || val == 4) && this.chg_flg == 2) {
          return;
        } else if ((val == 2 || val == 4) && this.chg_flg == 4) {
          return;
        } else {
          this.chg_flg = 0;
        }
      },
    },
  },
  creaated: function () {
    console.log("--- mount admin create cate ---");
    if (this.mRadio == 1) {
      this.disCate = false;
      this.disKubun = true;
    } else if (this.mRadio == 2) {
      this.disCate = false;
      this.disKubun = false;
    } else {
      this.disCate = true;
      this.disKubun = true;
    }
  },
  mounted: function () {
    // console.log("--- mount admin mouted cate ---");
  },
  updated: function () {
    // console.log("--- update admin updated cate ---");
  },
  methods: {
    chgTypeOne: function () {
      let chgKubun0 = document.querySelector("#editAccountType");
      let kchild0 = document.querySelector("#opAdmEdt0");
      chgKubun0.removeChild(kchild0);

      let chgKubun1 = document.querySelector("#editSelectCategory");
      let kchild1 = document.querySelector("#opAdmEdt1");
      chgKubun1.removeChild(kchild1);
    },
    chgType: function (ev) {
      let type = ev.target.value;
    //   console.log(type);
      this.$emit("m-chg-type", type);
    },
    chgCate: function (ev) {
      if ((this.radio === "2" || this.radio === "4") && this.chg_flg == 0) {
        let chgKubun = document.querySelector("#editSelectKubun");
        let kchild = document.querySelector("#opAdmEdt2");
        chgKubun.removeChild(kchild);
        if (this.radio === "2") {
          this.chg_flg = 2;
        } else if (this.radio === "4") {
          this.chg_flg = 4;
        } else {
          this.chg_flg = 1;
        }
      }

      let type = ev.target.value;
    //   console.log(type);
      this.$emit("m-chg-cate", type);
    },
  },
};
</script>
\
