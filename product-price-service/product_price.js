module.exports = function (options) {
    //Import the mock data json file
    const mockData = require('./MOCK_DATA.json');
    //To DO: Add the patterns and their corresponding functions
    this.add('role:product,cmd:getProductPrice', productPrice);

    //To DO: add the pattern functions and describe the logic inside the function
    function productPrice(msg, respond) {
        var res = "";
        for (let index = 0; index < mockData.length; index++) {
            const element = mockData[index];
            if (element['product_id'] == msg.productId) {
                res = element['product_price'];
            }
        }
        respond(null, {result: res});
    }
}