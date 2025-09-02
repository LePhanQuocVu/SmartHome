#include "../include/Hcsr04/hcsr04.h"
#include "global.h"
HCSR04 hc(TRIGGER_PIN, ECHO_PIN);

float gDistance = 0;

float readDistance() {
    gDistance = hc.dist(1);
    return gDistance;
}

void handleDistanceTask(void *pvParameter) {
    BaseType_t xStatus;
    uint8_t xValueToSend;
    while (true)
    {   
        float disc = hc.dist();
        uint8_t xValueToSend = (uint8_t)disc;
        Serial.print("\nHandle Distance from Ultra Sensor Task!");
         Serial.print("\nValue: ");
         Serial.print(disc);
         Serial.println();
        if(xValueToSend == 0) {
             Serial.print("Read fail from sensor");
        }else if(xValueToSend !=0 && xValueToSend < 5) {
            // push into mqServo
            xStatus = xQueueSend(xServoQueue, &xValueToSend,0);
            if(xStatus != pdPASS) {
                Serial.print("\nFail to send queue Servo");
            } else {
                Serial.print("Send success to queue value: ");
                Serial.print(xValueToSend);
                Serial.println();
            }
        }  else {
               // do  nothing
        }
        vTaskDelay(1000/portTICK_PERIOD_MS);
    }
}


