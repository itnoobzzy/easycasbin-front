<template>
  <div class="dashboard-container">
    <div class="dashboard-text">系统</div>
    <el-row :gutter="12">
      <el-col v-for="item in domains" :span="8"  class="col">
        <el-card shadow="hover" v-if="item === 'endItem'">
          <el-button @click="handleAdd" icon="el-icon-circle-plus-outline">新增</el-button>
        </el-card>
        <el-card shadow="hover" v-else>
          <span>{{item}}</span>
          <el-button @click="handleDelete(item)" type="text" icon="el-icon-delete" class="del_but">删除</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDomains } from '@/api/domains'
import { deleteDomains } from '@/api/domains'
import { addDomains } from '@/api/domains'

export default {
  name: 'Dashboard',
  data() {
    return {
      domains: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getDomains().then(response => {
        this.domains = response.data
        this.domains.push('endItem')
      })
    },
    handleDelete(domain) {
      this.$confirm('此操作将永久删除该域下所有相关权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDomains(domain).then(res => {
          if (res.msg === "操作成功") {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
          }else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    handleAdd() {
      this.$prompt('请输入系统域名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/,
        inputErrorMessage: '只能为中英文，数字或下划线'
      }).then(({ value }) => {
        let params = {
          domain_name: value
        }
        addDomains(params).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            this.fetchData()
          } else {
            this.$message({
              type: 'error',
              message: '添加失败'
            });
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 15px;
    line-height: 46px;
  }
}
.col {
  width: 20%;
  display: inline-block;
  text-align: center;
  margin: 10px 2.5%;
  line-height: 100px;
  color: #333;
  font-size: 16px;
  box-shadow: 0 1px 6px rgba(0,0,0,.05);
  /*border-radius: 4px;*/
  /*border: 2px solid #f5f5f5;*/
}
.col:hover {
  cursor: pointer;
}
.del_but {
  float: right;
}
.del_but:hover {
  cursor: pointer;
}
</style>
