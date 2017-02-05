krater.preview.register({
    priority: 0,
    id: 'text',
    isApplicable: function (data) {
        return !!data.text;
    },
    getThumbnail: function (data) {
        return 'comments-o';
    },
    getIcon: function (data) {
        return 'file-text-o';
    },
    getHTML: function (data) {
        return krater.util.md(data.text);
    }
});
