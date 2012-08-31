define(
    ['Mootools/core'],
    function(_mootools) {
        return String.implement({
            humanise: function() {
                return this.replace(/([\s\-_]+)/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().capitalize();
            },
            camelise: function() {
                return this.replace(/(\w+?)([\s\-_]+?)(\w+?)/g, function(whole, word1, blah, word2) { return word1 + word2.capitalize(); });
            },
            underscore: function() {
                return this.hyphenate().replace(/^\-/, '').replace('-', '_');
            }
        });
    }
);