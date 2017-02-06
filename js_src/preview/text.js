krater.preview.register({
    priority: 0,
    id: 'text',
    isApplicable: function (data) {
        return !data.link;
    },
    getThumbnail: function (data) {
        return 'comments-o';
    },
    getIcon: function (data) {
        return data.text ? 'file-text-o' : null;
    },
    getHTML: function (data) {
        return krater.util.md(data.text);
    }
});

