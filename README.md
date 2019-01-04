# Node Server for Art-Colab
Node based server for Art-Colab project

## Prerequisite
Make Sure you have latest version of Node and Express pre installed.
If not please follow the instruction below

## Install Node
    Download the latest version from https://nodejs.org/en/
    
## Install Express
    $ npm install -g express
    
## Install Express generator
    $ npm install -g express-generator
    
    
## Clone the project on the folder you desire
Run:

    $ git clone https://github.com/sajanojha/nodeserver.git

    $ express
    
    $ npm i
    
    $ npm cache clean
    
## To run the node server
On the Development mode:

    $ npm run dev
        
    
Navigate to 
    
    localhost:3000
    
It will show an output as "Welcome to the node server for Art-Colab Project!!!!" on the browser

## API

###### List out all the museums

    http://localhost:3000/api/museums
    
###### List out all the artifacts per museum

    http://localhost:3000/api/museums/manmadeobjects/institution/The%20Walters%20Art%20Museum?offset=0&limit=100    
    Parameters: 
        institution = Gilcrease Museum
        offset = 1
        limit = 100
        
###### List out all the artists per museum

    http://localhost:3000/api/museums/artists/institution/The%20Walters%20Art%20Museum?offset=0&limit=100    
    Parameters: 
        institution = Gilcrease Museum
        offset = 1
        limit = 100    