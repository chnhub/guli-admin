<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <el-input
          v-model="filterText"
          placeholder="Filter keyword"
          style="margin-bottom: 30px"
        />
        <el-tree
          ref="tree2"
          :data="data2"
          :props="defaultProps"
          :filter-node-method="filterNode"
          class="filter-tree"
          default-expand-all
        />
      </el-col>
    </el-row>
  </div>
</template>

// 引入teacher.js
<script>
import subject from "@/api/edusuject";
export default {
  data() {
    return {
      filterText: "",
      data2: [], //返回所有分类数据
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  created() {
    this.getAllSubjectList();
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },
  methods: {
    getAllSubjectList() {
      subject.getSubjectList().then((response) => {
        this.data2 = response.data.dataList;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    },
  },
};
</script>
