<template>
  <div class="detailBtn col-md-10 mb-3">
    <button
      id="dtlBtnEdit"
      class="btn btn-info btnEdit mr-3"
      @click="dtlbtnEdit"
    >
      edit
    </button>
    <input
      type="submit"
      name="submit"
      value="update"
      id="dtlBtnUpd"
      class="btn btn-info btnUpdate mr-3"
      :disabled="dis"
    />
    <input
      type="submit"
      name="submit"
      value="delete"
      id="dtlBtnDel"
      class="btn btn-outline-danger btnDel mr-3"
    />
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("detal btn.");
  },
  data: function () {
    return {
      dis: true,
    };
  },
  methods: {
    dtlbtnEdit: function () {
      this.dis = false;
    },
  },
};
</script>
