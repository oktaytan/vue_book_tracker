<template>
  <input
    type="text"
    placeholder="Ara..."
    @input="search"
    v-model.trim="input"
    ref="input"
    @blur="closeSearchBar"
    class="search__input"
  />
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SearchBar",
  data() {
    return {
      input: ""
    };
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    search() {
      this.$emit("search-start", this.input);
    },
    closeSearchBar() {
      this.$emit("blur");
    },
    focus() {
      this.$refs.input.focus();
    }
  }
};
</script>

<style scoped>
.search__input {
  color: white;
  width: 100%;
  outline: none;
  font-size: 1.1rem;
}

.search__input:focus {
  outline: none;
}

::placeholder {
  color: white;
}
</style>
