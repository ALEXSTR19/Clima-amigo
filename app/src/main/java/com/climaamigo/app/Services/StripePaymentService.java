package com.climaamigo.app.Services;

import com.climaamigo.app.Dto.PaymentIntentResponse;
import com.stripe.StripeClient;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

@Service
public class StripePaymentService {
    private final StripeClient stripeClient;

    public StripePaymentService(StripeClient stripeClient){
        this.stripeClient = stripeClient;
    }
    public PaymentIntentResponse crearPaymentIntent()
            throws StripeException{
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                 //100.00 mxm
                        .setAmount(1000L)
                        .setCurrency("mxn")
                        .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams
                                .AutomaticPaymentMethods
                                .builder()
                                .setEnabled(true)
                                .build()
                        )
                        .build();
        PaymentIntent paymentIntent =
                stripeClient.v1()
                        .paymentIntents()
                        .create(params);
        return new PaymentIntentResponse(
                paymentIntent.getClientSecret(),
                paymentIntent.getId()
        );
    }
}
