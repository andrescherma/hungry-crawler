FROM ubuntu:latest

RUN apt update
RUN apt-get install -y python2.7 python-pip


ENTRYPOINT ["python"]

CMD ["micro-server.py"]

WORKDIR ./


COPY ./ ./
RUN pip install -r requirements.txt

EXPOSE 8080