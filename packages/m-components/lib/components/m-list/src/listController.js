// import { debounce } from 'lodash-es';
import { debounceCb } from '../../m-utils';

export default class ListController {
  componentInstance = null;

  list = [];
  total = 0;
  searchParams = {};
  pageParams = {
    pageIndex: 1,
    pageSize: 10
  };
  status = {
    requestStatus: 'succeed', // succeed, failed, loading;
    searching: false, // false  true
    paging: false // false true
  };

  // requset function
  requestFun = async () => ({ list: [], total: 0 });

  setOptions({ searchParams, requestFun, pageParams, componentInstance }) {
    if (componentInstance) {
      this.componentInstance = componentInstance;
    }

    if (searchParams) {
      this.searchParams = searchParams;
    }

    if (requestFun) {
      this.requestFun = requestFun.bind(this);
    }

    if (pageParams) {
      const { pageIndex, pageSize } = pageParams;
      if (pageIndex) {
        this.pageParams.pageIndex = pageIndex;
      }
      if (pageSize) {
        this.pageParams.pageSize = pageSize;
      }
    }
  }

  getList = () => {
    // eslint-disable-next-line no-eval
    return new Promise(async (resolve, reject) => {
      try {
        if (this.status.requestStatus === 'loading') {
          reject(new Error('加载中,请稍等'));
          // 此处或者可以取消上次加载的内容
        }
        this.status.requestStatus = 'loading';
        const params = { pageParams: this.pageParams, searchParams: this.searchParams };
        const res = await this.requestFun(params, this);
        const { list, total } = res;
        this.total = total;
        this.list = list;
        this.status.requestStatus = 'succeed';
        resolve(res);
      } catch (error) {
        console.error('getList Error', error)
        this.status.requestStatus = 'failed';
      }
    });
  };

  handleSearch = () => {
    return new Promise(async (resolve, reject) => {
      if (this.status.searching) {
        return reject('搜索中,请稍等');
      }
      this.status.searching = true;
      try {
        this.pageParams.pageIndex = 1;
        const res = await this.getList();
        resolve(res);
      } catch (error) {
        reject(error);
      } finally {
        this.status.searching = false;
      }
    });
  };

  handlePageOrSizeChange = (() => {
    // In case of size-change trigger the function of current-change
    const handlePagination = debounceCb(
      async () => {
        return new Promise(async (resolve, reject) => {
          try {
            if (this.status.paging) {
              return reject(new Error('分页加载中'));
            }
            this.status.paging = true;

            const res = await this.getList();
            resolve(res);
          } catch (error) {
            reject(error);
          } finally {
            this.status.paging = false;
          }
        });
      },
      300,
      {}
    );

    return async ({ pageIndex, pageSize }) => {
      if (pageIndex && pageIndex !== this.pageParams.pageIndex) {
        this.pageParams.pageIndex = pageIndex;
      }
      if (pageSize && pageSize !== this.pageParams.pageSize) {
        this.pageParams.pageSize = pageSize;
      }
      try {
        let res = await handlePagination();
        return res;
      } catch (error) {
        if (error.message && error.message === 'event was canceled') {
          return null;
        }
        throw error;
      }
    };
  })();
}
