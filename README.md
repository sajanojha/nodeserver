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
    
###### List out all the artifacts per museum- paginated

    http://localhost:3000/api/museums/manmadeobjects/institution/aaa?offset=0&limit=100    
    Parameters: 
        institution = aaa
        offset = 1
        limit = 100
        
###### List out all the artists per museum- paginated

    http://localhost:3000/api/museums/artists/institution/aaa?offset=0&limit=100    
    Parameters: 
        institution = aaa
        offset = 1
        limit = 100    
        
###### List out all the artifacts - paginated

    http://localhost:3000/api/artifact?offset=0&limit=100    
    Parameters: 
        offset = 1
        limit = 100  
        
###### List out all the artists - paginated

    http://localhost:3000/api/artist?offset=0&limit=100    
    Parameters: 
        offset = 1
        limit = 100

###### List the detail about an artifact

    http://localhost:3000/api/artifact/institution/cbm/id/1919       
         
###### List the related artifact for the artist

    http://localhost:3000/api/artifact/getrelatedartworks/artist/Andy%20Warhol   
    
###### List the detail about an artist

    http://localhost:3000/api/artist/institution/wam/id/4486            

###### List all the artist influenced

    http://localhost:3000/api/artist/getinfluenced/artist/Andy%20Warhol
    
###### List all the artist influencedby

    http://localhost:3000/api/artist/getinfluencedby/artist/Andy%20Warhol         