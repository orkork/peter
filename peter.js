var xray = require('x-ray');
var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('peter');
var config;

function peter(config) {
    this.config = config;
    this.init();
}

peter.prototype = {

    wordList : {},
    totalResults : 0,
    resultsDownloaded : 0,

    init : function() {
    },

    run : function (queryUrl) {

        var self = this;

        xray(queryUrl)
            .select([{
                link: '.r a[href]'
            }])
            .paginate('#nav td:last-child a[href]')
            .limit(2)
            .run(function(error, results) {
                
                if (error) {
                    debug("Couldn't get page because of error: %s", error);
                    return;
                }

                if(results.length < 1) {
                    debug("No results from google");
                    return;
                }

                for(i in results) {

                    // strip out unnecessary junk
                    var url = results[i].link.replace("/url?q=", "").split("&")[0];
                    
                    if (url.charAt(0) === "/") {
                        continue;
                    }
                    
                    if(url.search('.youtube.') > -1) {
                        continue;
                    }

                    self.totalResults++;

                    self.crawl(url);
                }
            });
    },

    crawl : function(url) {
        
        var self = this;
        debug("Crawling %s", url);

        request(url, function (error, response, body) {

            if (error) {
                debug("Couldn't get page because of error: %s", error);
                self.resultsDownloaded++;
                return;
            }

            if(typeof response == 'undefined' || typeof body == 'undefined') {
                debug("Empty result");
                self.resultsDownloaded++;
                return;
            }

            if(response.statusCode != 200) {
                debug("Incorrect response code: %s", response.statusCode);
                self.resultsDownloaded++;
                return;
            }

            var $ = cheerio.load(body);

            var htmlBody = $('body').children().filter(function(n, el){ 
                    if(!$(el).is('script')){
                        return el;
                    }
            });

            var htmlBodyPlain = htmlBody.text();

            // throw away extra whitespace and non-alphanumeric characters
            var text = htmlBodyPlain.replace(/\s+/g, " ")
                       .replace(/[^a-zA-Z-_ ]/g, "")
                       .toLowerCase();
            
            // split on spaces for a list of all the words on that page 
            var words = text.split(" ");
            
            
            words.forEach(function (word) {

                /*
                 * Filters
                 */
                
                if(self.config.filters) {
                    var filter;
                    for(var i in self.config.filters) {
                        
                        filter = require('./filters/' + self.config.filters[i]);
                        
                        if(!filter.validWord(word)) {
                            return;
                        }
                    }
                }
                
                if (self.wordList[word]) {
                    self.wordList[word]++;
                } else {
                    self.wordList[word] = 1;
                }
            });

            self.resultsDownloaded++;
            self.checkResults();
        });

    },

    checkResults : function() {

        if (this.resultsDownloaded !== this.totalResults) {
            return;
        }
        
        var words = [];
        
        // stick all words in an array
        for (prop in this.wordList) {
            words.push({
                word: prop,
                count: this.wordList[prop]
            });
        }
        
        // sort array based on how often they occur
        words.sort(function (a, b) {
            return b.count - a.count;
        });
        
        // finally, log the first fifty most popular words
        console.log('############ Result ############');

        var position = 1;
        var wordsSliced = words.slice(0, 50);

        console.log('# Position   |   Word (count)  #');
        for(key in wordsSliced) {
            console.log('%s  |  %s (%s)', position++, wordsSliced[key].word, wordsSliced[key].count);
        }
    }
};

module.exports = peter;