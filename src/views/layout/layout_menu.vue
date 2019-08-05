<template>
  <a-menu
    :defaultSelectedKeys="['0.0']"
    :defaultOpenKeys="[0]"
    mode="inline"
    theme="dark"
    :selectedKeys="selectedKeys"
    :openKeys="openKeys"
    @openChange="onOpenChange"
    :inlineCollapsed="collapsed"
  >
    <template v-for="item in list">
      <a-menu-item v-if="!item.children" :key="item.key" @click="RouterHop(item)">
        <icon-font :type="item.icon"/>
        <span>{{item.title}}</span>
      </a-menu-item>
      <a-sub-menu v-else :key="item.key">
        <span slot="title" style="display: flex;align-items: center;font-size: 14px"><icon-font
          :type="item.icon"/><span>{{item.title}}</span></span>
        <a-menu-item v-for="item_child in item.childs" :key="item_child.key" @click="RouterHop(item_child)">
          <!--<icon-font :type="item_child.icon"/>-->
          <span>{{item_child.title}}</span>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
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
  import {Component, Vue, Prop} from 'vue-property-decorator';

  // 引用组件
  @Component({
    components: {},
  })
// export default class
  export default class layout_menu extends Vue {
    // Prop
    // @Prop()
    // private test: { value: string };

    // initial data 数据模型
    collapsed: any = false;
    list: any = [];
    openKeys: any = [];
    selectedKeys: any = [];
    openKeyslist: any = [];

    // methods 方法
    RouterHop(router: any) {
      this.selectedKeys = [router.key];
      this.$router.push({path: router.route})
    }

    GetRouterMenu() {
      let vm: any = this;
      let list = [...vm.$router['options'].routes];
      //获取路由 路由根据菜单划分成组
      this.list = list.map((v: any, i: any) => {
        if(v.meta.isMenu && v.meta.author.indexOf(1) !== -1){
          this.$set(v, 'key', i + '');
          this.$set(v, 'title', v.meta.title);
          this.$set(v, 'icon', v.meta.icon);
          let data:Array<object> = [];
          if (v.children.length) {
            v.children.forEach((v1: any, j: any) => {
              if(v1.meta.isMenu != false && v1.meta.author && v1.meta.author.indexOf(1) !== -1){
                data.push({
                  key: i + '.' + j,
                  title: v1.meta.title,
                  icon: v1.meta.icon,
                  route: v.path + '/' + v1.path
                });
              }
            });
            this.$set(v, 'childs', data);
          }
          return v;
        }
      });
      this.list = this.list.filter((v:any)=>{ return v!=undefined });

      //遍历菜单 匹配与路由地址相符的 key
      this.list.forEach((key: any) => {
        // 定义菜单打开组的根匹配组
        this.openKeyslist.push(key.key);
        let keyObj = key.childs.find((v: any) => {
          return v.route === this.$route.path;
        });
        //定义选中项 和 打开选中项所在组 与路由匹配
        this.selectedKeys = keyObj ? [keyObj.key]:[this.list[0].childs[0].key];
        this.openKeys = keyObj ? [key.key] : [this.list[0].key];
        //判断当前路径是否存在于菜单项内 【不存在=》重定向到菜单项的第一项子菜单路由】
        if(!keyObj)this.$router.push({path:this.list[0].childs[0].route})
      });
    }

    onOpenChange(openKeys:any) {
      //方法函数的作用：打开某一个菜单组的时候关闭其他组
      const latestOpenKey = openKeys.find((key:any) => this.openKeys.indexOf(key) === -1);
      if (this.openKeyslist.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }

    // lifecycle hook 生命周期函数
    created() {
      this.GetRouterMenu();
    }

    // computed 计算属性

    // watch
  }
</script>

<style scoped lang="scss">
  /deep/ .ant-menu-dark .ant-menu-item:hover, .ant-menu-dark .ant-menu-submenu-active, .ant-menu-dark .ant-menu-submenu-selected {
    color: #FFFFFF;
    background: #4D88FD;
  }

  /deep/ .ant-menu-submenu-title:hover {
    color: #FFFFFF;
  }

  .ant-menu.ant-menu-dark {
    /deep/ .ant-menu-item-selected {
      /*background: #3e5faa !important;*/
      background: transparent !important;
    }
    /deep/ .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      background: #20355A;
    }
  }

  /deep/ .ant-menu-item {
    margin: 0;
  }

  /deep/ .anticon {
    font-size: 16px !important;
  }

  /deep/ .ant-menu-submenu-title {
    height: 50px !important;
    line-height: 50px !important;
  }
</style>
