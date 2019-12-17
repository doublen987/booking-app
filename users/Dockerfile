FROM debian:jessie

RUN mkdir /app
ADD . /app
RUN useradd myevents
USER myevents
WORKDIR /app

# ENV LISTEN_URL=0.0.0.0:8080
# ENV LISTEN_URL_TLS=0.0.0.0:9191
EXPOSE 8080
EXPOSE 9090
CMD ["/app/main"]