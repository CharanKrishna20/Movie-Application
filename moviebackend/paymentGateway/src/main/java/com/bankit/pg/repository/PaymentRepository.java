package com.bankit.pg.repository;

import com.bankit.pg.model.PaymentUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository extends MongoRepository<PaymentUser,String> {
}
