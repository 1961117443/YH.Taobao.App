<template>
  <div class="documentation-container">
    <el-row>
      <el-col>
        <router-link to="/product/list" class="link-type document-btn"><span>货品档案</span></router-link>
        <router-link to="/product/create" class="link-type document-btn"><span>新增货品</span></router-link>
        <router-link to="/bom-file/create" class="link-type document-btn"><span>物料清单</span></router-link>
      </el-col>
    </el-row>
    <el-row>
      <router-link to="/purchase-in/list" class="link-type document-btn"><span>采购入库</span></router-link>
      <router-link to="/purchase-in/create" class="link-type document-btn"><span>新增采购入库</span></router-link>
    </el-row>
    <!-- <el-row>
      <router-link to="/other-in/list" class="link-type document-btn"><span>生产入库</span></router-link>
      <router-link to="/other-in/create" class="link-type document-btn"><span>新增生产入库</span></router-link>
    </el-row> -->
    <el-row>
      <router-link to="/product-stock/list" class="link-type document-btn"><span>材料库存</span></router-link>
      <!-- <router-link to="/product-stock/list" class="link-type document-btn"><span>存货核算</span></router-link> -->
    </el-row>
    <!-- <el-row>
      <router-link to="/other-out/list" class="link-type document-btn"><span>领用出库</span></router-link>
      <router-link to="/other-out/create" class="link-type document-btn"><span>新增领用出库</span></router-link>
    </el-row> -->
    <el-row>
      <router-link to="/bom-complete/list" class="link-type document-btn"><span>产成品</span></router-link>
      <router-link to="/bom-complete/create" class="link-type document-btn"><span>新增产成品</span></router-link>
      <!-- <router-link to="/other-out/list" class="link-type document-btn"><span>领用出库</span></router-link>
      <router-link to="/other-in/list" class="link-type document-btn"><span>生产入库</span></router-link> -->
    </el-row>
    <el-row>
      <router-link to="/sales-out/list" class="link-type document-btn"><span>销售出库</span></router-link>
      <router-link to="/sales-out/create" class="link-type document-btn"><span>新增销售出库</span></router-link>
    </el-row>
    <el-row>
      <router-link to="/expenses/list" class="link-type document-btn"><span>费用支出</span></router-link>
      <router-link to="/expenses/create" class="link-type document-btn"><span>新增支出单</span></router-link>
    </el-row>

    <!-- <router-link :to="'/example/edit/'+row.id" class="link-type"><span>货品档案</span></router-link> -->
    <!-- <a class="document-btn" target="_blank" href="https://panjiachen.gitee.io/vue-element-admin-site/zh/">国内文档</a>-->
    <!-- <dropdown-menu class="document-btn" :items="articleList" title="系列文章" /> -->
    <!--<a class="document-btn" target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/zh/job/">内推招聘</a> -->
  </div>
</template>

<script>
import DropdownMenu from '@/components/Share/DropdownMenu'

export default {
  name: 'Documentation',
  components: { DropdownMenu },
  data() {
    return {
      articleList: [
        { title: '基础篇', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
        { title: '登录权限篇', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
        { title: '实战篇', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
        { title: 'vue-admin-template 篇', href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56' },
        { title: 'v4.0 篇', href: 'https://juejin.im/post/5c92ff94f265da6128275a85' },
        { title: '自行封装 component', href: 'https://segmentfault.com/a/1190000009090836' },
        { title: '优雅的使用 icon', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
        { title: 'webpack4（上）', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
        { title: 'webpack4（下）', href: 'https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.documentation-container {
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .document-btn {
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    width: 200px;
    margin-bottom: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
