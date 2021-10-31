import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { takeChildToTop } from 'src/utils/utils';

@Injectable()
export class ProductInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    let type;

    if (
      request.method === 'GET' &&
      request.route.path === '/api/products/:id'
    ) {
      type = 1;
    }

    if(request.method === 'GET' && request.route.path === '/api/products'){
      type = 2;
    }

    return next.handle().pipe(
      map((flow) => {
        if (type === 1) {
          flow.product = takeChildToTop(flow.product, 'additional');
        }

        if (type === 2) {
          flow.products = flow.products.map(e => takeChildToTop(e, 'additional'))
        }

        return flow
      }),
    );
  }
}
