import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuth()) {
      req = req.clone({
        setHeaders: {
          'X-Token': '' + this.auth.getToken(),
        },
      });
    }

    return next.handle(req);
  }
}
