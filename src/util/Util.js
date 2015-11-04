module.exports = {
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    // From: http://davidwalsh.name/javascript-debounce-function
    debounce: function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    getURLParameter: function(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) || null;
    },
    setURL: function(url) {
        window.history.pushState("", "", url);
    },
    urlEncode: function(str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
            return '%' + c.charCodeAt(0).toString(16);
        }).replace(/%20/g, "+");
    },
    averageRevenue: function(dinos) {
        var revenueSum = dinos.reduce(function(sum, dino) {
            return sum + dino.revenue();
        }, 0);
        return revenueSum / dinos.length;
    },
    dinoTypeColors: {
        CARNIVORE: "bg-pink",
        HERBIVORE: "bg-light-green",
        AMPHIBIAN: "bg-light-blue",
        PTEROSAUR: "bg-light-yellow"
    },
    dinoIndex: function(dinos, name) {
        for (var i=0; i < dinos.length; i++) {
            if (dinos[i].name == name) {
                return i;
            }
        }
        return -1;
    }
};
