<template>
  <!-- <modal
    name="nomal"
    classes="nomalModal"
    :draggable="true"
    :reset="true"
    :width="600"
    :minWidth="600"
    :maxWidth="600"
    :height="480"
    :minHeight="480"
  > -->
  <div id="modalNomal" class="nomalModalInner">
    <form action="./items/store" method="post" @submit="checkForm">
      <input type="hidden" name="_token" :value="csrf" />

      <div class="inpNmlDate">
        <label for="inpNmlDate" class="">日付：</label>
        <div class="inpNmlinputDate">
          <input
            type="date"
            name="date"
            id="inpNmlDate"
            class="form-control"
            :class="classValidDate"
            v-model="date"
            required
            @blur="validDate()"
          />
          <div class="invalid-feedback mt-1" v-if="errorDate">
            {{ errorDate }}
          </div>
        </div>
      </div>

      <!-- asset -->
      <div class="inpNa">
        <input type="hidden" name="submit" value="inpNml" />

        <input
          type="hidden"
          name="debit_credit[]"
          id="inpNmlDc0"
          :value="pVal.dc0"
        />
        <div class="inpNaCategory">
          <label for="inpNaCategory">{{ pVal.title }}</label>
          <select
            name="category_id[]"
            id="inpNaCategory"
            class="form-control"
            required
            @change="chgCate1($event)"
          >
            <option value="" v-if="op1" selected>選択してください</option>
            <option
              v-for="cateDeb in pCateAsset"
              :value="cateDeb.id"
              :key="'categoryDebit' + pVal.name + cateDeb.id"
            >
              {{ cateDeb.category_name }}
            </option>
          </select>
        </div>

        <div class="inpNaKubun">
          <label for="inpNaKubun">小科目：</label>
          <select
            name="kubun_id[]"
            id="inpNaKubun"
            class="form-control"
            required
          >
            <option value="" v-if="op2" selected>---</option>
            <option
              v-for="(ask, i) in pKubun1"
              :value="ask.id"
              :key="'asset-kubun' + pVal.name + i"
            >
              {{ ask.kubun_name }}
            </option>
          </select>
        </div>
      </div>

      <!-- pl income or expense -->
      <div class="inpNp">
        <input
          type="hidden"
          name="debit_credit[]"
          id="inpNmlDc"
          :value="pVal.dc1"
        />
        <div class="inpNpCategory">
          <label for="inpNpCategory">内容：</label>
          <select
            name="category_id[]"
            id="inpNpCategory"
            class="form-control"
            required
            @change="chgCate2($event, 'pl')"
          >
            <option value="" v-if="op3" selected>選択してください</option>
            <template v-if="pVal.name == 'income'">
              <option
                v-for="catePl in pCateIncome"
                :value="catePl.id"
                :key="'categoryCredit' + pVal.name + catePl.id"
              >
                {{ catePl.category_name }}
              </option>
            </template>
            <template value="" v-if="pVal.name == 'expense'">
              <option
                v-for="catePl in pCateExpense"
                :value="catePl.id"
                :key="'categoryCredit' + pVal.name + catePl.id"
              >
                {{ catePl.category_name }}
              </option>
            </template>
          </select>
        </div>

        <div class="inpNpKubun">
          <label for="inpNpKubun">小科目：</label>
          <select
            name="kubun_id[]"
            id="inpNpKubun"
            class="form-control"
            required
          >
            <option value="" v-if="op4" selected>---</option>
            <option
              v-for="(plk, i) in pKubun2"
              :value="plk.id"
              :key="'pl-kubun' + pVal.name + i"
            >
              {{ plk.kubun_name }}
            </option>
          </select>
        </div>
      </div>

      <div class="inpNmlPrice">
        <label for="inpNmlPrice" class="mt-2 align-top">金額：</label>
        <div class="inpNmlinputPrice align-top">
          <input
            type="text"
            name="price"
            id="inpNmlPrice"
            class="form-control"
            :class="classValidPrice"
            v-model="price"
            required
          />
          <div class="invalid-feedback mt-1" v-if="errorPrice">
            {{ errorPrice }}
          </div>
        </div>
      </div>

      <div class="inpNmlCommentSubmit">
        <label for="inpNmlComment" class="inpNmlCommentLabel">コメント：</label>
        <div class="inpNmlComment">
          <textarea
            name="comment"
            id="inpNmlComment"
            class="form-control"
            :class="classValidComment"
            cols="36"
            rows="5"
            v-model="comment"
          ></textarea>
          <div class="invalid-feedback mt-1" v-if="errorComment">
            {{ errorComment }}
          </div>
        </div>
      </div>

      <div class="newBtn">
        <input
          type="submit"
          name="inputNomal"
          id="newBtn"
          value="new"
          class="btn btn-info"
        />
      </div>
    </form>
  </div>
  <!-- </modal> -->
</template>

<script>
export default {
  props: [
    "csrf",
    "pDate",
    "pVal",
    "pCateAsset",
    "pCateExpense",
    "pCateIncome",
    "pKubun1",
    "pKubun2",
  ],
  data: function () {
    return {
      cataId: "",
      mKubun: "",
      asKubun: "",
      plKubun: "",
      // optionの最初の値
      op1: true,
      op2: true,
      op3: true,
      op4: true,
      // model：fromバリデーション用
      date: this.pDate,
      price: "",
      comment: "",
      // バリデーションエラー
      errorDate: "",
      errorPrice: "",
      errorComment: "",
      // is-invalidのクラス名
      classValidDate: "",
      classValidPrice: "",
      classValidComment: "",
      // 置き換え用
    };
  },
  mounted: function () {
    console.log("--- mount modal nomal ---");
    // console.log("date = " + this.pDate);
  },
  updated: function () {
    console.log("--- update modal nomal ---");
  },
  methods: {
    chgCate1: function (ev) {
      this.op1 = false;
      this.op2 = false;
      let cid = ev.target.value;
      this.$emit("chg-cate1", cid);
    },
    chgCate2: function (ev) {
      this.op3 = false;
      this.op4 = false;
      let cid = ev.target.value;
      this.$emit("chg-cate2", cid);
    },
    // バリデーション
    validDate: function () {
      let date = this.date;
      console.log(date);
      if (!date.match(/^\d{4}\-\d{2}\-\d{2}$/)) {
        this.errorDate = "正しい日付を入力してください";
        this.classValidDate = "is-invalid";
      }
      var y = date.split("-")[0];
      if (y < 2008) {
        this.errorDate = "2010年以降で入力してください";
        this.classValidDate = "is-invalid";
      }
    },
    checkForm: function (ev) {
      let date = this.date;
      let price = this.price;
      let comment = this.comment;
      // 日付
      if (!date.match(/^\d{4}\-\d{2}\-\d{2}$/)) {
        this.errorDate = "正しい日付を入力してください";
        this.classValidDate = "is-invalid";
        ev.preventDefault();
      }
      var y = date.split("-")[0];
      if (y < 2009) {
        this.errorDate = "2010年以降で入力してください";
        this.classValidDate = "is-invalid";
        ev.preventDefault();
      }
      // 金額
      if (isNaN(price)) {
        this.errorPrice = "金額は半角数字のみで入力してください";
        this.classValidPrice = "is-invalid";
        ev.preventDefault();
      }
      // コメント
      if (comment.length > 200) {
        this.errorComment = "コメントは200文字以内で入力してください";
        this.classValidComment = "is-invalid";
        ev.preventDefault();
      }
    },
  },
};
</script>
