```
<template>
    <MTableGenerator :list="list" :field="tableData.field" :option="tableData.option" />
</template>

<script>
import {
  MTableGenerator,
  MTableFieldModel
} from '../../../lib/index';

export default {
  components: {
    MTableGenerator
  },
  data() {
    return {
      tableData: {
        option: {
          border: true
        },
        field: [
          new MTableFieldModel({
            elType: 'registered',
            element: 'MTableFieldText',
            defaultValue: '无',
            tableColumnOptions: {
              label: 'name',
              prop: 'name'
            }
          }),
          new MTableFieldModel({
            elType: 'registered',
            element: 'MTableFieldText',
            defaultValue: '无',
            tableColumnOptions: {
              label: 'age',
              prop: 'age'
            }
          }),
          new MTableFieldModel({
            elType: 'registered',
            element: 'MTableFieldText',
            defaultValue: '无',
            tableColumnOptions: {
              label: 'gender',
              prop: 'gender'
            }
          }),
          new MTableFieldModel({
            elType: 'registered',
            element: 'MTableFieldText',
            defaultValue: '无',
            tableColumnOptions: {
              label: 'membership',
              prop: 'membership'
            }
          }),
          new MTableFieldModel({
            elType: 'registered',
            element: 'MTableFieldText',
            defaultValue: '无',
            tableColumnOptions: {
              label: 'address',
              prop: 'address'
            }
          }),
          new MTableFieldModel({
            elType: 'registered',
            element: 'MTableFieldButton',
            defaultValue: [
              {
                name: '编辑',
                code: "async (pageInstance, row) => {\n\ttry {\n  \tawait pageInstance.formInstance.open({ tag: 'edit', data: row });\n    pageInstance.tableInstance.getList();\n  } catch(error){\n    console.log('table button error>>', error)\n  \tconsole.error('table button error>> ', error)\n  }\n}",
                option: {
                  size: 'mini',
                  type: 'primary'
                },
                'option.size': null,
                'option.type': null
              },
              {
                name: '删除',
                code: this.deleteRow,
                option: {
                  size: 'mini',
                  type: 'danger'
                },
                'option.size': null,
                'option.type': null
              }
            ],
            tableColumnOptions: {
              label: 'MTableFieldButton',
              prop: 'MTableFieldButton'
            }
          })
        ]
      }
    };
  },
  methods: {
    async deleteRow() {
      console.log('deleteRow', this.listController);
    }
  }
};
</script>
```
