package com.jwttest.crud.controller;


import com.jwttest.crud.dto.ResponseDTO;
import com.jwttest.crud.dto.UserDTO;
import com.jwttest.crud.model.UserEntity;
import com.jwttest.crud.security.TokenProvider;
import com.jwttest.crud.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    private PasswordEncoder passwordEncoder
            = new BCryptPasswordEncoder(); // BC 어쩌구는 암호화 방식의 하나 BCrypt라는 해시 함수를 이용해 암호화하는 구현체
    // PasswordEncoder
    // : Spring Security의 interface 객체
    // 비밀번호를 암호화 하는 역할 [ 암호화 알고리즘 ]
    // 그래서 P~E.. 의 구현체를 대입하고 Bean으로 등록해야 함
    // 처음에 신나게 dependency 넣고 서버 문제 없나 열고 포트 들어갔을 때
    // login 하라고 빠꾸 처먹은 이유
    // -> Security 기본 설정하는 Config 객체를 생성하지 않아서


    @Autowired
    private TokenProvider tokenProvider; // 토큰 생성해주는 객체


    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<?> registerUser (@RequestBody UserDTO userDTO) {
        // post는 웬만하면 try catch 감싸는 거에 습관이 되자
        try {
            // 브라우저에서 넘어온 데이터 유효성 검사
            if (userDTO == null || userDTO.getPassword() == null) {
                throw new RuntimeException("Invalid Password value");
            }
            // 요청을 이용해 저장할 유저 객체 만들기
            UserEntity user = UserEntity.builder()
                    .username(userDTO.getUsername())
                    .nickname(userDTO.getNickname())
                    .email(userDTO.getEmail())
                    .password(userDTO.getPassword())
                    .build();
            // *** builder , build 어떤 느낌으로 쓰는지는 알겠는데
            // 누구한테 설명해서 이해시킬 수 없다
            // 시간 나면 더 공부하기 0810

            // 서비스의 회원가입에 담아 repository에 유저객체 저장
            UserEntity registerUser = userService.create(user);

            // 요청에 대한 응답 객체 만들기 (비밀번호 제외) ? 따로 암호화해서 필터링...
            UserDTO responseUserDTO = UserDTO.builder()
                    .username(registerUser.getUsername())
                    .nickname(registerUser.getNickname())
                    .email(registerUser.getEmail())
                    .build();

            // user의 정보는 항상 하나이므로 리스트로 만들 필요 없음
            // ResponseDTO를 사용하지 않고 (List 반환), UserDTO 객체타입으로 반환 (형변x 6형변 쓰레기)
            return ResponseEntity.ok().body(responseUserDTO);

        } catch (Exception e) {
            ResponseDTO responseDTO = ResponseDTO.builder()
                    .error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }

    }


    // 로그인..


}
