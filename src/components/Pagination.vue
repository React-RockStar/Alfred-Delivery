<template>
  <footer class="location-footer">
    <button class="location-footer__btn location-footer__btn--back">
      <img
        src="@/assets/icons/back-black.png"
        alt="Back Svg Icon"
        @click="goToPage(paginator.number - 1)"
        v-if="!paginator.first"
      />
    </button>
    <p class="footer__text">
      Showing {{ paginator.pageable.offset + 1 }} -
      {{ paginator.pageable.offset + paginator.pageable.pageSize }}, Total
      results: {{ paginator.totalElements }}
    </p>
    <button class="location-footer__btn location-footer__btn--forward">
      <img
        src="@/assets/icons/next-black.png"
        alt="Forward Svg Icon"
        @click="goToPage(paginator.number + 1)"
        v-if="!paginator.last"
      />
    </button>
  </footer>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    paginator: {
      type: Object,
      required: false,
    },
  },
  methods: {
    goToPage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>
  