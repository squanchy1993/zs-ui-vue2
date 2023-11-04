import { TableInstanceLogic } from './tableInstanceLogic'
import { TableOption } from './tableOption'

export class TableInstance extends TableInstanceLogic {
  ref = `form_${Date.parse(new Date())}`;
  formComponent = null;

  // 配置项
  tableOption = new TableOption({})

  constructor({ searchParams, requestFun }) {
    super({ searchParams, requestFun })
  }

  setOption({ tableOption }) {
    if (tableOption) {
      this.tableOption.setOption(tableOption);
    }
  }

  exportJson() {
    const option = {
      tableOption: this.tableOption.exportSetting()
    };
    return JSON.stringify(option);
  }
}
