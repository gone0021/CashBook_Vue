<template>
  <!-- <div v-if="addName == 'credit'"> -->
  <div>
    <input type="hidden" name="id[]" :value="pItems.id" />
    <input type="hidden" name="debit_credit[]" id="" value="2" />
    <div class="inpAcCategory">
      <label :for="`dtlAcCategory${cntCre}`">科目：</label>
      <select
        name="category_id[]"
        :id="`dtlAcCategory${cntCre}`"
        class="form-control"
        v-model="cateId"
        :disabled="pDis"
        required
        @change="chgCateCre($event)"
      >
        <option
          v-for="cate in pCate"
          :value="cate.id"
          :key="`cateCredit${cate.id}`"
        >
          {{ cate.category_name }}
        </option>
      </select>
    </div>

    <div class="inpAcKubun">
      <label :for="`dtlAcKubun${cntCre}`">小科目：</label>
      <select
        name="kubun_id[]"
        :id="`dtlAcKubun${cntCre}`"
        class="form-control"
        v-model="kubunId"
        :disabled="pDis"
      >
        <option
          v-for="kubun in creKubun"
          :value="kubun.id"
          :key="`ddcKbn${kubun.id}`"
        >
          {{ kubun.kubun_name }}
        </option>
        <option value="" id="" v-if="!creKubun.length && noKubun">
          小科目なし
        </option>
      </select>
    </div>

    <div class="inpAcPrice">
      <label :for="`inpAcPrice${cntCre}`" class="align-top mt-2">金額：</label>
      <div class="inpAcPriceinput" :id="`inpAcPriceinput${cntCre}`">
        <input
          type="text"
          name="price[]"
          :id="`dtlAcPrice${cntCre}`"
          class="form-control"
          :class="classValidPrice"
          v-model="price"
          :disabled="pDis"
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
  props: ["addName", "cntCre", "pCate", "pItems", "pDis"],
  data: function () {
    return {
      // --- this ---
      keepKubun: [],
      creKubun: [],
      noKubun: false,
      // --- form ---
      // value：v-modelで入力の度に値が変わるため変数に代入
      cateId: this.pItems.category_id,
      kubunId: this.pItems.kubun_id,
      price: this.pItems.price,
      // エラーメッセージ
      errorPrice: "",
      classValidPrice: "",
      // --- parent ---
      validError: false,
    };
  },
  created: function () {
    console.log("--- created modal detail account credit ---");
    var cid = this.pItems.category_id;
    this.getKubunDtlCre(cid).then(() => {
      this.creKubun = this.keepKubun;
    });
  },
  mounted() {
    // console.log("--- mounted modal detail account ---");
  },
  updated: function () {
    // console.log("--- updated modal detail account ---");
  },
  methods: {
    chgCateCre: function (ev) {
      this.noKubun = true;
      this.getKubunDtlCre(ev).then(() => {
        this.kubunId = this.keepKubun[0].id;
        this.creKubun = this.keepKubun;
      });
    },
    blurPrice: function () {
      if (isNaN(this.price)) {
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

// method
    getKubunDtlCre: function (ev) {
      let cid = NaN;
      if (typeof ev === "string") {
        cid = ev;
      } else {
        cid = ev.target.value;
      }
      // --- ajax get ---
      console.log("parent cid : " + cid);
      return axios
        .get(`../ajax/kubun_by_category`, {
          params: {
            category_id: cid,
          },
        })
        .then(
          function (res) {
            this.keepKubun = res.data;
          }.bind(this)
        )
        .catch(function (e) {
          console.error(e);
        });
    },
  },
};
</script>
