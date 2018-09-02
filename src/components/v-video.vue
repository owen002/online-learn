<template>
  <article>
    <div class="fullscreen" v-show="fullScreenFlag" @click.self="noFull"></div>
    <section class="v-video-wrap" :class="fullScreenFlag?'po2':'po1'">
      <video class="v-velm" ref="vVideoElm" :src="videoSrc" playsinline webkit-playsinline x5-playsinline
             x5-video-player-type="h5" preload="auto" autobuffer @play="emitPlay" @pause="emitPause" @progress="emitProgress"
             @error="emitError"
             @timeupdate="emitTimeupdate" @ended="emitEnded" @abort="emitAbort" @loadedmetadata="emitLoadedmetadata"
             @waiting="emitWaiting"></video>
      <div class="control-bar-w">
        <div class="front-wrap">
          <div class="play-btn">
            <div @click="clickPlay" v-show="playShow">
              <mu-icon value="play_arrow"></mu-icon>
            </div>
            <div @click="clickPause" v-show="pauseShow">
              <mu-icon value="pause"></mu-icon>
            </div>
          </div>
          <div class="play-time">
            <div class="current-time">{{currentTimeStr}}</div>
            <i>/</i>
            <div class="totalTime">{{totalTimeStr}}</div>
          </div>
        </div>
        <div class="full-screen" @click="clickFullScreen">
          <mu-icon value="fullscreen"></mu-icon>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
  import util from '../util/util'

  export default {
    name: 'videoComponent',
    props: ['videoSrc'],
    data() {
      return {
        totalTime: 0,
        currentTime: 0,
        playShow: true,
        pauseShow: false,
        fullScreenFlag:false
      }
    },
    computed: {
      totalTimeStr(){
        let t = util.formatTime(this.totalTime)
        if (t.hour) {
          return t.hour + ':' + t.min + ':' + Math.floor(t.sec)
        }
        if (t.min) {
          return t.min + ':' + Math.floor(t.sec)
        }
        if (t.sec) {
          return '0:' + Math.floor(t.sec)
        }
        return '0:0'
      },
      currentTimeStr(){
        let t = util.formatTime(this.currentTime)
        if (t.hour) {
          return t.hour + ':' + t.min + ':' + Math.floor(t.sec)
        }
        if (t.min) {
          return t.min + ':' + Math.floor(t.sec)
        }
        if (t.sec) {
          return '0:' + Math.floor(t.sec)
        }
        return '0:0'
      }
    },
    methods: {
      clickPlay(){
        this.$refs.vVideoElm.play()
      },
      clickPause(){
        this.$refs.vVideoElm.pause()
      },
      clickFullScreen(){
          this.fullScreenFlag = !this.fullScreenFlag
      },
      noFull(){
          this.fullScreenFlag = false;
      },
      emitPlay(){
        this.playShow = false
        this.pauseShow = true
      },
      emitPause(){
        this.playShow = true
        this.pauseShow = false
      },
      emitProgress(e){
      },
      emitError(){
      },
      emitTimeupdate(){
        this.currentTime = this.$refs.vVideoElm.currentTime
        this.$emit('update', this.$refs.vVideoElm)
      },
      emitEnded(){
        console.log('6')
        this.$emit('end', this.$refs.vVideoElm)
      },
      emitAbort(){
      },
      emitLoadedmetadata(){
        this.totalTime = this.$refs.vVideoElm.duration
        this.$emit('ready', this.$refs.vVideoElm)
      },
      emitWaiting(){
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  .fullscreen{
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background: #000000db;
    z-index: 7999;
  }
  .po1{
    position:relative;
  }
  .po2{
    position:fixed;
    width:100%;
    top:50%;
    left:50%;
    transform: translate3d(-50%,-50%,0);
  }
  .v-video-wrap {
    z-index: 8999;
    .v-velm {
      width: 100%;
      background: #000;
    }
  }
  .control-bar-w {
    position: absolute;
    color:#fff;
    bottom:8px;
    left:0;
    right:0;
    line-height: 1;
    padding: 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .front-wrap {
      display: flex;
      align-items: center;
    }

    .play-time {
      padding: 0 20px;
      display: flex;
      align-items: center;
      i {
        padding: 0 8px;
      }
    }
  }
</style>
