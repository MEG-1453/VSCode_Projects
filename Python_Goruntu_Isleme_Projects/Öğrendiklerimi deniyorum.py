import cv2

frameWidth = 640
frameHeight = 360


cap = cv2.VideoCapture("WIN_20260110_11_59_03_Pro.mp4") 

while True:
    success,img = cap.read()
    img = cv2.resize(img,(frameWidth, frameHeight))
    cv2.imshow("video1", img)

    if cv2.waitKey(25) & 0XFF == ord("q"):
        break
    
cap.release()
cv2.destroyAllWindows()

