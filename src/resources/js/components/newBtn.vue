<template>
  <div class="newBtn">
    <input
      type="submit"
      :name="newBtnName"
      id="newBtn"
      value="new"
      class="btn btn-info"
    />
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log("new btn");
  },
  props: {
    newBtnName: {
      type: String,
      default: "",
    },
  },
};
</script>
