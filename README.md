# REACT + SPOTIFY
A Single Page Application to browse recommendations based on selected tracks from Spotify

This project allows an user to login to Spotify account and browse the top tracks of an artist. 
Also, see recommendations based on a set of selected tracks. 

This project is developed using react-redux, node js.This projects demonstrates the understanding of the Redux library 
and how to better manage application state by deciding when to use data from Component State or Redux Store.

The code is split in two modules: UI and Backend. 

<b>The User Interface</b> consists of an interactive web page to browse and select tracks to view recommendation.

<b>The Backend</b> takes care of redirecting to Spotify login and return access tokens to the UI.


Here is how you can load the application onto your local machine:

1. First, install node.js if you do not have it yet. It comes with npm(node package manage). Make sure that you install node with the PATH variable so you can run node anywhere in your command prompt/terminal.

2. Clone or download this repository available at: https://github.com/AparnaPrasad/react-spotify. 

3. First you need to run the server:

    i. cd spotify-backend/authorization-code/
    ii. node app

4. To start the react app or UI:

    i. cd spot-ui
    ii. npm start / npm run start

5. Open http:localhost:8888 on the browser. 

Note: This project requires npm > 6.0
