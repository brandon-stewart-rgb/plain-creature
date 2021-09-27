// # Excerpt Helper
// Usage: `{{excerpt}}`, `{{excerpt words="50"}}`, `{{excerpt characters="256"}}`
//
// Attempts to remove all HTML from the string, and then shortens the result according to the provided option.
//
// Defaults to words="50"

/*
  Added optional ability to use multiple <!--excerpt--> tags in your posts to specify exactly what will be
  shown as your excerpt.  It will add (...) between the excerpts and an ellipsis at the end.
  
  e.g. Sample Post:  
  
    # Post Header
  
    Here is some content that I don't want in my excerpt.  <!--excerpt-->But this is what
    I want to show up in my excerpt on my main blog page<!--excerpt-->.  This won't show
    up either.  Handy! <!--excerpt-->But wait, I want this to show up in my excerpt as well.
    <!--excerpt-->Nice, now we're back to things that won't be included in the excerpt. 
  
  
  NOTE 1: If there are less than 2 <!--excerpt--> tags, it will default to your preferred default of words & characters.
  NOTE 2: If the amount of <!--excerpt--> tags is an odd number, the last tag will be ignored.

  Adapted by Marlon Wiebe (mwiebe.com)
  Then adapted again by Thiago Sá (tts.eng.br)
  Originally from: thomas_na & Lerg (https://ghost.org/forum/using-ghost/15991-customize-post-preview/)
*/

var hbs = require('express'),
    _ = require('lodash'),
    downsize = require('downsize'),
    excerpt;

excerpt = function (options) {
    var truncateOptions = (options || {}).hash || {},
        excerpt;

    truncateOptions = _.pick(truncateOptions, ['words', 'characters']);
    _.keys(truncateOptions).map(function (key) {
        truncateOptions[key] = parseInt(truncateOptions[key], 10);
    });

    var excerptTag = "<!--excerpt-->";
    var indexes = getAllIndexesOf(excerptTag, this.html);

    if (indexes.length > 1) {
        var amountOfSamples = Math.floor(indexes.length / 2);
        var output = [];        

        for (var sampleId = 0; sampleId < amountOfSamples; sampleId++) {
            var index1 = sampleId * 2;
            var index2 = index1 + 1;
            
            var sampleText = this.html.substring(indexes[index1], indexes[index2] + excerptTag.length);
            output.push(sampleText);
        }

        return new hbs.handlebars.SafeString(output.join(" (...) "));        
    } else {

        /*jslint regexp:true */
        excerpt = String(this.html);
        // Strip inline and bottom footnotes
        excerpt = excerpt.replace(/<a href="#fn.*?rel="footnote">.*?<\/a>/gi, '');
        excerpt = excerpt.replace(/<div class="footnotes"><ol>.*?<\/ol><\/div>/, '');
        // Strip other html
        excerpt = excerpt.replace(/<\/?[^>]+>/gi, '');
        excerpt = excerpt.replace(/(\r\n|\n|\r)+/gm, ' ');
        /*jslint regexp:false */

        if (!truncateOptions.words && !truncateOptions.characters) {
            truncateOptions.words = 50;
        }

        return new hbs.handlebars.SafeString(downsize(excerpt, truncateOptions));
    }
};

function getAllIndexesOf(value, fullText) {
    var indexes = [], i = -1;
    while ((i = fullText.indexOf(value, i + 1)) != -1) {
        indexes.push(i);
    }
    return indexes;
}

module.exports = excerpt;