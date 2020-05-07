<template>
  <div :class="classes">
    <div class="chat-join" @click="() => setChatBoxVisibility(true)">
      Join Live Chat
    </div>
    <div class="chat-box">
      <div class="chat-box-close" title="Close chat" @click="() => setChatBoxVisibility(false)">
        &times;
      </div>
      <div ref="embed" class="embed" />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
const chatAndGoEmbedContents = '{"handle":"swapmeetrecords","arch":"js","styles":{"a":"111111","b":100,"c":"ffd376","d":"FFFFFF","k":"111111","l":"111111","m":"111111","n":"FFFFFF","p":"10.17","q":"111111","r":100,"t":0,"ab":false,"usricon":0,"surl":0,"allowpm":0}}'

export default {
  data () {
    return {
      scriptTag: null,
      mutationObserver: null,
      mutationObserverSupported: false,
      chatIframeLoaded: false,
      chatBoxVisible: false
    }
  },
  computed: {
    classes () {
      return [
        'chat',
        { 'is-loaded': (this.chatIframeLoaded && this.mutationObserverSupported) },
        { 'chat-box-visible': this.chatBoxVisible }
      ]
    }
  },
  mounted () {
    this.$refs.embed.innerHTML = ''

    const s = document.createElement('script')
    
    s.setAttribute('data-cfasync', false)
    s.async = true
    s.src = '//st.chatango.com/js/gz/emb.js'
    s.id = 'cid0020000247807088558'
    s.textContent = chatAndGoEmbedContents

    this.scriptTag = s

    this.$refs.embed.appendChild(s)

    if (!('MutationObserver' in window)) {
      return
    }

    this.mutationObserverSupported = true

    // Setup mutation observer
    const mutationObserverConfig = { childList: true }
    this.mutationObserver = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.addedNodes.length && mutation.addedNodes[0].nodeName === 'IFRAME') {
          this.chatIframeLoaded = true
          this.mutationObserver.disconnect()
          break
        }
      }
    })

    this.mutationObserver.observe(this.$refs.embed, mutationObserverConfig)
  },
  beforeDestroy () {
    this.scriptTag && this.scriptTag.parentNode.removeChild(this.scriptTag)
  },
  methods: {
    setChatBoxVisibility (visibility) {
      this.chatBoxVisible = visibility
    }
  }
}
</script>

<style lang="scss">
.chat {
  position: fixed;
  bottom: 20px;
  right: 22px;
  opacity: 0;
  pointer-events: none;
  font-size: $font-size-small;
  transition: opacity 0.5s ease-out;

  &.is-loaded {
    opacity: 1;
    pointer-events: auto;
  }

  @include bp-up($screen-sm-min) {
    bottom: 45px;
    right: 53px;
    font-size: $font-size-base;
  } 
}

.chat-join {
  opacity: 1;
  cursor: pointer;
  transition: opacity 200ms ease-out;

  .chat-box-visible & {
    opacity: 0;
    pointer-events: none;
  }
}

.chat-box {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 350px;
  width: 280px;
  opacity: 0;
  transform: translateX(8px);
  pointer-events: none;
  transition: opacity 400ms cubic-bezier(0.25, 0.04, 0.18, 0.95), transform 500ms cubic-bezier(0.25, 0.04, 0.18, 0.95);

  .chat-box-visible & {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }

  .embed,
  iframe {
    height: 100%;
    width: 100%;
  }  
}

.chat-box-close {
  height: 34px;
  width: 34px;
  position: absolute;
  top: -11px;
  right: -7px;
  background: $color-text;
  color: $color-bg;
  border: 2px solid $color-bg;
  border-radius: 50%;
  font-size: 23px;
  font-weight: bold;
  line-height: 1.1;
  cursor: pointer;

  @include bp-up($screen-sm-min) {
    top: -15px;
    right: -10px;
  }
}
</style>
