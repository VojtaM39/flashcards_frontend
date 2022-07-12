# Flashcards example app frontend repository

## Application overview
The application was inspired by [Quizlet](https://quizlet.com). It allows users to create their own flashcard collections and then try to memorize them.

## Technical overview
Project is using vue3 with typescript and class-style components. 
For state managment is used vuex store with library vuex-module-decorators.


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint

```

### Run in docker
```
docker build -t frontend .
docker run -d -p 8080:80 frontend
```
