import { MTableFieldModel } from './index';
export class TableOption {
  ref = `form_${Date.parse(new Date())}`;
  option = {
    border: false,
    stripe: false,
    size: []
  };
  fields = [];
  requestFun = `async (params) => {
    console.log('serarch fun teststet >>>', params);
    const {
      page: { pageIndex, pageSize }
    } = params;
    const start = (pageIndex - 1) * pageSize;
    const end = pageIndex * pageSize;
    const userList = [
      {
        name: 'label123',
        age: 'label123',
        address: 'label123',
        id: 2
      },
      {
        name: 'label1',
        age: 'label',
        address: 'label',
        id: 7
      },
      {
        name: 'label2',
        age: 'label',
        address: 'label',
        id: 8
      },
      {
        name: 'label3',
        age: 'label',
        address: 'label',
        id: 9
      },
      {
        name: 'label4',
        age: 'label',
        address: 'label',
        id: 10
      },
      {
        name: 'label5',
        age: 'label',
        address: 'label',
        id: 11
      },
      {
        name: 'label6',
        age: 'label',
        address: 'label',
        id: 12
      },
      {
        name: 'label123',
        age: 'label123',
        address: 'label123',
        id: 2
      },
      {
        name: 'label1',
        age: 'label',
        address: 'label',
        id: 7
      },
      {
        name: 'label2',
        age: 'label',
        address: 'label',
        id: 8
      },
      {
        name: 'label3',
        age: 'label',
        address: 'label',
        id: 9
      },
      {
        name: 'label4',
        age: 'label',
        address: 'label',
        id: 10
      },
      {
        name: 'label5',
        age: 'label',
        address: 'label',
        id: 11
      },
      {
        name: 'label6',
        age: 'label',
        address: 'label',
        id: 12
      }
    ];

    const list = userList.slice(start, end);
    return { list, total: userList.length };
  }

  // async (params) => {
  //   const {
  //     page: { pageIndex, pageSize }
  //   } = params;
  //   const {
  //     data: { list, total }
  //   } = await fetch("http://localhost:3000/api/txt"，{ body:{ pageIndex, pageSize }});
  //   return { list, total };
  // }`

  setOption({
    option, // form options
    fields,
    requestFun
  }) {
    if (option) {
      this.option = option;
    }

    if (fields) {
      this.fields = fields.map((item) => new MTableFieldModel(item));
    }

    if (requestFun) {
      this.requestFun = requestFun
    }
  }

  exportSetting() {
    return {
      option: this.option,
      fields: this.fields,
      requestFun: this.requestFun
    };
  }
}
