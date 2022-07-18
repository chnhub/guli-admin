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
    <el-form
      label-width="120px"
      :model="courseInfo"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item label="课程标题" prop="title">
        <el-input
          v-model="courseInfo.title"
          placeholder="实列：机器学习项目课程：从入门到放弃"
        />
      </el-form-item>

      <el-form-item label="课程分类" prop="subjectId">
        <el-select
          clearable
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="oneSubjectChange"
        >
          <el-option
            v-for="item in oneSubject"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select
          clearable
          v-model="courseInfo.subjectId"
          placeholder="二级分类"
        >
          <el-option
            v-for="item in twoSubject"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="讲师列表" prop="teacherId">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="item in teacherList"
            :key="item.teacherCode"
            :label="item.name"
            :value="item.teacherCode"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时" prop="lessonNum">
        <el-input-number
          v-model="courseInfo.lessonNum"
          :min="0"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>
      <el-form-item label="课程封面">
        <el-upload
          v-model="courseInfo.cover"
          class="avatar-uploader"
          :action="uploadFileUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="courseInfo.cover" :src="courseInfo.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="课程价格" prop="price">
        <el-input-number
          v-model="courseInfo.price"
          :min="0"
          controls-position="right"
        /><span>元</span>
      </el-form-item>

      <!-- 下一步 -->
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="next('ruleForm')"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/course";
import common from "@/api/common";
/*
import tinymce from "tinymce/tinymce"; //tinymce默认hidden，不引入不显示
import Editor from "@tinymce/tinymce-vue"; //编辑器引入
import "tinymce/themes/silver/theme"; //编辑器主题
import "tinymce/plugins/link"; //超链接
import "tinymce/plugins/paste"; //粘贴过滤
import "tinymce/plugins/preview"; //预览 */
import Tinymce from "@/components/Tinymce";

export default {
  components: {
    Tinymce,
  },
  data() {
    return {
      saveBtnDisabled: false, //禁用保存按钮
      uploadFileUrl: common.UPLOAD_FILE_URL,
      courseInfo: {
        title: null,
        subjectId: "",
        teacherId: "",
        description: null,
        lessonNum: 0,
        cover: "",
        price: 0,
      },
      teacherList: [], //讲师列表
      oneSubject: [], //所有分类
      twoSubject: [], //二级分类
      rules: {
        title: [
          { required: true, message: "请输入课程标题", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        subjectId: [
          { required: true, message: "请选择课程分类", trigger: "blur" },
        ],
        teacherId: [
          { required: true, message: "请选择讲师列表", trigger: "blur" },
        ],
        lessonNum: [
          { required: true, message: "请输入总课时", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入课程价格", trigger: "blur" }],
      },
    };
  },
  beforeCreate() {},
  created() {
    //初始化所有讲师
    this.getTeacherList();
    //初始化所有分类
    this.getAllSubject();
  },
  methods: {
    next(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          course.addCourseInfo(this.courseInfo).then((response) => {
            this.$message({
              type: "success",
              message: "添加课程信息成功！",
            });
            this.$router.push({
              path: "/course/chapter/" + response.data.courseId,
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取所有讲师列表
    getTeacherList() {
      course.getAllTeacher().then((response) => {
        this.teacherList = response.data.dataList;
      });
    },
    //获取所有分类列表
    getAllSubject() {
      course.getAllSubject().then((response) => {
        this.oneSubject = response.data.dataList;
      });
    },
    //一级分类切换触发事件
    oneSubjectChange(data) {
      if (this.oneSubject) {
        this.oneSubject.map((item) => {
          item.id === data && (this.twoSubject = item["children"]);
          //数据双向绑定，直接清空数据即可，很巧妙
          this.courseInfo.subjectId = "";
        });
      }
    },
    //上传教师头像
    handleAvatarSuccess(response) {
      this.courseInfo.cover = response.data.url;
    },
    //上传之前校验
    beforeAvatarUpload(file) {
      const isJpg = file.type === "image/jpeg";
      const isLt2MB = file.size / 1024 / 1024 < 2;
      if (!isJpg) {
        this.$message.error("图片仅支持jpg格式！");
      }
      if (!isLt2MB) {
        this.$message.error("头像大小不能超过2MB！");
      }
      //返回bool类型，是否上传
      return isJpg && isLt2MB;
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
