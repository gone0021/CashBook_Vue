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
    <form action="./items/store" method="post">
      <input type="hidden" name="_token" :value="csrf" />

      <div class="inpNmlDate">
        <label for="inpNmlDate" class="">日付：</label>
        <div class="inpNmlinputDate">
          <input
            type="date"
            name="date"
            id="inpNmlDate"
            class="form-control"
            :value="mDate"
            required
          />
        </div>
      </div>

      <!-- asset -->
      <div class="inpNa">
        <input type="hidden" name="submit" value="inpNml" />

        <input
          type="hidden"
          name="debit_credit[]"
          id="inpNmlDc0"
          :value="mnVal.dc0"
        />
        <div class="inpNaCategory">
          <label for="inpNaCategory">{{ mnVal.title }}</label>
          <select
            name="category_id[]"
            id="inpNaCategory"
            class="form-control"
            required
            @change="getKubunNomal($event, 'asset')"
          >
            <option value="" class="selectFormatNomalAccet" id="opna0">
              選択してください
            </option>
            <option
              v-for="cateDeb in mCateAsset"
              :value="cateDeb.id"
              :key="'categoryDebit' + mnVal.name + cateDeb.id"
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
            <option
              v-for="(ask, i) in asKubun"
              :value="ask.id"
              :key="'asset-kubun' + mnVal.name + i"
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
          :value="mnVal.dc1"
        />
        <div class="inpNpCategory">
          <label for="inpNpCategory">内容：</label>
          <select
            name="category_id[]"
            id="inpNpCategory"
            class="form-control"
            required
            @change="getKubunNomal($event, 'pl')"
          >
            <option value="" class="selectFormatNomalPl" id="opnp0">
              選択してください
            </option>

            <template v-if="mnVal.name == 'income'">
              <option
                v-for="catePl in mCateIncome"
                :value="catePl.id"
                :key="'categoryCredit' + mnVal.name + catePl.id"
              >
                {{ catePl.category_name }}
              </option>
            </template>
            <template v-if="mnVal.name == 'expense'">
              <option
                v-for="catePl in mCateExpense"
                :value="catePl.id"
                :key="'categoryCredit' + mnVal.name + catePl.id"
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
            <option
              v-for="(plk, i) in plKubun"
              :value="plk.id"
              :key="'pl-kubun' + mnVal.name + i"
            >
              {{ plk.kubun_name }}
            </option>
          </select>
        </div>
      </div>

      <div class="inpNmlPrice">
        <label for="inpNmlPrice" class="">金額：</label>
        <div class="inpNmlinputPrice">
          <input
            type="text"
            name="price"
            id="inpNmlPrice"
            class="form-control"
            value=""
            required
          />
        </div>
      </div>

      <div class="inpNmlCommentSubmit">
        <label for="inpNmlComment" class="inpNmlCommentLabel">コメント：</label>
        <div class="inpNmlComment">
          <textarea
            name="comment"
            id="inpNmlComment"
            class="form-control"
            cols="36"
            rows="5"
          ></textarea>
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
    "mDate",
    "mnVal",
    "csrf",
    "mCateAsset",
    "mCateExpense",
    "mCateIncome",
  ],
  data: function () {
    return {
      cataId: "",
      mKubun: "",
      asKubun: "",
      plKubun: "",

      // 置き換え用
      rep: {},
    };
  },
  mounted: function () {
    console.log("--- mount modal nomal ---");
    // console.log("date = " + this.mDate);
  },
  updated: function () {
    console.log("--- update modal nomal ---");
  },
  methods: {
    delNaCateTop: function () {
      let chgCategory = document.querySelector("#inpNaCategory");
      let child = document.querySelector("#opna0");
      chgCategory.removeChild(child);
    },
    delNpCateTop: function () {
      let bCategory = document.querySelector("#inpNpCategory");
      let child = document.querySelector("#opnp0");
      bCategory.removeChild(child);
    },

    getKubunNomal: function (ev, args) {
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
            console.log("getkubun-nomal");
            console.log(data);
            if (args == "asset") {
              this.asKubun = res.data;
            } else {
              this.plKubun = res.data;
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
