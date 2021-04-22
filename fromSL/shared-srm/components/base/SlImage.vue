<template>
  <SlPoper
    :showPoper="showPoper"
    :position="direction"
    :offset="20"
    :styleSetting="{border: '1px solid rgba(0, 0, 0, .2)'}"
  >
    <div slot="pop" class="sl-image-pop" :style="{'width': popSize, 'height': popSize}">
      <img class="sl-image--popimg" :src="src" :onerror="errorImg" />
    </div>
    <div class="sl-image" :style="{ ...styleSetting, 'width': size, 'height': size}">
      <img class="sl-image--img" :src="src" :onerror="errorImg" @click="handleImgClick" />
      <slot></slot>
    </div>
  </SlPoper>
</template>

<script>
import defaultImg from '@/assets/images/error.png'
import loadingImg from '@/assets/images/loading.gif'

export default {
  name: 'SlImage',
  props: {
    src: String,
    size: {
      type: String,
      default: '12rem'
    },
    popSize: {
      type: String,
      default: '40rem'
    },
    direction: {
      type: String,
      required: false,
      default: 'right'
    },
    showPoper: {
      type: Boolean,
      default: true
    },
    styleSetting: { // sl-image样式设置，如：{ 'border': 'none' }
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      defaultImg,
      loadingImg,
      errorImg: 'this.onload=null;this.src = "' + defaultImg + '"'
    }
  },
  methods: {
    handleImgClick () {

    }
  }
}
</script>

<style lang="scss" scoped>
img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.sl-image {
  position: relative;
  box-sizing: border-box;
  border: 0.1rem dashed #bfbfbf;
  border-radius: 0.3rem;
  overflow: hidden;
  .sl-image--img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
  }
}
.sl-image-pop {
  position: relative;
  .sl-image--popimg {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
  }
}
</style>
