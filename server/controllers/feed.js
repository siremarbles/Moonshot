/*INital thoughts on feed
get initial state and load all the data from the stream
then use socket.io or something to push new data or creat a notification system that then refreshes page on click.
*/

exports.getGroupData = function(req, res, next) {
  Group.find({ createdBy: req.params.id }, function(err, group) {
    if (err) { return next(err); }
    if (group) {
      return res.send(group);
    }
  });
}
