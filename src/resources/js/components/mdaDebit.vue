<template>
  <!-- <div v-if="addName == 'debit'"> -->
    <div>
    <input type="hidden" name="id[]" :value="mItems.id" />
    <input type="hidden" name="debit_credit[]" id="" value="1" />
    <div class="inpAdCategory">
      <label :for="`dtlAdCategory${cntDeb}`">科目：</label>
      <select
        name="category_id[]"
        :id="`dtlAdCategory${cntDeb}`"
        class="form-control"
        v-model="cateId"
        :disabled="mDis"
        required
        @change="chgDtlDebCate($event, cntDeb)"
      >
        <option
          v-for="cate in mCate"
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
        :disabled="mDis"
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
      <label :for="`inpAdPrice${cntDeb}`">金額：</label>
      <div class="inpAdPriceInput" :id="`inpAdPriceInput${cntDeb}`">
        <input
          type="text"
          name="price[]"
          :id="`inpAdPrice${cntDeb}`"
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
  props: ["addName", "cntDeb", "mCate", "mRoot", "mItems", "mDis"],
  data: function () {
    return {
      // --- this ---
      keepKubun: [],
      debKubun: [],
      // --- form ---
      // value：v-modelで入力の度に値が変わるため変数に代入
      cateId: this.mItems.category_id,
      kubunId: this.mItems.kubun_id,
      //
    };
  },
  // watcherの書き方：メモ残し
  //   watch: {
  //     mKubunId: {
  //       // 外からプロパティの中身が変更になったら実行される
  //       immediate: true,
  //       handler(val) {
  //         this.kubunId = val;
  //       },
  //     },
  //   },
  created: function () {
    console.log("--- created modal detail account debit ---");

    if (this.addName == "debit") {
      console.log("add : " + this.addName);
      console.log("props : " + this.mKubunId);
    }

    var cid = this.mItems.category_id;
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
    chgDtlDebCate: function (ev, args = null) {
      this.getKubunDtlDeb(ev).then(() => {
        this.kubunId = this.keepKubun[0].id;
        this.debKubun = this.keepKubun;
      });
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
        .get(`${this.mRoot}/ajax/kubun_by_category`, {
          params: {
            category_id: cid,
          },
        })
        .then(
          function (res) {
            // console.log("--- ajax ---");
            // console.log(res.data);
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
