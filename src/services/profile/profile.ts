import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileInterface } from './profile.interface';
import { baseApiUrl } from '@shared/api/constants';
import { PaginationType } from '@shared/api/types';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  getTestAccounts() {
    return this.http.get<ProfileInterface[]>(`${baseApiUrl}/account/test_accounts`);
  }
  getMe() {
    return this.http.get<ProfileInterface>(`${baseApiUrl}/account/me`);
  }

  getSubscribersShortList() {
    return this.http
      .get<PaginationType<ProfileInterface>>(`${baseApiUrl}/account/subscribers/`)
      .pipe(map((resp) => resp.items.slice(0, 3)));
  }
}
