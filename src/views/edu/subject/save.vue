<template>
  <div class="app-container">
    <el-row>
      <el-col :span="10">
        <el-form label-width="120px">
          <el-form-item label="信息描述：">
            <el-tag type="info">excel模板说明</el-tag>
            <el-tag>
              <i class="el-icon-download" />
              <a
                :href="'http://121.41.226.246:9000/guli/分类_1657473738817.xlsx'"
                >点击下载模板</a
              >
            </el-tag>
          </el-form-item>

          <!-- :action="BASE_API + '/eduservice/subject/addSubject'" -->
          <!-- :limit="1" -->
          <el-form-item label="选择Excel：">
            <el-upload
              ref="upload"
              :auto-upload="false"
              :on-success="fileUploadSuccess"
              :on-error="fileUploadError"
              :disabled="importBtnDisabled"
              :headers="headers"
              :action="BASE_API + '/eduservice/subject/addSubject'"
              :file-list="fileList"
              :on-change="handleChange"
              name="file"
              accept="application/vnd.ms-excel, .xls, .xlsx"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <el-button
                :loading="loading"
                style="margin-left: 10px"
                size="small"
                type="success"
                @click="submitUpload"
                >上传到服务器</el-button
              >
            </el-upload>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      fileList: [],
      BASE_API: process.env.VUE_APP_BASE_API, //前置url
      importBtnDisabled: false,
      loading: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  },
  created() {},
  methods: {
    //点击按钮上传文件到接口
    submitUpload() {
      var files = this.$refs.upload.uploadFiles;
      if (!(files && files.length > 0)) {
        this.$message({
          type: "error",
          message: "请上传文件",
        });
        return;
      }
      //   this.importBtnDisabled = true;
      this.loading = true;
      this.$refs.upload.submit();
    },
    uploadFile() {
      request({
        url:
          process.env.VUE_APP_BASE_API + "/eduservice/edu-subject/addSubject",
        method: "post",
        params: this.$refs.upload.data,
      });
    },
    fileUploadSuccess(response) {
      if (response.code === 200) {
        //提示信息
        this.$message({
          type: "success",
          message: "添加课程分类成功",
        });
        //路由课程分类列表
        //路由跳转
        this.$router.push({ path: "/subject/list" });
      } else {
        //提示信息
        this.$message({
          type: "error",
          message: "添加课程分类失败：" + response.message,
        });
      }
      this.loading = false;
      this.$refs.upload.clearFiles();
      //   this.importBtnDisabled = false;
    },
    //上传失败
    fileUploadError() {
      this.$refs.upload.clearFiles();
      this.loading = false;
      this.$message({
        type: "error",
        message: "添加课程分类失败",
      });
    },
    handleChange(file, fileList) {
      // debugger
      if (fileList.length > 0) {
        this.fileList = fileList.splice(-1);
      } else {
        this.fileList = fileList[0];
      }
    },
  },
};
</script>
