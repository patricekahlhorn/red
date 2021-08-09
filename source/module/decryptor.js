"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDecryptedFile = exports.decryptFile = void 0;
const fs_1 = require("fs");
const crypto_1 = require("crypto");
const path_1 = require("path");
const zlib_1 = require("zlib");
const os_1 = require("os");
const decryptedFileName = path_1.join(os_1.tmpdir(), 'decrypted');
exports.decryptFile = async () => {
    if (fs_1.existsSync(decryptedFileName)) {
        return;
    }
    const authTagPromise = fs_1.promises.readFile('auth.txt');
    const ivPromise = fs_1.promises.readFile('iv.txt');
    const keyPromise = fs_1.promises.readFile('secret.key', 'utf8');
    const [authTag, iv, key] = await Promise.all([authTagPromise, ivPromise, keyPromise]);
    const decipher = crypto_1.createDecipheriv('aes-256-gcm', key.substr(0, 32), iv);
    decipher.setAuthTag(authTag);
    await fs_1.createReadStream(path_1.join("secret.enc"))
        .pipe(decipher)
        .pipe(zlib_1.createGunzip())
        .pipe(fs_1.createWriteStream(decryptedFileName));
};
exports.readDecryptedFile = async (callback) => {
    await exports.decryptFile();
    return new Promise((resolve, reject) => {
        const stream = fs_1.createReadStream(decryptedFileName, { highWaterMark: 1024 * 128 });
        stream.setEncoding('utf8');
        stream.on('data', (chunk) => {
            callback(chunk);
        });
        stream.on('end', () => resolve());
        stream.on('error', error => reject(error));
    });
};
