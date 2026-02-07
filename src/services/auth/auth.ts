import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {baseApiUrl} from '@shared/api/constants';
import {AuthResponse} from '@services/auth/auth.interface';
import {catchError, tap, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient)
  router = inject(Router)
  cookieService = inject(CookieService)
  accessToken: string | null = null
  refreshToken: string | null = null

  get isAuth() {

    if(!this.accessToken) {
      this.accessToken = this.cookieService.get('accessToken')
      this.refreshToken = this.cookieService.get('refreshToken')
    }

    return Boolean(this.accessToken)
  }

  saveTokens(res: AuthResponse) {
    this.accessToken = res.access_token
    this.refreshToken = res.refresh_token
    console.log(this.cookieService)
    this.cookieService.set('accessToken', this.accessToken)
    this.cookieService.set('refreshToken', this.refreshToken)
  }


  login(payload :{username: string, password: string}) {
    const fd = new FormData()
    fd.append('username', payload.username)
    fd.append('password', payload.password)
    return this.http.post<AuthResponse>(`${baseApiUrl}/auth/token`, fd)
      .pipe(
        tap(this.saveTokens.bind(this))
    )
  }


  logout() {
    this.cookieService.deleteAll()
    this.accessToken = null
    this.refreshToken = null
    this.router.navigate(['/login'])
  }

  refreshAuthToken() {
    return this.http.post<AuthResponse>(`${baseApiUrl}/auth/refresh`, {
      refresh_token: this.refreshToken
    }).pipe(
      tap(this.saveTokens.bind(this)),
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )

  }
}
