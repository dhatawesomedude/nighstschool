/**
 * Created by Orlando on 23/8/2014.
 */
var mongoose = require('mongoose');
var Q = require('q');
var model = require('../models/courses');

var nSchema = mongoose.Schema({
    courseID    : String,
    lessons     : Object,
    comments    : Object,
    type        : String,
    description : String
});

var nModel = mongoose.model('courses', nSchema);

function entityToModel(entity)
{
    if (!entity) return null;

    var newModel = new model();
    newModel.lessons    = entity.lessons;
    newModel.comments   = entity.comments;
    newModel.type       = entity.type;
    newModel.description= entity.description;
}

function createOptions(params) {
    var options = {
        'limit': params.limit || 50,
        'skip': params.offset || 0
    };

    return options;
}

var databaseQuery = exports.databaseQuery = function(searchParams, options){
    var d = Q.defer();
    console.log(searchParams);
    nModel.find(searchParams, null, options, function(err, results)
    {
        console.log(results);
        if(err)
        {
            d.reject(err);
        }
        else
            d.resolve(results);
    });
    return d.promise;
};
exports.findCourse = function(params)
{
    var d = Q.defer();
    var options = createOptions(params);

    this.databaseQuery({courseID : params.courseID}, options).then(function(results){
        //var courses = [];
            console.log(results);
        var courses = results.map(function(course){
            //courses.push(course);
            return course;
        });
        d.resolve(courses);
    }
        , function(error)
        {
            d.reject(error);
        }
    );

    return d.promise;

};