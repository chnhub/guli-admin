<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>
    <!-- 课程信息表单 -->
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder="实列：机器学习项目课程：从入门到放弃"
        />
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number
          v-model="courseInfo.lessonNum"
          :min="0"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" />
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number
          v-model="courseInfo.price"
          :min="0"
          controls-position="right"
        /><span>元</span>
      </el-form-item>

      <!-- 下一步 -->
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/course";
export default {
  data() {
    return {
      saveBtnDisabled: false, //禁用保存按钮
      courseInfo: {
        title: null,
        subjectId: '',
        teacherId: '',
        description: null,
        lessonNum: 0,
        cover: '',
        price: 0,
      },
    };
  },
  created() {},
  methods: {
    next() {
      course.addCourseInfo(this.courseInfo).then((response) => {
        this.$message({
          type: "success",
          message: "创建课程成功",
        });
        this.$router.push({
          path: "/course/chapter/1",
        });
      });
    },
  },
};
</script>

<style>
</style>
