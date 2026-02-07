import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from '@services/auth/auth';
import {inject} from '@angular/core';
import {catchError, switchMap, throwError} from 'rxjs';

//TODO типизация, чекнуть как работает еще раз
let isRefreshing = false

const refreshAndProceed = (
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn) => {
  if(!isRefreshing) {
    isRefreshing = true
    return authService.refreshAuthToken().pipe(
      switchMap((res) => {
        return next(addToken(req, res.access_token))
      } )
    )

  }
  return  next(addToken(req, authService.refreshToken!))
}

const addToken = ( req: HttpRequest<any>, token: string) => (
  req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
)

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)
  const token = authService.accessToken

  if(!token) return next(req)

  if(isRefreshing) {
    return refreshAndProceed(authService, req, next)
  }

  return next(addToken(req, token)).pipe(
    catchError(error => {
      if(error.status === 403) {
        return refreshAndProceed(authService, req, next)
      }

      return throwError(error)
    })
  )
}
