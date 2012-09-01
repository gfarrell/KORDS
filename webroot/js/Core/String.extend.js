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
            },
            asType: function(type) {
                var cast_var = this,
                    mtch;

                switch (type) {
                    case 'boolean':
                        if(this === '' || this == '0' || this == 'false') {
                            cast_var = false;
                        } else {
                            cast_var = true;
                        }
                        break;
                    case 'number':
                    case 'integer':
                        mtch = this.match(/^([+\-]?)(\d+)/);
                        if (!mtch) {
                            cast_var = 0;
                        } else {
                            cast_var = parseInt(this, 10);
                        }
                        break;
                    case 'float':
                        mtch = this.match(/^([+\-]?)(\d+(\.\d+)?|\.\d+)([eE][+\-]?\d+)?/);
                        if (!mtch) {
                            cast_var = 0;
                        } else {
                            cast_var = parseFloat(this, 10);
                        }
                        break;
                    case 'array':
                        cast_var = this.split();
                        break;
                    case 'json':
                        cast_var = JSON.decode(this);
                        break;
                    case 'null':
                        cast_var = null;
                        break;
                    default:
                        return this;
                }

                return cast_var;
            }
        });
    }
);