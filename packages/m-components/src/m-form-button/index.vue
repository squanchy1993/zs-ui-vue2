<!--
 * @Date: 2022-11-01 09:12:52
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-03-31 16:09:14
 * @FilePath: \m-components\src\m-form-button\index.vue
-->
<template>
  <div class="form-buttons">
    <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.buttonType"
        :label="item.buttonType"
        :name="item.buttonType"
      >
        <div class="form-buttons__content">
          <el-button
            v-for="(buttonItem, index) in item.buttons"
            :key="index"
            v-model="item.buttons[index]"
            @click="createOredit(item.buttons, buttonItem)"
          >{{ buttonItem.label }}</el-button>
          <el-button size="mini" icon="el-icon-plus" @click="createOredit(item.buttons)" />
        </div>
      </el-tab-pane>
    </el-tabs>
    <btnPopover ref="btnPopover" />
  </div>
</template>

<script>
import btnPopover from './btnPopover';
export default {
  name: 'BtnPopover',
  components: {
    btnPopover
  },
  inject: ['elForm'],
  data() {
    return {
      editableTabsValue: 'create',
      editableTabs: [
        {
          buttonType: 'create',
          buttons: [
            {
              label: '添加',
              fun: () => {
                console.log('添加楼');
              }
            }
          ]
        },
        {
          buttonType: 'edit',
          buttons: []
        }
      ],

      visible: false
    };
  },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        const newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      }
      if (action === 'remove') {
        const tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      }
    },

    async createOredit(list, buttonItem) {
      const data = await this.$refs.btnPopover.openDailog(buttonItem)
      if (!buttonItem) {
        list.push(data)
      } else {
        for (const [k, v] of Object.entries(data)) {
          buttonItem[k] = v
        }
      }
    }
  }
};
</script>

  <style lang="scss" scoped>
.form-buttons {
  width: 100%;
  border: 1px solid #eee;
  &__content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
  }
}
</style>