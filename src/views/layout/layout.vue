<template>
  <!--<a-skeleton :loading="loading" active avatar>-->
    <a-layout id="components-layout">
        <a-progress :percent="percent" :showInfo="false" :strokeWidth="2" v-if="!(percent==0 || percent==100)"/>
      <a-layout-sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        v-model="collapsed"
        width="196px"
      >
        <div class="logo primary-color">
          ROSUN后台管理系统
        </div>
        <Layout-menu></Layout-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header :style="{ background: '#fff', padding: 0, height: '56px' ,boxShadow: '0px 5px 5px rgba(0,0,0,.1)'}">
        </a-layout-header>

        <a-breadcrumb :routes="Routes" style="margin-top: 20px;padding-left: 40px;">
          <template slot="itemRender" slot-scope="{route, params, routes, paths}">
            <span v-if="Routes.indexOf(route) === Routes.length - 1">
              {{route.breadcrumbName}}
            </span>
            <router-link v-else :to="route.path">
              {{route.breadcrumbName}}
            </router-link>
          </template>
        </a-breadcrumb>

        <a-layout-content :style="{ margin: '18px 40px 40px' }">
          <div :style="{ padding: '22px', background: '#fff', height: '100%' }">
            <transition
              mode="out-in"
              enter-active-class="animated swoopInLeft"
              leave-active-class="animated swoopOutRight"
              :duration="{ enter: 200, leave: 200 }"
            >
              <router-view/>
            </transition>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  <!--</a-skeleton>-->
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
import LayoutMenu from './layout_menu.vue'

// 引用组件
@Component({
    components:{
      LayoutMenu
    }
})

// export default class
export default class layout extends Vue {
  // Prop
  //@Prop()
  //private test: { value: string };
  // initial data 数据模型
  collapsed: any =  false;
  loading: any =  false;
  // percent:number = this.$store.state.percent;


  // methods 方法
  getData (parameter: string): void{
    console.log(parameter);
  }
  // lifecycle hook 生命周期函数
  created (){
    // this.routes = this.$route.matched.map((v:any)=>{
    //   this.$set(v, 'breadcrumbName', v.meta.title);
    //   return v;
    // });
  }
  mounted (){
    let vm:any = this;
    // vm.axios.GET('/api/cmccbl/cmccBlManagerInfo',{obj:'00000',obj1:'2222'})
    //   .then((res:any)=>{
    //     console.log(res);
    //   });

  }
  destoryed (){}
  // computed 计算属性
  get percent(){
    return this.$store.state.percent;
  }
  set percent(val:any){}
  get Routes(){
    return this.$route.matched.map((v:any)=>{
        this.$set(v, 'breadcrumbName', v.meta.title);
        return v;
      });
  }
  set Routes(val:any){}
  // watch

}
</script>

<style scoped lang="scss">
#components-layout{
  height: 100%;
  .logo {
    height: 56px;
    color: #E0EBF7;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #20355A;
    font-size: 16px;
    font-weight: 500;
  }
  /deep/ .ant-layout-sider-zero-width-trigger{
    top: 16px;
    right: -26px;
    width: 26px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
  }
  /deep/ .ant-progress-line {
    position: absolute;
    top: -8px;
    line-height: 1;
    z-index: 999;
  }
  /deep/ .ant-menu-dark, .ant-menu-dark .ant-menu-sub{
    background: #192A48;
    height: calc(100% - 56px);
    overflow: auto;
    color: #BFCBD9;
  }
}
</style>
