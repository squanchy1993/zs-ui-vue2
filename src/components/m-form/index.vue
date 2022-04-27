<template>
  <div class="hello">
    <MPageList ref="pageList" :page-list-data.sync="pageListData" />
    <MFormDialog ref="BookDialog" :dialog-option="dialogOption" />
  </div>
</template>

<script>
import { MPageList, MPageListModel, MFormDialog, DialogOptionModel } from '@packages/m-form/dist/index';
import { generateColumns, generateQueryFormItems, generateFormItems } from './bookListConfig';
import { getBookList } from './api';

export default {
  name: 'MForm',
  components: {
    MPageList,
    MFormDialog
  },
  data: function() {
    return {
      pageListData: new MPageListModel({
        apiFun: getBookList,
        query: generateQueryFormItems(this),
        columns: generateColumns(this),
        tableSetting: {
          stripe: true,
          border: true
        }
      }),
      dialogOption: new DialogOptionModel({
        dialogAtter: {
          title: '书本编辑'
        },
        generateFormItems: generateFormItems,
        createInterceptor: (formOriginData, formData, extraData) => {
          const params = { ...formData };
          return { api: getBookList, message: '创建成功', params };
        },
        editInterceptor: (formOriginData, formData, extraData) => {
          const params = { uuid: formOriginData['uuid'], ...formData };
          return { api: getBookList, message: '编辑成功', params };
        }
      })
    };
  },
  methods: {
    // 创建或修改
    createOrUpdataItem(type, data) {
      this.$refs.BookDialog.openDialog({ type, dialogData: data })
        .then((res) => {
          switch (type) {
            case 'create':
              this.pageListData.list.push(res.data);
              break;
            case 'edit':
            case 'auth':
              for (const [key, value] of Object.entries(res.data)) {
                if (data[key] !== value) {
                  data[key] = value;
                }
              }
              break;
          }
        })
        .catch((res) => {
          console.log(res);
          this.$message.warning('取消');
        });
    },

    // 删除
    remove(data) {
      this.$confirm('是否要删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async({ value }) => {
          // withDrawAgree()
          const { uuid } = data;
          // await book.deleteBook({ uuid });
          const index = this.pageListData.list.findIndex((d) => d.uuid === uuid);
          this.pageListData.list.splice(index, 1);
          this.$message.success('成功删除');
        })
        .catch((res) => {
          this.$message.warning('取消删除');
        });
    }
  }
};
</script>
