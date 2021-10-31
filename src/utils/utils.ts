export const takeChildToTop = (data, key: string) => {
  let obj: any = {};

  data[key].map((e) => {
    obj[e.key] = e.value;
  });

  delete data[key];

  return { ...data, ...obj };
};