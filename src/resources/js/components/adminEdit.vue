<template>
  <div class="edit">
    <!-- template -->
    <form action="./update" method="post" class="" @submit="checkForm">
      <input type="hidden" name="_token" :value="csrf" />
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
        <label for="editSelect3" class="form-check-label mr-3"
          >科目の削除</label
        >

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
        <div class="editAccountType align-top mr-3">
          <label for="editAccountType">科目区分</label>
          <select
            name="account_type"
            id="editAccountType"
            class="form-control"
            :class="classValidType"
            required
            @change="chgType($event)"
          >
            <option value="" v-if="op1" selected>---</option>
            <option v-for="(type, i) in pType" :value="i" :key="'type' + i">
              {{ type }}
            </option>
          </select>

          <span class="invalid-feedback" v-if="pErrors.account_type">
            <template v-if="validType">
              <div
                v-for="(acctType, i) in pErrors.account_type"
                :key="'errAcctType' + i"
              >
                {{ acctType }}
              </div>
            </template>
          </span>
        </div>

        <div class="createSelectCategory align-top mr-3">
          <label for="editSelectCategory">科目名</label>
          <select
            name="category_id"
            id="editSelectCategory"
            class="form-control"
            :class="classValidCateId"
            required
            @change="chgCate($event)"
          >
            <option value="" v-if="op2" selected>---</option>
            <option
              v-for="(cate, i) in pCate"
              :value="cate.id"
              :key="'cate' + i"
            >
              {{ cate.category_name }}
            </option>
          </select>

          <span class="invalid-feedback" v-if="pErrors.category_id">
            <template v-if="validCateId">
              <div
                v-for="(cId, i) in pErrors.category_id"
                :key="'errCateId' + i"
              >
                {{ cId }}
              </div>
            </template>
          </span>
        </div>

        <!-- 小科目のみ表示 -->
        <div
          class="editSelectKubun align-top mr-3"
          v-if="radio == 2 || radio == 4"
          key="kubun"
        >
          <label for="editSelectKubun">小科目名</label>
          <select
            name="kubun_id"
            id="editSelectKubun"
            class="form-control"
            :class="classValidKubunId"
            required
          >
            <option value="" v-if="op3" selected>---</option>
            <option
              v-for="(kubun, i) in pKubun"
              :value="kubun.id"
              :key="'kubun' + i"
            >
              {{ kubun.kubun_name }}
            </option>
            <option value="0" id="" v-if="!pKubun.length && noKubun">
              小科目なし
            </option>
          </select>

          <!-- categoryは段合わせ用 -->
          <span class="invalid-feedback" v-if="pErrors.kubun_id">
            <template v-if="validKubunId">
              <div v-for="(kId, i) in pErrors.kubun_id" :key="'errKubunId' + i">
                {{ kId }}
              </div>
            </template>
          </span>
        </div>
      </div>

      <div class="crateCategory">
        <div class="editCategoryName align-top mb-4" v-if="radio == 1">
          <label for="editCategoryName">変更（科目名）</label>
          <input
            type="text"
            id="editCategoryName"
            class="form-control mb-1"
            :class="classValidCateName"
            name="category_name"
            placeholder="入力してください"
            required
            :disabled="disCate"
            v-model="categoryName"
          />

          <div class="invalid-feedback mt-1" v-if="errorCate">
            {{ errorCate }}
          </div>

          <span class="invalid-feedback" v-if="pErrors.category_name">
            <template v-if="validCateName">
              <div
                v-for="(cName, i) in pErrors.category_name"
                :key="'errCateName' + i"
              >
                {{ cName }}
              </div>
            </template>
          </span>
        </div>

        <!-- 小科目のみ表示 -->
        <div class="editKubunName align-top mb-4" v-if="radio == 2">
          <label for="editKubunName">変更（小科目名）</label>
          <input
            type="text"
            id="editKubunName"
            class="form-control mb-1"
            :class="classValidKubunName"
            name="kubun_name"
            value=""
            placeholder="入力してください"
            required
            :disabled="disKubun"
            v-model="kubunName"
          />

          <div class="invalid-feedback mt-1" v-if="errorKubun">
            {{ errorKubun }}
          </div>

          <span class="invalid-feedback" v-if="pErrors.kubun_name">
            <template v-if="validKubunName">
              <div
                v-for="(kName, i) in pErrors.kubun_name"
                :key="'errKubunName' + i"
              >
                {{ kName }}
              </div>
            </template>
          </span>
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
          @click="onDel($event)"
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

        <a href="./index" class="btn btn-light"> Return </a>
      </div>
    </form>
    <!-- template -->
  </div>
</template>

<script>
export default {
  props: ["pType", "pCate", "pKubun", "pErrors", "csrf"],
  data: function () {
    return {
      // this
      radio: 1,
      disCate: true,
      disKubun: true,
      disDel: true,
      noKubun: false,

      // optionの最初の値
      op1: true,
      op2: true,
      op3: true,

      // model：fromバリデーション用
      categoryName: "",
      kubunName: "",
      // バリデーションエラー
      errorCate: "",
      errorKubun: "",
      // is-invalidのクラス名
      classValidType: "",
      classValidCateId: "",
      classValidKubunId: "",
      classValidCateName: "",
      classValidKubunName: "",
      // バリデーションの表示チェック：選択するraidoにより異なるため
      validType: false,
      validCateId: false,
      validKubunId: false,
      validCateName: false,
      validKubunName: false,

      // app.bladeでjsonへ変換
      sesMsg: sesMsg, // 使ってない：ただのメモ

      // 置き換え用
    };
  },
  watch: {
    radio: {
      // プロパティの値が変更になったら即実行
      immediate: true,
      handler(val) {
        this.radio = val;
        // console.log("watch raido : " + val);
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
    console.log("--- create admin edit created ---");
    // バリデーションエラーからのリダイレクト時のraidoを選択
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
    chgType: function (ev) {
      // 最初のoptionを隠す
      this.op1 = false;
      let type = ev.target.value;
      //   console.log(type);
      this.$emit("chg-type", type);
    },
    chgCate: function (ev) {
      // 最初のoptionを隠す
      this.op2 = false;
      this.op3 = false;
      // nokubunの表示許可
      this.noKubun = true;

      // category_idから区分を取得
      let cid = ev.target.value;
      // console.log(type);
      this.$emit("chg-cate", cid);

      if (!this.pKubun.length) {
        this.disOp3 = true;
        this.hideOp3 = true;
        // this.noKubun = true;
      }
    },
    // --- form ---
    onDel: function (ev) {
      var msg = ["削除してもよろしいですか？"].join("\n");
      if (!window.confirm(msg)) {
        ev.preventDefault();
      }
    },
    // バリデーション
    checkForm: function (ev) {
      let cate = this.categoryName;
      let kubun = this.kubunName;
      if (!this.disCate) {
        if (cate.length > 20) {
          this.errorCate = "科目名は20文字までで入力してください";
          this.classValidCateName = "is-invalid";
          ev.preventDefault();
        }
      }

      if (!this.disKubun) {
        if (kubun.length > 20) {
          this.errorKubun = "小科目名は20文字までで入力してください";
          this.classValidKubunName = "is-invalid";
          ev.preventDefault();
        }
      }
    },

    // --- method ---
    showValidCate() {
      this.validType = true;
      this.validCateId = true;
      this.validCateName = true;
      if (this.pErrors.account_type) {
        this.classValidType = "is-invalid";
      }
      if (this.pErrors.category_id) {
        this.classValidCateId = "is-invalid";
      }
      if (this.pErrors.category_name) {
        this.classValidCateName = "is-invalid";
      }
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
