import { diskStorage } from "multer";
import { extname } from "path";

export const multerOptions = {
  storage: diskStorage({
    destination: './public/uploads',
    filename(_, file, callback) {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return callback(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file: Express.Multer.File, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
