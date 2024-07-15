package com.jisang.bangtong.comment.repository;

import com.jisang.bangtong.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
