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
          :value="nmObj.dc0"
        />
        <div class="inpNaCategory">
          <label for="inpNaCategory">{{ nmObj.title }}</label>
          <select
            name="category_id[]"
            id="inpNaCategory"
            class="form-control"
            required
            @change.once="delNaCateTop()"
            @change="getKubunNomal($event, 'asset')"
          >
            <option value="" class="selectFormatNomalAccet" id="opna0">
              選択してください
            </option>
            <option
              v-for="cateDeb in mCate"
              :value="cateDeb.id"
              :key="'categoryDebit' + nmObj.name + cateDeb.id"
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
              :value="ask.category_id"
              :key="'asset-kubun' + nmObj.name + i"
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
          :value="nmObj.dc1"
        />
        <div class="inpNpCategory">
          <label for="inpNpCategory">内容：</label>
          <select
            name="category_id[]"
            id="inpNpCategory"
            class="form-control"
            required
            @change.once="delNpCateTop()"
            @change="getKubunNomal($event, 'pl')"
          >
            <option value="" class="selectFormatNomalPl" id="opnp0">
              選択してください
            </option>
            <option
              v-for="catePl in mCate"
              :value="catePl.id"
              :key="'categoryCredit' + nmObj.name + catePl.id"
            >
              {{ catePl.category_name }}
            </option>
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
              :value="plk.category_id"
              :key="'pl-kubun' + nmObj.name + i"
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

      <new-btn v-if="mAction == 'new'" :new-btn-name="'inputNomal'"></new-btn>
      <detail-btn v-if="mAction == 'detail'"></detail-btn>
    </form>
  </div>
  <!-- </modal> -->
</template>

<script>
import DetailBtn from "./detailBtn.vue";
import NewBtn from "./newBtn.vue";
export default {
  components: { NewBtn, DetailBtn },
  props: ["mDate", "nmObj", "mCate", "csrf", "mAction"],
  data: function () {
    return {
      cataId: "",
      mKubun: "",
      asKubun: "",
      plKubun: "",
    };
  },
  mounted: function () {
    // console.log("modal nomal");
    // console.log("date = " + this.mDate);
    console.log("action : " + this.mAction);
  },
  updated: function () {
    console.log("action : " + this.mAction);
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
    // ワンテンポ遅れるためmGetKubunの第2引数で対応
    // chgCateAsset: function (ev) {
    //   this.mGetKubun(ev);
    //   this.asKubun = this.mKubun;
    //   console.log("kubun = " + this.asKubun);
    // },
    // chgCatePl: function (ev) {
    //   this.mGetKubun(ev);
    //   this.plKubun = this.mKubun;
    //   console.log("kubun = " + this.plKubun);
    // },

    getKubunNomal: function (ev, args) {
      let cid = ev.target.value;
      console.log("id = " + cid);
      this.$emit("m-get-kubun", cid);
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
            // this.mKubun = res.data;
            if (args == "asset") {
              this.asKubun = res.data;
            } else {
              this.plKubun = res.data;
            }
            // console.log(title);
          }.bind(this)
        )
        .catch(function (e) {
          console.error(e);
        });
    },
  },
};
</script>
