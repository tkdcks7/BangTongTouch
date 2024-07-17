package com.jisang.bangtong.model.member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.jisang.bangtong.model.common.Authority;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Member {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String nickname;
  private String email;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private String password;

  private boolean role;

  @JsonIgnore
  @OneToMany(mappedBy = "member", fetch = FetchType.EAGER)
  Set<Authority> authorities;

}
