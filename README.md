<!--
title: 'AWS NodeJS Example'
description: 'This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->


# Individual examination: Quiztopia API

## Background

Welcome to Quiztopia - we're not just a company, we're a revolution. We are a bunch of tech geeks based in Gothenburg, who love to explore cities and do it in the geekiest way possible - through a web app. We're like a GPS on steroids, but instead of just telling you where to go, we give you questions based on your location. It's like having a little Jeopardy! game show in your pocket.

Our app is like an interactive city tour, but with a twist. Each correct answer gives points, making it a fun experience. It's like playing Pokémon Go, but instead of catching Pokémon, you catch knowledge.

## Instructions

Description of what is to be built, the requirement specification and the technical requirements.

#### Requirements specification

* It is possible to create an account and log in.
* You can see all the quizzes, what the quiz is called and who created it.
* It is possible to choose a specific quiz and get all the questions.

**Requires login**

For the functionality below, you can only work on your own user. So you cannot, for example, delete someone else's quiz.
* It is possible to create a quiz.
* It is possible to add questions to a created quiz.
  - A question contains: The question, the answer and coordinates on the map (longitude and latitude).
* It is possible to delete a quiz.

**VG requirements**

* There is a "leaderboard" of which players got the most points on each quiz. Here you will need to have two endpoints, one to register points for a user and an endpoint to retrieve the top list of points and users for a quiz.
* There is error handling in case something goes wrong against DynamoDB and in case you try to submit wrong values ​​from body.

#### Technical requirements

* Serverless framework
* Middy
* JSON Web Token
* API Gateway
* AWS Lambda
* DynamoDB

## Grading criteria

**To Pass:**
* Meets all requirements in the requirements specification.
* Meets all technical requirements.

**For Well Passed:**
* Meets all requirements in the requirements specification including the VG requirements.

## Swagger

To be inspired and get a clearer picture, you can check out this Swagger, however, it does not have to be exactly according to this model, but can be seen more as inspiration.

Swagger: http://quiztopia-api-documentation.s3-website.eu-north-1.amazonaws.com/#/
