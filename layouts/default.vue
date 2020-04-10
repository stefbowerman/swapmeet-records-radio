<template>
  <div :class="classes">
    <nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isReady: false
    }
  },
  computed: {
    classes () {
      return [
        'page',
        { 'is-ready': this.isReady }
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      this.isReady = true
    }, 1500)
  }
}
</script>

<style>
html {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body {
  background-color: #ffd376;
  color: #111;
  text-transform: uppercase;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.page {
  opacity: 0;
  transition: opacity 1s ease-out;
  pointer-events: none;
}

.page.is-ready {
  pointer-events: auto;
  opacity: 1;
}
</style>
