<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="80" type="index" />

      <el-table-column width="220px" align="center" label="月份">
        <template slot-scope="scope">
          <span>{{ scope.row.yearMonth }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="销售量">
        <template slot-scope="scope">
          <span>{{ scope.row.totalQuantity }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="销售额">
        <template slot-scope="{row}">
          <span>{{ row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="成本">
        <template slot-scope="{row}">
          <span>{{ row.costAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="利润">
        <template slot-scope="{row}">
          <span>{{ row.profit }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchMonthSalesProfitList } from '@/api/reports'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'MonthSalesProfitList',
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
      fetchMonthSalesProfitList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
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
