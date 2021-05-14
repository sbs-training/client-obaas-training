<template>
  <div class="anim-loaders">
    <div class="ios">
      <div class="bars">
        <div  class="bar"
              :style="{ 'background-color': color }"
              v-for="index in 8" :key="index">
        </div>
      </div>
      <div class="slot" :style="{ 'color': color }">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'anim-loaders',
  props: {
    color: {
      type: String,
      default: '#333333' // set it to your main text color
    },
    text: {
      type: String
    }
  },
  computed: {
    defaultText () {
      return this.text || this.$i18n.t('commons.loading')
    }
  }
}
</script>

<style scoped lang='scss'>

.ios {
  align-items: center;
  display: flex;
  flex-direction: column;

  .bars {
    border-radius: 3px;
    display: inline-block;
    height: 54px;
    position: relative;
    width: 54px;

    .bar {
      animation: fade 1s linear infinite;
      background-color: var(--color-black);
      border-radius: 3px;
      box-shadow: 0 0 3px rgba(0,0,0,0.2);
      height: 21%;
      left: 47%;
      opacity: 0;
      position: absolute;
      top: 41%;
      width: 7%;
    }

    .bar:nth-child(1) {
      animation-delay: 0s;
      transform:rotate(0deg) translate(0, -100%);
    }
    .bar:nth-child(2) {
      animation-delay: -0.875s;
      transform:rotate(45deg) translate(0, -100%);
    }
    .bar:nth-child(3) {
      animation-delay: -0.75s;
      transform:rotate(90deg) translate(0, -100%);
    }
    .bar:nth-child(4) {
      animation-delay: -0.625s;
      transform:rotate(135deg) translate(0, -100%);
    }
    .bar:nth-child(5) {
      animation-delay: -0.5s;
      transform:rotate(180deg) translate(0, -100%);
    }
    .bar:nth-child(6) {
      animation-delay: -0.375s;
      transform:rotate(225deg) translate(0, -100%);
    }
    .bar:nth-child(7) {
      animation-delay: -0.25s;
      transform:rotate(270deg) translate(0, -100%);
    }
    .bar:nth-child(8) {
      animation-delay: -0.125s;
      transform:rotate(315deg) translate(0, -100%);
    }

    .slot {
      text-align: center;
    }

    @keyframes fade {
      from { opacity: 1; }
      to { opacity: 0.25; }
    }
  }
}
</style>
