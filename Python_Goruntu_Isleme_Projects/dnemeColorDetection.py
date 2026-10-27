import cv2
import numpy as np

# remi alıyoruz
frame = cv2.imread("Mescidi-Aksa.jpg")

if frame is None:
    print("HATA: Resim bulunamadı!")
    exit()

# 2. BGR'dan HSV'ye çevir (Çünkü HSV ışık değişiminden daha az etkilenir)
hsv_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

# 3. Aradığım rengin sınırlarını belirleyelim (Örn: Mavi)
lower_blue = np.array([100, 50, 50]) # Alt sınır en koyu/soluk mavi
upper_blue = np.array([130, 255, 255]) ## üst sınır en açık/canlı mavi

# maskeleme yapıyoruz Cevap EVET ise: O pikseli BEYAZ (255) yapar.
                     #Cevap HAYIR ise: O pikseli SİYAH (0) yapar.
mask = cv2.inRange(hsv_frame, lower_blue, upper_blue)

# Sınırları bul
contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

for cnt in contours:
    # Alanı hesapla
    area = cv2.contourArea(cnt)
    
    # Sadece 500 pikselden büyük olanları çiz (Küçük noktaları yoksay)
    if area > 500:
        x, y, w, h = cv2.boundingRect(cnt)
        
        # Orijinal resmin üzerine yeşil kutu çiz
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 3)
        
        # İstersen kutunun üzerine yazı da yazabilirsin
        cv2.putText(frame, "Mavi Nesne", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

# 6. Sonuçları göster
cv2.imshow("Orijinal Resim + Tespit", frame) # Kutulu hali
cv2.imshow("Maske", mask) # Siyah beyaz hali

cv2.waitKey(0)  # Bir tuşa basılana kadar bekle
cv2.destroyAllWindows() # Tuşa basılınca pencereleri kapat
