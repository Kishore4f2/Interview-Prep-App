require('dotenv').config();
const dns = require('dns');

console.log('DEBUG: Checking Environment Variables');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PORT:', process.env.DB_PORT);

const host = process.env.DB_HOST;

if (!host) {
    console.error('ERROR: DB_HOST is undefined');
} else {
    console.log(`Resolving DNS for: ${host}`);
    dns.lookup(host, (err, address, family) => {
        if (err) {
            console.error('DNS Lookup failed:', err);
        } else {
            console.log('DNS Lookup successful:', address);
        }
    });
}
