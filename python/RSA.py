#!/usr/bin/python3
import sys
from Crypto import Random
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import os
import struct
import zlib
import base64


class Encryptor:
    def __init__(self, key, file):
        self.key = key
        self.file = file

    def EncryptFileRSA(self):
        fileName = self.file

        data = b''
        with open(fileName, 'rb') as fin:
            data = fin.read()
            fin.close()
            
        with open(self.key, 'rb') as fkey:
            keyData = fkey.read()
            fkey.close()

            # Import key and use for encryption using PKCS1_OAEP
            RSAKey = RSA.importKey(keyData)
            RSAKey = PKCS1_OAEP.new(RSAKey)

            # Compress file data
            data = zlib.compress(data)

            chunk_size = 470 # 512 - 42
            offset = 0
            end_loop = False
            encryptedData = b''

            while not end_loop:
                #The chunk
                chunk = data[offset:offset + chunk_size]

                if len(chunk) % chunk_size != 0:
                    end_loop = True
                    chunk += b" " * (chunk_size - len(chunk))

                #Append the encrypted chunk to the overall encrypted file
                encryptedData += RSAKey.encrypt(chunk)
                    
                    #Increase the offset by chunk size
                offset += chunk_size

                #Base 64 encode the encrypted file
            b64EncryptedData = base64.b64encode(encryptedData)
            with open(self.file + ".enc", 'wb') as fout:
                fout.write(b64EncryptedData)
                fout.close()
            os.remove(fileName)

    def DecryptFileRSA(self):
        fileName = self.file

        data = b''
        with open(fileName, 'rb') as fin:
            data = fin.read()
            fin.close()
        
        with open(self.key, 'rb') as fkey:
            keyData = fkey.read()
            fkey.close()

            # Import key and use for encryption using PKCS1_OAEP
            RSAKey = RSA.importKey(keyData)
            RSAKey = PKCS1_OAEP.new(RSAKey)

            #Base 64 decode the data
            data = base64.b64decode(data)

            chunk_size = 512
            offset = 0
            zipDecryptedData = b''

            #keep loop going as long as we have chunks to decrypt
            while offset < len(data):
                #The chunk
                chunk = data[offset: offset + chunk_size]

                #Append the decrypted chunk to the overall decrypted file
                zipDecryptedData += RSAKey.decrypt(chunk)

                #Increase the offset by chunk size
                offset += chunk_size

            #return the decompressed decrypted data
            decryptedData =  zlib.decompress(zipDecryptedData)
            with open(fileName[:-4], 'wb') as fout:
                fout.write(decryptedData)
                fout.close()
            os.remove(fileName)

dirFile = os.path.join(os.path.expanduser("~"), sys.argv[1])
dirKey = os.path.join(os.path.expanduser("~"), sys.argv[2])
# Neu option = 0 -> encript / option = 1 -> decrypt
option = sys.argv[3]

enc = Encryptor(dirKey, dirFile)
if option == "0":
    enc.EncryptFileRSA()
if option == "1":
    enc.DecryptFileRSA()