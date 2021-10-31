export const paginationHelper = (routeName, page, lastPage) => {
  let isfol;

  if (page === 1 || page === lastPage) {
    if (page === 1) {
      isfol = 1;
    }
    if (page === lastPage) {
      isfol = lastPage;
    }
  } else {
    isfol = 0;
  }

  const commonClass =
    'px-3 py-2 mr-2 border border-info rounded font-weight-bold';
  const activeClass = 'bg-primary text-light';
  const inActiveClass = 'bg-light text-info';

  const url = `${routeName}?page=`;
  const urlLeft = url + (page < 1 + 1 ? 1 : page - 1);
  const urlRight = url + (page > lastPage - 1 ? lastPage : page + 1);

  let left = '<li>';
  left += `<a href=${urlLeft} class="${commonClass} ${inActiveClass}">`;
  left += '<i class="fas fa-angle-left"></i>' + '</a>' + '</li>';

  let right = '<li>';
  right += `<a href=${urlRight} class="${commonClass} ${inActiveClass}">`;
  right += '<i class="fas fa-angle-right"></i>' + '</a>' + '</li>';

  let result = '<ul class="d-flex mt-3 list-unstyled">';

  result += left;
  if (lastPage > 3) {
    new Array(3).fill(null).map((e, i) => {
      let item = '<li>';

      let value;
      let href = url;
      let className = commonClass;

      if (i === 0) {
        value = 1;
        href += 1;
        className += ' ' + (isfol === 1 ? activeClass : inActiveClass);
      }

      if (i === 1) {
        value = !isfol ? page : isfol === lastPage ? lastPage - 1 : 1 + 1;
        href += value;
        className += ' ' + (!isfol ? activeClass : inActiveClass);
      }

      if (i === 2) {
        value = lastPage;
        href += lastPage;
        className += ' ' + (isfol === lastPage ? activeClass : inActiveClass);
      }

      item += `<a href=${href} class="${className}">${value}</a>`;
      result += item + '</li>';
    });
  } else {
    let item = '<li>';

    item += `<a href=${
      url + page
    } class="${commonClass} ${inActiveClass}">${page}</a>`;

    result += item + '</li>';
  }
  result += right;

  return result + '</ul>';
};
