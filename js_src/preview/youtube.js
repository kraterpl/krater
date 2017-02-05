krater.preview.register({
    priority: 5,
    id: 'youtube',
    isApplicable: function (data) {
        return data.link ? !!this._getId(data.link) : false;
    },
    getThumbnail: function (data) {
        return 'youtube-play';
    },
    getIcon: function(data) {
        return 'play';
    },
    getHTML: function (data) {
        var node = document.createElement('iframe');
        node.width = '560';
        node.height = '315';
        node.src = 'https://www.youtube.com/embed/' + this._getId(data.link);
        node.frameborder = "0";
        node.setAttribute('allowfullscreen',true);
        return node;
    },
    _getId: function (url) {
        if (!url) return null;
        var regex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/i
        ,   isyt = false
        ,   urls = [
                '//youtube.com/',
                '//www.youtube.com/',
                '//youtu.be/',
                '//youtube-nocookie.com/'
            ]
        ,   result = null;
        url = url.split(':').slice(1).join(':'); // remove schema
        for (var i=0, l=urls.length; i<l; i++) {
            if (url.indexOf(urls[i]) === 0) {
                isyt = true;
                break;
            }
        }
        if (isyt) {
            result = url.match(regex);
            if (result && result.length == 2) result = result[1];
        }
        return result;
    }
});
