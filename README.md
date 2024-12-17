# Social Network API

## Contents
[description](#description)
[usage](#usage)
[installation](#installation)
[development](#development)
[contributions](#contributions)

## description 
This is a REST API that is for an application that displays user data. The database able to be seeded with sample data, and users can post, put, get, or delete user profiles, or user thoughts. 

Here is a video link demonstrating the functionality:
https://app.screencastify.com/v3/watch/knXPuoThcE03OWKCMYFR


## usage
This is meant to be used as a server that goes along with a front end client folder to retrieve data and display it. for example having a user homepage, a page for their thoughts, or a page where they can create new thoughts.

## installation
This server uses typescript, express, and mongo db. The dependencies are listed in the package.json. Make sure to run npm install in the command line before trying to seed, build, or start the server.

## development
To develop this server, I started by creating the models. This is an important first step because it define how we are going to manipulate that data and what it will look like. Next I created the controllers to do just that. The controllers control all of the CRUD operations for the server. Then they are used in the router so that when a call is made to a specific endpoint the server responds. 

## contributions
To contribute pull the files from github. It would be cool to see this with a working front end. I might come back to this someday soon.