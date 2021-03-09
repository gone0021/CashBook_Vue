export default {
    methods: {
        startParse: function (start) {
            return moment(start).format('YYYY-MM-DD')
        },
        endParse: function (end) {
            return moment(end).format('YYYY-MM-DD')
        }
    }
}
