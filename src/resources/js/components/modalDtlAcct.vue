<template>
  <div id="modalAccount" class="ui-widget-content">
    <form action="./update" method="POST">
      <input type="hidden" name="_token" :value="csrf" />
      <div class="mb-3">
        <!-- <input type="text" name="" id="bookNo" value="" disabled /> -->
        <span>book No.</span>
        <span class="detailAccountBookNo mr-3"></span>

        <label for="detailAccountDate" class="">日付：</label>
        <div class="detailAccountinputDate">
          <input
            type="date"
            name="date"
            id="detailAccountDate"
            class="form-control"
            :value="mdaItems[0].date"
            :disabled="dis"
            required
          />
        </div>
      </div>

      <table class="accountTabale">
        <!-- 表示タイトル -->
        <thead>
          <tr>
            <th class="text-center">
              <span class="debit">借方</span>
            </th>

            <th class="text-center">
              <span class="credit">貸方</span>
            </th>
          </tr>
        </thead>

        <!-- 表示内容 -->
        <tbody class="detailAccount">
          <tr class="totalPrice">
            <td class="detailDebitTotalPrice" id="">
              <span>借方合計：</span>
              <span id="detailDebitTotalPrice"></span>
            </td>
            <td class="detailCreditTotalPrice" id="">
              <span>借方合計：</span>
              <span id="detailCreditTotalPrice"></span>
            </td>
          </tr>

          <!-- default -->
          <tr class="detailTop">
            <!-- 借方 -->
            <td class="inpAd">
              <mda-debit
                :add-name="'debit'"
                :cnt-deb="0"
                :m-cate="pCate"
                :m-items="debItems[0]"
                :m-root="root"
                :m-dis="dis"
              ></mda-debit>
            </td>

            <!-- 貸方 -->
            <td class="inpAc">
              <mda-credit
                :add-name="'credit'"
                :cnt-cre="0"
                :m-cate="pCate"
                :m-items="creItems[0]"
                :m-root="root"
                :m-dis="dis"
              ></mda-credit>
            </td>
          </tr>

          <!-- add -->
          <tr v-for="(val, i) in cntTr" :key="`cntTr${i + 1}`">
            <td class="inpAd">
              <mda-debit
              v-if="val === 'debit'"
                :cnt-deb="i + 1"
                :m-cate="pCate"
                :m-items="debItems[i + 1]"
                :m-root="root"
                :m-dis="dis"
              ></mda-debit>
            </td>

            <td class="inpAc">
              <mda-credit
              v-if="val === 'credit'"
                :cnt-cre="i + 1"
                :m-cate="pCate"
                :m-items="creItems[i + 1]"
                :m-root="root"
                :m-dis="dis"
              ></mda-credit>
            </td>
          </tr>

          <!-- comment -->
          <tr class="detailEnd">
            <td colspan="2" id="">
              <div class="inpAccountComment">
                <div class="inpAccountCommentLebel my-aout">
                  <label for="inpAccountComment" class="inpAccountCommentLabel"
                    >コメント：</label
                  >
                </div>
                <div class="inpAccountCommentErea my-aout">
                  <textarea
                    name="comment"
                    id="inpAccountComment"
                    class="form-control"
                    cols="36"
                    rows="3"
                    v-model="mComment"
                    :disabled="dis"
                  ></textarea>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="detailAccountBtn col-md-10 mb-3">
        <button
          type="button"
          id="dtlBtnEdit"
          class="btn btn-info btnEdit mr-3"
          @click="dtlEdit()"
        >
          edit
        </button>
        <input
          type="submit"
          name="submit"
          value="update"
          id="detailAccountUpdate"
          class="btn btn-info btnUpdate mr-3"
          :disabled="dis"
        />
        <input
          type="submit"
          name="submit"
          value="delete"
          id="detailAcountDel"
          class="btn btn-outline-danger btnDel mr-3"
        />
      </div>
    </form>
  </div>
</template>

<script>
import mdaDebit from "./mdaDebit.vue";

export default {
  components: { mdaDebit },
  props: ["csrf", "pCate", "mdaItems"],
  data: function () {
    return {
      // this
      cntTr: [],

      // --- form ---
      // 属性の操作
      dis: true,
      // textareaはv-model
      mComment:this.mdaItems[0].comment,

      // --- ajax ---
      // urlの取得・保存
      root: "",
      // 取得した値の一時保存
      keepKubun: [],

      // --- child ---
      debKubun: [],
      creKubun: [],
      //   debCateId: {},
      debKubunId: [],
      creKubunId: [],

      debItems: [],
      creItems: [],

      //   --- その他 ---
      // addの配列：forで回す用
      addType: [],
      // 代入
    };
  },
  created() {
    console.log("--- created modal detail account ---");
    // urlの取得
    let url = location.href;
    let indexItem = url.indexOf("/item");
    this.root = url.substr(0, indexItem);

    // itmesの数をカウント
    // console.log("items legth");
    let items = this.mdaItems;
    // console.log(items.length);

    // --- childの初期値 ---
    // items
    let dItems = [];
    let citems = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].debit_credit === "1") {
        this.cntTr.push("debit");
        dItems[i] = items[i];
      } else {
        this.cntTr.push("credit");
        citems[i] = items[i];
      }
    }
    // 最初の2つ（deb,cre）は不要のため削除
    this.cntTr.shift();
    this.cntTr.shift();

    this.debItems = dItems.filter(Boolean);
    this.creItems = citems.filter((v) => v);

    // form属性：値を取得してからdisabledを設定
    this.dis = true;
  },
  mounted() {
    console.log("--- mounted modal detail account ---");
  },
  methods: {
    dtlEdit: function () {
      // disabled
      this.dis = false;
    },
  },
};
</script>
