<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" type="warning" @click="draftForm">
          保存
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="12">
            <el-form-item style="margin-bottom: 40px;" prop="product_id" label-width="70px" label="产品:">
              <el-select v-model="postForm.product_id" filterable default-first-option remote placeholder="Search product" style="width:100%;">
                <el-option v-for="(item) in productListOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button v-loading="loading" type="primary" plain @click="appendRow">
            增行
          </el-button>
        </el-row>
        <el-row>
          <el-table v-loading="listLoading" :data="postForm.details" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="序号" type="index" width="80" />

            <el-table-column min-width="220px" align="center" label="货品">
              <template slot-scope="{row}">
                <el-select v-model="row.product_id" filterable default-first-option remote placeholder="Search product">
                  <el-option v-for="(item) in productListOptions" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column min-width="220px" align="center" label="用量">
              <template slot-scope="{row}">
                <el-input-number v-model="row.qty" :min="1" />
              </template>
            </el-table-column>

            <el-table-column align="center" label="Actions" width="220">
              <template slot-scope="scope">
                <el-button type="primary" size="small" icon="el-icon-delete" @click="delRow(scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchList, createBOMFile, fetchBOMFile, updateBOMFile } from '@/api/product'

const defaultForm = {
  status: 'draft',
  id: undefined,
  product_id: undefined,
  product_name: '',
  details: []
}
const defalutDetailForm = {
  id: undefined,
  product_id: undefined,
  qty: 1
}

export default {
  name: 'ArticleDetail',
  components: { Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      listLoading: false,
      productListOptions: [],
      rules: {
        product_id: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
    this.fetchProductList()
  },
  methods: {
    fetchProductList() {
      fetchList().then(res => {
        this.productListOptions = res.data.items
        const data = []
        res.data.items.forEach((item, index) => {
          data.push({
            label: item.name,
            key: item.id
          })
        })
        this.data = data
      })
    },
    fetchData(id) {
      fetchBOMFile(id).then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `   BOMFile Id:${this.postForm.product_name}`
        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '修改清单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.product_name}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '修改清单'
      document.title = `${title} - ${this.postForm.product_name}`
    },
    draftForm() {
      if (this.postForm.product_id === undefined || this.postForm.product_id.length === 0) {
        this.$message({
          message: '请填写必要的产品',
          type: 'warning'
        })
        return
      }
      var detailOk = true
      if (this.postForm.details.length > 0) {
        this.postForm.details.forEach(item => {
          if (item.product_id === undefined || item.product_id.length === 0) {
            this.$message({
              message: '请填写必要的材料',
              type: 'warning'
            })
            detailOk = false
            return
          }
        })
      } else {
        this.$message({
          message: '请输入材料信息',
          type: 'warning'
        })
        detailOk = false
      }
      if (!detailOk) {
        return
      }
      var obj = Object.assign({}, this.postForm)
      if (this.isEdit) {
        updateBOMFile(obj).then(res => {
          this.$message({
            message: '保存成功:',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.postForm.status = 'draft'
        })
      } else {
        createBOMFile(obj).then(res => {
          this.$message({
            message: '保存成功:',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.postForm.status = 'draft'
        })
      }
    },
    getRemoteProductList(query) {
      fetchList({ name: query }).then(response => {
        if (!response.data.items) return
        this.productListOptions = response.data.items.map(v => v)
        console.log(this.productListOptions)
      })
    },
    appendRow() {
      const obj = Object.assign({}, defalutDetailForm, { id: new Date().getTime() })
      this.postForm.details.push(obj)
    },
    delRow(id) {
      let index = -1
      this.postForm.details.some((v, i) => {
        if (v.id === id) {
          index = i
        }
      })
      if (index > -1) {
        this.postForm.details.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
