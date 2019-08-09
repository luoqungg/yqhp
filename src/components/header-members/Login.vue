<template>
  <div class="login">
    <div class="btns">
      <div>
        <el-button type="text" @click="dialogFormVisible = true" class="login_button">登录</el-button>
      </div>
      <div>
        <el-button type="success">开通绿钻豪华版</el-button>
        <el-button class="fufei">开通付费包</el-button>
      </div>
    </div>

    <el-dialog
      title="登录"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
      class="login_box"
      :append-to-body="true"
    >
      <div class="name">
        <el-input
          v-model="account"
          placeholder="请输入内容"
          
          type="text"
          prefix-icon="el-icon-user"
        ></el-input>
      </div>
      <div class="password">
        <el-input
          v-model="password"
          placeholder="请输入内容"
          
          type="password"
          prefix-icon="el-icon-key"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "../../mock/login";

export default {
  data() {
    return {
      dialogFormVisible: false,
      account: "",
      password: ""
    };
  },
  methods: {
    login() {
      let params = { account: this.account, password: this.password };
      this.$axios.post("/login", params).then(res => {
        let { message, person } = res.data;
        // console.log(user)
        if (res.data.status === 200) {
          this.$message({
            message,
            type: "success",
            duration: 1000
          });

          this.$store.commit("saveUser", person); // 保存到vuex中 共享
          this.dialogFormVisible = false; // 关闭登录框
          this.$store.dispatch("isLogin", true);  // 保存登录状态
        } else {
          this.$message({
            message,
            type: "warning",
            duration: 1000
          });
        }
      });
    }
  }
};
</script>



<style lang="scss" scoped>

</style>

