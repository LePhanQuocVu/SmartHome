#include "../include/global.h"

enum modeConnect currentMode = NORMAL;

SemaphoreHandle_t xMutex = xSemaphoreCreateMutex();
QueueHandle_t xMqttQueue = xQueueCreate(5, sizeof(uint8_t));

