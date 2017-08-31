<template>
  <div id="app">
    <focustrap :active="isActive">
      <div>
        <a href="#" tabindex="0">test</a>
        <a href="#" tabindex="0">test</a>
        <a href="#" tabindex="0">test</a>
        <a href="#" tabindex="0">test</a>
        <a href="#" tabindex="0">test</a>
        <a>test</a>
        <input type="text" />
      </div>
    </focustrap>

    <br /><br /><br />

    <button @click="handleClick">toggle</button>


    <button @click="isActive = false">active off</button>

  </div>
</template>

<script>
import focustrap from '../src/focustrap'

export default {
  components: {
    focustrap
  },

  data() {
    return {
      isActive: false
    }
  },

  methods: {
    handleClick() {
      this.isActive = !this.isActive
    }
  }
}
</script>
