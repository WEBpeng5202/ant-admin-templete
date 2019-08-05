<template>
  <div id="app">
    <transition
      mode="out-in"
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX"
      :duration="{ enter: 200, leave: 200 }"
    >
      <router-view/>
    </transition>
  </div>
</template>
<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    list-style: none;
    /*-moz-user-select: none;*/
    /*-webkit-user-select: none;*/
    /*user-select: none;*/
  }
  textarea {
    overflow: auto;
    resize: vertical
  }

  input,
  textarea,
  button,
  select,
  a {
    outline: 0 none;
    border: none;
  }

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    padding: 0;
    border: 0
  }

  img{
    display: block;
  }
  @font-face{
    font-family: 'PingFangSC-Medium';
    /*src: url('../public/static/fonts/PINGFANG MEDIUM.TTF'),*/
  }

  #app{
    /*font-family: 'PingFangSC-Medium', Helvetica, Arial, sans-serif;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: left;*/
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }
  *::-webkit-scrollbar {
    display: none;
  }
  html,body{
    width: 100%;
    height: 100%;
  }
</style>
