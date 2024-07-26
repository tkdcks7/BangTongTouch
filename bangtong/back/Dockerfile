FROM bellsoft/liberica-openjdk-alpine:17
LABEL com.jisang.image.author="msr980929@gmail.com"

CMD ["./mvnw", "clean", "package"]
VOLUME /tmp
ADD target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]