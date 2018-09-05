import isObject from 'lodash/isObject';

const svc = {
  mongoErrors: {
    duplicateKey: 11000,
  },
  isDuplicateKeyError(err: any) {
    return err.code === svc.mongoErrors.duplicateKey;
  },
  attachErrorCode(err: any, code: any) {
    /* tslint:disable */
    if (!isObject(err)) {
      // eslint-disable-next-line no-param-reassign
      err = new Error(err);
    }
    err.code = code;
    /* tslint:enable */
    return err;
  },
  getStartOfDay(travel = 0, date = new Date(), type = 'day') {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    if (type === 'day') {
      date.setDate(date.getDate() + travel);
    } else if (type === 'month') {
      date.setMonth(date.getMonth() + travel);
    } else {
      logger.warn('type: ', type, 'not support');
    }
    return date;
  },
  formatDate: function formatDate(fmt: string, date = new Date()) {
    let o: { [key: string]: number } = {
      '([yY]+)': date.getFullYear(),
      '(M+)': date.getMonth() + 1, // 月份
      '([dD]+)': date.getDate(), // 日
      '([hH]+)': date.getHours(), // 小时
      '(m+)': date.getMinutes(), // 分
      '(s+)': date.getSeconds(), // 秒
      '([qQ]+)': Math.floor((date.getMonth() + 3) / 3), // 季度
      '(S+)': date.getMilliseconds(),
    };

    /* tslint:disable */
    Object.keys(o).forEach((key) => {
      if (new RegExp(key).test(fmt)) {
        // eslint-disable-next-line no-param-reassign
        fmt = fmt.replace(RegExp.$1, `00${o[key]}`.substr(-RegExp.$1.length));
      }
    });
    /* tslint:enable */
    return fmt;
  },
};

export default svc;
