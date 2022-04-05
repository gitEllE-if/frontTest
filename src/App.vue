<template>
  <div id="app">
    <Header />
    <List />
    <Cart />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Cart from "./components/Cart.vue";

export default {
  name: "App",
  components: {
    Header,
    List,
    Cart,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
.g__button {
  cursor: pointer;
  border: 1px solid #908888;
  background-color: #908888;
  color: white;
  border-radius: 5px;
}
.g__button:hover {
  background-color: white;
  color: #908888;
}
.g__title {
  font-size: 20px;
  font-weight: 600;
}
.g__subtitle {
  font-size: 16px;
  font-weight: 400;
}
</style>
