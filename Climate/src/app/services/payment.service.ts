import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  private readonly apiUrl =
    `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  crearPaymentIntent() {

    return this.http.post<PaymentIntentResponse>(
      `${this.apiUrl}/payment-intent`,
      null
    );
  }
}
