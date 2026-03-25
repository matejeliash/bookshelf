package dev.matejeliash.bookshelf.repository;


import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import dev.matejeliash.bookshelf.model.User;

// create sql table that is mapped to User class
@Repository
public interface UserRepository extends CrudRepository<User,Long>{

    Optional<User> findByEmail(String email);
    Optional<User> findByVerificationCode(String verificationCode);
    Optional<User> findByUsername(String username);
}

