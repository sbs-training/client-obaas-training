<template>
  <div id="app">
    <anim-loaders v-if="isStartingApp" />
    <div v-else>
      <div class="top-bar">
        <img :src="require('@/assets/img/sbs-brand-logo.png')" class="brand-logo"/>
        <select-picker  data-icon-bg-color="green"
                        displayMode="setting"
                        :name="$t('commons.language')"
                        iconName="language"
                        storePath="locale"
                        :listOfValues="locales"
                        :initialValue="$i18n.locale"
                        optionValueDisplay="name"
                        optionValueModel="code" />
      </div>
      <router-view class="view" />
    </div>
  </div>
</template>

<script>
import AnimLoaders from '@/components/AnimLoaders.vue'
import SelectPicker from '@/components/SelectPicker.vue'
import { defaultLocale } from '@/i18n'

export default {
  name: 'App',
  components: { AnimLoaders, SelectPicker },
  data () {
    return {
      appName: this.$router.options.appName,
      hasLazyLoaded: false
    }
  },
  computed: {
    isStartingApp () { return this.$store.getters['ui/get']('isStartingApp') },
    locales () { return this.$store.getters['ui/get']('locales') }
  },
  methods: {
    setDocumentTitle () {
      document.title = !this.hasLazyLoaded
        ? this.appName
        : `${this.$i18n.t(this.$route.meta.translateKey)} | ${this.appName}`
    },
    async initLocale () {
      if (!this.$route.params.locale) {
        setTimeout(() => { this.initLocale() })
      } else {
        try {
          // the locale route param is undefined until the landing lazy-loaded component is loaded
          const storedLocale = this.$store.getters['ui/getStoredLocale']
          await this.$store.dispatch('ui/setAndLocalStoreValue', { path: 'locale', value: storedLocale || this.$route.params.locale })
          this.hasLazyLoaded = true
          this.setDocumentTitle()
        } catch (err) {
          this.$router.replace({ name: this.$route.name, params: { ...this.$route.params, locale: defaultLocale } })
        }
      }
    },
    watchForInitState () {
      if (this.hasLazyLoaded) {
        this.$store.commit('ui/put', { path: 'isStartingApp', value: false })
      } else {
        setTimeout(() => { this.watchForInitState() })
      }
    }
  },
  async mounted () {
    this.initLocale()
    this.watchForInitState()
  },
  watch: {
    '$route' () { this.setDocumentTitle() },
    '$i18n.locale' (to) {
      this.$router.replace({ name: this.$route.name, params: { ...this.$route.params, locale: to } }).catch(() => {})
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang='scss'>
@import '@/themes/global.scss';

.top-bar {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: solid 1px var(--color-lightgray);
}

.brand-logo {
  height: 30px;
}

.view {
  padding: 24px;
}
</style>
