This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

For building and running the application you need:

- [JDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Maven 3](https://maven.apache.org)
- [Docker](https://www.docker.com)
- [Docker Compose](https://docs.docker.com/compose/)
- [ElasticSearch 6](https://www.elastic.co)

## Running the application locally

clone the repo with the command given below: 
```shell
git clone https://github.com/mozammal/full-text-search-frotnend.git

git clone https://github.com/mozammal/full-indexer-elasticsearch.git
```

One way to run this application is to use docker-compose from the command line
(tested on ubuntu 18.04.1):

```shell

cd full-indexer-elasticsearch
mvn clean package
sudo sysctl -w vm.max_map_count=262144
sudo docker-compose up -d
cd ..
cd  full-text-search-frotnend
sudo docker-compose up -d

```

One way to stop this application is to use docker-compose from the command line
(tested on ubuntu 18.04.1):

```shell
cd  full-text-search-frotnend
sudo docker-compose stop
cd ..
cd full-indexer-elasticsearch
sudo docker-compose stop

```

The can now access the search app at the following url 
- http://localhost:3000


