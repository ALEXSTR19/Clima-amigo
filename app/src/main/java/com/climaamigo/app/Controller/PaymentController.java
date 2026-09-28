package com.climaamigo.app.Controller;

import com.climaamigo.app.Dto.PaymentIntentResponse;
import com.climaamigo.app.Services.StripePaymentService;
import com.stripe.exception.StripeException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {
    private final StripePaymentService stripePaymentService;

    public  PaymentController(
                StripePaymentService stripePaymentService){
        this.stripePaymentService = stripePaymentService;
    }
    @PostMapping("/payment-intent")
    public ResponseEntity<PaymentIntentResponse>
    crearPaymentIntent() throws StripeException{
        PaymentIntentResponse response =
                stripePaymentService.crearPaymentIntent();
        return ResponseEntity.ok(response);
    }
}
