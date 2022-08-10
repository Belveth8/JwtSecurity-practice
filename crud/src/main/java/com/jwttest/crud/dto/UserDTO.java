package com.jwttest.crud.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {

    private int id;
    private String username;
    private String nickname;
    private String email;
    private String password;
}
