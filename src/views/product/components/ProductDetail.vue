<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" type="warning" @click="draftForm">
          保存
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-form-item style="margin-bottom: 40px;" prop="spec">
          <MDinput v-model="postForm.spec" :maxlength="100" name="spec" required>
            规格
          </MDinput>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" prop="name">
          <MDinput v-model="postForm.name" :maxlength="100" name="name" required>
            色温
          </MDinput>
        </el-form-item>

        <!-- <el-form-item style="margin-bottom: 40px;" label-width="70px" label="Summary:">
          <el-input v-model="postForm.content_short" :rows="1" type="textarea" class="article-textarea" autosize placeholder="Please enter the content" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item> -->

        <!-- <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="postForm.image_uri" />
        </el-form-item> -->
      </div>
    </el-form>
  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchProduct, createProduct, updateProduct } from '@/api/product'

const defaultForm = {
  status: 'draft',
  spec: '', // 规格
  name: '' // 色温
}

export default {
  name: 'ArticleDetail',
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
          message: (rule.desc ?? rule.field) + '为必传项',
          type: 'error'
        })
        callback(new Error((rule.desc ?? rule.field) + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        spec: [{ validator: validateRequire, desc: '规格' }],
        name: [{ validator: validateRequire, desc: '色温' }]
      },
      tempRoute: {}
    }
  },
  computed: {
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
  },
  methods: {
    fetchData(id) {
      fetchProduct(id).then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '编辑货品'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.name}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑货品'
      document.title = `${title} - ${this.postForm.name}`
    },
    draftForm() {
      if (this.postForm.spec.length === 0 || this.postForm.name.length === 0) {
        this.$message({
          message: '请填写必要的规格和色温',
          type: 'warning'
        })
        return
      }
      if (this.isEdit) {
        updateProduct(this.postForm).then(_ => {
          console.log(_)
          this.$message({
            message: '保存成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.postForm.status = 'draft'
        })
      } else {
        createProduct(this.postForm).then(_ => {
          console.log(_)
          this.$message({
            message: '添加成功',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.postForm.status = 'draft'
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
