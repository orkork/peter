# peter

peter is a simple keyword research tool.

I started peter as a nodejs learning project for myself after reading an article named ["Web Scraping With Node.js" on Smashing Magazine](http://www.smashingmagazine.com/2015/04/08/web-scraping-with-nodejs/), especially the part about data mining.
Starting with that basic idea, I want to implement an easy to use tool for keyword researching. While I use the original code as a starting point, there will barely be anything left of it after a short time.

## Status

The current status is, at best, a proof of concept. 

## Installation

Clone the project and change to directory:

    > git clone ...
    > cd peter

Install node modules:

    > npm install

## Usage

Start the application:
 
    > node app.js

It will ask you for your query and start crawling google afterwards. After fetching the first 10 pages found on google for your query, the application will output a grouped list of the 50 most common words on those websites.

So everything is very basic atm.

## Debug switch

There is a debug switch for verbose messages and errors via environment variables.

On Linux/Mac:
    
    > DEBUG=peter node app.js

On Windows:
    
    > set DEBUG=peter
    > node app.js

You can use DEBUG=* for even more verbose messages, including messages from other modules like x-ray.

## Dev notes

If you are interrested: I will keep some notes about the development of peter on my german blog [orkork.de](http://www.orkork.de/development/peter-ein-keyword-research-tool-mit-nodejs/).

## License

peter is licensed [CC0](http://creativecommons.org/publicdomain/zero/1.0/).

To the extent possible under law, the person who associated CC0 with peter has waived all copyright and related or neighboring rights to peter. This work is published from: Deutschland/Germany.