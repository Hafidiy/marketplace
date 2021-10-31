import * as exphbs from 'express-handlebars';
import { paginationHelper } from 'views/helpers/paginationHelper';

export const hbsConfig = exphbs.create({
  extname: '.hbs',
  helpers: {
    paginationHelper,
  },
});
