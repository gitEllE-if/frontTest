import Vue from 'vue';
import Vuex from 'vuex';
import api from '../../api/products.js';
import cartApi from '../request';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    currency: "VGTB",
    measure: 'кг'
  },
  mutations: {
    setProducts(state, newProducts) {
      state.products = newProducts;
    },
    setCart(state, newCart) {
      state.cart = newCart;
    },
    addCart(state, item) {
      state.cart.push(item);
    },
    changeCart(state, payload) {
      const idx = state.cart.findIndex((item) => (item.id === payload.id));
      if (idx !== -1) {
        state.cart[idx].amount += payload.amount;
      }
    },
    delCart(state, id) {
      const idx = state.cart.findIndex((item) => (item.id === id));
      if (idx !== -1) {
        if (state.cart[idx].amount > 1) {
          state.cart[idx].amount -= 1;
        }
        else if (state.cart[idx].amount === 1) {
          state.cart.splice(idx, 1);
        }
      }
    },
  },
  actions: {
    async getProductsList({ commit }) {
      try {
        const newProducts = await api.getProductsList();
        if (newProducts) {
          commit('setProducts', newProducts);
        }
      }
      catch (err) {
        console.error('FAIL: get products list => ' + err);
      }
    },
    async getCartList({ commit }) {
      try {
        let res = await cartApi.get('/api/cart/');
        if (res.data) {
          commit('setCart', res.data);
        }
      }
      catch (err) {
        console.error('FAIL: get cart list => ' + err);
      }
    },
    async addToCart({ commit }, item) {
      try {
        let res = await cartApi.post('/api/cart/', item);
        const { success } = res.data;
        if (success) {
          commit('addCart', item);
        }
      }
      catch (err) {
        console.error('FAIL: add to cart => ' + err);
      }
    },
    async delFromCart({ commit }, payload) {
      try {
        let res = await cartApi.delete('/api/cart/' + payload.id);
        const { success } = res.data;
        if (success) {
          commit('delCart', payload.id);
        }
      }
      catch (err) {
        console.error('FAIL: del from cart => ' + err);
      }
    },
    async updateCart({ commit }, payload) {
      try {
        const { id, amount } = payload;
        let res = await cartApi.put('/api/cart/' + id, { amount });
        const { success } = res.data;
        if (success) {
          commit('changeCart', payload);
        }
      }
      catch (err) {
        console.error('FAIL: change cart => ' + err);
      }
    },
  },
  modules: {
  },
  getters: {
    totalPriceGetter: state => state.cart.reduce((total, item) => (total += item.price * item.amount), 0)
  }
})
