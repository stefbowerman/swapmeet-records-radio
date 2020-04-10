<template>
  <div :class="classes" :title="title">
    <img src="~/assets/levels.gif" class="lvls"></img>
    <span v-if="isLiveStreaming">
      Now Playing: Bethany Bankston in the mix...
    </span>
    <span v-else>
      Currently Offline...
    </span>
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
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return [
        'status',
        { 'is-visible': this.show },
        { 'is-clickable': this.isLiveStreaming },
        { 'is-playing': this.audioPlaying }
      ]
    },
    title () {
      return this.isLiveStreaming ? (this.audioPlaying ? 'Click to stop' : 'Click to listen') : ''
    }
  }
}
</script>

<style>
  .status {
    position: fixed;
    top: 25px;
    right: 30px;
    background: #ffd376;
    padding: 20px 22px;
    transition: transform 200ms ease-out 130ms, opacity 200ms ease-out 0s;
    opacity: 0;
  }

  .status.is-visible {
    opacity: 1;
  }

  .status.is-clickable {
    cursor: pointer;
  }

  .status.is-playing {
    transform: translateX(-17px);
    transition-delay: 0s;
  }

  .lvls {
    mix-blend-mode: multiply;
    filter: invert(1);
    position: absolute;
    z-index: 1;
    top: 19px;
    right: 0;
    width: 18px;
    opacity: 0;
    transition: opacity 200ms ease-out;
  }

  .status.is-playing .lvls {
    opacity: 1;
    transition-delay: 130ms;
  }
</style>
