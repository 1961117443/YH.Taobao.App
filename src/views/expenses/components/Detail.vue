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
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="100px" label="用款日期:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.billDate" type="date" format="yyyy-MM-dd" placeholder="选择日期" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item style="margin-bottom: 40px;" label-width="100px" label="用款人:" prop="handler">
                    <el-input v-model="postForm.handler" :maxlength="100" name="handler" required />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item style="margin-bottom: 40px;" label-width="100px" label="金额:" prop="amount">
                <el-input-number v-model="postForm.amount" :maxlength="100" name="amount" required />
              </el-form-item>
              <el-form-item style="margin-bottom: 40px;" label-width="100px" label="摘要:">
                <el-input v-model="postForm.abstract" :rows="1" type="textarea" class="article-textarea" autosize placeholder="Please enter the content" />
                <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
              </el-form-item>
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
import { fetchExpenses, createExpenses, updateExpenses } from '@/api/expenses'

const defaultForm = {
  id: undefined,
  handler: '', // 用款人
  billDate: undefined, // 用款日期
  abstract: '', // 摘要
  amount: 0 // 金额
}

export default {
  name: 'ExpensesDetail',
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
      return this.postForm.abstract.length
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign(this.postForm, { billDate: new Date() })
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchExpenses(id).then(response => {
        this.postForm = response.data

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '修改支出单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '修改支出单'
      document.title = `${title} - ${this.postForm.id}`
    },
    draftForm() {
      if (this.postForm.billDate.length === 0 || this.postForm.handler.length === 0) {
        this.$message({
          message: '请填写必要的用款人和用款日期',
          type: 'warning'
        })
        return
      }
      var obj = Object.assign({}, this.postForm)
      if (this.isEdit) {
        updateExpenses(obj).then(res => {
          this.$message({
            message: '保存成功:',
            type: 'success',
            showClose: true,
            duration: 1000
          })
        })
      } else {
        createExpenses(obj).then(res => {
          this.postForm = Object.assign({}, defaultForm, { billDate: new Date() })
          this.$message({
            message: '保存成功:',
            type: 'success',
            showClose: true,
            duration: 1000
          })
        })
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
