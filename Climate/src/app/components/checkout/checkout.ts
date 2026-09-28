import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { loadStripe, StripePaymentElement } from '@stripe/stripe-js';
import { StripeElements } from '@stripe/stripe-js/dist/stripe-js/elements-group';
import { Stripe } from '@stripe/stripe-js/dist/stripe-js/stripe';
import { PaymentService } from '../../services/payment.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements AfterViewInit {
  @ViewChild('paymentElement')
  paymentElementRef!: ElementRef<HTMLDivElement>;

  private stripe: Stripe | null = null;

  private elements: StripeElements | null = null;

  private paymentElement: StripePaymentElement | null = null;

  cargando = true;

  pagando = false;

  mensaje = '';

  constructor(private paymentService: PaymentService) {}   
  
  async ngAfterViewInit(): Promise<void> {

    try {

      /*
       * 1. Inicializamos Stripe con la PUBLIC KEY.
       */
      this.stripe = await loadStripe(
        environment.stripePublishableKey
      );

      if (!this.stripe) {
        throw new Error('No se pudo inicializar Stripe');
      }

      /*
       * 2. Pedimos al backend que cree el PaymentIntent.
       */
      const response = await firstValueFrom(
        this.paymentService.crearPaymentIntent()
      );

      console.log(
        'PaymentIntent:',
        response.paymentIntentId
      );

      /*
       * 3. Creamos Stripe Elements utilizando
       *    el clientSecret recibido de Spring Boot.
       */
      this.elements = this.stripe.elements({
        clientSecret: response.clientSecret
      });

      /*
       * 4. Creamos el formulario de pago.
       */
      this.paymentElement =
        this.elements.create('payment');

      /*
       * 5. Lo insertamos en nuestro HTML.
       */
      this.paymentElement.mount(
        this.paymentElementRef.nativeElement
      );

      this.cargando = false;

    } catch (error) {

      console.error(error);

      this.mensaje =
        'No se pudo inicializar el formulario de pago.';

      this.cargando = false;

    }

  }


  async pagar(): Promise<void> {

    if (!this.stripe || !this.elements) {
      return;
    }

    this.pagando = true;

    this.mensaje = '';

    /*
     * Aquí ocurre el pago realmente.
     */
    const resultado =
      await this.stripe.confirmPayment({

        elements: this.elements,

        confirmParams: {

          /*
           * Por ahora usamos la página actual.
           * Más adelante crearemos /pago/resultado.
           */
          return_url: window.location.href

        },

        redirect: 'if_required'

      });

    /*
     * Error inmediato:
     * tarjeta inválida,
     * datos incompletos, etc.
     */
    if (resultado.error) {

      this.mensaje =
        resultado.error.message ??
        'No se pudo procesar el pago.';

      this.pagando = false;

      return;
    }

    /*
     * Para tarjetas normales, con
     * redirect: 'if_required',
     * Stripe puede devolver directamente
     * el PaymentIntent.
     */
    if (resultado.paymentIntent) {

      console.log(
        'Estado:',
        resultado.paymentIntent.status
      );

      if (
        resultado.paymentIntent.status ===
        'succeeded'
      ) {

        this.mensaje =
          'Pago realizado correctamente.';

      } else {

        this.mensaje =
          'Estado del pago: ' +
          resultado.paymentIntent.status;

      }

    }

    this.pagando = false;

  }



}
