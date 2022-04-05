<template>
  <main class="product-list">
    <div class="card" v-for="product in products" :key="product.id">
      <p class="g__subtitle card-title">{{ product.title }}</p>
      <img class="card-image" :src="product.image" alt="" />
      <p class="card-price">Цена: {{ product.price }} {{ currency }}</p>

      <div class="card-amount">
        <input
          class="card-input"
          placeholder="0"
          type="number"
          v-model.number="amounts[product.id]"
          min="1"
          max="1000"
          step="1"
        />
        <span> {{ measure }}</span>
      </div>

      <button
        class="g__button card-button"
        @click="addToCart(product, amounts[product.id])"
      >
        в корзину
      </button>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "List",
  data() {
    return {
      amounts: {},
      timerId: null,
      isErrorInput: false,
    };
  },

  computed: {
    ...mapState({
      products: (state) => state.products,
      cart: (state) => state.cart,
      currency: (state) => state.currency,
      measure: (state) => state.measure,
    }),
  },

  methods: {
    fetchProductsList() {
      this.$store.dispatch("getProductsList");
    },
    addToCart(product, amount) {
      if (!amount || amount < 0 || !Number.isInteger(amount)) {
        return;
      }
      this.cart.findIndex((item) => item.id === product.id) === -1
        ? this.$store.dispatch("addToCart", { ...product, amount })
        : this.$store.dispatch("updateCart", {
            id: product.id,
            amount,
          });
    },
  },
  created() {
    this.fetchProductsList();
    this.$store.dispatch("getCartList");
  },
  mounted() {
    this.timerId = setInterval(this.fetchProductsList, 2000);
  },
  beforeDestroy() {
    clearInterval(this.timerId);
  },
};
</script>

<style scoped>
.product-list {
  padding: 10px;
}

.card {
  display: inline-block;
  width: calc(100% / 3 - 10px);
  border: 1px solid #908888;
  border-radius: 5px;
  text-align: center;
  padding: 10px;
  margin: 5px;
}
.card-image {
  width: 100%;
}
.card-button {
  width: 120px;
  padding: 5px 10px;
  margin: 5px;
}
.card-input {
  outline: none;
  border: 1px solid #908888;
  border-radius: 5px;
  padding: 2px;
  text-align: center;
  width: 100px;
}
.card-input:invalid:not(:placeholder-shown) {
  border: 1px solid red;
}

@media (max-width: 840px) {
  .card {
    width: calc(100% / 2 - 10px);
  }
}

@media (max-width: 420px) {
  .card {
    width: 100%;
  }
}
</style>
