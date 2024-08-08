package com.jisang.bangtong.repository.email;

import com.jisang.bangtong.model.email.Code;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeRepository extends CrudRepository<Code, String> {

}