#include "../include/global.h"

enum modeConnect currentMode = NORMAL;

SemaphoreHandle_t xMutex = xSemaphoreCreateMutex();
