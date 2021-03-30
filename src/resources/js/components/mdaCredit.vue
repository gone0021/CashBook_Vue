<template>
  <!-- <div v-if="addName == 'credit'"> -->
    <div>
    <input type="hidden" name="id[]" :value="mItems.id" />
    <input type="hidden" name="debit_credit[]" id="" value="2" />
    <div class="inpAcCategory">
      <label :for="`dtlAcCategory${cntCre}`">科目：</label>
      <select
        name="category_id[]"
        :id="`dtlAcCategory${cntCre}`"
        class="form-control"
        v-model="cateId"
        :disabled="mDis"
        required
        @change="chgDtlCreCate($event, cntCre)"
      >
        <option
          v-for="cate in mCate"
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
        :disabled="mDis"
      >
        <option
          v-for="kubun in creKubun"
          :value="kubun.id"
          :key="`ddcKbn${kubun.id}`"
        >
          {{ kubun.kubun_name }}
        </option>
      </select>
    </div>

    <div class="inpAcPrice">
      <label :for="`inpAcPrice${cntCre}`">金額：</label>
      <div class="inpAcPriceinput" :id="`inpAcPriceinput${cntCre}`">
        <input
          type="text"
          name="price[]"
          :id="`inpAcPrice${cntCre}`"
          class="form-control"
          :value="mItems.price"
          :disabled="mDis"
          required
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["addName", "cntCre", "mCate", "mRoot", "mItems", "mDis"],
  data: function () {
    return {
      // --- this ---
      keepKubun: [],
      creKubun: [],
      // --- form ---
      // value：v-modelで入力の度に値が変わるため変数に代入
      cateId: this.mItems.category_id,
      kubunId: this.mItems.kubun_id,
      //
    };
  },
  created: function () {
    console.log("--- created modal detail account credit ---");

    if (this.addName == "credit") {
      console.log("add : " + this.addName);
      console.log("props : " + this.mKubunId);
    }

    var cid = this.mItems.category_id;
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
    chgDtlCreCate: function (ev, args = null) {
      this.getKubunDtlCre(ev).then(() => {
        this.kubunId = this.keepKubun[0].id;
        this.creKubun = this.keepKubun;
      });
    },

    // method
    getKubunDtlCre: function (ev, args = null) {
      let cid = NaN;
      if (typeof ev === "string") {
        cid = ev;
      } else {
        cid = ev.target.value;
      }
      // --- ajax get ---
      console.log("parent cid : " + cid);
      return axios
        .get(`${this.mRoot}/ajax/kubun_by_category`, {
          params: {
            category_id: cid,
          },
        })
        .then(
          function (res) {
            console.log("--- ajax ---");
            console.log(res.data);

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
