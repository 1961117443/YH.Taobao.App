<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="序号" width="80" type="index" />

      <el-table-column width="220px" align="center" label="色温">
        <template slot-scope="scope">
          <span>{{ scope.row.productName }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="规格">
        <template slot-scope="scope">
          <span>{{ scope.row.productSpec }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="库存数量">
        <template slot-scope="{row}">
          <span>{{ row.qty }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="库存金额">
        <template slot-scope="{row}">
          <span>{{ row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="平均单价">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="Actions" width="180">
        <template slot-scope="scope">
          <router-link :to="'/sales-out/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="del(scope.row.id)" />
        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchStockList } from '@/api/product'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ProductStockList',
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
      fetchStockList(this.listQuery).then(response => {
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
