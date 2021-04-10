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
            @change.once="chgTypeOne0()"
            @change="chgType($event)"
          >
            <option id="opAdmCk0" value="">---</option>
            <option v-for="(type, i) in mType" :value="i" :key="'type' + i">
              {{ type }}
            </option>
          </select>

          <span class="invalid-feedback" v-if="mErrors.account_type">
            <template v-if="validType">
              <div
                v-for="(acctType, i) in mErrors.account_type"
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
              required
              :class="classValidCateName"
              :disabled="disCate"
              v-model="categoryName"
            />

            <div class="invalid-feedback mt-1" v-if="errorCate">
              {{ errorCate }}
            </div>

            <span class="invalid-feedback" v-if="mErrors.category_name">
              <template v-if="validCateName">
                <div
                  v-for="(cName, i) in mErrors.category_name"
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
              required
              :class="classValidCateId"
              :disabled="disKubun"
            >
              <option value="" id="opAdmCk1" selected>---</option>
              <option
                v-for="(cate, i) in mCate"
                :value="cate.id"
                :key="'cate' + i"
              >
                {{ cate.category_name }}
              </option>
            </select>

            <span class="invalid-feedback" v-if="mErrors.category_id">
              <template v-if="validCateId">
                <div
                  v-for="(cId, i) in mErrors.category_id"
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
              required
              :class="classValidKubunName"
              :disabled="disKubun"
              v-model="kubunName"
            />

            <div class="invalid-feedback mt-1" v-if="errorKubun">
              {{ errorKubun }}
            </div>

            <span class="invalid-feedback" v-if="mErrors.kubun_name">
              <template v-if="validKubunName">
                <div
                  v-for="(kName, i) in mErrors.kubun_name"
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
  props: ["mCate", "mType", "mErrors", "csrf"],
  data: function () {
    return {
      // --- this ---
      radio: 1,
      disCate: true,
      disKubun: true,
      evSubmit: "",
      // model
      categoryName: "",
      kubunName: "",
      // バリデーションエラー
      errorCate: "",
      errorKubun: "",

      // app.bladeでjsonへ変換
      sesMsg: sesMsg, // 使ってない：ただのメモ

      // バリデーションの表示チェック
      validType: false,
      validCateId: false,
      validCateName: false,
      validKubunName: false,

      classValidType: "",
      classValidCateId: "",
      classValidCateName: "",
      classValidKubunName: "",

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
        // ラジオボタンによるdisabledの設定
        if (val == 1) {
          this.disCate = false;
          this.disKubun = true;
        } else if (val == 2) {
          this.disCate = true;
          this.disKubun = false;
        }

        // バリデーションメッセージの表示設定
        if (sesMsg === "createCategory") {
          if (val == 1) {
            this.showValidCate();
          } else {
            this.hiddenValid();
          }
        }
        if (sesMsg === "createKubun") {
          if (val == 2) {
            this.showValidKubun();
          } else {
            this.hiddenValid();
          }
        }
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
      this.validCateName = true;
      if (this.mErrors.account_type) {
        this.classValidType = "is-invalid";
      }
      if (this.mErrors.category_name) {
        this.classValidCateName = "is-invalid";
      }
    },
    showValidKubun() {
      this.validType = true;
      this.validCateId = true;
      this.validKubunName = true;
      if (this.mErrors.account_type) {
        this.classValidType = "is-invalid";
      }
      if (this.mErrors.category_id) {
        this.classValidCateId = "is-invalid";
      }
      if (this.mErrors.kubun_name) {
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
