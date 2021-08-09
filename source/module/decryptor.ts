import {createReadStream, createWriteStream, promises as fs, existsSync} from "fs";
import {createDecipheriv} from "crypto";
import {join} from "path";
import {createGunzip} from "zlib";
import {tmpdir} from "os";

const decryptedFileName = join(tmpdir(), 'decrypted')

export const decryptFile = async () => {
    if (existsSync(decryptedFileName)) {
        return;
    }

    const authTagPromise = fs.readFile('auth.txt')
    const ivPromise = fs.readFile('iv.txt')
    const keyPromise = fs.readFile('secret.key', 'utf8')

    const [authTag, iv, key] = await Promise.all([authTagPromise, ivPromise, keyPromise])

    const decipher = createDecipheriv('aes-256-gcm', key.substr(0, 32), iv);
    decipher.setAuthTag(authTag);

    await createReadStream(join("secret.enc"))
        .pipe(decipher)
        .pipe(createGunzip())
        .pipe(createWriteStream(decryptedFileName))
}

export const readDecryptedFile = async (callback) => {
    await decryptFile()

    return new Promise((resolve, reject) => {
        const stream = createReadStream(decryptedFileName, { highWaterMark: 1024 * 128 })
        stream.setEncoding('utf8');
        stream.on('data', (chunk) => {
            callback(chunk)
        });
        stream.on('end', () => resolve());
        stream.on('error', error => reject(error));
    })
}