import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileInterface } from './profile.interface';
import { baseApiUrl } from '@shared/api/constants';
import { PaginationType } from '@shared/api/types';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  me = signal<ProfileInterface | null>(null);

  getTestAccounts() {
    return this.http.get<ProfileInterface[]>(`${baseApiUrl}/account/test_accounts`);
  }
  getMe() {
    return (
      this.http
        .get<ProfileInterface>(`${baseApiUrl}/account/me`)
        // tap позволяет "заглянуть" в поток и выполнить какое-то действие, не изменяя данные которые идут дальше.
        .pipe(tap((res) => this.me.set(res)))
    );
  }

  getSubscribersShortList(amount: number) {
    return this.http
      .get<PaginationType<ProfileInterface>>(`${baseApiUrl}/account/subscribers/`)
      .pipe(map((resp) => resp.items.slice(0, amount)));
  }

  getAccount(id: string) {
    return this.http.get<ProfileInterface>(`${baseApiUrl}/account/${id}`);
  }
}
