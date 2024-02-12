package com.stackroute.TvShowService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document
public class PaymentUpdateRequest {
  @Id
  private String userEmailId;
  private String paymentId;
  private String orderId;
  private String signature;
}
