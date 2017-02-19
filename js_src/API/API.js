krater = krater || {};
krater.API = {
    _user: null,
    _token: null,
    _test: false,
    _baseURL: 'https://api.krater.pl/v1',

    init: function (user, token) {
        this._user = user;
        this._token = token;
    },

    enableTestMode: function () {
        this._test = true;
    },

    disableTestMode: function () {
        this._test = false;
    },

    /**
     * Fetch new posts
     *
     * @param {Function} callback
     * @param {Array} subs - array of subIds (strings), max length == 10
     * @return {Object} XMLHttpRequest
     */
    getNewPosts: function (callback, subs) {
        return this._getPosts(callback, subs, '/new', krater.API.sort.postsByNew);
    },

    /**
     * Fetch hot posts
     *
     * @param {Function} callback
     * @param {Array} subs - array of subIds (strings), max length == 10
     * @return {Object} XMLHttpRequest
     */
    getHotPosts: function (callback, subs) {
        return this._getPosts(callback, subs, '', krater.API.sort.postsByHot);
    },

    /**
     * Fetch top posts
     *
     * @param {Function} callback
     * @param {Array} subs - array of subIds (strings), max length == 10
     * @param {string} period - 'all', 'month', 'week', 'day', 'hour'
     * @return {Object} XMLHttpRequest
     */
    getTopPosts: function (callback, subs, period) {
        var view = '/top';
        switch (period) {
            case 'all':
                break;
            case 'month':
            case 'week':
            case 'day':
            case 'hour':
                view += '/' + period;
                break;
            default: throw ("Invalid period");
        }
        return this._getPosts(callback, subs, view, krater.API.sort.postsByTop);
    },

    /**
     * Fetch reported posts and comments
     *
     * @param {Function} callback
     * @param {Array} subs - array of subIds (strings), max length == 10
     * @return {Object} XMLHttpRequest
     */
    getReports: function (callback, subs) {
        return this._getPosts(callback, subs, '/reports', krater.API.sort.postsByNew);
    },

    /**
     * Fetch removed posts and comments
     *
     * @param {Function} callback
     * @param {Array} subs - array of subIds (strings), max length == 10
     * @return {Object} XMLHttpRequest
     */
    getRemoved: function (callback, subs) {
        return this._getPosts(callback, subs, '/removed', krater.API.sort.postsByNew);
    },

    /* fetching user data */
    getUser: function (callback, user) {
        if (!user) user = this._user;
        if (!user) throw ("You must initialize API or provide user");
        return this._request(function (response, data) {
            var entries;
            if (response.status == 200) {
                entries = data.posts.concat(data.comments);
                entries.sort(krater.API.sort.postsByNew);
                data.entries = entries;
                data.posts.sort(krater.API.sort.postsByNew);
                data.comments.sort(krater.API.sort.commentsByNew);
            }
            callback(response,data);
        }, 'GET', '/u/'+user, null, user == this._user);
    },

    /**
     * Fetch all newest comments
     *
     * @param {Function} callback
     * @param {Boolean} nsfw - fetch nsfw (true) or non-nsfw posts (false)
     * @return {Object} XMLHttpRequest
     */
    getAllComments: function (callback,nsfw) {
        nsfw = !!nsfw;
        return this._request(function (response, data) {
            if (response.status === 200) {
                data.sort(krater.API.sort.commentsByNew);
            }
            callback(response, data);
        }, 'GET', '/comments' + (nsfw ? '/nsfw' : ''));
    },

    /**
     * Fetch all newest posts
     *
     * @param {Function} callback
     * @param {Boolean} nsfw - fetch nsfw (true) or non-nsfw posts (false)
     * @return {Object} XMLHttpRequest
     */
    getAllPosts: function (callback,nsfw) {
        nsfw = !!nsfw;
        return this._request(function (response, data) {
            if (response.status === 200) {
                data.sort(krater.API.sort.postsByNew);
            }
            callback(response, data);
        }, 'GET', '/posts' + (nsfw ? '/nsfw' : ''));
    },

    /**
     * Fetch hot comments for given post
     *
     * Data object contains:
     * - sub - sub information
     * - post - post information
     * - comments - all post comments list
     * - rootComments - root (toplevel) comments list
     * - subComments - object with sub comments, key in this object is a parentId
     *
     * @param {Function} callback
     * @param {String} sub - sub identifier
     * @param {String} post - post identifier
     * @return {Object} XMLHttpRequest
     *
     */
    getHotComments: function (callback, sub, post) {
        this._getComments(callback, sub, post, krater.API.sort.commentsByHot);
    },
    /**
     * Fetch new comments for given post
     *
     * Data object contains:
     * - sub - sub information
     * - post - post information
     * - comments - all post comments list
     * - rootComments - root (toplevel) comments list
     * - subComments - object with sub comments, key in this object is a parentId
     *
     * @param {Function} callback
     * @param {String} sub - sub identifier
     * @param {String} post - post identifier
     * @return {Object} XMLHttpRequest
     *
     */
    getNewComments: function (callback, sub, post) {
        this._getComments(callback, sub, post, krater.API.sort.commentsByNew);
    },
    /**
     * Fetch top comments for given post
     *
     * Data object contains:
     * - sub - sub information
     * - post - post information
     * - comments - all post comments list
     * - rootComments - root (toplevel) comments list
     * - subComments - object with sub comments, key in this object is a parentId
     *
     * @param {Function} callback
     * @param {String} sub - sub identifier
     * @param {String} post - post identifier
     * @return {Object} XMLHttpRequest
     *
     */
    getTopComments: function (callback, sub, post) {
        this._getComments(callback, sub, post, krater.API.sort.commentsByTop);
    },

    /**
     * Fetch all subs (categories)
     *
     * @param {Function} callback
     * @return {Object} XMLHttpRequest
     */
    getSubs: function (callback) {
        return this._request(function (response, data) {
            if (response.status == 200) {
                data.sort(function(a,b) {
                    return b.subscribersCount - a.subscribersCount;
                });
            }
            callback(response, data);
        }, 'GET', '/subs');
    },

    /**
     * Fetch inbox
     *
     * @param {Function} callback
     * @return {Object} XMLHttpRequest
     */
    getInbox: function (callback) {
        return this._request(function (response, data) {
            if (response.status == 200) {
                data.messages.sort(krater.API.sort.postsByNew);
            }
            callback(response, data);
        }, 'GET', '/inbox', null, true);
    },

    /** vote */
    vote: function (callback, sub, post, comment, direction) {
        return this._request(
            callback,
            'POST',
            '/o/' + sub + '/vote',
            'post=' + post + '&comment=' + comment + "&direction=" + direction,
            true
        );
    },

    /**
     * add post
     *
     * @param {Function} callback
     * @param {String} sub
     * @param {Object} data
     * @param {String} data.title
     * @param {String} [data.text]
     * @param {String} [data.link]
     * @param {Boolean} data.nsfw
     * @return {Object} XMLHttpRequest
     */
    post: function (callback, sub, data) {
        return this._request(
            function (response, json) {
                if (response.status == 200) {
                    json.subComments = {};
                    json.rootComments = [];
                }
                callback(response, json);
            },
            'POST',
            '/o/' + sub,
            data,
            true
        );
    },

    /**
     * add comment
     *
     * @param {Function} callback
     * @param {String} sub
     * @param {String} post
     * @param {String} comment - "*" for top level
     * @param {String} text
     * @return {Object} XMLHttpRequest
     */
    comment: function (callback, sub, post, comment, text) {
        return this._request(
            callback,
            'POST',
            '/o/' + sub + '/comments/' + post,
            {text: text, comment: comment},
            true
        );
    },

    /**
     * subscribe to sub
     *
     * @param {Function} callback
     * @param {String} sub
     */
    subscribe: function (callback, sub) {
        return this._request(
            callback,
            'POST',
            '/o/' + sub + '/subscribe',
            null,
            true
        );
    },

    /**
     * subscribe to sub
     *
     * @param {Function} callback
     * @param {String} sub
     */
    unsubscribe: function (callback, sub) {
        return this._request(
            callback,
            'POST',
            '/o/' + sub + '/unsubscribe',
            null,
            true
        );
    },


    /** Internal helper for getting comments from post */
    _getComments: function (callback, sub, post, sort) {
        return this._request(function (response, data) {
            if (response.status != 200) return callback(response, data);
            // prepare comments
            // root - root comments
            // then:
            //   iterate over root
            //   for every root iterate through subcomments
            //   iterating through subcomments for each subcomment
            var subcomments = {}
            ,   root = []
            ,   com = data.comments
            ,   tmp;
            for (var i=0, l=com.length; i<l; i++) {
                tmp = com[i];
                if (!tmp.hasOwnProperty('hotscore')) {
                    tmp.hotscore = krater.API.util.rateComment(tmp.ups,tmp.downs);
                }
                if (tmp.parent == '*') {
                    root.push(tmp);
                    continue;
                }
                if (!subcomments[tmp.parent]) subcomments[tmp.parent] = [];
                subcomments[tmp.parent].push(tmp);
            }
            // sort prepared comments
            root.sort(sort);
            var subkeys = Object.keys(subcomments);
            for (var i=0, l=subkeys.length; i<l; i++) {
                subcomments[subkeys[i]].sort(sort);
            }
            // just in case.. sort main comments
            com.sort(sort);
            // add new entries to data Object
            data.rootComments = root;
            data.subComments = subcomments;
            // done
            callback(response, data);
        }, 'GET','/o/'+sub+'/comments/'+post);
    },

    /** Internal helper for getting posts/comments from given subs */
    _getPosts: function (callback, subs, view, sort) {
        //if (subs.length > 10) throw ("Too many subs (max 10)"); TODO
        var url = '/o/' + subs.sort().join('+') + view;
        return this._request(function (response, data) {
            if (response.status === 200) {
                (data.posts || data.reports || data.removed).sort(sort);
            }
            callback(response,data);
        }, 'GET', url);
    },

    /** Internal helper to setup authorization */
    _setRequestHeader: function (req, requiresAuthorization) {
        // requiresAuthorization parameter is required for internal calls
        // see js_src/API/internal.js which replaces this method
        if (!this._token) throw ("API is not initialized");
        req.setRequestHeader('Authorization','bearer ' + btoa(this._token));
    },

    /** Internal helper to encode object to query string */
    _encode: function (object) {
        var keys = Object.keys(object)
        ,   output = []
        ,   value;
        for (var i=0, l=keys.length; i<l; i++) {
            value = object[keys[i]];
            output.push(
                encodeURIComponent(keys[i]) + '=' +
                encodeURIComponent(value == null ? '' : value)
            )
        }
        return output.join('&');
    },

    /** Internal helper to send XMLHttpRequest */
    _request: function (callback, method, url, data, requiresAuthorization) {
        var req = new XMLHttpRequest();
        req.open(method, krater.API._baseURL + url, true);
        this._setRequestHeader(req, requiresAuthorization);
        if (data) {
            req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            if (typeof data != 'string') {
                data = this._encode(data);
            }
        }
        req.onreadystatechange = function (aEvt) {
            if (req.readyState === 4) {

                //TODO monitor API limits

                var response;
                try {
                    response = JSON.parse(req.responseText)
                } catch (err) {
                    response = req.responseText;
                }
                callback(req, response);
            }
        };
        req.send(data || null);
        return req;
    }
};
