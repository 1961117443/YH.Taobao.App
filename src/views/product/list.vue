<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" type="index" width="80" />
      <el-table-column width="290px" align="center" label="规格">
        <template slot-scope="scope">
          <span>{{ scope.row.spec }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="380px" label="色温">
        <template slot-scope="{row}">
          <router-link :to="'/product/edit/'+row.id" class="link-type">
            <span>{{ row.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column min-width="50px" label="清单">
        <template slot-scope="{row}">
          <router-link v-show="row.bomFileId >''" :to="'/bom-file/edit/'+row.bomFileId" class="link-type">
            <el-button type="primary" size="small" icon="el-icon-edit">
            </el-button>
          </router-link>
          
          <el-button v-show="row.bomFileId >''" style="margin-left: 3px;" type="danger" size="small" icon="el-icon-delete" @click="delBOM(row.bomFileId,row)">
            </el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="220">
        <template slot-scope="scope">
          <router-link :to="'/product/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
          <el-button style="margin-left: 3px;" type="primary" size="small" icon="el-icon-delete" @click="delProduct(scope.row.id)">
              删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, deleteProduct, deleteBOMFile } from '@/api/product'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    delProduct(id) {
      deleteProduct(id).then(_ => {
        this.$message({
          message: '删除成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
      })
    },
    delBOM(id, r) {
      deleteBOMFile(id).then(_ => {
        this.$message({
          message: '删除成功',
          type: 'success',
          showClose: true,
          duration: 1000
        })
        r.bomFileId = ''
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
