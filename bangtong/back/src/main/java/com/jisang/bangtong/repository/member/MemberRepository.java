package com.jisang.bangtong.repository.member;

import com.jisang.bangtong.model.member.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

  List<Member> findByEmail(String username);
  
}
