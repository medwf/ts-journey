"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
exports.logPerson = logPerson;
exports.users = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    }
];
function logPerson(user) {
    console.log(` - ${user.name}, ${user.age}`);
}
console.log('Users:');
exports.users.forEach(logPerson);
