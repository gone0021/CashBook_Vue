<template>
  <div class="crate">
    <!-- template -->
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
          @change.once="chgTypeOne0()"
          @change="chgType($event)"
        >
          <option id="opAdmCk0" value="">---</option>
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
            value=""
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
      </template>

      <!-- 小科目のみ -->
      <template v-if="radio == 2">
        <div class="createSelectCategory mr-3">
          <label for="createSelectCategory">科目名</label>
          <select
            name="category_id"
            id="createSelectCategory"
            class="form-control"
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

          <div class="invalid-feedback" v-if="errors.category_id">
            <template v-if="validCateId">
              <p
                v-for="(cId, i) in errors.category_id"
                :key="'errCateName' + i"
              >
                {{ cId }}
              </p>
            </template>
          </div>
        </div>

        <div class="createKubunName">
          <label for="createKubunName">小科目名</label>
          <input
            type="text"
            name="kubun_name"
            id="createKubunName"
            class="form-control mr-1"
            :class="classValidKubunName"
            value=""
            :disabled="disKubun"
          />

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
      <a :href="adminIndex" class="btn btn-light"> Return </a>
    </div>

    <!-- template -->
  </div>
</template>

<script>
export default {
  props: ["mCate", "mType", "errors", "", ""],
  data: function () {
    return {
      // this
      radio: 1,
      disCate: true,
      disKubun: true,
      // app.bladeでjsonへ変換
      adminIndex: adminIndex, // bind:hrefで仕様
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
        } else if (sesMsg === "createKubun") {
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

    // --- method ---
    showValidCate() {
      this.validType = true;
      this.validCateName = true;
      this.classValidType = "is-invalid";
      this.classValidCateName = "is-invalid";
    },
    showValidKubun() {
      this.validType = true;
      this.validCateId = true;
      this.validKubunName = true;
      this.classValidType = "is-invalid";
      this.classValidCateId = "is-invalid";
      this.classValidKubunName = "is-invalid";
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
