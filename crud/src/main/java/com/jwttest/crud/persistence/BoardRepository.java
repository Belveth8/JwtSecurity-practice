package com.jwttest.crud.persistence;

import com.jwttest.crud.model.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {

    List<BoardEntity> findById(int id);
}
