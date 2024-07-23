FROM amazoncorretto:21-alpine3.19
WORKDIR /backend
RUN apk add --no-cache maven
COPY . .
RUN mvn clean install
EXPOSE 8080
ENTRYPOINT ["java","-jar","target/bookmanagementappapi-0.0.1.jar"]