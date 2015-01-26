var model = require('./model');

exports.newMeeting = function(meeting) {

    var meeting = new model.Meeting(meeting);

    meeting.save(function(err, meeting) {
        console.log(meeting);
    });
};

exports.meetingList = function(socket) {

    model.Meeting.find({}).sort({created_at: -1}).exec(function(err, meetings) {
        console.log(meetings);
        socket.emit('meeting-list', meetings);
        socket.broadcast.emit('meeting-list', meetings);
    });

};