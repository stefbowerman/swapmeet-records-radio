<template>
  <div class="container">
    <div>
      <status
        :is-live-streaming="isLiveStreaming"
        :audio-playing="audioPlaying"
        :current-show-name="currentShowName"
        :visible="showStatus"
        @click.native="onStatusClick"
      />

      <on-air-sign />
      
      <Footer />

      <audio
        ref="player"
        hidden
        @play="(e) => setAudioPlayerState(true)"
        @pause="(e) => setAudioPlayerState(false)"
        @ended="(e) => setAudioPlayerState(false)"
      >
        <source :src="audioSrc"></source>
      </audio>
    </div>
  </div>
</template>

<script>
import Status from '~/components/Status'
import OnAirSign from '~/components/OnAirSign.vue'
import Footer from '~/components/Footer.vue'

const LIVE_STREAM_SRC = 'https://swapmeetradio.out.airtime.pro/swapmeetradio_a'

export default {
  components: {
    OnAirSign,
    Footer,
    Status
  },
  data () {
    return {
      audioSrc: LIVE_STREAM_SRC,
      pollInterval: null,
      source: null,
      isLiveStreaming: false,
      audioPlaying: false,
      currentShowName: null
    }
  },
  computed: {
    showStatus () {
      return this.source != null
    },
    pollIntervalDurationSec () {
      return this.isLiveStreaming ? 15 : 30
    }
  },
  watch: {
    isLiveStreaming (newVal) {
      if (newVal === false) {
        this.stopAudio()
      }
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
      try {
        const data = await this.$axios.$get('https://swapmeetradio.airtime.pro/api/live-info-v2')
        this.source = data.station && data.station.source_enabled
        this.isLiveStreaming = (this.source === 'Live DJ')
        this.currentShowName = data.shows.current && data.shows.current.name
      } catch (e) {
        console.error(e)
      }
    },
    onStatusClick () {
      if (!this.isLiveStreaming) {
        return
      }

      if (this.audioPlaying) {
        this.stopAudio()
      } else {
        this.playAudio()
      }
    },
    setAudioPlayerState (playing) {
      this.audioPlaying = playing
    },
    stopAudio () {
      this.$refs.player.pause()
      this.$refs.player.currentTime = 0
      this.audioSrc = ''
    },
    playAudio () {
      this.audioSrc = LIVE_STREAM_SRC
      this.$nextTick(() => {
        this.$refs.player.load()
        this.$refs.player.play()
      })
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
