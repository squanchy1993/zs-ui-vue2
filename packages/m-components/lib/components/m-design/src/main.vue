<!--
    new elFormItemModel({
        title: "选择器",
        keywords: "test2",
        elType: "MSelectPicker",
        options: {
        pickerItems: [
            { label: "继续前进", value: "CONTINUE" },
            { label: "暂停行进", value: "STOP" },
        ],
        },
    })
-->

<template>
  <div class="m-design">
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理">
        <DesignTable />
      </el-tab-pane>
      <el-tab-pane label="配置管理"> 配置管理 </el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DesignTable from './component/design-table/design-table';
export default {
  name: 'MDesign',
  components: {
    DesignTable
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
