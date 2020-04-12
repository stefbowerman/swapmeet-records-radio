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

<style lang="scss">
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

  &.is-ready {
    pointer-events: auto;
    opacity: 1;
  }
}
</style>
