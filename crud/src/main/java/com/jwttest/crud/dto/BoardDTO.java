package com.jwttest.crud.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BoardDTO {

    private int id;
    private int writer;
    private String title;
    private String content;


}
