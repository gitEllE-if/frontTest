<template>
  <header class="header">
    <h3 class="g__title">
      Товаров в корзине на: {{ totalPrice.toFixed(2) }}&nbsp;{{ currency }}
    </h3>
  </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      cartPrice: 0,
    };
  },
  computed: {
    ...mapState({ currency: (state) => state.currency }),
    ...mapGetters({ totalPrice: "totalPriceGetter" }),
  },
};
</script>

<style scoped>
.header {
  padding: 10px;
  background: #e5e5e5;
  text-align: center;
}
</style>