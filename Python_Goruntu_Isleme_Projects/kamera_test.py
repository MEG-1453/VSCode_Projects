import cv2  # OpenCV kütüphanesini içeri alıyoruz

# 1. Kameraya erişim sağlıyoruz (0 genellikle varsayılan webcam'dir)
kamera = cv2.VideoCapture(0)

print("Kamera açılıyor... Çıkmak için 'q' tuşuna bas.")

while True:
    # 2. Kameradan anlık bir kare (fotoğraf) okuyoruz
    # ret: Okuma başarılı mı? (True/False)
    # kare: Resmin ta kendisi (piksel matrisi)
    ret, kare = kamera.read()

    if not ret:
        print("Kameradan görüntü alınamadı!")
        break

    # 3. Okunan kareyi bir pencerede gösteriyoruz
    cv2.imshow('Benim Kameram', kare)

    # 4. 'q' tuşuna basılırsa döngüden çık (1 milisaniye bekle)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 5. Temizlik işlemleri: Kamerayı serbest bırak ve pencereleri kapat
kamera.release()
cv2.destroyAllWindows()