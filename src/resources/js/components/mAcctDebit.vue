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
        @change="chgCateDeb($event)"
      >
        <option value="" v-if="op1" selected>選択してください</option>
        <option
          v-for="cate in pCate"
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
        required
      >
        <option value="" v-if="op2" selected>---</option>
        <option
          v-for="dKubun in debKubun"
          :value="dKubun.id"
          :key="`categoryDebit${dKubun.id}`"
        >
          {{ dKubun.kubun_name }}
        </option>
        <option value="" id="" v-if="!debKubun.length && noKubun">
          小科目なし
        </option>
      </select>
    </div>

    <div class="inpAdPrice">
      <label :for="`inpAdPrice${cntDeb}`" class="align-top mt-2">金額：</label>
      <div class="inpAdPriceInput" :id="`inpAdPriceInput${cntDeb}`">
        <input
          type="text"
          name="price[]"
          :id="`inpAdPrice${cntDeb}`"
          class="form-control"
          :class="classValidPrice"
          v-model="debPrice"
          required
          @blur="blurPrice()"
        />

        <div class="invalid-feedback mt-1" v-if="errorPrice">
          {{ errorPrice }}
        </div>
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
    pCate: { default: () => [] },
  },
  data: function () {
    return {
      // --- this ---
      debKubun: [],
      op1: true,
      op2: true,
      noKubun: true,
      // バリデーション用
      errorPrice: "",
      classValidPrice: "",
      // model
      debPrice: "",
      // --- parent ---
      validError: false,
    };
  },
  created: function () {
    // console.log("--- created modal account debit ---");
  },
  updated: function () {
    // console.log("--- updated modal account debit ---");
  },
  methods: {
    blurPrice: function () {
      if (isNaN(this.debPrice)) {
        this.errorPrice = "金額は半角数字のみ";
        this.classValidPrice = "is-invalid";
        this.validError = true;
      } else {
        this.errorPrice = "";
        this.classValidPrice = "";
        this.validError = false;
      }

      this.$emit("p-blur-price", this.validError);
    },

    chgCateDeb: function (ev) {
      this.op1 = false;
      this.op2 = false;
      this.noKubun = true;
      // $eventから値を取得
      let cid = ev.target.value;
    //   console.log("cid : " + cid);
      // ajaxでkubunを取得
      axios
        .get(`./ajax/kubun_by_category`, {
          params: {
            category_id: cid,
          },
        })
        .then(
          function (res) {
            this.debKubun = res.data;
          }.bind(this)
        )
        .catch(function (e) {
          console.error(e);
        });
    },
  },
};
</script>
