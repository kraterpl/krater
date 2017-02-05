krater.preview = {
    _db: [],
    _map: {},
    _sorted: false,
    /**
     * Registers a preview generator
     *
     * @param {Object} desc
     * @param {string} desc.id - unique identifier
     * @param {string} desc.priority - lower value = higher priority
     * @param {function} desc.isApplicable - self explanatory
     * @param {function} desc.getIcon - returning FontAwesome className (without 'fa' prefix)
     * @param {function} desc.getThumbnail - same as above, can return null to use default 'link'
     * @param {function} desc.getHTML - returing either HTML string or a node
     * @param {integer} state
     *
     *
     *  Argument passed to functions of desc is object describing a post.
     *  It contains following properties:
     *   - (optional) string property 'link'
     *   - (optional) string property 'text'
     *   - boolean property nsfw
     *  ... and some other things which probably are not neccessary for preview
     */
    register: function (desc) {
        this._db.push(desc);
        this._map[desc.id] = desc;
        this._sorted = false;
    },
    getToggleCallback: function (containerNode, iconNode, data) {
        return function () {
            var preview = containerNode.querySelector('.preview-container')
            ,   div
            ,   html;
            if (preview) { //hide
                iconNode.className = 'fa fa-' + krater.preview.getIcon(data);
                iconNode.parentNode.className = 'preview';
                containerNode.removeChild(preview);
                return;
            }; // else, open
            iconNode.className = 'fa fa-close';
            iconNode.parentNode.className = 'preview open';
            div = document.createElement('div');
            div.className = 'preview-container markdown';
            html = krater.preview.getHTML(data);
            if (typeof html == 'string') div.innerHTML = html;
            else div.appendChild(html);
            containerNode.appendChild(div);
        }
    },
    getThumbnail: function (data) {
        return this._get('getThumbnail',data) || 'link';
    },
    getIcon: function (data) {
        return this._get('getIcon',data);
    },
    getHTML: function (data) {
        return this._get('getHTML',data);
    },
    _get: function (item, data) {
        var key = ['preview',data.sub,data.post].join('.')
        ,   id = localStorage.getItem(key) || this._find(key,data)
        ,   generator = this._map[id];
        return generator ? generator[item](data) : null;
    },
    _find: function (key,data) {
        var id;
        if (!this._sorted) {
            this._db.sort(function (a,b) {
                a.priority - b.priority;
            });
            this._sorted = true;
        }
        for (var i=0, l=this._db.length; i<l; i++) {
            if(this._db[i].isApplicable(data)) {
                id = this._db[i].id;
                localStorage.setItem(key,id);
                return id;
            }
        }
        return false;
    }
}
