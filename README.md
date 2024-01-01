## CS6460 - Educational Technology

## Table of Contents
1. [Project Description](#project-description)
2. [Team Description](#team-description)
3. [Technology Used](#technology-used)
4. [Target Audience](#target-audience)
5. [Running Locally](#running-locally)
6. [Deployment Details](#deployment)
7. [Live Demo](#live-demo)
8. [Application Access](#application-access)
9. [Documentation](#documentation)


## Project Description
A zoom clone which is supposed to include speech-to-text functionality, with different UI functions that explain how the website should or should not work.
JWT functionalities as well as backend WebRTC extensions are working when tested in linux environments, but do not work well in Windows. As a static site, the netlify.app workflow will demonstrate the userflow of this clone site, and its potential for a Learning Management Platform, teleconference hybrid.

## Team Description
- Ying Zhe Loh : Fullstack development, UIUX, basic QA and dogfooding

## Target Audience
Students and teachers alike who want to use a better learning management platform, and leverage on an AI powered speech to text platform for post lesson review (WIP).

## Technology Used
![JavaScript](https://img.shields.io/badge/-JavaScript-000000?style=flat&logo=javascript)
![Python](https://img.shields.io/badge/-Python-000000?style=flat&logo=python)
![Docker](https://img.shields.io/badge/-Docker-000000?style=flat&logo=docker)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-000000?style=flat&logo=postgresql)
![Go](https://img.shields.io/badge/-Go-00ADD8?style=flat&logo=go&logoColor=white)
![React](https://img.shields.io/badge/-React-000000?style=flat&logo=React)


## Running Locally

**Run the backend server container first**
- docker-compose up  (doesn't work in this pure frontend app)
 
**Running the frontend**   
- Install all node modules: `npm install`  
- Build and launch locally (http://localhost:3000) : `npm run build `  
   

**Database**
- PostgreSQL database to store the app use info
- MongoDB database implemented for WebRTC using sample code from https://github.com/thealmarques/meetjs-webrtc-golang
- The connection is setup to be handled by the server using the database URI saved in the .env file  
- Unless the .env file is missing, no modifications are required prior to running. 

# Deployment

## Frontend Demo
[https://cs6460edtechzoomclone.netlify.app/] (https://cs6460edtechzoomclone.netlify.app/login)

## Application Access
Please use the provided credentials to gain access to the app
- Account 1: `heralding2@mail.com , axbx1234`
- Account 2: `student3@mail.com , axbx1234`
