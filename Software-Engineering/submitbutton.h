#ifndef SUBMITBUTTON_H
#define SUBMITBUTTON_H

#include "custombutton.h"

class SubmitButton : public CustomButton
{
    Q_OBJECT
public:
    SubmitButton(QWidget *parent = 0);
public slots:
    void ClickBehavior();


};

#endif // SUBMITBUTTON_H
