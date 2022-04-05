<template>
  <div class="cart-list" v-if="cart.length">
    <div class="cart-item" v-for="item in cart" :key="item.id">
      <div class="cart-item-cell">
        {{ item.title }}
      </div>
      <div class="cart-item-cell">{{ item.amount }} {{ measure }}</div>
      <div class="cart-item-cell">{{ item.price }}&nbsp;{{ currency }}</div>
      <div class="cart-item-cell">
        {{ (item.price * item.amount).toFixed(2) }}
      </div>
      <button
        class="g__button cart-item-cell cart-item-button"
        @click="delFromCart(item.id)"
      >
        &#215;
      </button>
    </div>
    <div class="cart-item cart-header">
      <div class="cart-item-cell">ПРОДУКТ</div>
      <div class="cart-item-cell">КОЛИЧЕСТВО</div>
      <div class="cart-item-cell">СТОИМОСТЬ</div>
      <div class="cart-item-cell">ИТОГО</div>
      <div class="cart-item-cell">УДАЛИТЬ</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Cart",
  computed: {
    ...mapState({
      cart: (state) => state.cart,
      currency: (state) => state.currency,
      measure: (state) => state.measure,
    }),
  },
  methods: {
    delFromCart(id) {
      this.$store.dispatch("delFromCart", { id });
    },
  },
};
</script>


<style scoped>
.cart-list {
  display: flex;
  flex-direction: column-reverse;
  padding: 10px;
  background: #e5e5e5;
  max-width: 700px;
  margin: 0 auto;
}
.cart-item {
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr) 0.5fr;
  gap: 5px;
  margin-bottom: 5px;
}
.cart-item-cell:last-child {
  justify-self: center;
}
.cart-header {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 15px;
}
.cart-item-button {
  width: 20px;
}

@media (max-width: 520px) {
  .cart-header {
    font-size: 11px;
  }
  .cart-item-cell {
    font-size: 12px;
  }
}
@media (max-width: 380px) {
  .cart-header {
    font-size: 8px;
  }
  .cart-item-cell {
    font-size: 9px;
  }
}
</style>
