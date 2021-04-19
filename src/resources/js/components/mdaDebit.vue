<template>
  <!-- <div v-if="addName == 'debit'"> -->
  <div>
    <input type="hidden" name="id[]" :value="pItems.id" />
    <input type="hidden" name="debit_credit[]" id="" value="1" />
    <div class="inpAdCategory">
      <label :for="`dtlAdCategory${cntDeb}`">科目：</label>
      <select
        name="category_id[]"
        :id="`dtlAdCategory${cntDeb}`"
        class="form-control"
        v-model="cateId"
        :disabled="pDis"
        required
        @change="chgCateCre($event)"
      >
        <option
          v-for="cate in pCate"
          :value="cate.id"
          :key="`cateDebit${cate.id}`"
        >
          {{ cate.category_name }}
        </option>
      </select>
    </div>

    <div class="inpAdKubun">
      <label :for="`dtlAdKubun${cntDeb}`">小科目：</label>
      <select
        name="kubun_id[]"
        :id="`dtlAdKubun${cntDeb}`"
        class="form-control"
        v-model="kubunId"
        :disabled="pDis"
      >
        <option
          v-for="kubun in debKubun"
          :value="kubun.id"
          :key="`ddaKbn${kubun.id}`"
        >
          {{ kubun.kubun_name }}
        </option>
      </select>
    </div>

    <div class="inpAdPrice">
      <label :for="`inpAdPrice${cntDeb}`" class="align-top mt-2">金額：</label>
      <div class="inpAdPriceInput" :id="`inpAdPriceInput${cntDeb}`">
        <input
          type="text"
          name="price[]"
          :id="`dtlAdPrice${cntDeb}`"
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
  props: ["addName", "cntDeb", "pCate", "pItems", "pDis"],
  data: function () {
    return {
      // --- this ---
      keepKubun: [],
      debKubun: [],
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
    console.log("--- created modal detail account debit ---");

    if (!this.kubunId) {
      this.kubunId = 0;
    }
    var cid = this.pItems.category_id;
    this.getKubunDtlDeb(cid).then(() => {
      this.debKubun = this.keepKubun;
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
      this.getKubunDtlDeb(ev).then(() => {
        this.kubunId = this.keepKubun[0].id;
        this.debKubun = this.keepKubun;
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
    getKubunDtlDeb: function (ev, args = null) {
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
            this.keepKubun = [];
            if (!res.data.length) {
              this.keepKubun[0] = { id: 0, kubun_name: "小科目なし" };
            } else {
              this.keepKubun = res.data;
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
