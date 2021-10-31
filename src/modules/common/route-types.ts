const routeTypes = [
  {
    method: 'POST',
    path: '/api/users',
  },
];

export const checkRouteType = (method, path) =>
  routeTypes.findIndex((e) => {
    if (method === e.method && path === e.path) {
      return true;
    } else {
      return false;
    }
  });
