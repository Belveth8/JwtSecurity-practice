package com.jwttest.crud.security;

import com.jwttest.crud.model.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
public class TokenProvider {
    // 토큰 생성해주는 곳

    private static final String SECRET_KEY =
            "sB4Lt4Qr510VosLkIX3150Nmg2FoPw89BX7z";

    Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    // user 정보를 받아서 token 생성
    public String create(UserEntity userEntity) {
        // 토큰 기한 설정 ( 1 day )
        Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));

        // 토큰 생성
        return Jwts.builder()
                // header 에 들어갈 내용 및 서명을 위한 SECRET_KEY
                .signWith(key, SignatureAlgorithm.HS256)
                // payload
                .setSubject(userEntity.getEmail()) //sub
                .setIssuer("Crud App")
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .compact();
    }


    // 사용자로부터 토큰을 받아와 그 토큰을 가진 사용자 id 추출
    // 토클을 디코딩 및 파싱하여 토큰 위조 여부 확인하는 작업
    // ** 여기 아직 이해 못함 0810
    public String validateAndGetEmail(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

}
