#ifndef REGISTERBUTTON_H
#define REGISTERBUTTON_H

#include "custombutton.h"

class RegisterButton : public CustomButton
{
public:
    RegisterButton(QWidget* parent);

public slots:
    void ClickBehavior();

};

#endif // REGISTERBUTTON_H
