
/**
 * Created by Orlando on 23/8/2014.
 */
var q = require('q');
var courseRepository = require('../dlib/courses');

exports.find = function(req, res)
{
    console.log(req);
    courseRepository.findCourse(req.query)
        .then(
        function(result){
            if (result)
            {
                res.send({'status' : 200, 'courses' : result});
            }
            else{
                res.send({'status' : 404, 'message' : 'Not found'});
            }

        },
        function(error)
        {
            if(error)
            {
                res.send({'status' : 404, 'message' : 'Not found'});
            }
        }
    )
};