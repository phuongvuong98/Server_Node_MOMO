#!/usr/bin/python3
import sys
from Crypto import Random
from Crypto.Cipher import AES
import os


class Encryptor:
    def __init__(self, key):
        self.key = key

    def pad(self, s):
        return s + b"\0" * (AES.block_size - len(s) % AES.block_size)

    def encrypt(self, message, key, key_size=256):
        message = self.pad(message)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(key, AES.MODE_CBC, iv)
        return iv + cipher.encrypt(message)

    def encrypt_file(self, file_name):
        with open(file_name, 'rb') as fo:
            plaintext = fo.read()
        enc = self.encrypt(plaintext, self.key)
        with open(file_name + ".enc", 'wb') as fo:
            fo.write(enc)
        os.remove(file_name)

    def decrypt(self, ciphertext, key):
        iv = ciphertext[:AES.block_size]
        cipher = AES.new(key, AES.MODE_CBC, iv)
        plaintext = cipher.decrypt(ciphertext[AES.block_size:])
        return plaintext.rstrip(b"\0")

    def decrypt_file(self, file_name):
        with open(file_name, 'rb') as fo:
            ciphertext = fo.read()
        dec = self.decrypt(ciphertext, self.key)
        with open(file_name[:-4], 'wb') as fo:
            fo.write(dec)
        os.remove(file_name)


dirFile = os.path.join(os.path.expanduser("~"), sys.argv[1])
dirKey = os.path.join(os.path.expanduser("~"), sys.argv[2])
# Neu option = 0 -> encript / option = 1 -> decrypt
option = sys.argv[3]


file_key = open(dirKey,"r")
key_ = file_key.readline()
key = key_.encode()



if (len(key) in [16,24,32]):
    enc = Encryptor(key)

    if option == "0":
        print(enc.encrypt_file(dirFile))
    elif option == "1":
        print(enc.decrypt_file(dirFile))
else:
    print("Error key.Length of key must be 16 or 24 or 32")