<template>
  <div @click="refreshCode">
    <s-identify :identifyCode="identifyCode"></s-identify>
  </div>
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import SIdentify from './components/identifyingCode.vue';
// 引用组件
@Component({
    components:{
      SIdentify,
    }
})
// export default class
export default class login extends Vue {
  // Prop
  //@Prop()
  //private test: { value: string };
  // initial data 数据模型
  identifyCodes: string = '1234567890abcdefghijklmnopqrstuvwxyz';//验证码基本库
  identifyCode: string = '';//生成的验证码

  // methods 方法
  randomNum(min:any, max:any) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  refreshCode() {
    this.identifyCode = '';
    this.makeCode(this.identifyCodes, 4);
  }

  makeCode(o:any, l:any) {
    for (let i = 0; i < l; i++) {
      this.identifyCode += this.identifyCodes[
        this.randomNum(0, this.identifyCodes.length)
        ];
    }
  }
  // lifecycle hook 生命周期函数
  created (){
    this.makeCode(this.identifyCodes, 4);
  }
  mounted (){}
  destoryed (){}
  // computed 计算属性

  // watch

}
</script>

<style scoped lang="scss">

</style>
