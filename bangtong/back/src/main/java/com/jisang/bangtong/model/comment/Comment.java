package com.jisang.bangtong.model.comment;

import com.jisang.bangtong.model.board.Board;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"commentParent", "comments"})
public class Comment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long commentId;

  @ManyToOne
  @JoinColumn(name = "boardId", foreignKey = @ForeignKey(name = "fk_board_comment"))
  private Board board;

  @Column(nullable = false, length = 1024)
  private String commentContent;

  @Column(nullable = false)
  private Long commentWriterId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "comment_parent_id", nullable = true, foreignKey = @ForeignKey(name = "fk_comment_comment"))
  private Comment commentParent;

  @OneToMany(mappedBy = "commentParent")
  private List<Comment> comments = new ArrayList<>();

  @Temporal(value = TemporalType.TIMESTAMP)
  @CreationTimestamp
  private Date commentDate;

  @Column(columnDefinition = "boolean default false")
  private Boolean commentIsDeleted;

}