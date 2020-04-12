<template>
  <div :class="classes" :style="styleProps">
    <nuxt />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isReady: false,
      windowHeight: '100vh'
    }
  },
  computed: {
    classes () {
      return [
        'page',
        { 'is-ready': this.isReady }
      ]
    },
    styleProps () {
      return {
        '--100vh': this.windowHeight
      }
    }
  },
  mounted () {
    this.set100vhProp()

    window.addEventListener('resize', this.set100vhProp)
    document.addEventListener('scroll', this.set100vhProp)

    setTimeout(() => {
      this.isReady = true
    }, 1500)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.set100vhProp)
    document.removeEventListener('scroll', this.set100vhProp)
  },  
  methods: {
    set100vhProp () {
      this.windowHeight = window.innerWidth <= 1024 ? `${window.innerHeight}px` : '100vh'
    }
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
