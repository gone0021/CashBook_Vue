<template>
  <div v-if="addBtn == 'credit'">
    <div class="inpAcCategory">
      <input type="hidden" name="debit_credit[]" id="" value="2" />
      <label :for="`inpAcCategory${cntCre}`">科目：</label>
      <select
        name="category_id[]"
        :id="`inpAcCategory${cntCre}`"
        class="form-control"
        required
        @change="chgCateCre($event)"
      >
        <option value="" v-if="op1" selected>選択してください</option>
        <option
          v-for="obj in pCate"
          :value="obj.id"
          :key="`categoryCredit${obj.id}`"
        >
          {{ obj.category_name }}
        </option>
      </select>
    </div>

    <div class="inpAcKubun">
      <label for="creKubun">小科目：</label>
      <select
        name="kubun_id[]"
        :id="`inpAcKubun${cntCre}`"
        class="form-control"
        required
      >
        <option value="" v-if="op2" selected>---</option>
        <option
          v-for="cKubun in creKubun"
          :value="cKubun.id"
          :key="`categoryCredit${cKubun.id}`"
        >
          {{ cKubun.kubun_name }}
        </option>
      </select>
    </div>

    <div class="inpAcPrice">
      <label :for="`inpAcPrice${cntCre}`" class="align-top mt-2">金額：</label>
      <div class="inpAcPriceinput" :id="`inpAcPriceinput${cntCre}`">
        <input
          type="text"
          name="price[]"
          :id="`inpAcPrice${cntCre}`"
          class="form-control"
          :class="classValidPrice"
          v-model="crePrice"
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
  props: ["addBtn", "cntCre", "pCate"],
  data: function () {
    return {
      // --- this ---
      creKubun: [],
      op1: true,
      op2: true,

      // バリデーション用
      errorPrice: "",
      classValidPrice: "",
      // model
      crePrice: "",
      // --- parent ---
      validError: false,
    };
  },
  created: function () {
    // console.log("--- created modal account credit ---");
  },
  updated: function () {
    // console.log("--- updated modal account credit ---");
  },
  methods: {
    blurPrice: function () {
      if (isNaN(this.crePrice)) {
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

    chgCateCre: function (ev) {
      this.op1 = false;
      this.op2 = false;
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
            this.creKubun = [];
            if (!res.data.length) {
              this.creKubun[0] = { id: 0, kubun_name: "小科目なし" };
            } else {
              this.creKubun = res.data;
            }
          }.bind(this)
        )
        .catch(function (e) {
          console.error(e);
        });
    },
  },
};
</script>
