<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <!-- <CommentDropdown v-model="postForm.comment_disabled" />
        <PlatformDropdown v-model="postForm.platforms" />
        <SourceUrlDropdown v-model="postForm.source_uri" />
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          Publish
        </el-button> -->
        <el-button v-loading="loading" type="warning" @click="draftForm">
          保存
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="billcode">
              <MDinput v-model="postForm.billcode" :maxlength="100" name="billcode" required>
                出库单号
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>

                <el-col :span="8">
                  <el-form-item label-width="100px" label="出库日期:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.outdate" type="date" format="yyyy-MM-dd" placeholder="选择日期" />
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
                  <el-form-item>
                    <span>总金额：{{ totalAmount }} </span>
                  </el-form-item>
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

                  <el-table-column min-width="220px" align="center" label="货品">
                    <template slot-scope="{row}">
                      <el-select v-model="row.product_id" filterable default-first-option remote placeholder="Search product" @change="selectProduct(row)">
                        <el-option v-for="(item) in productListOptions" :key="item.id" :label="item.name" :value="item.id" />
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="220px" align="center" label="规格">
                    <template slot-scope="{row}">
                      <span>{{ row.product_spec }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="220px" align="center" label="批次">
                    <template slot-scope="{row}">
                      <el-select v-model="row.batNo" enabled filterable default-first-option remote placeholder="Search batNo">
                        <el-option v-for="(item) in batNoListOptions" :key="item.id" :label="item.batNo" :value="item.id" />
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="220px" align="center" label="数量">
                    <template slot-scope="{row}">
                      <el-input-number v-model="row.totalquantity" :min="1" @change="changeP(row)" />
                    </template>
                  </el-table-column>
                  <el-table-column min-width="220px" align="center" label="单价">
                    <template slot-scope="{row}">
                      <el-input-number v-model="row.price" :precision="2" @change="changeP(row)" />
                    </template>
                  </el-table-column>
                  <el-table-column min-width="220px" align="center" label="金额">
                    <template slot-scope="{row}">
                      <el-input-number v-model="row.amount" :precision="2" @change="changeA(row)" />
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
import { fetchOtherOut, createOtherOut, updateOtherOut } from '@/api/otherout'
import { fetchList } from '@/api/product'
import { fetchBOMCompletion } from '@/api/bomcomplete'

const defaultForm = {
  id: undefined,
  billcode: '',
  outdate: undefined,
  tb_billcode: '',
  remark: '',
  details: []
}

const defalutDetailForm = {
  id: undefined,
  product_id: undefined,
  product_spec: '',
  totalquantity: 1,
  price: 0,
  amount: 0,
  batNo: ''
}

export default {
  name: 'OtherOutDetail',
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
      batNoListOptions: [],
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
      let qty = 0.00
      this.postForm.details.forEach(item => {
        qty += parseFloat(item.totalquantity)
      })
      return qty.toFixed(0)
    },
    totalAmount() {
      let qty = 0.00
      this.postForm.details.forEach(item => {
        qty += parseFloat(item.amount)
      })
      return qty.toFixed(2)
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
      this.fetchbatNoList(id)
    } else {
      this.postForm = Object.assign(this.postForm, { billcode: new Date().getTime(), outdate: new Date() })
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
    this.fetchProductList()
  },
  methods: {
    fetchbatNoList(id) {
      fetchBOMCompletion(id).then(res => {
        const arr = []
        res.data.details.forEach(w => {
          arr.push({ id: w.id, batNo: w.batNo })
        })
        this.batNoListOptions = arr
      })
    },
    fetchProductList() {
      fetchList().then(res => {
        this.productListOptions = res.data.items
      })
    },
    fetchData(id) {
      fetchOtherOut(id).then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `领用出库单号:${this.postForm.billcode}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '修改领用出库单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.billcode}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '修改领用出库单'
      document.title = `${title} - ${this.postForm.billcode}`
    },
    draftForm() {
      if (this.postForm.billcode.length === 0 || this.postForm.outdate.length === 0) {
        this.$message({
          message: '请填写必要的出库单号和出库日期',
          type: 'warning'
        })
        return
      }
      var detailOk = true
      if (this.postForm.details.length > 0) {
        this.postForm.details.forEach(item => {
          if (item.product_id === undefined || item.product_id.length === 0) {
            this.$message({ message: '请填写必要的材料', type: 'warning' })
            detailOk = false
            return
          }
          if (item.totalquantity <= 0) {
            this.$message({ message: '出库数量不能小于等于0', type: 'warning' })
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
        updateOtherOut(obj).then(res => {
          this.$message({
            message: '保存成功:',
            type: 'success',
            showClose: true,
            duration: 1000
          })
        })
      } else {
        createOtherOut(obj).then(res => {
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
      if (this.batNoListOptions.length === 1) {
        obj.batNo = this.batNoListOptions[0]
      }
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
    selectProduct(row) {
      const p = this.productListOptions.find(w => w.id === row.product_id)
      if (p) {
        row.product_spec = p.spec
      }
    },
    changeP(row) {
      row.amount = (row.totalquantity * row.price).toFixed(2)
    },
    changeA(row) {
      if (row.totalquantity > 0) {
        row.price = (row.amount / row.totalquantity).toFixed(2)
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
