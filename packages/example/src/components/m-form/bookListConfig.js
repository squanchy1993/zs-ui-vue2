 /* eslint-disable */

import { MFormItemModel, MPageListModel } from '@zs-ui-vue/m-form';

// 生成列表搜索项目
export const generateQueryFormItems = (that) => {
  return [
    new MFormItemModel({
      label: '图书状态',
      prop: 'borrow_state',
      el_type: 'MSelectPicker',
      required: false,
      defaultValue: [],
      options: {
        multiple: true,
        labelValue: {
          label: 'label',
          value: 'value'
        },
        pageListData: new MPageListModel({
          list: [
            { label: "待借阅", value: 1 },
            { label: "申请中", value: 2  },
            { label: "借阅中", value: 3  }
          ]
        })
      }
    }),
    new MFormItemModel({
      label: '书名',
      prop: 'name',
      required: false
    }),
    new MFormItemModel({
      required: false,
      itemBoxStyle: { width: '100px' },
      render: ({ h, formItem }) => {
        return (
          <el-button
            type='primary'
            size='mini'
            class='btnActive'
            style='margin-top: 28px'
            onClick={() => { that.createOrUpdataItem('create', {}) }}
          >
            创建图书
          </el-button>
        )
      }
    }),
    new MFormItemModel({
      required: false,
      itemBoxStyle: { width: '100px' },
      render: ({ h, formItem }) => {
        return (
          <el-button
            type='primary'
            size='mini'
            class='btnActive'
            style='margin-top: 28px'
            onClick={() => { that.$refs.pageList.search() }}
          >
            搜索
          </el-button>
        )
      }
    })
  ]
}
// 生成列表项目
export const generateColumns = (that) => {
  return [
    {
      prop: 'id',
      label: 'ID',
      width: 80,
      align: 'center',
      resizable: false
    },
    {
      prop: 'cover',
      label: '图书',
      width: 100,
      align: 'center',
      // 'show-overflow-tooltip': true,
      resizable: false,
      render: (h, { row }) => {
        return <el-image z-index={9999} style='width: 50px; height: 50px' src={'http://img.nightwalker.site/' + row.cover} preview-src-list={['http://img.nightwalker.site/' + row.cover]}></el-image>
      }
    },
    {
      prop: 'name',
      label: '书名',
      // width: 180,
      resizable: true
    },
    {
      prop: 'updated_time',
      label: '最近更新',
      width: 200,
      resizable: false
    },
    {
      label: '操作',
      fixed: 'right',
      'min-width': '50',
      align: 'center',
      width: 100,
      resizable: false,
      render: (h, { row }) => {
        return [
          <el-button type='text' size='small' onClick={() => that.createOrUpdataItem('edit', row)} >详情</el-button>,
          <el-button
            type='text'
            size='small'
            onClick={() => that.remove(row)}> 删除 </el-button>
        ]
      }
    }
  ]
}

// 生成弹框表单
export const generateFormItems = ({ that, openDialogData }) => {
  const originFormItems = [
    new MFormItemModel({
      label: '',
      prop: '', //  不存在就不写入formData
      el_type: 'text1',
      isCustom: true,
      required: false,
      itemBoxStyle: { width: '100%' },
      render: ({ h, formItem }) => {
        return <p class='title'>书本信息</p>
      }
    }),
    new MFormItemModel({
      label: '封面',
      prop: 'cover',
      el_type: 'MImgUpload',
      itemBoxStyle: { width: '100%' },
      options: {
        uploadApi: common.uploadImage,
        limit: 1,
        imageDomain: 'http://img.nightwalker.site/',
        inputTransform: (value) => {
          const imgArr = value
            .split(',')
            .map((src) => ({ src, localPath: 'http://img.nightwalker.site/' + src }))
          return imgArr
        },
        onChanged: (imgArr) => {
          return imgArr.map((item) => item.src).join(',')
        }
      }
    }),
    new MFormItemModel({
      label: '书名',
      prop: 'name'
    }),
    new MFormItemModel({
      label: '作者',
      prop: 'author'
    }),
    new MFormItemModel({
      label: '作者简介',
      prop: 'author_prefile'
    }),
    new MFormItemModel({
      label: '出版社',
      prop: 'publisher'
    }),
    new MFormItemModel({
      label: '出版时间',
      prop: 'publish_time'
    }),
    new MFormItemModel({
      label: '图书简介',
      prop: 'book_prefile',
      itemBoxStyle: { width: '100%' }
    }),
    new MFormItemModel({
      required: false,
      itemBoxStyle: { width: '100%' },
      render: ({ h, formItem }) => {
        return <div style='display:flex'>
          <el-button
            type='primary'
            size='mini'
            class='btnActive'
            style='margin-top: 28px'
            onClick={() => { that.submit() }}
            disabled={that.$store.getters.user_role_value === 'guset'}
          >
            保存
          </el-button>
        </div>
      }
    })
  ]

  const originFormData = {}
  originFormItems.map(({ prop, defaultValue }) => {
    if (prop) {
      that._.set(originFormData, prop, defaultValue)
    }
  })
  return { originFormItems, originFormData }
}
