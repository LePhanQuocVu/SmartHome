#ifndef BUZZER_H
#define BUZZER_H

#include "global.h"
#include "../lib/Buzzer/EasyBuzzer.h"


void initBuzzer();

void BeepBuzzer();

void finishedBeep();

void buzzerTask(void *pvParameter);
#endif