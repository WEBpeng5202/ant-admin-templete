<template>
  <a-button
    v-if="options.shape"
    :size="options.size ? options.size : ''"
    :icon="options.icon ? options.icon : ''"
    :type="options.type ? options.type : 'primary'"
    :block="options.block ? options.block : false"
    :loading="loading"
    :disabled="options.disabled ? options.disabled : false"
    :ghost="options.ghost ? options.ghost : false"
    @click="HandelClick"
  >
    <slot></slot>
  </a-button>
  <a-button
    v-else
    :size="options.size ? options.size : ''"
    :icon="options.icon ? options.icon : ''"
    :shape="options.shape"
    :type="options.type ? options.type : 'primary'"
    :block="options.block ? options.block : false"
    :loading="loading"
    :disabled="options.disabled ? options.disabled : false"
    :ghost="options.ghost ? options.ghost : false"
    @click="HandelClick"
  >
    <slot></slot>
  </a-button>
</template>

<script lang="ts">
  /*  vue-property-decorator 装饰器
  *  @Emit
  *  @Inject
  *  @Model
  *  @Prop
  *  @Provide
  *  @Watch
  *  @Component
   */
  import {Component, Vue, Prop} from 'vue-property-decorator'
  // 引用组件
  @Component({
    components: {}
  })
// export default class
  export default class debounceButton extends Vue {
    // Prop
    @Prop() private click:any;
    @Prop() private options: any;

    onclick:any;
    loading:any=false;
    TimeOut:any;
    // initial data 数据模型

    // methods 方法
    HandelClick(){
      this.loading = true;
      this.onclick();
      clearTimeout(this.TimeOut);
      this.TimeOut = setTimeout(()=>{
        this.loading  = false;
      },this.options.delay?this.options.delay:10000);
    }
    // lifecycle hook 生命周期函数
    created() {
      this.onclick = this.$props.click;
    }

    mounted() {
    }

    destoryed() {
    }

    // computed 计算属性

    // watch

  }
</script>

<style scoped lang="scss">

</style>
