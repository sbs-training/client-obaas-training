<template>
  <div  class="select-picker"
        :class="displayMode === 'setting' ? 'setting-row' : 'setting-bare'"
        :data-has-comment-text="!!comment">
    <div class="container">
      <div class="wrapper">
        <label :for="htmlName">
          <icons :name="iconName" v-if="showIcon" /> {{ name }}
        </label>
      </div>

      <select :name="htmlName"
              :id="htmlName"
              class="select-primary select-primary-small"
              v-model="selectedValue">
        <option v-for="(value, index) in listOfValues"
                :key="index"
                :value="optionValueModel ? value[optionValueModel] : value">
          <span v-if="optionValueType === 'property'">
            <span v-if="optionValueDisplay">{{ value[optionValueDisplay] }}</span>
            <span v-else>{{ value }}</span>
          </span>
          <span v-if="optionValueType === 'locale'">{{ $t(`${optionValueDisplay}.${value}`) }}</span>
        </option>
      </select>
    </div>

    <div class="comment-text" v-if="comment">
      {{ comment }}
    </div>
  </div>
</template>

<script>
import Icons from '@/components/Icons.vue'

export default {
  name: 'select-picker',
  components: { Icons },
  props: {
    name: {
      type: String,
      default: ''
    },
    displayMode: {
      type: String,
      default: 'standard' // or setting
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    iconName: {
      type: String
    },
    listOfValues: {
      type: [Array, Object]
    },
    initialValue: {
      type: String
    },
    storePath: {
      type: String
    },
    optionValueType: {
      type: String,
      default: 'property' // or locale
    },
    optionValueDisplay: {
      type: String,
      default: ''
    },
    optionValueModel: {
      type: String,
      default: ''
    },
    comment: {
      type: String,
      default: ''
    }
  },
  computed: {
    htmlName () { return `select-${this.name}` },
    selectedValue: {
      get () { return this.initialValue },
      set (value) {
        if (this.storePath) this.$store.dispatch('ui/setAndLocalStoreValue', { path: this.storePath, value })
        this.$emit('selectedValue', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
