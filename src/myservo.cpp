#include "../include/Servo/myServo.h"
Servo myServo;
void initServo() {
    myServo.attach(SERVO_PIN);
}
void rotateServo() {
    Serial.print("Servo controll running");
    myServo.write(90);
    vTaskDelay(5000/portTICK_PERIOD_MS);
    myServo.write(0);
}

void servoControlTask(void *pvParameter) {
    BaseType_t xStatus;
    uint8_t xValueReceive;
    TickType_t xTicktoWait = portMAX_DELAY;
    while (true)
    {   
        if(uxQueueMessagesWaiting(xServoQueue) != 0) {
        Serial.print("Queue empty!");
        } 
        xStatus = xQueueReceive(xServoQueue, &xValueReceive, portMAX_DELAY);
      Serial.print("\nControl Servo task running!\n");
        if(xStatus == pdPASS) {
            Serial.print("\nReceive success value: ");
            Serial.print(xValueReceive);
            Serial.println();
            if(xValueReceive != 0) {
                rotateServo();
            } 
        }
        vTaskDelay(100/portTICK_PERIOD_MS);
    }
    
}