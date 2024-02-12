package com.bankit.pg.razorpay.controller;

import com.bankit.pg.feignClient.TvUserClient;
import com.bankit.pg.feignClient.UserServiceClient;
import com.bankit.pg.model.PaymentUser;
import com.bankit.pg.services.PaymentUserService;
import com.bankit.pg.feignClient.PaymentUpdateRequest;
import com.example.MovieService.FeignClient.PaymentUserProoxy;
import com.example.MovieService.service.UserService;
import java.math.BigInteger;

import com.bankit.pg.model.PaymentUser;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/pg")
public class RazorpayController {

	@Autowired
	private PaymentUserService paymentUserService;
	@Autowired
	private UserServiceClient userServiceClient;
	@Autowired
	private TvUserClient tvUserClient;

	private RazorpayClient client;
	private static final String SECRET_ID1 = "rzp_test_wmDl5TjphiigG5";
	private static final String SECRET_KEY1 = "GLHzG7KW47OM0n8fcpWlmwQQ";
	private static final String SECRET_ID2 = "rzp_test_PixYXGg2Kb5b2j";
	private static final String SECRET_KEY2 = "TIJR6r9O1ahGhaBM1n4swNCp";

	@RequestMapping(path = "/createOrder", method = RequestMethod.POST)
	public OrderResponse createOrder(@RequestBody PaymentUser paymentUser) {
		OrderResponse response = new OrderResponse();
		try {

			if (paymentUser.getAmount() > 1000) {
				client = new RazorpayClient(SECRET_ID1, SECRET_KEY1);
			} else {
				client = new RazorpayClient(SECRET_ID2, SECRET_KEY2);
			}

			Order order = createRazorPayOrder(BigInteger.valueOf(paymentUser.getAmount()));
			System.out.println("---------------------------");
			String orderId = (String) order.get("id");
			System.out.println("Order ID: " + orderId);
			System.out.println("---------------------------");
			response.setRazorpayOrderId(orderId);
			response.setApplicationFee("" + paymentUser.getAmount());
			if (paymentUser.getAmount() > 1000) {
				response.setSecretKey(SECRET_KEY1);
				response.setSecretId(SECRET_ID1);
				response.setPgName("razor1");
			} else {
				response.setSecretKey(SECRET_KEY2);
				response.setSecretId(SECRET_ID2);
				response.setPgName("razor2");
			}

			return response;
		} catch (RazorpayException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return response;

	}

	private Order createRazorPayOrder(BigInteger amount) throws RazorpayException {

		JSONObject options = new JSONObject();
		options.put("amount", amount.multiply(new BigInteger("100")));
		options.put("currency", "INR");
		options.put("receipt", "txn_123456");
		options.put("payment_capture", 1); // You can enable this if you want to do Auto Capture.
		return client.orders.create(options);
	}

	@PostMapping("/updateSubscription")
	public ResponseEntity<String> updateSubscriptionStatus(@RequestBody PaymentUpdateRequest paymentUpdateRequest) {
		System.out.println(paymentUpdateRequest);

		ResponseEntity<String> responseEntity = userServiceClient.updateSubscriptionStatus(paymentUpdateRequest);


		// Check the response and return accordingly
		if ( responseEntity.getStatusCode().is2xxSuccessful()) {
			System.out.println("Test for update");
			return new ResponseEntity<>("Subscription status updated successfully", HttpStatus.OK);
		} else {
			// Handle error response
			// You might want to include the response body or additional details
			return new ResponseEntity<>("Failed to update subscription status", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@PostMapping("/updateTvSubscription")
	public ResponseEntity<?> updateTvSubscriptionStatus(@RequestBody PaymentUpdateRequest paymentUpdateRequest) {
		System.out.println(paymentUpdateRequest);

		ResponseEntity<String> responseEntityTv = tvUserClient.updateSubscriptionStatus(paymentUpdateRequest);

		// Check the response and return accordingly
		if ( responseEntityTv.getStatusCode().is2xxSuccessful()) {
			System.out.println("Test for payment user update");
			return new ResponseEntity<>("Subscription status updated successfully", HttpStatus.OK);
		} else {
			// Handle error response
			// You might want to include the response body or additional details
			return new ResponseEntity<>("Failed to update subscription status", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


}
