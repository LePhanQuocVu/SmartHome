#include "../include/Oled/oled96.h"
#include "../include/Sensor/dht11.h"

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
SemaphoreHandle_t xMutex = xSemaphoreCreateMutex();

/**INIT OLEd */
void initOled(){
     if(!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
      Serial.println(F("SSD1306 allocation failed"));
      for(;;); // Don't proceed, loop forever
    }
      display.clearDisplay();
      display.setTextSize(1); // Draw 1X-scale text
      display.setTextColor(SSD1306_WHITE);
}

/** Display Data */
void displayTemperature() {
    if(xSemaphoreTake(xMutex, portMAX_DELAY)) {
        float temp = temperature;
        float hum = humidity;

        xSemaphoreGive(xMutex);
        
        display.clearDisplay();                

        display.setCursor(0, 0);
        display.print(F("Nhiet do: "));
        display.print(temp);
        display.println(" C");

        display.setCursor(0, 10);              
        display.print(F("Do am   : "));
        display.print(hum);
        display.println(" %");

        display.display();    
    }                  
}

/* Task display */
void TaskDisplayOled(void *pvParameter) {
    while (true)
    {
        displayTemperature();
        vTaskDelay(2000/portTICK_PERIOD_MS);
    }
    
}