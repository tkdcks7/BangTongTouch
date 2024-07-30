package com.jisang.bangtong.repository.file;

import com.jisang.bangtong.model.media.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<Media, Long> {

}
