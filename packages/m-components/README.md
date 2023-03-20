<!--
 * @Date: 2023-03-15 13:03:27
 * @LastEditors: squanchy1993 squanchy@yeah.net
 * @LastEditTime: 2023-03-20 16:52:29
 * @FilePath: \m-components\README.md
-->
## Table of Contents
- [Description](#description)
- [Installing](#installing)
  - [Package manager](#package-manager)
- [Mcomponents API](#Mcomponents-api)
- [License](#license)

## Description
Not complished now, only for learning. This component base on vue2 and element-ui, include form;form-item;page-layout;page-list.


## Installing

### Package manager

Using npm:

```bash
$ npm install @zs-ui-vue2/m-components
```

Using yarn:

```bash
$ yarn add  @zs-ui-vue2/m-components
```

Using pnpm:

```bash
$ pnpm add @zs-ui-vue2/m-components
```

## Mcomponents api

### MSelectPicker

```js
    new MFormItemModel({
      label: 'BorrowState',
      prop: 'borrow_state',
      el_type: 'MSelectPicker',
      required: false,
      defaultValue: [],
      options: new MSelectPickerOption({
        list: [
          { label: 'available', value: 1 },
          { label: 'applying', value: 2 },
          { label: 'borrowing', value: 3 }
        ],
        labelKeyName: 'label',
        valueKeyName: 'value',
        limit: 1,
      }),
    }),
    new MFormItemModel({
      label: 'category',
      prop: 'category_uuids',
      el_type: 'MSelectPicker',
      required: false,
      defaultValue: ['aac66c2043a811ecade355501eededd9'],
      options: new MSelectPickerOption({
        api: getBookCategoryList,
        list: [],
        labelKeyName: 'title',
        valueKeyName: 'uuid',
        valuePropKey: 'uuids',
        filterPropsKey: 'title'
      })
    }),
```

about MSelectPickerOption it proivde this component need params like
```js
 new MSelectPickerOption({
     api = null,   // for http requset
     list = [],   // put picker item here
     isPagination = null, // pagination or load all for http
     pageKeyName = null,  // http request page
     sizeKeyName = null,  // http request size
     labelKeyName = null, // select item label's keyname
     valueKeyName = null, // select item value's keyname
     valuePropKey = null,  // use valuePropKey to reuqest http
     filterPropsKey = null, // filterPropsKey decide input show or not, and use it to requset http.
     limit = null  //  if limit dosen't exist, means you can pick as much as you want.
 })
```

## License

[MIT](LICENSE)
