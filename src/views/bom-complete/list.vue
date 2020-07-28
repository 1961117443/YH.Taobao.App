<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="80" type="index" />

      <el-table-column width="150px" align="center" label="完工单号">
        <template slot-scope="scope">
          <span>{{ scope.row.billcode }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="完工日期">
        <template slot-scope="scope">
          <span>{{ scope.row.billdate | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="140px" label="备注">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="480">
        <template slot-scope="scope">
          <router-link :to="'/bom-complete/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
          <router-link :to="'/other-out/edit/'+scope.row.id">
            <el-button size="small" icon="el-icon-edit">
              修改领用出库
            </el-button>
          </router-link>
          <router-link :to="'/other-in/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              修改生产入库
            </el-button>
          </router-link>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="del(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, deleteBOMCompletion } from '@/api/bomcomplete'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'BOMCompletionList',
  components: { Pagination },
  filters: {},
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
    del(id) {
      deleteBOMCompletion(id).then(_ => {
        this.$message({
          message: '删除成功:',
          type: 'success',
          showClose: true,
          duration: 1000
        })
        let index = -1
        this.list.some((v, i) => {
          if (v.id === id) {
            index = i
          }
        })
        if (index > -1) {
          this.list.splice(index, 1)
        }
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
