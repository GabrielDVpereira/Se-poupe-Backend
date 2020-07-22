import {Request, Response, NextFunction} from 'express'; 

const requestMetadata = (req:Request, res: Response, next:NextFunction) => {
  console.time("request");
  console.info(`Method: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd("request");
};

export default requestMetadata;
