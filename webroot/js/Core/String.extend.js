define(
    ['Mootools/core'],
    function(_mootools) {
        return String.implement({
            humanise: function() {
                return this.replace(/([\s\-_]+)/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().capitalize();
            }
        });
    }
);