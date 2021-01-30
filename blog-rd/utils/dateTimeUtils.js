module.exports = formatTime = (date) => {
    if (date != null) {
        var json_date = date.toJSON();
        return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
}