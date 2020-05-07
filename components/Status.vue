<template>
  <div :class="classes" :title="altTitle">
    <div class="lvls">
      <img src="~/assets/levels.gif"></img>
    </div>
    <div v-html="displayText" />
  </div>
</template>

<script>
export default {
  props: {
    isLiveStreaming: {
      type: Boolean,
      default: false
    },
    audioPlaying: {
      type: Boolean,
      default: false
    },
    currentShowName: {
      type: String,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return [
        'status',
        { 'is-visible': this.visible },
        { 'is-clickable': this.isLiveStreaming },
        { 'is-playing': (this.audioPlaying && this.isLiveStreaming) }
      ]
    },
    displayText () {
      let t = 'Currently Offline'

      if (this.audioPlaying) {
        t = this.currentShowName ? `Now Playing: ${this.currentShowName}` : 'Live on Air'
      } else if (this.isLiveStreaming) {
        t = 'Click to listen'
      }

      return `${t}&hellip;`
    },
    altTitle () {
      return this.isLiveStreaming ? `Click to ${this.audioPlaying ? 'stop' : 'listen'}` : ''
    }
  }
}
</script>

<style lang="scss">
.status {
  position: fixed;
  top: 0;
  right: 0;
  padding: 20px 22px;
  text-align: right;
  font-size: $font-size-small;
  transition: transform 200ms ease-out 130ms, opacity 200ms ease-out 0s;
  opacity: 0;
  // max-width: 85vw;
  max-width: 65vw;

  @include bp-up($screen-sm-min) {
    top: 25px;
    right: 30px;
    font-size: $font-size-base;
  }

  &.is-visible {
    opacity: 1;
  }

  &.is-clickable {
    cursor: pointer;
  }

  &.is-playing {
    transform: translateX(-17px);
    transition-delay: 0s;
  }
}

.lvls {
  position: absolute;
  z-index: 1;
  background: $color-bg;
  top: 19px;
  right: -2px;
  height: 18px;
  width: 18px;
  opacity: 0;
  transition: opacity 200ms ease-out;

  @include bp-up($screen-sm-min) {
    top: 22px;
    right: 0;    
  }  

  img {
    display: inline-block;
    height: auto;
    width: 100%;
    mix-blend-mode: multiply;
    filter: invert(1);
  }

  .status.is-playing & {
    opacity: 1;
    transition-delay: 130ms;
  }  
}
</style>
