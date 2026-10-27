from ultralytics import YOLO
import cv2

print("ilk deneme yolo başlatılıyor")
model = YOLO("yolov8n.pt")

frame_width = 640
frame_height = 480
canter_target = frame_width / 2 

#kp: hassasiyet ayarı
kp = 0.1

#taslak deneme motor hızı
base_speed = 30

print("PID kontrol devrede...")

results = model.predict(source="0" , show = True, stream=True)


for result in results:
    
    boxes = result.boxes

    if not boxes:
        print("Hedef bulunamadı - Motorlar: 0 | 0 (Arama Modu)")

    for box in boxes:
        cls = int(box.cls[0])
        if cls !=0:
            continue

        x1, y1, x2, y2 = box.xyxy[0]

        center_x = int((x1+x2) / 2)

        error = center_x - canter_target
        turn_power = error * kp

        left_motor = base_speed + turn_power
        right_motor = base_speed - turn_power

        left_motor = max(0 , min(100 , left_motor))  
        right_motor = max(0 , min(100 , right_motor))

        durum = "Merkezde"
        if error > 20: durum = "HEDEF SAĞDA -> DÖNÜLÜYOR "
        elif error < 20: durum = "HEDEF SOLDA <- DÖNÜLÜYOR"

        print(f"Hata: {error:.1f} | Sol Motor: {left_motor:.1f} | Sağ Motor: {right_motor:.1f} | Durum: {durum}")
        
        # Sadece en büyük/ilk nesneye kilitlenip döngüden çıkalım
        # Yoksa ekrandaki 5 kişiye aynı anda gitmeye çalışır.
        break
    
