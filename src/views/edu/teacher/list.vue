<template>
    <div class="app-container">
    讲师列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQO.name" placeholder="讲师名"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacherQO.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQO.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQO.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (teacherQO.pageNum - 1) * teacherQO.pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.teacherCode">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.teacherCode)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<!-- 分页 -->
    <el-pagination
      :current-page="teacherQO.pageNum" 
      :page-size="teacherQO.pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"/>

    </div>
</template>

// 引入teacher.js
<script>
import {getTeacherListPage, deleteTeacher} from '@/api/teacher'
export default {
    // 核心代码
    data(){ //定义变量和初始值
        return{
            list:null, //查询之后接口返回的集合
            total:0, //总记录数
            teacherQO:{
                pageNum:1, //当前页
                pageSize:10, //每页记录数
            } //条件封装对象
        }
    },
    created(){//页面渲染之前执行，一般调用methods定义的方法
        this.getList();
    },
    methods:{//创建具体的方法，调用teacher.js定义的方法
      getList(page=1){
        this.teacherQO.pageNum = page;
        getTeacherListPage(this.teacherQO)
          .then(response =>{
              // console.log(response.data.rows)
              this.list = response.data.dataList;
              this.total = response.data.totalSize;
          })
          .catch(error => {
              console.log(error)//请求失败
          })
      },
      //清除查询表单
      resetData(){
        //表单输入项数据清空
        this.teacherQO={
          pageNum:1, //当前页
          pageSize:10, //每页记录数
        }
        //查询所有讲师数据
        this.getList();
      },
      // 删除事件
      removeDataById(id){
        this.$confirm('此操作将永久删除讲师记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
        }).then(()=>{
            deleteTeacher(id).then(response=>{
              this.$message.success("删除成功");
              this.getList();
            })
        }).catch(()=>{});
      },
      //根据code查询教师
      updateTeacher(tearcherCode){
        
      },

    }
}
</script>