import { Request, Response, NextFunction } from 'express';

const setLocaleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const lang = typeof req.query.lang === 'string' ? req.query.lang : 'en';

  (res as any).setLocale = (locale: string) => {
    req.i18n.changeLanguage(locale);
  };

  (res as any).setLocale(lang);
  next();
};

export default setLocaleMiddleware;
