<template>
  <h1>
    <a :href="'#'+title">{{title}}</a>
  </h1>
</template>

<script>
export default {
	name: 'v-title',
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style>
  h1 a {
    color: #3399ff;
    font-size:34px;
  }
</style>
