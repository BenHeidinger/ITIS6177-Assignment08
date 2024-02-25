export const handler = function(event, context, callback) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    var res ={
        "statusCode": 200,
        "headers": {
            "Content-Type": "*/*"
        }
    };
    var keyword = 'H';
    if (event.keyword && event.keyword!=="") {
        keyword =  event.keyword;
    } else if (event.body && event.body !== "") {
        var body = JSON.parse(event.body);
        if (body.keyword && body.keyword !== "") {
            keyword = body.keyword;
        }
    } else if (event.queryStringParameters && event.queryStringParameters.keyword && event.queryStringParameters.keyword !== "") {
        keyword = event.queryStringParameters.keyword;
    } else if (event.multiValueHeaders && event.multiValueHeaders.keyword && event.multiValueHeaders.keyword != "") {
        keyword = event.multiValueHeaders.keyword.join(" and ");
    } else if (event.headers && event.headers.keyword && event.headers.keyword != "") {
        keyword = event.headers.keyword;
    } 
    
    res.body = "Ben Heidinger says " + keyword;
    callback(null, res);
};
