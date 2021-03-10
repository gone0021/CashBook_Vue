<template>
  <tbody>
    <tr
      v-for="cDeb in cntDeb"
      :key="`mAccountDebit${cDeb}`"
      :id="`addDebitTr${cDeb}`"
    >
      <td class="inpAd">
        <div class="inpAdCategory">
          <input type="hidden" name="debit_credit[]" id="" value="1" />
          <label :for="`inpAdCategory${cDeb}`">科目：</label>
          <select
            name="category_id[]"
            :id="`inpAdCategory${cDeb}`"
            class="form-control"
            required
            @change.once="debCategory(cDeb)"
          >
            <option value="" class="opCatDebite" :id="`opCateDebit${cDeb}`">
              選択してください
            </option>
            <option
              v-for="obj in mCate"
              :value="obj.id"
              :key="`categoryDebit${obj.id}`"
            >
              {{ obj.category_name }}
            </option>
          </select>
        </div>
        <div class="inpAdKubun">
          <label :for="`inpAdKubun${cDeb}`">小科目：</label>
          <select
            name="kubun_id[]"
            :id="`inpAdKubun${cDeb}`"
            class="form-control"
          ></select>
        </div>
        <div class="inpAdPrice">
          <label :for="`inpAdPrice${cDeb}`">金額：</label>
          <div class="inpAdPriceInput" :id="`inpAdPriceInput${cDeb}`">
            <input
              type="text"
              name="price[]"
              :id="`inpAdPrice${cDeb}`"
              class="form-control"
              value=""
              required
            />
          </div>
        </div>
      </td>
      <td class="addDebitTb"></td>
    </tr>

    <!-- credit -->
    <tr
      v-for="cCre in cntCre"
      :key="`mAccountCredit${cCre}`"
      :id="`addCreditTr${cCre}`"
    >
      <td class="addCreditTb"></td>
      <td class="inpAc" :id="`inpAc${cCre}`">
        <input type="hidden" name="debit_credit[]" id="" value="2" />
        <div class="inpAcCategory">
          <label :for="`inpAcCategory${cCre}`">科目：</label>
          <select
            name="category_id[]"
            :id="`inpAcCategory${cCre}`"
            class="form-control"
            required
            @change.once="creCategory(cCre)"
          >
            <option value="" class="opCateCredit" :id="`opCateCredit${cCre}`">
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
          <label :for="`inpAcKubun${cCre}`">小科目：</label>
          <select
            name="kubun_id[]"
            :id="`inpAcKubun${cCre}`"
            class="form-control"
          ></select>
        </div>

        <div class="inpAcPrice">
          <label :for="`inpAcPrice${cCre}`">金額：</label>
          <div class="inpAcPriceinput" :id="`inpAcPriceinput${cCre}`">
            <input
              type="text"
              name="price[]"
              :id="`inpAcPrice${cCre}`"
              class="form-control"
              value=""
              required
            />
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  props: ["mCate","cntDeb","cntCre",],
  data: function () {
    return {
      //
    };
  },
  mounted() {
    console.log("add accout");
  },
  methods: {
    //
  },
};
</script>
