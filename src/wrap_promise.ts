type Status = 'pending' | 'success' | 'error';

export function wrapPromise<T>(promise: Promise<T>) {
  let status: Status = 'pending';
  let response: T;

  const wrapper = promise.then(
    (res) => {
      status = 'success';
      response = res;
    },
    (err) => {
      status = 'error';
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case 'pending':
        throw wrapper;
      case 'error':
        throw response;
      default:
        return response;
    }
  };

  return { read };
}
