#include "../include/Buzzer/buzzer.h"

void initBuzzer() {
     EasyBuzzer.setPin(BUZZER_PIN);
}

void BeepBuzzer() {
      Serial.print("\nTask buzzer Running");
    EasyBuzzer.singleBeep(2000, 10000, finishedBeep);
}
void finishedBeep() {
  Serial.println("Báo cháy đã kết thúc!");
}

void buzzerTask(void *pvParameter) {
    for (;;) {
       
        EasyBuzzer.update();                  // cập nhật trạng thái còi
        vTaskDelay(pdMS_TO_TICKS(10));        // delay nhỏ
    }
}