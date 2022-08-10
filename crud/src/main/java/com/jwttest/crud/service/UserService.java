package com.jwttest.crud.service;

import com.jwttest.crud.model.UserEntity;
import com.jwttest.crud.persistence.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 회원가입 서비스
    // 유효성 및 중복검사 ( 닉네임 / 이메일 )
    public UserEntity create(final UserEntity userEntity){
        if (userEntity == null || userEntity.getNickname() == null) {
            throw new RuntimeException("Invalid arguments");
        }
        if (userEntity.getEmail() == null) {
            throw new RuntimeException("Invalid arguments");
        }
        final String nickname = userEntity.getNickname();
        final String email = userEntity.getEmail();
        // 중복검사
        if (userRepository.existsById(nickname)) {
            log.warn("Nickname is already exists {}", nickname);
            throw new RuntimeException("Nickname is already exists");
        }
        if (userRepository.existsByEmail(email)) {
            log.warn("Email is already exists {}", email);
            throw new RuntimeException("Email is already exists");
        }
        
        return userRepository.save(userEntity);
    }
    
    
    // 로그인
    // email/pw 일치 확인
    public UserEntity getByCredentials(final String email,
                                       final String password,
                                       final PasswordEncoder encoder) {
        //만약 userentity 즉 table에 유저가 있다면,
        // originalUser라는 객체에 repository에서 가져온 email을 받는다
        final UserEntity originalUser = userRepository.findByEmail(email);

        // matches 라는 메서드를 이용해 pw가 일치하는지 확인
        // originalUser가 null 이거나 null이 아닌데 패스워드 매치가 일치하지 않으면
        if(originalUser != null && encoder.matches(password, originalUser.getPassword())) {
            return originalUser;
        }
        return null;
    }
    
}
