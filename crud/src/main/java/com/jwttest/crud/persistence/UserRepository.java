package com.jwttest.crud.persistence;

import com.jwttest.crud.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {

    UserEntity findByNickname(String nickname);
    Boolean existsByNickname(String nickname);
    UserEntity findByEmail(String email);
    Boolean existsByEmail(String email);
    UserEntity findByEmailAndPassword(String email, String password);
}
