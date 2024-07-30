package com.jisang.bangtong.service.common;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.jisang.bangtong.dto.common.FileDto;
import com.jisang.bangtong.model.media.Media;
import com.jisang.bangtong.repository.file.FileRepository;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileServiceImpl implements FileService {

  @Value("${cloud.aws.s3.bucket}")
  private String bucket;
  @Value("${cloud.aws.s3.bucket.url}")
  private String bucketUrl;

  private final AmazonS3 amazonS3;
  private final FileRepository fileRepository;

  public List<Media> upload(List<MultipartFile> files) throws IOException{
    log.info("file upload service 실행 {}", bucket);

    List<Media> list = new ArrayList<>();

      files.forEach(file -> {
        String fileName = makeFileName(file);
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        try(InputStream inputStream = file.getInputStream()){
          amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata));
        } catch (IOException e) {
          throw new RuntimeException(e);
        }
        Media media = new Media();
        media.setMediaPath(fileName);
        media = fileRepository.save(media);
        //log.info("media info {}", media);
        list.add(media);
      });
      return list;

  }
  private String makeFileName(MultipartFile multipartFile){
    String originalName = multipartFile.getOriginalFilename();
    final String ext = originalName.substring(originalName.lastIndexOf("."));
    final String fileName = UUID.randomUUID().toString() + ext;
    return fileName;
  }
//  private String saveFile(MultipartFile file) {
//    String fileName = UUID.randomUUID().toString();
//
//    ObjectMetadata metadata = new ObjectMetadata();
//    metadata.setContentLength(file.getSize());
//    metadata.setContentType(file.getContentType());
//
//    try{
//      amazonS3.putObject(bucket, fileName, file.getInputStream(), metadata);
//    } catch (AmazonS3Exception e) {
//      log.error("Amazon S3 error while uploading file1: " + e.getMessage());
//      throw new RuntimeException(e.getMessage());
//    }catch(SdkClientException e){
//      log.error("Amazon S3 error while uploading file2: " + e.getMessage());
//      throw new RuntimeException(e.getMessage());
//    }catch(IOException e)
//    {
//      log.error("IO error while uploading file: " + e.getMessage());
//      throw new RuntimeException(e.getMessage());
//    }
//     log.info("File upload completed: " + fileName);
//
//    return amazonS3.getUrl(bucket, fileName).toString();
//  }
//
//  private Optional<File> convert(MultipartFile file) throws IOException {
//    File convertFile = new File(UUID.randomUUID().toString());
//    if(convertFile.createNewFile()){
//      try (FileOutputStream fos = new FileOutputStream(convertFile)){
//        fos.write(file.getBytes());
//      }
//      return Optional.of(convertFile);
//    }
//    return Optional.empty();
//  }
//
////  private String putS3(File uploadFile, String fileName) {
////    amazonS3Client.putObject(
////        new PutObjectRequest(bucket, fileName, uploadFile)
////            .withCannedAcl(CannedAccessControlList.PublicRead)	// PublicRead 권한으로 업로드 됨
////    );
////    return amazonS3Client.getUrl(bucket, fileName).toString();
////  }
}
