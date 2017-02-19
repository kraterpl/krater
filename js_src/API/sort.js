krater.API.sort = {
    // POSTS
    postsByTop: function (a,b) {
        return b.topscore - a.topscore;
    },
    postsByHot: function (a,b) {
        return b.hotscore - a.hotscore;
    },
    postsByNew: function (a,b) {
        return b.timestamp - a.timestamp;
    },
    // COMMENTS
    commentsByTop: function (a,b) {
        return (b.ups - b.downs) - (a.ups - a.downs);
    },
    commentsByHot: function (a,b) {
        var hotscore = b.hotscore - a.hotscore;
        if (hotscore === 0) {
            return a.timestamp - b.timestamp;
        }
        return hotscore;
    },
    commentsByNew: null // set in a second..
}

krater.API.sort.commentsByNew = krater.API.sort.postsByNew;
