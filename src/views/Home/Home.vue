<template>
  <el-container class="home_container">
    <!--头部区域-->
    <el-header>
      <div>
        <img src="http://masteryhh.oss-cn-beijing.aliyuncs.com/blog_img/cool.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主题区域-->
    <el-container>
      <!--侧边栏区域-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!--收缩菜单栏-->
        <div class="toggle_button" @click="toggleCollapse">|||</div>
        <!--侧边栏菜单区域-->
        <!--侧边栏开启路由模式-->
        <el-menu
            router
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            background-color="#46464E"
            text-color="#fff"
            active-text-color="#409EFF">
            <!--这里通过两层for循环渲染出data中的菜单列表-->
            <!--一级菜单-->
            <!--注意：这里index动态绑定是为了index不写死，
            保证菜单点击只打开一个二级菜单，如果index不接受数值，
            可以采用:index="item.id + ''"，即加一个空字符串-->
            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
              <!--一级菜单模板区域-->
              <template slot="title">
                <!--一级菜单图标-->
                <i :class="iconsObj[item.id]"></i>
                <!--一级菜单文字区-->
                <span>{{item.authName}}</span>
              </template>
              <!--在这里把index属性作为路由跳转地址进行设置，前面加一个'/'即可-->
              <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
                <!--二级菜单模板区域-->
                <template slot="title">
                  <!--二级菜单图标-->
                  <i class="el-icon-menu"></i>
                  <!--二级菜单文字区-->
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
        </el-menu>
      </el-aside>
      <!--右侧内容主体区域-->
      <el-main>
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 当用户已进入就应该读取菜单信息，所以这里定义周期函数

  created () {
    this.getMenuList()
  },
  data () {
    return {
      // 左侧菜单数据
      menuList: [],
      iconsObj: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju-tianchong',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取菜单信息
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      console.log(res)
      this.menuList = res.data
    },
    // 点击切换菜单折叠展开状态
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #1f1f20;
  align-items: center;
  color: #76F4CE;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
}
.el-aside {
  background-color: #46464e;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #e4e4f1;
}
.toggle_button {
  background-color: #4A5064;
  font-size: 10px;
  color: #fff;
  line-height: 24px;
  text-align: center;
  letter-spacing: .2em;
  cursor: pointer;
}
</style>
