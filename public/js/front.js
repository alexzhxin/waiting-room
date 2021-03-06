var socket = io.connect($("#ws_addr").val(), {transports: ['websocket', 'polling', 'flashsocket']});

$(document).ready(function() {

    socket.on("meeting-list-today", listMeetings);
    socket.emit('meeting-list-today');

});

function initMeetingList(meetings) {
    $('#meetingList').dynatable({
        dataset: {
            records: meetings
        },
        writers: {
            'meetingDatetime': function (el, record) {
                var convertedDate = moment(el.meetingDatetime).format("hh:mm");
                return convertedDate;
            },
            'meetingStatus': function(el, record) {

                var status = el.meetingStatus;

                if(status == 'departure') {
                    return buttons.departure;
                }
                else if(status == 'pending') {
                    return buttons.pending;
                }
                else if(status == 'arrival') {
                    return buttons.arrival;
                }
                else {
                    return status;
                }
            }
        }
    });
}
function listMeetings(meetings) {

    initMeetingList(meetings);

    var dynatable = $('#meetingList').data('dynatable');
    dynatable.records.updateFromJson({records: meetings});
    dynatable.records.init();
    dynatable.paginationPerPage.set(20);
    dynatable.process();

    getWeather();

};

function getWeather() {

    $.get('/api/weather', function(data) {

        var icon = data.currently.icon;
        var temperature = data.currently.temperature;

        $('#weatherTemperature').text(Math.round(temperature) + '°C');

        var skycons = new Skycons({"color": "#3498db"});
        skycons.add("weatherIcon", icon);
        skycons.play();

    });

};

setInterval(function() {
    $('#showTime').text(moment().format('LLLL'));
}, 1000);