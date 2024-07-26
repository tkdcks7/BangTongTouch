FROM ubuntu:24.04

LABEL com.jisang.image.author="msr980929@gmail.com"

RUN apt-get update &&\
apt-get install -yq tzdata &&\
ln -fs /usr/share/zoneinfo/Asia/Seoul /etc/localtime &&\
dpkg-reconfigure -f noninteractive tzdata

RUN apt-get update && apt-get install -y sudo openssh-server

RUN echo "Docker 컨테이너 빌드 완료"
RUN echo "컨테이너 저장소에 pem 파일 이동 후 sudo ssh -i [pem 파일명] [EC2 도메인] 실행"