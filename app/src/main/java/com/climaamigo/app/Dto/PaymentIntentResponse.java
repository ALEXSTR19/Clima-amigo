package com.climaamigo.app.Dto;

public class PaymentIntentResponse {
    private String clientSecret;
    private String paymentIntentId;

    public PaymentIntentResponse(
            String clientSecret,
            String paymentIntentId){
        this.clientSecret = clientSecret;
        this.paymentIntentId = paymentIntentId;
    }
    public String getClientSecret(){
        return clientSecret;
    }
    public String getPaymentIntentId(){
        return paymentIntentId;
    }

}
