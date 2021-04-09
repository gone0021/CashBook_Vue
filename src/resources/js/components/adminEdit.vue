<template>
  <div class="edit">
    <!-- template -->
    <!-- ラジオボタン -->
    <div class="checkbox mb-3">
      <input
        type="radio"
        value="1"
        name="mode"
        class="mr-1"
        id="editSelect1"
        v-model="radio"
      />
      <label for="editSelect1" class="form-check-label mr-3"
        >科目のみ編集</label
      >

      <input
        type="radio"
        value="2"
        name="mode"
        class="mr-1"
        id="editSelect2"
        v-model="radio"
      />
      <label for="editSelect2" class="form-check-label mr-3"
        >小科目のみ編集</label
      >

      <input
        type="radio"
        value="3"
        name="mode"
        class="mr-1"
        id="editSelect3"
        v-model="radio"
      />
      <label for="editSelect3" class="form-check-label mr-3">科目の削除</label>

      <input
        type="radio"
        value="4"
        name="mode"
        class="mr-1"
        id="editSelect4"
        v-model="radio"
      />
      <label for="editSelect4" class="form-check-label mr-3"
        >小科目の削除</label
      >
    </div>

    <!-- 入力 -->
    <div class="editDiv mb-3">
      <div class="editAccountType mr-3">
        <label for="editAccountType">科目区分</label>
        <select
          name="account_type"
          id="editAccountType"
          class="form-control"
          :class="classValidType"
          @change.once="chgTypeOne()"
          @change="chgType($event)"
        >
          <option id="opAdmEdt0" value="">---</option>
          <option v-for="(type, i) in mType" :value="i" :key="'type' + i">
            {{ type }}
          </option>
        </select>

        <div class="invalid-feedback" v-if="errors.account_type">
          <template v-if="validType">
            <p
              v-for="(acctType, i) in errors.account_type"
              :key="'errAcctType' + i"
            >
              {{ acctType }}
            </p>
          </template>
        </div>
      </div>

      <div class="createSelectCategory mr-3">
        <label for="editSelectCategory">科目名</label>
        <select
          name="category_id"
          id="editSelectCategory"
          class="form-control"
          :class="classValidCateId"
          @change="chgCate($event)"
        >
          <option value="" id="opAdmEdt1" selected>---</option>

          <option v-for="(cate, i) in mCate" :value="cate.id" :key="'cate' + i">
            {{ cate.category_name }}
          </option>
        </select>

        <div class="invalid-feedback" v-if="errors.category_id">
          <template v-if="validCateId">
            <p v-for="(cId, i) in errors.category_id" :key="'errCateId' + i">
              {{ cId }}
            </p>
          </template>
        </div>
      </div>

      <!-- 小科目のみ表示 -->
      <div
        class="editSelectKubun mr-3"
        v-if="radio == 2 || radio == 4"
        key="kubun"
      >
        <label for="editSelectKubun">小科目名</label>
        <select
          name="kubun_id"
          id="editSelectKubun"
          class="form-control"
          :class="classValidKubunId"
        >
          <option value="" id="opAdmEdt2" selected>---</option>
          <option
            v-for="(kubun, i) in mKubun"
            :value="kubun.id"
            :key="'kubun' + i"
          >
            {{ kubun.kubun_name }}
          </option>
        </select>

        <!-- categoryは段合わせ用 -->
        <div class="" v-if="errors.category_id">
          <div class="invalid-feedback" v-if="errors.kubun_id">
            <template v-if="validKubunId">
              <p v-for="(kId, i) in errors.kubun_id" :key="'errKubunId' + i">
                {{ kId }}
              </p>
            </template>
          </div>
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
          :class="classValidCateName"
          name="category_name"
          value=""
          placeholder="入力してください"
          :disabled="disCate"
        />

        <div class="invalid-feedback" v-if="errors.category_name">
          <template v-if="validCateName">
            <p
              v-for="(cName, i) in errors.category_name"
              :key="'errCateName' + i"
            >
              {{ cName }}
            </p>
          </template>
        </div>
      </div>

      <!-- 小科目のみ表示 -->
      <div class="editKubunName mb-4" v-if="radio == 2">
        <label for="editKubunName">変更（小科目名）</label>
        <input
          type="text"
          id="editKubunName"
          class="form-control mb-1"
          :class="classValidKubunName"
          name="kubun_name"
          value=""
          placeholder="入力してください"
          :disabled="disKubun"
        />

        <!-- categoryは段合わせ用 -->
        <div class="" v-if="errors.category_id">
          <div class="invalid-feedback" v-if="errors.kubun_name">
            <template v-if="validKubunName">
              <span
                v-for="(kName, i) in errors.kubun_name"
                :key="'errKubunName' + i"
              >
                {{ kName }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- ボタン -->
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

    <div class="editAccountUpdate ml-3">
      <input
        type="submit"
        name="submit"
        id="editAccountUpdate"
        class="btn btn-info btnUpdate mr-3"
        value="Update"
        v-if="radio == 1 || radio == 2"
      />

      <a :href="adminIndex" class="btn btn-light"> Return </a>
    </div>

    <!-- template -->
  </div>
</template>

<script>
export default {
  props: ["mType", "mCate", "mKubun", "errors", "href"],
  data: function () {
    return {
      // this
      radio: 1,
      disCate: true,
      disKubun: true,
      disDel: true,
      // app.bladeでjsonへ変換
      adminIndex: adminIndex, // bind:hrefで仕様
      sesMsg: sesMsg, // 使ってない：ただのメモ
      // バリデーションの表示チェック
      validType: false,
      validCateId: false,
      validKubunId: false,
      validCateName: false,
      validKubunName: false,

      classValidType: "",
      classValidCateId: "",
      classValidKubunId: "",
      classValidCateName: "",
      classValidKubunName: "",
      // categoryを変更したかチェック
      chgCate_flg: 0,
      // 置き換え用
    };
  },
  watch: {
    radio: {
      // プロパティの値が変更になったら即実行
      immediate: true,
      handler(val) {
        this.radio = val;
        // ラジオボタンによるdisabledの設定
        if (val == 1) {
          this.disCate = false;
          this.disKubun = true;
          this.disDel = true;
        } else if (val == 2) {
          this.disCate = true;
          this.disKubun = false;
          this.disDel = true;
        } else {
          this.disCate = true;
          this.disKubun = true;
          this.disDel = false;
        }

        // chgCate_flg
        if ((val == 2 || val == 4) && this.chgCate_flg == 2) {
          return;
        } else if ((val == 2 || val == 4) && this.chgCate_flg == 4) {
          return;
        } else {
          this.chgCate_flg = 0;
        }

        // バリデーションメッセージの表示設定
        if (sesMsg === "editCategory") {
          if (val == 1) {
            this.showValidCate();
          } else {
            this.hiddenValid();
          }
        } else if (sesMsg === "editKubun") {
          if (val == 2) {
            this.showValidKubun();
          } else {
            this.hiddenValid();
          }
        } else if (sesMsg === "editCategoryDel") {
          if (val == 3) {
            this.showValidCateDel();
          } else {
            this.hiddenValid();
          }
        } else if (sesMsg === "editKubunDel") {
          if (val == 4) {
            this.showValidKubunDel();
          } else {
            this.hiddenValid();
          }
        }
      },
    },
  },
  created: function () {
    console.log("--- mount admin edit created ---");
    // バリデーションエラーからのリダイレクト
    if (sesMsg === "editCategory") {
      this.radio = 1;
    } else if (sesMsg === "editKubun") {
      this.radio = 2;
    } else if (sesMsg === "editCategoryDel") {
      this.radio = 3;
    } else if (sesMsg === "editKubunDel") {
      this.radio = 4;
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
      // 科目区分の最初の値を削除
      let chgKubun0 = document.querySelector("#editAccountType");
      let kchild0 = document.querySelector("#opAdmEdt0");
      chgKubun0.removeChild(kchild0);
      // 科目名の最初の値を削除
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
      // 小科目を変更する際のみ小科目の最初の値を削除
      if ((this.radio === "2" || this.radio === "4") && this.chgCate_flg == 0) {
        let chgKubun = document.querySelector("#editSelectKubun");
        let kchild = document.querySelector("#opAdmEdt2");
        chgKubun.removeChild(kchild);
        if (this.radio === "2") {
          this.chgCate_flg = 2;
        } else if (this.radio === "4") {
          this.chgCate_flg = 4;
        } else {
          this.chgCate_flg = 1;
        }
      }

      // category_idから区分を取得
      let type = ev.target.value;
      // console.log(type);
      this.$emit("m-chg-cate", type);
    },

    // --- method ---
    showValidCate() {
      this.validType = true;
      this.validCateId = true;
      this.validCateName = true;
      this.classValidType = "is-invalid";
      this.classValidCateId = "is-invalid";
      this.classValidCateName = "is-invalid";
    },
    showValidKubun() {
      this.validType = true;
      this.validCateId = true;
      this.validCateName = true;
      this.validKubunId = true;
      this.validKubunName = true;
      this.classValidType = "is-invalid";
      this.classValidCateId = "is-invalid";
      this.classValidCateName = "is-invalid";
      this.classValidKubunId = "is-invalid";
      this.classValidKubunName = "is-invalid";
    },
    showValidCateDel() {
      this.validType = true;
      this.validCateId = true;
      this.classValidType = "is-invalid";
      this.classValidCateId = "is-invalid";
    },
    showValidKubunDel() {
      this.validType = true;
      this.validCateId = true;
      this.validKubunId = true;
      this.classValidType = "is-invalid";
      this.classValidCateId = "is-invalid";
      this.classValidKubunId = "is-invalid";
    },
    hiddenValid() {
      this.validType = false;
      this.validCateId = false;
      this.validCateName = false;
      this.validKubunId = false;
      this.validKubunName = false;
      this.classValidType = "";
      this.classValidCateId = "";
      this.classValidCateName = "";
      this.classValidKubunId = "";
      this.classValidKubunName = "";
    },
  },
};
</script>
\
