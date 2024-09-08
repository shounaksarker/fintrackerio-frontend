export const HIDDEN_DATE_RANGE_PATH = (pathName) => {
  const staticPaths = [
    '/login',
    '/signup',
    '/income/source',
    '/expense/category',
    '/setting',
    '/reset-password',
    '/user-manual',
    '/notes',
  ];

  const dynamicPatterns = [
    /^\/notes\/\w+$/, // Matches paths like /notes/:id
    /^\/setting\/\w+$/, // Matches paths like /stting/:id
  ];

  return staticPaths.includes(pathName) || dynamicPatterns.some((pattern) => pattern.test(pathName));
};

export const AUTH_PATH = ['/login', '/signup', '/reset-password'];
