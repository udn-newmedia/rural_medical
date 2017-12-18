<template>
  <div class="section">
      <img class="lazyload" :data-src="src">
      <div class="text">{{text}}</div>
  </div>
</template>

<script>
export default {
  props: ['text', 'src', 'src-web']
}
</script>

<style scoped>

    .section{
        width: 100%;
        height: 100%;
        position: relative;
    }

    .section img{
        width: 100%;
    }
    
    .text{
        font-size: 26px;
        font-weight: bold;
        color: #FFFFFF;
        letter-spacing: -0.5px;
        position: absolute;
        padding: 0 20px;
        top: 0;
        left: 0;
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
    }

</style>

