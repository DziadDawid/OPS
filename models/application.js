const bookshelf = require("../config/bookshelf");

const Application = bookshelf.Model.extend({
    tableName: "Okti_users",
});

module.exports.create = (application) => {
    return new Application({
        email: application.email,
        password: application.password
    }).save();
}