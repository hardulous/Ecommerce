
const string = "E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"pratham@gmail.com\" }"

let fieldName = string.substring(
    string.lastIndexOf(".$") + 2,
    string.lastIndexOf("_1")
);

console.log(string.lastIndexOf(".$") + 2)
console.log(string.lastIndexOf("_1"))
console.log(fieldName);

output =
    fieldName.charAt(0).toUpperCase() +
    fieldName.slice(1) +
    " already exists";

console.log(output);