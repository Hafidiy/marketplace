export const takeChildToTop = (data, key: string) => {
  let obj: any = {};

  data[key].map((e) => {
    obj[e.key] = e.value;
  });

  delete data[key];

  return { ...data, ...obj };
};

export const separateArr = (arr1: any[], arr2: any[]) => {
  let sameItems = [];
  let array1 = [];
  let array2 = [];

  arr1.map((e) => {
    arr2.map((ee) => {
      if (e === ee) {
        sameItems.push(e);
      }
    });
  });

  array1 = arr1.filter((e) => !sameItems.some((ee) => e === ee));
  array2 = arr2.filter((e) => !sameItems.some((ee) => e === ee));

  return { sameItems, array1, array2 };
};
