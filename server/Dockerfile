# the first stage of our build will use a maven 3 parent image
FROM maven:3-openjdk-17 AS MAVEN_BUILD
# copy the pom and src code to the container
COPY ./ ./
# package our application code
RUN mvn clean package

FROM openjdk:17-jdk
WORKDIR /home
EXPOSE 8080
# copy only the artifacts we need from the first stage and discard the rest
COPY --from=MAVEN_BUILD /target/backend-0.0.1-SNAPSHOT.jar  backend.jar
ENTRYPOINT ["java","-jar","backend.jar"]