import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, map, catchError } from 'rxjs';
import { successMessages } from 'src/locales/success-messages';
import { checkRouteType } from './route-types';

@Injectable()
export class ChangeResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const routeType = checkRouteType(request.method, request.path);
    // const lang_id = parseInt(request.headers['lang_id']) || 1;
    // const langIndex = lang_id - 1;
    let response = {
      error: null,
      data: null
    };

    return next.handle().pipe(
      map((flow) => {
        // console.log('flow: ', flow);
        // console.log('response: ', response);
        // const messageId = parseInt(flow.message) || 1;
        // const messageIndex = messageId - 1;
        // response.success = {
        //   message: successMessages[langIndex][messageIndex]
        // }
        // delete flow.message;

        response.data = {...flow};

        return response;
      }),
      catchError(err => {
        // console.log('err.response: ', err.response)
        // console.log('response: ', response);
        response.error = {...err.response}
        err.response = {...response};

        throw err;
      })
    );
  }
}
