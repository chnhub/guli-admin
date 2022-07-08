<template>
  <div class="app-container">
    讲师添加

    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">
        <!-- 头像缩略图 -->
        <pan-thumb :image="String(teacher.avatar)" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像
        </el-button>

        <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 
       这里field的值必须和后端接口MultipartFile file的形参名相同
        <input type="file" name="file"/>
      -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + 'file/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />

      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import teacherApi from "@/api/teacher";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

import router from '@/router';
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        name: null,
        sort: 0,
        level: 1,
        career: "",
        intro: "",
        avatar: "",
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      //上传弹框组件是否显示
      imagecropperShow: false,
      imagecropperKey: 0, //上传组件key
      BASE_API: process.env.VUE_APP_BASE_API, //获取地址
      saveBtnDisabled: false, //保存按钮是否禁用
    };
  },
  created() {
    
    if(this.$route.params && this.$route.params.id){
      const id = this.$route.params.id;
      this.getTeacherByCode(id).then((response)=>{
        this.teacher = response.data;
      });     
    }

  },

  methods: {
    saveOrUpdate() {
      
      if(this.$route.params && this.$route.params.id){
        this.editTeacher(this.$route.params.id);
      }else{
        //添加
        this.saveTeacher();
      };
    },
    //添加讲师的方法
    saveTeacher() {
      teacherApi
        .addTeacher(this.teacher)
        .then((response) => {
          //提示信息
          this.$message({
            type: "success",
            message: "添加成功!",
          });

          //回到列表页面 ，路由跳转
          this.$router.push({ path: "/teacher/list" });
        })
        .catch((err) => {});
    },
    editTeacher(id){
      teacherApi.editTeacher(id, this.teacher).then((response)=>{
        if(response.code != 20000) return;
        //提示信息
          this.$message({
            type: "success",
            message: "保存成功!",
          });
      });
    },
    getTeacherByCode(teacherCode){
      return teacherApi.getTeacherByCode(teacherCode);
    },

    close() {
      //关闭上传弹框的办法
      this.imagecropperShow = false;
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    cropSuccess(data){
      this.imagecropperShow = false;
      this.teacher.avatar = data.url;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
  },
};
</script>
