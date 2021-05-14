<template>
  <div class="home">
    <h1>{{ $t('home.welcome') }}</h1>
    <p>{{ $t('home.pitch') }}</p>
    <p>{{ $t('home.steps') }}</p>
    <ul>
      <li>{{ $t('home.1') }}</li>
      <li>{{ $t('home.2') }}</li>
      <li>{{ $t('home.3') }}</li>
      <li>{{ $t('home.4') }}</li>
      <li>{{ $t('home.5') }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped lang='scss'>

</style>
