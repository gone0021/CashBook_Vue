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
        @change.once="mChgCreCateTop(cntCre)"
        @change="mGetKubunAcre($event, cntCre)"
      >
        <option value="" class="opCateCredit" :id="`opCateCredit${cntCre}`">
          選択してください
        </option>
        <option
          v-for="obj in mCate"
          :value="obj.id"
          :key="`categoryCredit${obj.id}`"
        >
          {{ obj.category_name }}
        </option>
      </select>
    </div>

    <div class="inpAcKubun">
      <label :for="`inpAcKubun${cntCre}`">小科目：</label>
      <select
        name="kubun_id[]"
        :id="`inpAcKubun${cntCre}`"
        class="form-control"
      ></select>
    </div>

    <div class="inpAcPrice">
      <label :for="`inpAcPrice${cntCre}`">金額：</label>
      <div class="inpAcPriceinput" :id="`inpAcPriceinput${cntCre}`">
        <input
          type="text"
          name="price[]"
          :id="`inpAcPrice${cntCre}`"
          class="form-control"
          value=""
          required
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["addBtn", "cntCre", "mCate"],
  data: function () {
    return {
      //
    };
  },
  updated: function () {
    if (this.addBtn == "credit") {
      console.log("add : " + this.addBtn);
      console.log("props : " + this.cntCre);
    }
  },
  methods: {
    mChgCreCateTop: function (i) {
      //   console.log("mcre:i = " + i);
      this.$emit("m-chg-cre-cate-top", i);
    },
    mGetKubunAcre: function (ev, i) {
      // 引数のキャスト
      Number(i);

      // 該当するselectの取得
      let select = document.querySelector(`#inpAcKubun${i}`);
      //   値があれば削除
      while (select.lastChild) {
        select.removeChild(select.lastChild);
      }

      // $eventから値を取得
      let cid = ev.target.value;
      axios
        .get("./ajax/kubun_by_category", {
          params: {
            category_id: cid,
          },
        })
        .then(
          function (res) {
            let data = res.data;
            console.log(data.length);
            console.log(data);
            // optionの追加
            if (!data.length) {
              let option = document.createElement("option");
              option.text = "小科目なし";
              option.value = 0;
              select.appendChild(option);
            } else {
              for (let j = 0; j < data.length; j++) {
                let option = document.createElement("option");
                option.text = data[j].kubun_name;
                option.value = data[j].id;
                select.appendChild(option);
              }
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
