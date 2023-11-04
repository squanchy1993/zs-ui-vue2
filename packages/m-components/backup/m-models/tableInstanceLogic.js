export class TableInstanceLogic {
  state = {
    list: [],
    searchParams: {},
    pageParams: {
      pageIndex: 1,
      pageSize: 10
    },
    status: {
      requestStatus: 'succeed', // succeed, failed, loading;
      searching: false, // false  true
      paging: false // false true
    }
  }

  constructor({ searchParams }) {
    if (searchParams) {
      this.searchParams = { ...this.searchParams, ...searchParams };
    }
  }

  getList = () => {
    // eslint-disable-next-line no-eval
    const requestFun = eval(this.tableOption.requestFun)
    return new Promise(async (resolve, reject) => {
      const { status, searchParams, pageParams } = this.state
      try {
        if (status.requestStatus === 'loading') {
          reject(new Error('加载中,请稍等'));
          // 此处或者可以取消上次加载的内容
        }
        status.requestStatus = 'loading';
        const params = { page: pageParams, ...searchParams };
        const res = await requestFun(params);
        const { list, total } = res;
        this.state.total = total;
        this.state.list = list;
        status.requestStatus = 'succeed';
        resolve(res);
      } catch (error) {
        status.requestStatus = 'failed';
      }
    });
  };

  handleSearch = () => {
    return new Promise(async (resolve, reject) => {
      const { status, pageParams } = this.state
      if (status.searching) {
        return reject('搜索中,请稍等')
      }
      status.searching = true
      try {
        pageParams.pageIndex = 1;
        const res = await this.getList();
        resolve(res)
      } catch (error) {
        reject(error)
      } finally {
        status.searching = false;
      }
    })
  };

  handlePageChange = ({ pageIndex, pageSize }) => {
    return new Promise(async (resolve, reject) => {
      const { status, pageParams } = this.state
      try {
        if (status.paging) {
          return reject(new Error('分页加载中'));
        }
        status.paging = true;

        if (pageIndex) {
          pageParams.pageIndex = pageIndex;
        }

        if (pageSize) {
          pageParams.pageSize = pageSize;
        }
        const res = await this.getList();
        resolve(res)
      } catch (error) {
        reject(error)
      } finally {
        status.paging = false;
      }
    })
  };
}
