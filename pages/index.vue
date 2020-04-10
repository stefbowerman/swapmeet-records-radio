<template>
  <div class="container">
    <div>
      <status
        :is-live-streaming="isLiveStreaming"
        :audio-playing="audioPlaying"
        :show="showStatus"
        @click.native="onStatusClick"
      />
      <on-air-sign />
      <Footer />

      <audio
        ref="player"
        hidden
        @play="(e) => setAudioPlayerState(true)"
        @playing="(e) => setAudioPlayerState(true)"
        @pause="(e) => setAudioPlayerState(false)"
        @ended="(e) => setAudioPlayerState(false)"
      >
        <source src="https://swapmeetradio.out.airtime.pro/swapmeetradio_a"></source>
      </audio>      
    </div>
  </div>
</template>

<script>
import Status from '~/components/Status'
import OnAirSign from '~/components/OnAirSign.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    OnAirSign,
    Footer,
    Status
  },
  data () {
    return {
      pollInterval: null,
      pollIntervalDurationSec: 10,
      source: null,
      audioPlaying: false
    }
  },
  computed: {
    isLiveStreaming () {
      return this.source === 'Live DJ'
    },
    showStatus () {
      return this.source != null
    }
  },
  created () {
    this.fetchStationData()
    this.pollInterval = setInterval(this.fetchStationData, (this.pollIntervalDurationSec * 1000))
  },
  beforeDestroy () {
    clearInterval(this.pollInterval)
  },
  methods: {
    async fetchStationData () {
      const data = await this.$axios.$get('https://swapmeetradio.airtime.pro/api/live-info-v2')
      this.source = data.station && data.station.source_enabled
    },
    onStatusClick () {
      if (!this.isLiveStreaming) {
        return
      }

      this.audioPlaying ? this.$refs.player.pause() : this.$refs.player.play()
    },
    setAudioPlayerState (playing) {
      this.audioPlaying = playing
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
