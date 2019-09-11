#!/usr/bin/python3

from Crypto import Random
from Crypto.Cipher import Blowfish
import os
#!/usr/bin/python3
import sys

class Encryptor:
    def __init__(self, key):
        self.key = key

    def pad(self, s):
        return s + b"\0" * (Blowfish.block_size - len(s) % Blowfish.block_size)

    def encrypt(self, message, key, key_size=256):
        message = self.pad(message)
        iv = Random.new().read(Blowfish.block_size)
        cipher = Blowfish.new(key, Blowfish.MODE_CBC, iv)
        return iv + cipher.encrypt(message)

    def encrypt_file(self, file_name):
        with open(file_name, 'rb') as fo:
            plaintext = fo.read()
        enc = self.encrypt(plaintext, self.key)
        with open(file_name + ".enc", 'wb') as fo:
            fo.write(enc)
        os.remove(file_name)

    def decrypt(self, ciphertext, key):
        iv = ciphertext[:Blowfish.block_size]
        cipher = Blowfish.new(key, Blowfish.MODE_CBC, iv)
        plaintext = cipher.decrypt(ciphertext[Blowfish.block_size:])
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



if (len(key) in range(4,57)):
    enc = Encryptor(key)
    if option == "0":
        print(enc.encrypt_file(dirFile))
    elif option == "1":
        print(enc.decrypt_file(dirFile))
else:
    print("Error key.Length of key must be in range (4,57)")