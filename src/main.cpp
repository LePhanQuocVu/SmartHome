#include <Arduino.h>

#define LED_PIN 2

void TaskBlinkLED(void *pvParameters) {
  pinMode(LED_PIN, OUTPUT);
  while (1) {
    digitalWrite(LED_PIN, HIGH);
    vTaskDelay(500 / portTICK_PERIOD_MS);
    digitalWrite(LED_PIN, LOW);
    vTaskDelay(500 / portTICK_PERIOD_MS);
  }
}

void TaskPrintSerial(void *pvParameters) {
  while (1) {
    Serial.println("Running task in FreeRTOS...");
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}

void setup() {
  Serial.begin(115200);

  xTaskCreate(TaskBlinkLED, "BlinkLED", 1024, NULL, 1, NULL);
  xTaskCreate(TaskPrintSerial, "PrintSerial", 2048, NULL, 2, NULL);
}

void loop() {
  // Không cần dùng loop nếu mọi thứ nằm trong task
}
