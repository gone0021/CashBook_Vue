<template>
  <div class="crate">
    <!-- template -->
    <form action="./store" method="post" class="" @submit="checkForm">
      <input type="hidden" name="_token" :value="csrf" />
      <!-- ラジオボタン -->
      <div class="checkbox mb-3">
        <input
          type="radio"
          name="mode"
          value="1"
          class="mr-1"
          id="createSelect1"
          v-model="radio"
        />
        <label for="createSelect1" class="form-check-label mr-3"
          >科目のみ作成</label
        >

        <input
          type="radio"
          name="mode"
          value="2"
          class="mr-1"
          id="createSelect2"
          v-model="radio"
        />
        <label for="createSelect2" class="form-check-label mr-3"
          >小科目のみ作成</label
        >
      </div>

      <!-- 入力 -->
      <div class="createDiv mb-3">
        <div class="createAccountType align-top mr-3">
          <label for="createAccountType">科目区分</label>
          <select
            name="account_type"
            id="createAccountType"
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

        <!-- 科目のみ -->
        <template v-if="radio == 1">
          <div class="createCategory">
            <label for="createCategory">科目名</label>
            <input
              type="text"
              name="category_name"
              id="createCategory"
              class="form-control"
              :class="classValidCateName"
              required
              :disabled="disCate"
              v-model="categoryName"
              @blur="blurCate()"
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
        </template>

        <!-- 小科目のみ -->
        <template v-if="radio == 2">
          <div class="createSelectCategory mr-3 align-top">
            <label for="createSelectCategory">科目名</label>
            <select
              name="category_id"
              id="createSelectCategory"
              class="form-control"
              :class="classValidCateId"
              required
              :disabled="disKubun"
            >
              <!-- <option v-if="op2">---</option> -->
              <option value="" v-if="op1" selected>---</option>
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
                  :key="'errCateName' + i"
                >
                  {{ cId }}
                </div>
              </template>
            </span>
          </div>

          <div class="createKubunName align-top">
            <label for="createKubunName">小科目名</label>
            <input
              type="text"
              name="kubun_name"
              id="createKubunName"
              class="form-control mr-1"
              :class="classValidKubunName"
              :disabled="disKubun"
              v-model="kubunName"
              required
              @blur="blurKubun()"
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
        </template>
      </div>

      <!-- ボタン -->
      <div class="col-md-10">
        <input
          type="submit"
          name=""
          id="submit"
          class="btn btn-info mr-2"
          value="Send"
        />
        <a href="./index" class="btn btn-light"> Return </a>
      </div>
    </form>

    <!-- template -->
  </div>
</template>

<script>
export default {
  props: ["pCate", "pType", "pErrors", "csrf"],
  data: function () {
    return {
      // --- this ---
      radio: 1,
      disCate: true,
      disKubun: true,
      evSubmit: "",
      // optionの最初の値
      op1: true,
      op2: true,

      // model：fromバリデーション用
      categoryName: "",
      kubunName: "",
      // バリデーションエラー
      errorCate: "",
      errorKubun: "",
      // is-invalidのクラス名
      classValidType: "",
      classValidCateId: "",
      classValidCateName: "",
      classValidKubunName: "",
      // バリデーションの表示チェック：選択するraidoにより異なるため
      validType: false,
      validCateId: false,
      validCateName: false,
      validKubunName: false,

      // app.bladeでjsonへ変換
      sesMsg: sesMsg, // 使ってない：ただのメモ

      // categoryを変更したかチェック
      chgCate_flg: 0,
      // 置き換え用
    };
  },
  watch: {
    radio: {
      immediate: true,
      handler(val) {
        this.radio = val;
        // console.log("watch raido : " + val);
        // ラジオボタンによるdisabledの設定
        if (val == 1) {
          this.disCate = false;
          this.disKubun = true;
        } else if (val == 2) {
          this.disCate = true;
          this.disKubun = false;
        }

        // optionの最初の値
        // ：切り替えごと表示するかしないかで使い勝手の判断が微妙
        // this.op1 = true;
        // this.op2 = true;
      },
    },
  },
  created: function () {
    // バリデーションエラーからのリダイレクト
    if (sesMsg === "createCategory") {
      this.radio = 1;
    } else if (sesMsg === "createKubun") {
      this.radio = 2;
    }
  },
  mounted: function () {
    console.log("--- mount admin create cate ---");
  },
  updated: function () {
    console.log("--- update admin create cate ---");
  },
  methods: {
    chgType: function (ev) {
      // 最初のoptionを隠す
      this.disOp1 = true;
      this.hideOp1 = true;
      this.disOp2 = true;
      this.hideOp2 = true;
      this.op1 = false;
      this.op2 = false;

      let type = ev.target.value;
      console.log(type);
      this.$emit("chg-type", type);
    },
    // --- form ---
    // バリデーション
    blurCate() {
      let cate = this.categoryName;
      if (!this.disCate && cate.length > 20) {
        this.errorCate = "変更名は20文字までで入力してください";
        this.classValidCateName = "is-invalid";
      } else {
        this.errorCate = "";
        this.classValidCateName = "";
      }
    },
    blurKubun() {
      let kubun = this.kubunName;
      if (!this.disKubun && kubun.length > 20) {
        this.errorKubun = "変更名は20文字までで入力してください";
        this.classValidKubunName = "is-invalid";
      } else {
        this.errorKubun = "";
        this.classValidKubunName = "";
      }
    },
    checkForm: function (ev) {
      let inValid = document.querySelector(".is-invalid");
      if (inValid) {
        alert("不正な入力があります");
        ev.preventDefault();
      }
    },

    // --- method ---
    showValidCate() {
      this.validType = true;
      this.validCateName = true;
      if (this.pErrors.account_type) {
        this.classValidType = "is-invalid";
      }
      if (this.pErrors.category_name) {
        this.classValidCateName = "is-invalid";
      }
    },
    showValidKubun() {
      this.validType = true;
      this.validCateId = true;
      this.validKubunName = true;
      if (this.pErrors.account_type) {
        this.classValidType = "is-invalid";
      }
      if (this.pErrors.category_id) {
        this.classValidCateId = "is-invalid";
      }
      if (this.pErrors.kubun_name) {
        this.classValidKubunName = "is-invalid";
      }
    },
    hiddenValid() {
      this.validType = false;
      this.validCateId = false;
      this.validCateName = false;
      this.validKubunName = false;
      this.classValidType = "";
      this.classValidCateId = "";
      this.classValidCateName = "";
      this.classValidKubunName = "";
    },
  },
};
</script>
