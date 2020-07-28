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
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="billcode">
              <MDinput v-model="postForm.billcode" :maxlength="100" name="billcode" required>
                完工单号
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>

                <el-col :span="8">
                  <el-form-item label-width="100px" label="完工日期:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.billdate" type="date" format="yyyy-MM-dd" placeholder="选择日期" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <!-- <el-form-item label-width="90px" label="淘宝订单号:" class="postInfo-container-item" style="width:90%;">
                    <el-input v-model="postForm.tb_billcode" :maxlength="100" name="tb_billcode">
                      淘宝订单号
                    </el-input>
                  </el-form-item> -->
                </el-col>
                <el-col :span="4">
                  <el-form-item>
                    <span>总数：{{ totalQty }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <!-- <el-form-item>
                    <span>总金额：{{ totalAmount }} </span>
                  </el-form-item> -->
                </el-col>
              </el-row>
              <el-form-item style="margin-bottom: 40px;" label-width="100px" label="备注:">
                <el-input v-model="postForm.remark" :rows="1" type="textarea" class="article-textarea" autosize placeholder="Please enter the content" />
                <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
              </el-form-item>

              <el-row>
                <el-button v-loading="loading" type="primary" plain @click="appendRow">
                  增行
                </el-button>
              </el-row>
              <el-row>
                <el-table v-loading="loading" :data="postForm.details" border fit highlight-current-row style="width: 100%">
                  <el-table-column align="center" label="序号" type="index" width="80" />

                  <el-table-column min-width="220px" align="center" label="成品">
                    <template slot-scope="{row}">
                      <el-select v-model="row.bom_file_id" filterable default-first-option remote placeholder="Search product" @change="selectBOMFile(row)">
                        <el-option v-for="(item) in productListOptions" :key="item.id" :label="item.product_name" :value="item.id" />
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="220px" align="center" label="规格">
                    <template slot-scope="{row}">
                      <span>{{ row.product_spec }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="100px" align="center" label="批次号">
                    <template slot-scope="{row}">
                      <span>{{ row.batNo }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="220px" align="center" label="完工数">
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
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchBOMCompletion, createBOMCompletion, updateBOMCompletion, createBatNo } from '@/api/bomcomplete'
import { fetchBOMFileList } from '@/api/product'

const defaultForm = {
  id: undefined,
  billcode: '',
  billdate: undefined,
  remark: '',
  details: []
}

const defalutDetailForm = {
  id: undefined,
  bom_file_id: undefined,
  product_name: '',
  product_spec: '',
  qty: 1,
  batNo: ''
}

export default {
  name: 'BOMCompleteDetail',
  components: { MDinput, Sticky },
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
      productListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.remark.length
    },
    totalQty() {
      let qty = 0
      this.postForm.details.forEach(item => {
        qty += item.qty
      })
      return qty
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign(this.postForm, { billcode: new Date().getTime(), billdate: new Date() })
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
    this.fetchProductList()
  },
  methods: {
    fetchProductList() {
      fetchBOMFileList().then(res => {
        console.log(res.data.items)
        this.productListOptions = res.data.items
      })
    },
    fetchData(id) {
      fetchBOMCompletion(id).then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `   完工单号:${this.postForm.billcode}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '修改完工单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.billcode}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '修改完工单'
      document.title = `${title} - ${this.postForm.billcode}`
    },
    draftForm() {
      if (this.postForm.billcode.length === 0 || this.postForm.billdate.length === 0) {
        this.$message({
          message: '请填写必要的完工单号和完工日期',
          type: 'warning'
        })
        return
      }
      var detailOk = true
      if (this.postForm.details.length > 0) {
        this.postForm.details.forEach(item => {
          if (item.bom_file_id === undefined || item.bom_file_id.length === 0) {
            this.$message({ message: '请填写必要的材料', type: 'warning' })
            detailOk = false
            return
          }
          if (item.qty <= 0) {
            this.$message({ message: '完工数不能小于等于0', type: 'warning' })
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
        updateBOMCompletion(obj).then(res => {
          this.$message({
            message: '保存成功:',
            type: 'success',
            showClose: true,
            duration: 1000
          })
        })
      } else {
        createBOMCompletion(obj).then(res => {
          this.$message({
            message: '保存成功:',
            type: 'success',
            showClose: true,
            duration: 1000
          })
        })
      }
    },
    appendRow() {
      const obj = Object.assign({}, defalutDetailForm, { id: new Date().getTime() })
      createBatNo().then(res => {
        obj.batNo = res.data
      })
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
    },
    selectBOMFile(row) {
      const p = this.productListOptions.find(w => w.id === row.bom_file_id)
      if (p) {
        row.product_spec = p.product_spec
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
