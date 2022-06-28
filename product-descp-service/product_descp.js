module.exports = function (options) {
    //Import the mock data json file
    const mockData = require('./MOCK_DATA.json');

    //Add the patterns and their corresponding functions
    this.add('role:product,cmd:getProductURL', productURL);
    this.add('role:product,cmd:getProductName', productName);


    //To DO: add the pattern functions and describe the logic inside the function
    function productURL(msg, respond) {
        var res = "";
        for (let index = 0; index < mockData.length; index++) {
            const element = mockData[index];
            if (element['product_id'] == msg.productId) {
                res = element['product_url']
            }
        }
        respond(null, {result: res});
    }

    function productName(msg, respond) {
        var res = "";
        for (let index = 0; index < mockData.length; index++) {
            const element = mockData[index];
            if (element['product_id'] == msg.productId) {
                res = element['product_name'];
            }
        }
        respond(null, {result: res});
    }

}