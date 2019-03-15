
module.exports.handler = (event, context, callback) => {

    callback(null, {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify({
            status: "Lambda function working"
        })
    })

};